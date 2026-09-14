'use client';

import React, { useState, useMemo } from 'react';
import ToolCard from '@/components/ToolCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { TOOLS } from '@/lib/tools-data';
import {
  Search,
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  FileText,
  Image as ImageIcon,
  Database,
  Headphones
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Tools', count: 8 },
  { id: 'PDF Tools', label: 'PDF Utilities', icon: FileText, count: 4 },
  { id: 'Image Tools', label: 'Image Tools', icon: ImageIcon, count: 2 },
  { id: 'Data & Dev', label: 'Data & Dev', icon: Database, count: 1 },
  { id: 'Audio & Media', label: 'Audio & Speech', icon: Headphones, count: 1 },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter tools based on query and category
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
        tool.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
        {/* Glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>100% Private In-Browser Computing • No Server Uploads</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
            High-Utility Online Tools{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Engineered for Privacy
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Convert, compress, and secure your files directly in your web browser. Free forever, zero file size limits, and 100% confidential.
          </p>

          {/* Live Search Bar */}
          <div className="max-w-xl mx-auto relative mb-6">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools by name, action (e.g. compress, convert, resize)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm shadow-lg shadow-slate-200/50 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all backdrop-blur-md"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-105'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Leaderboard Ad Unit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AdPlaceholder slot="leaderboard" />
      </div>

      {/* Tools Grid Section */}
      <section id="tools-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Available Web Utilities
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} matching your criteria
            </p>
          </div>

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Cards Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              No matching tools found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              We couldn&apos;t find any tool matching &quot;{searchQuery}&quot;. Try searching for &quot;PDF&quot;, &quot;image&quot;, or &quot;convert&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Show All Tools
            </button>
          </div>
        )}
      </section>

      {/* Category Anchors for direct header navigation */}
      <div id="pdf-tools" className="h-0 -mt-16" />
      <div id="image-tools" className="h-0 -mt-16" />
      <div id="data-tools" className="h-0 -mt-16" />
      <div id="audio-tools" className="h-0 -mt-16" />

      {/* In-article Ad Placement */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdPlaceholder slot="in-article" />
      </div>

      {/* Why 100% Client-Side Architecture Section */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
              Why In-Browser Computation Beats the Cloud
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Traditional web converters force you to upload confidential records to unknown cloud servers. OmniTools flips this paradigm completely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                Absolute Data Privacy
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your tax filings, contracts, passport scans, and family photos are read into local RAM memory and never leave your computer. Full compliance with GDPR and HIPAA confidentiality guidelines.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                Blazing Fast Execution
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No uploading 50MB files through slow home connections or waiting in server queues. Processing utilizes your device’s GPU and multi-core CPU with WebAssembly speed.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                Zero Size Caps & Free
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Because there are zero cloud storage costs, we don&apos;t artificially limit file sizes, cap conversions per day, or hold your downloads hostage behind subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdPlaceholder slot="footer" />
      </div>
    </main>
  );
}
