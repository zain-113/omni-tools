import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import { FileCheck, ShieldAlert, Scale, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - OmniTools',
  description: 'Read the Terms of Service for OmniTools. Understand your rights, acceptable use guidelines, and our client-side software disclaimer.',
};

export default function TermsOfServicePage() {
  const lastUpdated = 'September 14, 2026';

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>User Agreement & Conditions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last updated: <span className="font-medium text-slate-700 dark:text-slate-300">{lastUpdated}</span>
        </p>
      </div>

      <AdPlaceholder slot="leaderboard" className="mb-8" />

      <div className="space-y-10 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-500" />
            1. Agreement to Terms
          </h2>
          <p className="mb-3">
            Welcome to OmniTools (&quot;OmniTools,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of the OmniTools website, utilities, applications, and services (collectively, the &quot;Services&quot;).
          </p>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to all terms and conditions, you must immediately discontinue use of the Services.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            2. License & Service Provision
          </h2>
          <p className="mb-3">
            OmniTools grants you a personal, worldwide, royalty-free, non-assignable, and non-exclusive license to use the client-side software provided to you on the Services. This license is for the sole purpose of enabling you to use and enjoy the benefit of the utilities as provided by OmniTools, in the manner permitted by these Terms.
          </p>
          <p>
            Our tools are offered completely free of charge. We do not require account registration or credit card authorizations. We reserve the right to modify, update, or discontinue tools at any time without prior notice.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            3. Acceptable Use Policy
          </h2>
          <p className="mb-3 text-xs">
            You agree to use our Services solely for lawful purposes. You shall not use OmniTools to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-600 dark:text-slate-400">
            <li>Process, encrypt, or manipulate documents or media that infringe upon copyright, trademark, patent, or other proprietary rights of any party.</li>
            <li>Attempt to reverse-engineer, decompile, or compromise security mechanisms of the Services.</li>
            <li>Deploy automated scripts, bots, or scrapers that place unreasonable strain on our hosting infrastructure.</li>
            <li>Circumvent or tamper with advertisement delivery systems, headers, or CSS display rules.</li>
            <li>Distribute malware, trojans, viruses, or malicious payloads embedded within files.</li>
          </ul>
        </section>

        <AdPlaceholder slot="in-article" />

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            4. Client-Side Execution & User Data Ownership
          </h2>
          <p className="mb-3">
            You retain 100% ownership and intellectual property rights over all files, images, documents, text, and data you process using OmniTools. Because our Services operate directly in your browser&apos;s runtime environment without transmitting file contents to our servers:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-600 dark:text-slate-400">
            <li>We do not claim any copyright, ownership, or license to your inputs or outputs.</li>
            <li>You are solely responsible for backing up your files prior to processing.</li>
            <li>You bear full responsibility for the legality and confidentiality of the content you process.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            5. Disclaimer of Warranties
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE ERROR-FREE, UNINTERRUPTED, OR FREE OF DEFECTS, OR THAT CONVERSIONS, COMPRESSION RATIOS, OR ENCRYPTION ROUTINES WILL MEET YOUR SPECIFIC EXPECTATIONS.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            6. Limitation of Liability
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL OMNITOOLS, ITS OPERATORS, DIRECTORS, OR CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OR INABILITY TO USE THE SERVICES.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            7. Advertisements & Third-Party Links
          </h2>
          <p>
            The Services may display third-party advertisements served by Google AdSense and contain links to external third-party websites. OmniTools does not endorse, guarantee, or assume responsibility for any products, services, or content offered by advertisers or third parties. Any interaction you have with advertisers is solely between you and the advertiser.
          </p>
        </section>

        {/* Section 8 */}
        <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            8. Contact & Legal Inquiries
          </h2>
          <p className="mb-2">
            For questions or formal legal notices regarding these Terms, please contact:
          </p>
          <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
            <p><strong>OmniTools Legal Department</strong></p>
            <p>Email: <span className="text-blue-600 dark:text-blue-400 font-mono">omnitoolsofficial@gmail.com</span></p>
            <p>General Support: <span className="text-blue-600 dark:text-blue-400 font-mono">omnitoolsofficial@gmail.com</span></p>
          </div>
        </section>
      </div>
    </main>
  );
}
