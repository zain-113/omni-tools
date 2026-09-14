import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Shield, Lock, Eye, Cookie, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - OmniTools',
  description: 'Learn how OmniTools protects your privacy with 100% client-side document processing, cookie disclosures, and Google AdSense compliance.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 14, 2026';

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal Documentation & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last updated: <span className="font-medium text-slate-700 dark:text-slate-300">{lastUpdated}</span>
        </p>
      </div>

      {/* AdSense Leaderboard Unit */}
      <AdPlaceholder slot="leaderboard" className="mb-8" />

      {/* Core Privacy Architecture Callout */}
      <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 mb-10">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-emerald-950 dark:text-emerald-200 mb-1.5">
              100% Client-Side Processing: Zero File Retention Guarantee
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Every tool offered on OmniTools (including PDF converters, image resizers, EXIF strippers, speech synthesis, and encryption) operates entirely within your local web browser sandbox using client-side JavaScript, WebAssembly, and the HTML5 Canvas API. We do not transmit, upload, inspect, or store your documents, photos, audio, or text inputs on any remote web servers.
            </p>
          </div>
        </div>
      </div>

      {/* Structured Legal Content */}
      <div className="space-y-10 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            1. Introduction & Overview
          </h2>
          <p className="mb-3">
            At OmniTools (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), your privacy is our primary engineering principle. This Privacy Policy details how we handle information when you visit our website (the &quot;Site&quot;) and use our suite of browser-based utilities.
          </p>
          <p>
            By accessing or using OmniTools, you acknowledge the terms outlined in this Privacy Policy. If you have questions or concerns regarding our practices, please contact our privacy compliance team via our contact form or at <span className="font-mono text-xs text-blue-600 dark:text-blue-400">privacy@omnitools.app</span>.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-500" />
            2. Data We Do NOT Collect
          </h2>
          <p className="mb-3">
            Because our architecture relies solely on client-side code execution:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-600 dark:text-slate-400">
            <li><strong>No File Uploads:</strong> We never upload your PDF files, pictures, images, JSON files, or password inputs to our servers.</li>
            <li><strong>No Content Inspection:</strong> We cannot read, scan, or analyze the contents of files you convert or compress.</li>
            <li><strong>No User Account Tracking:</strong> We do not require you to create an account, register your email, or provide payment details to access any tool.</li>
            <li><strong>No Data Brokering:</strong> We never sell, trade, or lease user data to third-party data aggregators.</li>
          </ul>
        </section>

        {/* Section 3: AdSense & Cookies (Critical for AdSense approval) */}
        <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-amber-500" />
            3. Google AdSense & Third-Party Advertising Disclosures
          </h2>
          <p className="mb-3 text-xs leading-relaxed">
            OmniTools uses Google AdSense and affiliated advertising networks to serve advertisements when you visit our website. These third-party vendors use cookies, web beacons, and similar tracking technologies to serve ads based on your prior visits to this website and other websites across the internet.
          </p>

          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <h3 className="font-semibold text-slate-900 dark:text-slate-200 mb-1">
                Google DART Cookie & Personalized Advertising
              </h3>
              <p>
                Google’s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline font-medium"
                >
                  Google Ads Settings
                </a>
                .
              </p>
            </div>

            <p>
              Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline font-medium"
              >
                www.aboutads.info
              </a>{' '}
              or the Network Advertising Initiative (NAI) opt-out page at{' '}
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline font-medium"
              >
                optout.networkadvertising.org
              </a>.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            4. Web Analytics & Log Data
          </h2>
          <p className="mb-3">
            Like most modern web operators, we collect basic, non-personally identifiable diagnostic information automatically transmitted by your browser. This includes:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-600 dark:text-slate-400">
            <li>Browser type and version (e.g., Chrome, Safari, Firefox)</li>
            <li>Operating system (e.g., Windows, macOS, Android, iOS)</li>
            <li>Referring website and pages visited on OmniTools</li>
            <li>Timestamp of requests and anonymous network latency metrics</li>
          </ul>
          <p className="mt-3">
            This technical telemetry is used exclusively to optimize page loading performance, debug browser compatibility issues, and prevent malicious bot abuse.
          </p>
        </section>

        {/* In-Article Ad Unit */}
        <AdPlaceholder slot="in-article" />

        {/* Section 5 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            5. GDPR Compliance (European Economic Area Users)
          </h2>
          <p className="mb-3">
            If you reside in the European Economic Area (EEA), you are entitled to specific rights under the General Data Protection Regulation (GDPR), including:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-600 dark:text-slate-400">
            <li><strong>Right of Access:</strong> You can request confirmation of whether we hold personal data concerning you.</li>
            <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You can request deletion of any personal data we may hold (such as direct contact correspondence).</li>
            <li><strong>Right to Restrict Processing:</strong> You can object to the processing of personal information.</li>
          </ul>
          <p className="mt-3 text-xs">
            Because we do not store your processed documents or create user accounts, we maintain virtually zero persistent personal records. To exercise any data rights regarding correspondence, please email <span className="font-mono text-blue-600 dark:text-blue-400">dpo@omnitools.app</span>.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            6. California Consumer Privacy Act (CCPA / CPRA)
          </h2>
          <p className="mb-3">
            Under the California Consumer Privacy Act (CCPA) as amended by the CPRA, California residents have the right to know what personal information is collected, disclosed, or sold.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            OmniTools does not sell your personal information. We do not collect sensitive personal identifiers, biometric data, geolocation records, or customer financial records.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            7. Changes to This Privacy Policy
          </h2>
          <p>
            We may periodically revise this policy to reflect changes in legal regulations, ad network guidelines, or newly added tools. When changes occur, we will update the &quot;Last updated&quot; date at the top of this page. We encourage you to review this page periodically.
          </p>
        </section>

        {/* Section 8 */}
        <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            8. Contact Information
          </h2>
          <p className="mb-2">
            If you have questions regarding this Privacy Policy or our security measures, please reach out to us:
          </p>
          <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
            <p><strong>OmniTools Compliance Office</strong></p>
            <p>Email: <span className="text-blue-600 dark:text-blue-400 font-mono">privacy@omnitools.app</span></p>
            <p>Support Inquiries: <span className="text-blue-600 dark:text-blue-400 font-mono">support@omnitools.app</span></p>
            <p>Website: <span className="font-mono">https://omnitools.app</span></p>
          </div>
        </section>
      </div>
    </main>
  );
}
