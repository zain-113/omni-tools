import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Image to PDF Converter Online - 100% Private | OmniTools',
    description: 'Convert JPG, PNG, and WebP images into a single PDF document in your browser. Fast, free, and completely secure.',
    keywords: [
        'image to pdf converter',
        'convert jpg to pdf online',
        'png to pdf free',
        'client side image to pdf',
        'combine images to pdf'
    ],
    alternates: {
        canonical: 'https://www.omnitoolsweb.online/tools/image-to-pdf',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}