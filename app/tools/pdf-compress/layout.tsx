import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compress PDF Online Free - Reduce PDF File Size | OmniTools',
    description: 'Reduce PDF file size locally in your browser without uploading to any server. Fast, free, and private client-side compression.',
    keywords: [
        'compress pdf online free',
        'reduce pdf file size',
        'client side pdf compressor',
        'compress pdf without uploading',
        'free pdf reducer'
    ],
    alternates: {
        canonical: 'https://www.omnitoolsweb.online/tools/pdf-compress',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}