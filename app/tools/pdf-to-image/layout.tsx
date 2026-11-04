import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free PDF to Image Converter Online - 100% Private & Fast',
    description: 'Convert PDF pages to high-quality JPG or PNG images in your browser without uploading to any server. Free, unlimited, and fully private.',
    keywords: [
        'convert pdf to image free',
        'pdf to jpg converter online',
        'client side pdf to image',
        'private pdf converter',
        'pdf to image converter free'
    ],
    alternates: {
        canonical: 'https://www.omnitoolsweb.online/tools/pdf-to-image',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}