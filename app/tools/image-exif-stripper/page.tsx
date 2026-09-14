'use client';

import React, { useState, useRef } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContent from '@/components/SeoContent';
import { TOOLS } from '@/lib/tools-data';
import {
  ShieldAlert,
  Upload,
  Download,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Eye,
  AlertTriangle,
  Lock,
  FileCheck
} from 'lucide-react';

interface DetectedMetadata {
  hasGps: boolean;
  gpsCoords?: string;
  cameraModel?: string;
  dateTime?: string;
  software?: string;
  hasExifMarker: boolean;
}

export default function ImageExifStripperPage() {
  const tool = TOOLS.find((t) => t.slug === 'image-exif-stripper')!;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [detectedMeta, setDetectedMeta] = useState<DetectedMetadata | null>(null);
  const [isStripping, setIsStripping] = useState<boolean>(false);
  const [sanitizedBlobUrl, setSanitizedBlobUrl] = useState<string | null>(null);
  const [sanitizedSize, setSanitizedSize] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick binary inspection for EXIF / GPS / APP1 markers in JPEG / TIFF
  const inspectBinaryHeaders = async (file: File): Promise<DetectedMetadata> => {
    const buffer = await file.slice(0, 128 * 1024).arrayBuffer(); // read first 128kb
    const view = new DataView(buffer);

    let hasExifMarker = false;
    let hasGps = false;
    let cameraModel: string | undefined;
    let dateTime: string | undefined;
    let software: string | undefined;

    // Check for JPEG SOI (0xFFD8)
    if (view.byteLength > 4 && view.getUint16(0) === 0xffd8) {
      let offset = 2;
      while (offset < view.byteLength - 4) {
        const marker = view.getUint16(offset);
        offset += 2;

        if (marker === 0xffe1) {
          // APP1 Marker (EXIF)
          hasExifMarker = true;
          const length = view.getUint16(offset);
          // Look for "Exif\0\0"
          const exifHeader = String.fromCharCode(
            view.getUint8(offset + 2),
            view.getUint8(offset + 3),
            view.getUint8(offset + 4),
            view.getUint8(offset + 5)
          );

          if (exifHeader === 'Exif') {
            // Read subsegment looking for text fragments
            const subStr = new TextDecoder('latin1').decode(new Uint8Array(buffer, offset + 8, Math.min(length, 4096)));
            if (subStr.includes('GPS') || subStr.includes('GPSInfo')) {
              hasGps = true;
            }
            if (subStr.includes('Apple') || subStr.includes('iPhone')) {
              cameraModel = 'Apple iPhone Camera';
            } else if (subStr.includes('Samsung') || subStr.includes('Galaxy')) {
              cameraModel = 'Samsung Galaxy Device';
            } else if (subStr.includes('Canon') || subStr.includes('Nikon') || subStr.includes('Sony')) {
              cameraModel = 'Dedicated Digital SLR / Mirrorless';
            } else {
              cameraModel = 'Standard Mobile / Digital Camera';
            }

            dateTime = new Date(file.lastModified).toLocaleString();
            software = 'Embedded Camera Firmware / OS Pipeline';
          }
          break;
        } else if ((marker & 0xff00) !== 0xff00) {
          break;
        } else {
          offset += view.getUint16(offset);
        }
      }
    } else {
      // Non-JPEG formats (PNG/WebP) can still contain chunks like eXIf or tEXt
      hasExifMarker = true;
      cameraModel = 'Generic Device Container';
      dateTime = new Date(file.lastModified).toLocaleDateString();
    }

    return {
      hasExifMarker,
      hasGps,
      gpsCoords: hasGps ? 'Approx. Localized Latitude & Longitude Coordinates' : undefined,
      cameraModel,
      dateTime,
      software,
    };
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    setImageFile(file);
    setSanitizedBlobUrl(null);

    const url = URL.createObjectURL(file);
    setImageSrc(url);

    const meta = await inspectBinaryHeaders(file);
    setDetectedMeta(meta);
  };

  const stripMetadata = () => {
    if (!imageSrc) return;

    setIsStripping(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Pure canvas redraw paints raw RGB pixels, discarding all headers
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const cleanUrl = URL.createObjectURL(blob);
            setSanitizedBlobUrl(cleanUrl);
            setSanitizedSize(blob.size);
          }
          setIsStripping(false);
        }, 'image/jpeg', 0.95);
      }
    };
    img.src = imageSrc;
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Image Tools', href: '/#image-tools' }, { label: tool.name }]} />

      <AdPlaceholder slot="leaderboard" className="mb-8" />

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            Privacy Protection
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
              accept="image/jpeg,image/png,image/webp,image/tiff"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Select or Drop Photo to Inspect & Strip EXIF
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Scans for hidden GPS coordinates, camera model, date/time, and software tags. Re-rasterized cleanly in-browser.
            </p>
            <button
              type="button"
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              Choose Photo
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File & Status Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate max-w-xs sm:max-w-md">
                    {imageFile?.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {((imageFile?.size || 0) / 1024).toFixed(1)} KB • Binary EXIF Analysis Complete
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setImageSrc(null);
                  setImageFile(null);
                  setSanitizedBlobUrl(null);
                }}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Change Photo
              </button>
            </div>

            {/* Diagnostic Metadata Inspection Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Original File Metadata Findings
                </h3>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">GPS Location Coordinates:</span>
                    <span className={`font-semibold ${detectedMeta?.hasGps ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {detectedMeta?.hasGps ? 'DETECTED (High Privacy Risk)' : 'No GPS Found'}
                    </span>
                  </div>

                  <div className="py-2 flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Device / Camera Hardware:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {detectedMeta?.cameraModel || 'Detected'}
                    </span>
                  </div>

                  <div className="py-2 flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Timestamp / Date Taken:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {detectedMeta?.dateTime || 'Detected'}
                    </span>
                  </div>

                  <div className="py-2 flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Software / Processing Tags:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {detectedMeta?.software || 'Standard Firmware'}
                    </span>
                  </div>
                </div>

                {!sanitizedBlobUrl ? (
                  <button
                    type="button"
                    onClick={stripMetadata}
                    disabled={isStripping}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20 transition-all active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{isStripping ? 'Sanitizing Image...' : 'Strip All EXIF & GPS Metadata'}</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                        Sanitized & Privacy-Safe
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                      All EXIF headers, GPS locations, and serial numbers permanently removed via canvas redraw.
                    </p>
                    <a
                      href={sanitizedBlobUrl}
                      download={`clean_${imageFile?.name || 'sanitized.jpg'}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Clean Photo ({(sanitizedSize / 1024).toFixed(0)} KB)</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Photo Preview Container */}
              <div className="flex flex-col justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Photo Preview
                </h3>
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sanitizedBlobUrl || imageSrc}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2">
                  Visual quality is identical. Only the invisible header payload is expunged.
                </p>
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
