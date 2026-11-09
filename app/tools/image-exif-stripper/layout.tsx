import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Remove EXIF & GPS Metadata from Images Online | OmniTools',
    description: 'Strip hidden EXIF data, camera details, and GPS location tags from JPG and PNG photos before sharing online. 100% free and private.',
    keywords: [
        'remove exif data online',
        'strip photo metadata free',
        'remove gps location from photo',
        'image exif cleaner',
        'protect image privacy'
    ],
    alternates: {
        canonical: 'https://www.omnitoolsweb.online/tools/image-exif-stripper',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}