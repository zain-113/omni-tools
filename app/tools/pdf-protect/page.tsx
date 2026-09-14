'use client';

import React, { useState, useRef } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContent from '@/components/SeoContent';
import { TOOLS } from '@/lib/tools-data';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt';
import {
  Lock,
  Unlock,
  Upload,
  Download,
  Eye,
  EyeOff,
  Shield,
  CheckCircle2,
  AlertCircle,
  FileText,
  Key,
  Settings2
} from 'lucide-react';

export default function PdfProtectPage() {
  const tool = TOOLS.find((t) => t.slug === 'pdf-protect')!;

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>('');
  const [ownerPassword, setOwnerPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<'AES-256' | 'RC4'>('AES-256');

  // Permissions
  const [allowPrinting, setAllowPrinting] = useState<boolean>(true);
  const [allowCopying, setAllowCopying] = useState<boolean>(false);
  const [allowFillingForms, setAllowFillingForms] = useState<boolean>(true);

  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
  const [protectedBlobUrl, setProtectedBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('Please choose a valid PDF file (.pdf).');
      return;
    }

    setError(null);
    setPdfFile(file);
    setProtectedBlobUrl(null);
  };

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: 'Empty', score: 0, color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { label: 'Weak', score: 1, color: 'bg-rose-500' };
    if (score <= 3) return { label: 'Moderate', score: 2, color: 'bg-amber-500' };
    return { label: 'Strong (High Security)', score: 3, color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleEncrypt = async () => {
    if (!pdfFile) {
      setError('Please select a PDF file first.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter a password to protect your PDF.');
      return;
    }

    setIsEncrypting(true);
    setError(null);
    setProtectedBlobUrl(null);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const inputBytes = new Uint8Array(arrayBuffer);

      const encryptedBytes = await encryptPDF(inputBytes, password, {
        ownerPassword: ownerPassword.trim() || undefined,
        algorithm,
        allowPrinting,
        allowCopying,
        allowFillingForms,
      });

      const blob = new Blob([new Uint8Array(encryptedBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setProtectedBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      if (err.name === 'AlreadyEncryptedError') {
        setError('This PDF is already encrypted with an existing password.');
      } else {
        setError(err.message || 'Encryption failed. Please verify your settings.');
      }
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'PDF Tools', href: '/#pdf-tools' }, { label: tool.name }]} />

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
        {!pdfFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-10 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/30 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Select or Drop PDF to Password-Protect
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Cryptographically secure AES-256 encryption applied directly inside your browser. Your document and password never touch our servers.
            </p>
            <button
              type="button"
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              Choose PDF
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate max-w-xs sm:max-w-md">
                    {pdfFile.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for In-Browser Encryption
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPdfFile(null);
                  setProtectedBlobUrl(null);
                  setPassword('');
                }}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Change File
              </button>
            </div>

            {/* Password & Security Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Passwords Column */}
              <div className="space-y-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    User Password (Required to Open) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter strong password..."
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password strength meter */}
                  {password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                        <span>Password Strength</span>
                        <span className="font-semibold">{strength.label}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${(strength.score / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Owner Password (Optional / Admin Rights)
                  </label>
                  <input
                    type="password"
                    value={ownerPassword}
                    onChange={(e) => setOwnerPassword(e.target.value)}
                    placeholder="Optional master password for permissions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Used to override permission restrictions later in Adobe Acrobat.
                  </p>
                </div>
              </div>

              {/* Encryption Algorithm & Permissions */}
              <div className="space-y-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Encryption Standard
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAlgorithm('AES-256')}
                      className={`p-2 text-left rounded-xl border transition-all ${
                        algorithm === 'AES-256'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="block font-bold text-xs">AES-256 (Military)</span>
                      <span className="text-[10px] opacity-80">Highest security standard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAlgorithm('RC4')}
                      className={`p-2 text-left rounded-xl border transition-all ${
                        algorithm === 'RC4'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="block font-bold text-xs">RC4 (128-bit)</span>
                      <span className="text-[10px] opacity-80">Legacy reader compatibility</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Recipient Permissions
                  </label>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={allowPrinting}
                        onChange={(e) => setAllowPrinting(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600"
                      />
                      <span className="text-slate-700 dark:text-slate-300">Allow Printing Document</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={allowCopying}
                        onChange={(e) => setAllowCopying(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600"
                      />
                      <span className="text-slate-700 dark:text-slate-300">Allow Copying Text & Images</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={allowFillingForms}
                        onChange={(e) => setAllowFillingForms(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600"
                      />
                      <span className="text-slate-700 dark:text-slate-300">Allow Filling Form Fields</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Encrypt Action / Download */}
            {!protectedBlobUrl ? (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleEncrypt}
                  disabled={isEncrypting || !password}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-95"
                >
                  <Shield className="w-4 h-4" />
                  <span>{isEncrypting ? 'Encrypting PDF...' : 'Encrypt & Protect PDF'}</span>
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      PDF Successfully Encrypted!
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Protected with {algorithm} encryption. A password prompt will appear when opening this document.
                  </p>
                </div>

                <a
                  href={protectedBlobUrl}
                  download={`protected_${pdfFile.name}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Encrypted PDF</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <SeoContent tool={tool} />

      <AdPlaceholder slot="footer" className="mt-12" />
    </main>
  );
}
