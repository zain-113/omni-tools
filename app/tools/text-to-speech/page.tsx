'use client';

import React, { useState, useEffect, useRef } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContent from '@/components/SeoContent';
import { TOOLS } from '@/lib/tools-data';
import {
  Volume2,
  Play,
  Pause,
  Square,
  Sparkles,
  Sliders,
  RotateCcw,
  VolumeX,
  Languages,
  Mic,
  Activity
} from 'lucide-react';

const SAMPLE_TEXT = `Welcome to OmniTools. This entire web application runs directly inside your web browser using modern WebAssembly, HTML5 APIs, and client-side processing. Your documents, photos, and personal texts are never sent to a remote server, ensuring complete confidentiality and instant speed. You can adjust the playback speed, pitch, and voice tone using the controls below. Enjoy private, limitless speech synthesis!`;

export default function TextToSpeechPage() {
  const tool = TOOLS.find((t) => t.slug === 'text-to-speech')!;

  const [text, setText] = useState<string>('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);

  const [rate, setRate] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(true);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Speech Synthesis and Voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        setVoices(available);
        // Default to first English voice if available
        const defaultIndex = available.findIndex((v) => v.lang.startsWith('en'));
        setSelectedVoiceIndex(defaultIndex >= 0 ? defaultIndex : 0);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Text Stats
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const estimatedReadingTimeMin = (wordCount / (150 * rate)).toFixed(1);

  const handleSpeak = () => {
    if (!text.trim() || typeof window === 'undefined') return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (voices[selectedVoiceIndex]) {
      utterance.voice = voices[selectedVoiceIndex];
    }
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Audio & Media', href: '/#audio-tools' }, { label: tool.name }]} />

      <AdPlaceholder slot="leaderboard" className="mb-8" />

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
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
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md space-y-6">
        {!supported && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-200 text-xs">
            Your browser does not support the Web Speech API. Please use a modern browser like Google Chrome, Apple Safari, or Microsoft Edge.
          </div>
        )}

        {/* Toolbar & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setText(SAMPLE_TEXT)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Sample Text</span>
            </button>

            {text && (
              <button
                type="button"
                onClick={() => {
                  handleStop();
                  setText('');
                }}
                className="text-xs text-rose-500 hover:underline px-2"
              >
                Clear Text
              </button>
            )}
          </div>

          {/* Real-time word counter */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>{wordCount} Words</span>
            <span>•</span>
            <span>{charCount} Characters</span>
            <span>•</span>
            <span>~{estimatedReadingTimeMin} Min Read</span>
          </div>
        </div>

        {/* Text Area */}
        <div>
          <textarea
            rows={7}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste any text here to read aloud..."
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-y leading-relaxed"
          />
        </div>

        {/* Voice & Audio Customization Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          {/* Voice Selector */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-blue-500" />
              Voice Accent & Language
            </label>
            <select
              value={selectedVoiceIndex}
              onChange={(e) => setSelectedVoiceIndex(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none"
            >
              {voices.map((voice, idx) => (
                <option key={idx} value={idx}>
                  {voice.name} ({voice.lang}) {voice.default ? '— Default' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Speed / Rate */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Speed (Rate)</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">{rate.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={2.0}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Pitch */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Voice Pitch</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">{pitch.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={1.8}
              step={0.1}
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Media Player Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Play / Resume */}
            <button
              type="button"
              onClick={handleSpeak}
              disabled={!text.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isPaused ? 'Resume Speech' : isPlaying ? 'Restart Speech' : 'Speak Text'}</span>
            </button>

            {/* Pause */}
            <button
              type="button"
              onClick={handlePause}
              disabled={!isPlaying}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>

            {/* Stop */}
            <button
              type="button"
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              <Square className="w-3.5 h-3.5 fill-slate-700 dark:fill-slate-300" />
              <span>Stop</span>
            </button>
          </div>

          {/* Active Speaking Visualizer */}
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-pulse">
                <Activity className="w-3.5 h-3.5" />
                <span>Speaking Aloud...</span>
              </div>
            ) : isPaused ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                <span>Playback Paused</span>
              </div>
            ) : (
              <div className="text-xs text-slate-400">
                Ready to read aloud
              </div>
            )}
          </div>
        </div>
      </div>

      <SeoContent tool={tool} />

      <AdPlaceholder slot="footer" className="mt-12" />
    </main>
  );
}
