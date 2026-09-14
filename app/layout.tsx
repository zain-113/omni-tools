import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://omnitools.app'),
  title: {
    default: 'OmniTools - Free, Fast & 100% Private In-Browser Multi-Tools',
    template: '%s | OmniTools',
  },
  description:
    'Free high-utility online tools that run 100% client-side in your browser. Convert PDF to image, merge photos into PDF, compress PDFs, resize photos, strip EXIF GPS metadata, convert JSON to CSV, encrypt PDFs with AES-256, and text to speech.',
  keywords: [
    'pdf tools',
    'image tools',
    'client side converter',
    'pdf to image',
    'image to pdf',
    'pdf compress online',
    'image resizer',
    'strip exif metadata',
    'json to csv',
    'pdf protect password',
    'text to speech free',
    'private online tools'
  ],
  authors: [{ name: 'OmniTools Team', url: 'https://omnitools.app' }],
  creator: 'OmniTools',
  publisher: 'OmniTools',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://omnitools.app',
    siteName: 'OmniTools',
    title: 'OmniTools - Free, Fast & 100% Private In-Browser Multi-Tools',
    description: 'High-utility online tools that run entirely in your web browser. Zero server uploads, zero data retention.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniTools - 100% Private Browser Utilities',
    description: 'High-utility online tools that run entirely in your web browser. No server uploads.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OmniTools',
    url: 'https://omnitools.app',
    logo: 'https://omnitools.app/favicon.ico',
    description: 'High-utility client-side web utility platform engineered for absolute privacy, speed, and zero file retention.',
    sameAs: ['https://twitter.com/omnitools', 'https://github.com/omnitools'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OmniTools',
    url: 'https://omnitools.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://omnitools.app/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('omnitools-theme');
                  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
