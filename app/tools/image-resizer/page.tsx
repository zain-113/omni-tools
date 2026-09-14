'use client';

import React, { useState, useRef, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContent from '@/components/SeoContent';
import { TOOLS } from '@/lib/tools-data';
import {
  Maximize,
  Upload,
  Download,
  Lock,
  Unlock,
  RefreshCw,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export default function ImageResizerPage() {
  const tool = TOOLS.find((t) => t.slug === 'image-resizer')!;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<number>(0);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/webp');
  const [quality, setQuality] = useState<number>(0.85);

  const [resizedBlobUrl, setResizedBlobUrl] = useState<string | null>(null);
  const [resizedSize, setResizedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    setImageFile(file);
    setOriginalSize(file.size);

    const url = URL.createObjectURL(file);
    setImageSrc(url);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
    img.src = url;
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspect && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspect && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(val * ratio));
    }
  };

  const applyPreset = (w: number, h: number) => {
    setLockAspect(false);
    setWidth(w);
    setHeight(h);
  };

  const applyPercentage = (pct: number) => {
    setWidth(Math.round((originalWidth * pct) / 100));
    setHeight(Math.round((originalHeight * pct) / 100));
  };

  // Debounced auto-resize when parameters change
  useEffect(() => {
    if (!imgRef.current || width <= 0 || height <= 0) return;

    setIsProcessing(true);
    const timer = setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (ctx && imgRef.current) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(imgRef.current, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                if (resizedBlobUrl) URL.revokeObjectURL(resizedBlobUrl);
                const url = URL.createObjectURL(blob);
                setResizedBlobUrl(url);
                setResizedSize(blob.size);
              }
              setIsProcessing(false);
            },
            format,
            format === 'image/png' ? undefined : quality
          );
        }
      } catch (err) {
        console.error(err);
        setIsProcessing(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [width, height, format, quality]);

  const getFileExtension = () => {
    if (format === 'image/jpeg') return 'jpg';
    if (format === 'image/png') return 'png';
    return 'webp';
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Image Tools', href: '/#image-tools' }, { label: tool.name }]} />

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
        {!imageSrc ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-10 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/30 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Select or Drop Your Image
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              JPG, PNG, WebP supported. Resize dimensions, convert format, and adjust compression.
            </p>
            <button
              type="button"
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              Browse Image
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Image Preview */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>Live Preview</span>
                  <span>
                    Original: {originalWidth} × {originalHeight} px ({(originalSize / 1024).toFixed(0)} KB)
                  </span>
                </div>

                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resizedBlobUrl || imageSrc}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center text-white text-xs font-semibold gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Resizing...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Output Stats & Download */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Target Size:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {width} × {height} px
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Estimated File Size:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {(resizedSize / 1024).toFixed(1)} KB
                  </span>
                </div>

                {resizedBlobUrl && (
                  <a
                    href={resizedBlobUrl}
                    download={`resized_${width}x${height}.${getFileExtension()}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resized Image</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setImageSrc(null);
                    setImageFile(null);
                    setResizedBlobUrl(null);
                  }}
                  className="w-full text-center text-xs text-slate-500 hover:text-rose-500 transition-colors"
                >
                  Choose Different Image
                </button>
              </div>
            </div>

            {/* Right Column: Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Dimensions Input */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Custom Dimensions (Pixels)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-9 gap-3 items-center">
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10000}
                      value={width || ''}
                      onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-1 flex justify-center pt-5 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => setLockAspect(!lockAspect)}
                      className={`p-2 rounded-xl border transition-colors ${
                        lockAspect
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600'
                      }`}
                      title={lockAspect ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                    >
                      {lockAspect ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10000}
                      value={height || ''}
                      onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Percentage Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Scale:</span>
                  <button
                    type="button"
                    onClick={() => applyPercentage(25)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    25%
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPercentage(50)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    50%
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPercentage(75)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    75%
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPercentage(100)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    Original (100%)
                  </button>
                </div>
              </div>

              {/* Quick Preset Dimensions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Social & Standard Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => applyPreset(1080, 1080)}
                    className="p-2.5 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-blue-500 transition-colors"
                  >
                    <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 block">Instagram Post</span>
                    <span className="text-[10px] text-slate-500 font-mono">1080 × 1080 (1:1)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset(1080, 1920)}
                    className="p-2.5 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-blue-500 transition-colors"
                  >
                    <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 block">Story / Reel</span>
                    <span className="text-[10px] text-slate-500 font-mono">1080 × 1920 (9:16)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset(1280, 720)}
                    className="p-2.5 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-blue-500 transition-colors"
                  >
                    <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 block">YouTube Thumb</span>
                    <span className="text-[10px] text-slate-500 font-mono">1280 × 720 (16:9)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset(1920, 1080)}
                    className="p-2.5 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-blue-500 transition-colors"
                  >
                    <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 block">Full HD Display</span>
                    <span className="text-[10px] text-slate-500 font-mono">1920 × 1080 (16:9)</span>
                  </button>
                </div>
              </div>

              {/* Format & Quality */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Output Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormat('image/webp')}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        format === 'image/webp'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800'
                      }`}
                    >
                      WebP (Modern/Light)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormat('image/jpeg')}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        format === 'image/jpeg'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800'
                      }`}
                    >
                      JPG (Universal)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormat('image/png')}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        format === 'image/png'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800'
                      }`}
                    >
                      PNG (Lossless)
                    </button>
                  </div>
                </div>

                {format !== 'image/png' && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>Compression Quality</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400">
                        {Math.round(quality * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.2}
                      max={1.0}
                      step={0.05}
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
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
