import React from 'react';
import Link from 'next/link';
import { ToolMeta } from '@/lib/tools-data';
import {
  FileImage,
  FilePlus,
  Minimize2,
  Maximize,
  ShieldAlert,
  Table,
  Lock,
  Volume2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ToolCardProps {
  tool: ToolMeta;
}

export default function ToolCard({ tool }: ToolCardProps) {
  // Map icon name to Lucide component
  const getIcon = () => {
    switch (tool.icon) {
      case 'FileImage':
        return <FileImage className="w-6 h-6 text-blue-500" />;
      case 'FilePlus':
        return <FilePlus className="w-6 h-6 text-indigo-500" />;
      case 'Minimize2':
        return <Minimize2 className="w-6 h-6 text-emerald-500" />;
      case 'Maximize':
        return <Maximize className="w-6 h-6 text-purple-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-rose-500" />;
      case 'Table':
        return <Table className="w-6 h-6 text-amber-500" />;
      case 'Lock':
        return <Lock className="w-6 h-6 text-cyan-500" />;
      case 'Volume2':
        return <Volume2 className="w-6 h-6 text-pink-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-500" />;
    }
  };

  const getTagBadge = () => {
    if (tool.tag === 'Popular') {
      return (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
          Popular
        </span>
      );
    }
    if (tool.tag === 'Privacy') {
      return (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
          Privacy First
        </span>
      );
    }
    if (tool.tag === 'New') {
      return (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60">
          New
        </span>
      );
    }
    return null;
  };

  return (
    <Link
      href={tool.path}
      className="group relative flex flex-col justify-between p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-500/80 dark:hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-200 overflow-hidden"
    >
      <div>
        {/* Top Icon & Tag */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 transition-all duration-200">
            {getIcon()}
          </div>
          <div className="flex items-center gap-1.5">
            {getTagBadge()}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {tool.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mb-6">
          {tool.shortDescription}
        </p>
      </div>

      {/* Card Footer Link */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
        <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
          {tool.category}
        </span>
        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
          <span>Open Tool</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
