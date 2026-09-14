'use client';

import React, { useState, useMemo } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContent from '@/components/SeoContent';
import { TOOLS } from '@/lib/tools-data';
import {
  Table,
  Upload,
  Download,
  Copy,
  Check,
  FileCode,
  Sparkles,
  AlertCircle,
  FileSpreadsheet,
  Search
} from 'lucide-react';

const SAMPLE_JSON = `[
  {
    "id": "ORD-1049",
    "customer": {
      "name": "Sarah Jenkins",
      "email": "sarah.j@example.com",
      "country": "United States"
    },
    "product": "Enterprise Cloud Suite",
    "amount": 299.00,
    "status": "Completed",
    "date": "2026-09-12"
  },
  {
    "id": "ORD-1050",
    "customer": {
      "name": "Liam Davies",
      "email": "liam.d@example.co.uk",
      "country": "United Kingdom"
    },
    "product": "Developer Seat (Annual)",
    "amount": 149.50,
    "status": "Pending",
    "date": "2026-09-13"
  },
  {
    "id": "ORD-1051",
    "customer": {
      "name": "Mei Lin",
      "email": "mei.lin@example.sg",
      "country": "Singapore"
    },
    "product": "API High-Usage Pack",
    "amount": 540.00,
    "status": "Completed",
    "date": "2026-09-14"
  }
]`;

// Recursive object flattener
function flattenObject(ob: Record<string, any>, prefix = ''): Record<string, any> {
  const toReturn: Record<string, any> = {};
  for (const i in ob) {
    if (!Object.prototype.hasOwnProperty.call(ob, i)) continue;

    if (typeof ob[i] === 'object' && ob[i] !== null && !Array.isArray(ob[i])) {
      const flatObject = flattenObject(ob[i], prefix + i + '.');
      for (const x in flatObject) {
        if (!Object.prototype.hasOwnProperty.call(flatObject, x)) continue;
        toReturn[x] = flatObject[x];
      }
    } else {
      toReturn[prefix + i] = Array.isArray(ob[i]) ? JSON.stringify(ob[i]) : ob[i];
    }
  }
  return toReturn;
}

export default function JsonToCsvPage() {
  const tool = TOOLS.find((t) => t.slug === 'json-to-csv')!;

  const [jsonInput, setJsonInput] = useState<string>('');
  const [flatten, setFlatten] = useState<boolean>(true);
  const [delimiter, setDelimiter] = useState<string>(',');
  const [copied, setCopied] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Parse JSON and compute columns and rows
  const parsedData = useMemo(() => {
    if (!jsonInput.trim()) return { rows: [], headers: [], error: null };

    try {
      let data = JSON.parse(jsonInput);
      if (!Array.isArray(data)) {
        if (typeof data === 'object' && data !== null) {
          data = [data]; // wrap single object
        } else {
          return { rows: [], headers: [], error: 'Input must be a JSON array of objects or an object.' };
        }
      }

      // Process rows
      const processedRows: Record<string, any>[] = (data as any[]).map((item: any) => {
        if (typeof item !== 'object' || item === null) return { value: item };
        return flatten ? flattenObject(item) : item;
      });

      // Extract all unique headers across all objects
      const headerSet = new Set<string>();
      processedRows.forEach((row: Record<string, any>) => {
        Object.keys(row).forEach((k) => headerSet.add(k));
      });

      const headers = Array.from(headerSet);
      return { rows: processedRows, headers, error: null };
    } catch (err: any) {
      return { rows: [], headers: [], error: err.message || 'Invalid JSON syntax' };
    }
  }, [jsonInput, flatten]);

  // Convert to CSV String (RFC 4180 compliant)
  const csvOutput = useMemo(() => {
    if (parsedData.headers.length === 0 || parsedData.rows.length === 0) return '';

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      if (str.includes(delimiter) || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headerLine = parsedData.headers.map(escapeCsv).join(delimiter);
    const rowLines = parsedData.rows.map((row: Record<string, any>) =>
      parsedData.headers.map((h) => escapeCsv(row[h] !== undefined ? row[h] : '')).join(delimiter)
    );

    return [headerLine, ...rowLines].join('\n');
  }, [parsedData, delimiter]);

  // Filtered rows for live preview
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return parsedData.rows;
    const term = searchTerm.toLowerCase();
    return parsedData.rows.filter((row: Record<string, any>) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(term))
    );
  }, [parsedData.rows, searchTerm]);

  const handleCopy = () => {
    if (!csvOutput) return;
    navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!csvOutput) return;
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted_data.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setJsonInput(event.target?.result as string || '');
    };
    reader.readAsText(file);
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Data & Dev', href: '/#data-tools' }, { label: tool.name }]} />

      <AdPlaceholder slot="leaderboard" className="mb-8" />

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-semibold">
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

      {/* Main Interactive Workspace */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md space-y-6">
        {/* Top Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setJsonInput(SAMPLE_JSON)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Sample JSON</span>
            </button>

            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload .json</span>
              <input type="file" accept=".json,application/json" onChange={handleFileUpload} className="hidden" />
            </label>

            {jsonInput && (
              <button
                type="button"
                onClick={() => setJsonInput('')}
                className="text-xs text-rose-500 hover:underline px-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={flatten}
                onChange={(e) => setFlatten(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Flatten Nested Keys</span>
            </label>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400">Delimiter:</span>
              <select
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="&#9;">Tab (\t)</option>
              </select>
            </div>
          </div>
        </div>

        {/* JSON Editor Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            JSON Array Input
          </label>
          <textarea
            rows={8}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Paste your JSON array here (e.g. [{"id": 1, "name": "Alice"}]) or click "Load Sample JSON"...'
            className="w-full p-4 font-mono text-xs rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none resize-y"
          />
        </div>

        {/* Parse Error */}
        {parsedData.error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{parsedData.error}</span>
          </div>
        )}

        {/* Live Tabular Preview */}
        {parsedData.rows.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Tabular Preview ({parsedData.rows.length} rows, {parsedData.headers.length} columns)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search table..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy CSV'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .CSV</span>
                </button>
              </div>
            </div>

            {/* Scrollable Table View */}
            <div className="max-h-80 overflow-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2.5 font-semibold text-slate-400 w-12 text-center">#</th>
                    {parsedData.headers.map((h) => (
                      <th key={h} className="p-2.5 font-semibold font-mono whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-900/60 font-mono">
                  {filteredRows.map((row: Record<string, any>, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-2.5 text-center text-slate-400 text-[10px]">{idx + 1}</td>
                      {parsedData.headers.map((h) => (
                        <td key={h} className="p-2.5 whitespace-nowrap max-w-xs truncate text-slate-700 dark:text-slate-300">
                          {row[h] !== undefined ? String(row[h]) : <span className="text-slate-400">null</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <SeoContent tool={tool} />

      <AdPlaceholder slot="footer" className="mt-12" />
    </main>
  );
}
