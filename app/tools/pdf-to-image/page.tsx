'use client';

import React, { useState, useRef } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SeoContent from '@/components/SeoContent';
import { TOOLS } from '@/lib/tools-data';
import { getPdfJs } from '@/lib/pdf-worker';
import JSZip from 'jszip';
import {
  FileText,
  Upload,
  Download,
  Archive,
  RefreshCw,
  Sliders,
  CheckCircle,
  AlertCircle,
  Eye,
  FileImage
} from 'lucide-react';

interface RenderedPage {
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
}

export default function PdfToImagePage() {
  const tool = TOOLS.find((t) => t.slug === 'pdf-to-image')!;

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.5);
  const [format, setFormat] = useState<'image/png' | 'image/jpeg'>('image/png');
  const [quality, setQuality] = useState<number>(0.9);
  const [renderedPages, setRenderedPages] = useState<RenderedPage[]>([]);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('Please upload a valid PDF document (.pdf)');
      return;
    }

    setError(null);
    setPdfFile(file);
    setRenderedPages([]);
    setProgress(0);

    try {
      const pdfjs = await getPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const doc = await loadingTask.promise;
      setTotalPages(doc.numPages);
    } catch (err: unknown) {
      console.error(err);
      setError('Unable to parse this PDF. The document may be password-protected or corrupted.');
    }
  };

  const renderPages = async () => {
    if (!pdfFile) return;

    setIsRendering(true);
    setError(null);
    setProgress(0);
    setRenderedPages([]);

    try {
      const pdfjs = await getPdfJs();
      const arrayBuffer = await pdfFile.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const doc = await loadingTask.promise;
      const pagesCount = doc.numPages;

      const results: RenderedPage[] = [];

      for (let i = 1; i <= pagesCount; i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        }).promise;

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (b) => resolve(b || new Blob()),
            format,
            format === 'image/jpeg' ? quality : undefined
          );
        });

        const dataUrl = canvas.toDataURL(format, quality);

        results.push({
          pageNumber: i,
          dataUrl,
          blob,
          width: viewport.width,
          height: viewport.height,
        });

        setProgress(Math.round((i / pagesCount) * 100));
        setRenderedPages([...results]);
      }
    } catch (err: unknown) {
      console.error(err);
      setError('An error occurred during page rendering. Please try again.');
    } finally {
      setIsRendering(false);
    }
  };

  const downloadSingle = (page: RenderedPage) => {
    const ext = format === 'image/png' ? 'png' : 'jpg';
    const baseName = pdfFile?.name.replace(/\.[^/.]+$/, '') || 'document';
    const link = document.createElement('a');
    link.href = page.dataUrl;
    link.download = `${baseName}_page_${page.pageNumber}.${ext}`;
    link.click();
  };

  const downloadAllZip = async () => {
    if (renderedPages.length === 0) return;

    const zip = new JSZip();
    const ext = format === 'image/png' ? 'png' : 'jpg';
    const baseName = pdfFile?.name.replace(/\.[^/.]+$/, '') || 'document';

    renderedPages.forEach((page) => {
      zip.file(`${baseName}_page_${page.pageNumber}.${ext}`, page.blob);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${baseName}_all_pages.zip`;
    link.click();
    URL.revokeObjectURL(url);
  };

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

      {/* Tool Main Interactive Box */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md">
        {/* Upload Dropzone */}
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
              Select or Drop Your PDF File Here
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Supports standard multi-page PDF documents. Zero file size limit, processed safely inside your browser.
            </p>
            <button
              type="button"
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
            >
              Browse Files
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info Bar */}
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
                    {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB • {totalPages} {totalPages === 1 ? 'Page' : 'Pages'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPdfFile(null);
                    setRenderedPages([]);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Change File
                </button>
              </div>
            </div>

            {/* Conversion Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              {/* Scale / Quality */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Resolution / Quality
                </label>
                <select
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  disabled={isRendering}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value={1.0}>1x Normal (Web Preview, ~72 DPI)</option>
                  <option value={1.5}>1.5x Sharp (Presentations, ~150 DPI)</option>
                  <option value={2.0}>2x Ultra HD (Print Crisp, ~300 DPI)</option>
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Output Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormat('image/png')}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      format === 'image/png'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    PNG (Lossless)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat('image/jpeg')}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      format === 'image/jpeg'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    JPG (Compact)
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col justify-end">
                <button
                  type="button"
                  onClick={renderPages}
                  disabled={isRendering}
                  className="w-full h-9 flex items-center justify-center gap-2 px-4 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-95"
                >
                  {isRendering ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Rendering ({progress}%)...</span>
                    </>
                  ) : (
                    <>
                      <FileImage className="w-3.5 h-3.5" />
                      <span>{renderedPages.length > 0 ? 'Re-render Pages' : 'Convert PDF Pages'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Rendering Progress Bar */}
            {isRendering && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <span>Converting pages to images...</span>
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

            {/* Rendered Results Gallery */}
            {renderedPages.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      Converted Images ({renderedPages.length})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Download individual pages or export the full batch as a ZIP.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={downloadAllZip}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>Download All as ZIP</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {renderedPages.map((page) => (
                    <div
                      key={page.pageNumber}
                      className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-3 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={page.dataUrl}
                          alt={`Page ${page.pageNumber}`}
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-semibold backdrop-blur-xs">
                          Page {page.pageNumber}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {Math.round(page.width)} × {Math.round(page.height)} px
                        </span>
                        <button
                          type="button"
                          onClick={() => downloadSingle(page)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 600+ Word SEO & FAQ Section */}
      <SeoContent tool={tool} />

    </main>
  );
}
