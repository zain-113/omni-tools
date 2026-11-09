import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Smart Image Resizer Online - Resize Photos Free | OmniTools',
    description: 'Resize image dimensions and optimize image files directly in your browser. Fast, free, and 100% private.',
    keywords: [
        'resize image online free',
        'photo resizer tool',
        'change image dimensions',
        'client side image resizer',
        'free image optimizer'
    ],
    alternates: {
        canonical: 'https://www.omnitoolsweb.online/tools/image-resizer',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}