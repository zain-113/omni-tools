import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Wrench, Lock, Zap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors mt-auto">
      {/* Privacy Promise Banner */}
      <div className="border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  100% Client-Side Privacy
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Files are processed in your browser. Never uploaded to servers.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Zero Queues & Ultra Fast
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instant execution powered by WebAssembly & modern HTML5 Canvas.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Completely Free Forever
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No sign-ups, no subscription tiers, and no hidden file paywalls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                OmniTools
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              The high-utility online tool suite engineered for privacy, speed, and simplicity. We empower professionals, students, and developers to convert, compress, and manipulate digital assets entirely within their browser without giving away their data.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Advertising Disclosure:</span>{' '}
              OmniTools displays non-intrusive advertisements to cover hosting, maintenance, and ongoing development costs so that our tools remain 100% free for everyone.
            </div>
          </div>

          {/* Column 1: PDF Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              PDF Utilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/tools/pdf-to-image" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  PDF to Image Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/image-to-pdf" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Image to PDF Combiner
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-compress" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Client-Side PDF Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-protect" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  PDF Password Protect (AES-256)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Image & Data Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              Image & Media Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/tools/image-resizer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Smart Image Resizer
                </Link>
              </li>
              <li>
                <Link href="/tools/image-exif-stripper" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  EXIF & GPS Stripper
                </Link>
              </li>
              <li>
                <Link href="/tools/json-to-csv" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  JSON to CSV Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/text-to-speech" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Natural Text to Speech Reader
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Essential Legal Pages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} OmniTools. All rights reserved. 100% In-Browser Computation.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
