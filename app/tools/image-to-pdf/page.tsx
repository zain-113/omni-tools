'use client';

import React, { useState, useRef } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContent from '@/components/SeoContent';
import { TOOLS } from '@/lib/tools-data';
import { PDFDocument, PageSizes } from 'pdf-lib';
import {
  Upload,
  Download,
  Trash2,
  ArrowUp,
  ArrowDown,
  FilePlus,
  RefreshCw,
  Sliders,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface StagedImage {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

export default function ImageToPdfPage() {
  const tool = TOOLS.find((t) => t.slug === 'image-to-pdf')!;

  const [images, setImages] = useState<StagedImage[]>([]);
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Fit'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | 'auto'>('auto');
  const [margin, setMargin] = useState<number>(20); // in points
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [generatedPdfSize, setGeneratedPdfSize] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newItems: StagedImage[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const previewUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setImages((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            file,
            previewUrl,
            width: img.naturalWidth,
            height: img.naturalHeight,
          },
        ]);
      };
      img.src = previewUrl;
    });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setImages(updated);
  };

  const removeImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const generatePdf = async () => {
    if (images.length === 0) return;

    setIsGenerating(true);
    setGeneratedPdfUrl(null);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        const arrayBuffer = await item.file.arrayBuffer();
        let embeddedImage;

        if (item.file.type === 'image/jpeg' || item.file.type === 'image/jpg') {
          embeddedImage = await pdfDoc.embedJpg(arrayBuffer);
        } else {
          // Normalizing PNG / WebP through canvas to PNG stream
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.src = item.previewUrl;
          });
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx?.drawImage(img, 0, 0);

          const pngDataUrl = canvas.toDataURL('image/png');
          const pngBytes = await fetch(pngDataUrl).then((res) => res.arrayBuffer());
          embeddedImage = await pdfDoc.embedPng(pngBytes);
        }

        const imgDims = embeddedImage.scale(1);

        // Determine Page Size
        let pageWidth: number;
        let pageHeight: number;

        if (pageSize === 'Fit') {
          pageWidth = imgDims.width + margin * 2;
          pageHeight = imgDims.height + margin * 2;
        } else {
          const standardSize = pageSize === 'A4' ? PageSizes.A4 : PageSizes.Letter;
          let isLandscape = false;

          if (orientation === 'landscape') {
            isLandscape = true;
          } else if (orientation === 'auto') {
            isLandscape = imgDims.width > imgDims.height;
          }

          pageWidth = isLandscape ? standardSize[1] : standardSize[0];
          pageHeight = isLandscape ? standardSize[0] : standardSize[1];
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Fit image within margins
        const availableWidth = pageWidth - margin * 2;
        const availableHeight = pageHeight - margin * 2;

        const scaleX = availableWidth / imgDims.width;
        const scaleY = availableHeight / imgDims.height;
        const finalScale = Math.min(scaleX, scaleY, 1);

        const drawWidth = imgDims.width * finalScale;
        const drawHeight = imgDims.height * finalScale;

        // Center on page
        const posX = (pageWidth - drawWidth) / 2;
        const posY = (pageHeight - drawHeight) / 2;

        page.drawImage(embeddedImage, {
          x: posX,
          y: posY,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setGeneratedPdfUrl(url);
      setGeneratedPdfSize(blob.size);
    } catch (err: unknown) {
      console.error(err);
      alert('Failed to generate PDF. Please ensure images are valid files.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'PDF Tools', href: '/#pdf-tools' }, { label: tool.name }]} />

      <AdPlaceholder slot="leaderboard" className="mb-8" />

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
        {/* Upload Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/30 group mb-6"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
            Drop Photos or Click to Add Images
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Supports multiple JPG, PNG, and WebP files. Reorder anytime before generating.
          </p>
        </div>

        {images.length > 0 && (
          <div className="space-y-6">
            {/* Configuration Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Page Dimensions
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none"
                >
                  <option value="A4">A4 (Standard ISO 210 x 297 mm)</option>
                  <option value="Letter">US Letter (8.5 x 11 in)</option>
                  <option value="Fit">Fit to Image Size (No Borders)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Page Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as any)}
                  disabled={pageSize === 'Fit'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none disabled:opacity-50"
                >
                  <option value="auto">Auto (Match Image Aspect)</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Margins
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none"
                >
                  <option value={0}>No Margin (0 pt)</option>
                  <option value={15}>Small Margin (15 pt)</option>
                  <option value={30}>Standard Margin (30 pt)</option>
                </select>
              </div>
            </div>

            {/* Reorderable Image Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Document Pages ({images.length})
                </span>
                <button
                  type="button"
                  onClick={() => setImages([])}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {images.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-2.5 flex flex-col justify-between group shadow-2xs"
                  >
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.previewUrl}
                        alt={item.file.name}
                        className="w-full h-full object-contain"
                      />
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-bold">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-1 pt-1">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => moveImage(index, 'up')}
                          className="p-1 rounded text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                          title="Move Left/Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={index === images.length - 1}
                          onClick={() => moveImage(index, 'down')}
                          className="p-1 rounded text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                          title="Move Right/Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImage(item.id)}
                        className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60"
                        title="Remove page"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action & Download Bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {images.length} {images.length === 1 ? 'image' : 'images'} staged for compilation.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={generatePdf}
                  disabled={isGenerating}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-95"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Assembling PDF...</span>
                    </>
                  ) : (
                    <>
                      <FilePlus className="w-4 h-4" />
                      <span>Generate PDF Document</span>
                    </>
                  )}
                </button>

                {generatedPdfUrl && (
                  <a
                    href={generatedPdfUrl}
                    download="compiled_images.pdf"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF ({(generatedPdfSize / 1024).toFixed(0)} KB)</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <SeoContent tool={tool} />

      <AdPlaceholder slot="footer" className="mt-12" />
    </main>
  );
}
