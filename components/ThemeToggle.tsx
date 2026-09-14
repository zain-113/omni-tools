'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('omnitools-theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('omnitools-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('omnitools-theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 animate-pulse" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 transition-transform duration-200 hover:-rotate-12 text-slate-700" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-200 hover:rotate-45 text-amber-400" />
      )}
    </button>
  );
}
