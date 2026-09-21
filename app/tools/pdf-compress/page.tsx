'use client';

import React, { useState, useRef } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SeoContent from '@/components/SeoContent';
import { TOOLS } from '@/lib/tools-data';
import { getPdfJs } from '@/lib/pdf-worker';
import { PDFDocument } from 'pdf-lib';
import {
  Minimize2,
  Upload,
  Download,
  RefreshCw,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  Percent
} from 'lucide-react';

type CompressionTier = 'light' | 'balanced' | 'extreme';

export default function PdfCompressPage() {
  const tool = TOOLS.find((t) => t.slug === 'pdf-compress')!;

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [tier, setTier] = useState<CompressionTier>('balanced');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [compressedBlobUrl, setCompressedBlobUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('Please select a valid PDF file.');
      return;
    }

    setError(null);
    setPdfFile(file);
    setOriginalSize(file.size);
    setCompressedBlobUrl(null);
    setProgress(0);

    try {
      const pdfjs = await getPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      setTotalPages(doc.numPages);
    } catch (err: unknown) {
      console.error(err);
      setError('Unable to parse this PDF. It may be password-protected or corrupted.');
    }
  };

  const handleCompress = async () => {
    if (!pdfFile) return;

    setIsCompressing(true);
    setError(null);
    setProgress(0);
    setCompressedBlobUrl(null);

    try {
      const pdfjs = await getPdfJs();
      const arrayBuffer = await pdfFile.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const numPages = doc.numPages;

      // Tier parameters
      let scale = 1.2;
      let quality = 0.65;
      if (tier === 'light') {
        scale = 1.4;
        quality = 0.85;
      } else if (tier === 'extreme') {
        scale = 0.9;
        quality = 0.45;
      }

      const newPdfDoc = await PDFDocument.create();

      for (let i = 1; i <= numPages; i++) {
        const page = await doc.getPage(i);
        const originalViewport = page.getViewport({ scale: 1.0 });
        const renderViewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        canvas.width = renderViewport.width;
        canvas.height = renderViewport.height;

        await page.render({
          canvasContext: ctx,
          viewport: renderViewport,
          canvas: canvas,
        }).promise;

        const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
        const jpegBytes = await fetch(jpegDataUrl).then((r) => r.arrayBuffer());
        const embeddedImage = await newPdfDoc.embedJpg(jpegBytes);

        // Keep page dimensions equal to original points
        const newPage = newPdfDoc.addPage([originalViewport.width, originalViewport.height]);
        newPage.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: originalViewport.width,
          height: originalViewport.height,
        });

        setProgress(Math.round((i / numPages) * 100));
      }

      const compressedPdfBytes = await newPdfDoc.save();
      const blob = new Blob([new Uint8Array(compressedPdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setCompressedBlobUrl(url);
      setCompressedSize(blob.size);
    } catch (err: unknown) {
      console.error(err);
      setError('Compression failed. Please try a different compression tier or verify your PDF.');
    } finally {
      setIsCompressing(false);
    }
  };

  const savingsPercent = originalSize > 0 && compressedSize > 0
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'PDF Tools', href: '/#pdf-tools' }, { label: tool.name }]} />

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            {tool.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            100% Client-Side
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
          {tool.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      {/* Main Interactive Box */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md">
        {!pdfFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-10 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/30 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Select or Drop Your PDF to Compress
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Multi-page documents supported. 100% private in-browser compression without size caps.
            </p>
            <button
              type="button"
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              Choose PDF Document
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate max-w-xs sm:max-w-md">
                    {pdfFile.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Original Size: {(originalSize / (1024 * 1024)).toFixed(2)} MB • {totalPages} {totalPages === 1 ? 'Page' : 'Pages'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPdfFile(null);
                  setCompressedBlobUrl(null);
                }}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Change Document
              </button>
            </div>

            {/* Compression Tier Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                Choose Compression Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => setTier('light')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    tier === 'light'
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Light Compression</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      Best Quality
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Maintains near-original clarity. Ideal for portfolio reviews, resumes, and print documents.
                  </p>
                </div>

                <div
                  onClick={() => setTier('balanced')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    tier === 'balanced'
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Balanced (Recommended)</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                      ~50% Savings
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Perfect balance of crisp readability and small file size. Recommended for emails and portals.
                  </p>
                </div>

                <div
                  onClick={() => setTier('extreme')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    tier === 'extreme'
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Extreme Compression</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                      Smallest Size
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Aggressive downsampling. Best when meeting strict file caps (e.g. strict 2MB or 5MB government portals).
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Progress Bar */}
            {isCompressing && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <span>Compressing and re-encoding PDF pages...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Compressed Results Card */}
            {compressedBlobUrl && (
              <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        Compression Complete!
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Shrunk from <span className="font-semibold">{(originalSize / (1024 * 1024)).toFixed(2)} MB</span> down to{' '}
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {(compressedSize / (1024 * 1024)).toFixed(2)} MB
                      </span>{' '}
                      ({savingsPercent}% reduction).
                    </p>
                  </div>

                  <a
                    href={compressedBlobUrl}
                    download={`compressed_${pdfFile.name}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Compressed PDF</span>
                  </a>
                </div>
              </div>
            )}

            {/* Action Trigger */}
            {!compressedBlobUrl && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleCompress}
                  disabled={isCompressing}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-95"
                >
                  {isCompressing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Optimizing ({progress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      <span>Compress PDF Document</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <SeoContent tool={tool} />

    </main>
  );
}
