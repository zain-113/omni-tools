'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Wrench, Menu, X, FileText, Image as ImageIcon, Database, Headphones } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <Wrench className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                OmniTools
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              100% In-Browser Privacy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link
            href="/#pdf-tools"
            className="px-3 py-1.5 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-rose-500" />
            PDF
          </Link>
          <Link
            href="/#image-tools"
            className="px-3 py-1.5 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5"
          >
            <ImageIcon className="w-4 h-4 text-emerald-500" />
            Images
          </Link>
          <Link
            href="/#data-tools"
            className="px-3 py-1.5 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5"
          >
            <Database className="w-4 h-4 text-amber-500" />
            Data
          </Link>
          <Link
            href="/#audio-tools"
            className="px-3 py-1.5 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5"
          >
            <Headphones className="w-4 h-4 text-indigo-500" />
            Audio
          </Link>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-1" />
          <Link
            href="/about"
            className="px-3 py-1.5 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-3 py-1.5 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/tools/pdf-to-image"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all duration-150 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Tool</span>
          </Link>

          <ThemeToggle />

          {/* Mobile menu hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-5 space-y-2">
          <Link
            href="/#pdf-tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            PDF Tools
          </Link>
          <Link
            href="/#image-tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Image Tools
          </Link>
          <Link
            href="/#data-tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Data & Dev Tools
          </Link>
          <Link
            href="/#audio-tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Audio & Speech
          </Link>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-4 text-xs font-medium text-slate-500">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">
              About Us
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">
              Contact
            </Link>
            <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">
              Privacy
            </Link>
            <Link href="/terms-of-service" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">
              Terms
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
