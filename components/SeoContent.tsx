'use client';

import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, ShieldCheck, Cpu, Lock, HelpCircle } from 'lucide-react';
import { ToolMeta } from '@/lib/tools-data';
import AdPlaceholder from './AdPlaceholder';

interface SeoContentProps {
  tool: ToolMeta;
}

export default function SeoContent({ tool }: SeoContentProps) {
  // Interactive FAQ Accordion state: first question open by default
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Structured Data Schema for FAQPage & SoftwareApplication
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    operatingSystem: 'Any (Web Browser)',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    description: tool.metaDescription,
  };

  return (
    <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
      {/* Microdata JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Section 1: How It Works (Step-by-Step) */}
      <section className="mb-14">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-sm">
            01
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            How It Works (Step-by-Step Guide)
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-3xl leading-relaxed">
          Learn how to use our free online {tool.name.toLowerCase()} in four simple, instantaneous steps. All computations run right in your browser with zero latency and zero data transfer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tool.steps.map((step) => (
            <div
              key={step.number}
              className="relative p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm mb-3">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* In-Article Ad Placement */}
      <AdPlaceholder slot="in-article" className="my-10" />

      {/* Section 2: Deep-Dive Technical Overview & Educational Copy */}
      <section className="mb-14">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 font-bold text-sm">
            02
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Comprehensive Overview & Technology
          </h2>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-4xl">
          {tool.overview.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {tool.technicalDetails && tool.technicalDetails.length > 0 && (
          <div className="mt-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Under the Hood: Engine Architecture
              </h3>
            </div>
            <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {tool.technicalDetails.map((detail, idx) => (
                <p key={idx}>{detail}</p>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Section 3: Key Features & Security Benefits (100% Client-Side / Private) */}
      <section className="mb-14">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            03
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Key Features & 100% Client-Side Privacy
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-3xl leading-relaxed">
          Why millions of privacy-conscious professionals, developers, and students rely on our in-browser technology over conventional server-based alternatives.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {tool.features.map((feat, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex items-start gap-4"
            >
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Checklist Highlight Banner */}
        <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2.5 mb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-semibold text-emerald-950 dark:text-emerald-200">
              Our Non-Negotiable Privacy Guarantees
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.securityBenefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Interactive FAQ Accordion with Schema */}
      <section className="mb-8">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 font-bold text-sm">
            04
          </span>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-3xl leading-relaxed">
          Everything you need to know about this tool, privacy practices, compatibility, and file limits.
        </p>

        <div className="space-y-3">
          {tool.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-sm font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
