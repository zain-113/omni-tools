import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import { ShieldCheck, Zap, Code, Award, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - OmniTools',
  description: 'Learn about the mission, engineering philosophy, and privacy-first architecture behind OmniTools. Free, high-speed, 100% client-side utilities.',
};

export default function AboutPage() {
  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Mission & Technology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
          Building the Future of Private, In-Browser Utilities
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          OmniTools was founded on a simple premise: everyday digital file conversions should never force you to sacrifice your personal privacy or pay exorbitant subscription fees.
        </p>
      </div>

      <AdPlaceholder slot="leaderboard" className="mb-12" />

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            100% Privacy by Design
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            By shifting execution entirely to client-side WebAssembly, HTML5 Canvas, and Web Crypto, your files never touch an external server. You retain complete custody of your data.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            Zero Upload Latency
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Eliminating network uploads means your documents convert instantaneously. Process 50-page reports or large batches in seconds without waiting in server queues.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            Accessible & Free
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            No accounts, no software installation, no credit cards, and no daily quota traps. We sustain our infrastructure through non-intrusive advertisements.
          </p>
        </div>
      </div>

      {/* Story & Philosophy */}
      <div className="space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-14">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Why We Built OmniTools
          </h2>
          <p className="mb-3">
            For years, the online utility landscape was plagued by a troubling model: basic utilities—like converting a photo to a PDF, removing EXIF metadata, or shrinking a file size—were dominated by sites that required uploading confidential files to remote servers in unknown jurisdictions.
          </p>
          <p>
            This traditional cloud-processing model creates tremendous cybersecurity liabilities. High-profile data breaches have repeatedly shown that files uploaded to &quot;free converter&quot; websites often linger on cloud storage buckets indefinitely, vulnerable to indexing, theft, or data harvesting. We believed there had to be a fundamentally better approach.
          </p>
        </section>

        <AdPlaceholder slot="in-article" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            The Client-Side Revolution
          </h2>
          <p className="mb-3">
            Modern web browsers are no longer just document viewers; they are high-performance virtual operating environments. With advances in WebAssembly, TypedArrays, the Web Crypto API, and multi-threaded Web Workers, today&apos;s browser can perform heavy cryptographic and image processing operations faster than a remote server.
          </p>
          <p>
            By designing every tool to run exclusively within the local browser sandbox, OmniTools achieves three breakthroughs:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs block mb-1">Absolute Privacy</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Zero bytes of file payload ever leave your device. Compliant with HIPAA, GDPR, and enterprise confidentiality.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs block mb-1">Eco-Friendly Compute</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Distributing computation avoids power-hungry data center server farms, lowering the global carbon footprint.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs block mb-1">Limitless Scalability</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Whether 100 people or 1,000,000 people use the site simultaneously, there are no server queues or downtime.</p>
            </div>
          </div>
        </section>

        {/* Technology Highlights */}
        <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Our Open Technology Stack
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            We proudly build on rock-solid, audited open-source foundations:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-medium text-slate-700 dark:text-slate-200">
              Next.js & React
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-medium text-slate-700 dark:text-slate-200">
              Mozilla PDF.js
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-medium text-slate-700 dark:text-slate-200">
              pdf-lib Engine
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-medium text-slate-700 dark:text-slate-200">
              Web Crypto API
            </div>
          </div>
        </section>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white text-center shadow-lg shadow-blue-500/20">
        <h2 className="text-2xl font-extrabold mb-2">Ready to Experience Private Utilities?</h2>
        <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto mb-6">
          Explore our suite of 8 high-performance tools and start converting, resizing, and protecting your documents today.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <span>Browse All Tools</span>
        </Link>
      </div>
    </main>
  );
}
