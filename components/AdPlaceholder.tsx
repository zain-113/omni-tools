import React from 'react';

export type AdSlotType = 'leaderboard' | 'in-article' | 'sidebar' | 'footer';

interface AdPlaceholderProps {
  slot: AdSlotType;
  className?: string;
}

export default function AdPlaceholder({ slot, className = '' }: AdPlaceholderProps) {
  // Styles and aspect ratios according to standard Google AdSense sizes
  const config = {
    leaderboard: {
      label: 'Leaderboard Banner (728x90 / 320x100)',
      containerClass: 'min-h-[90px] sm:min-h-[90px] max-w-[728px] w-full',
      subText: 'Responsive top banner unit designed for high visibility',
    },
    'in-article': {
      label: 'In-Article Ad Unit (Responsive)',
      containerClass: 'min-h-[140px] sm:min-h-[180px] w-full max-w-2xl',
      subText: 'Contextual content ad slot optimized for reading flow',
    },
    sidebar: {
      label: 'Sidebar Display Unit (300x250)',
      containerClass: 'min-h-[250px] w-full max-w-[300px]',
      subText: 'Medium rectangle sticky sidebar placement',
    },
    footer: {
      label: 'Horizontal Footer Ad (Responsive)',
      containerClass: 'min-h-[100px] w-full max-w-4xl',
      subText: 'Bottom engagement ad unit placed above footer navigation',
    },
  }[slot];

  return (
    <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
      {/* Required AdSense Label */}
      <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400 mb-1.5 select-none">
        Advertisement
      </span>

      {/* Ad Box Container */}
      <div
        className={`${config.containerClass} mx-auto relative rounded-xl border border-dashed border-slate-300 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-900/50 p-4 flex flex-col items-center justify-center text-center transition-all duration-200 overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500/60 animate-pulse" />
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {config.label}
          </p>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 max-w-md">
          {config.subText}. Insert your Google AdSense tag (<code className="font-mono text-[10px] bg-slate-200/70 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-600 dark:text-slate-400">&lt;ins class=&quot;adsbygoogle&quot;&gt;</code>) here.
        </p>
      </div>
    </div>
  );
}
