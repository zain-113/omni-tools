import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'JSON to CSV Converter Online - Fast & Free | OmniTools',
    description: 'Convert JSON data or nested JSON files to CSV format instantly in your browser. Clean, private, and handles large files locally.',
    keywords: [
        'json to csv converter online',
        'convert json to csv free',
        'json table converter',
        'browser json to csv',
        'export json as csv'
    ],
    alternates: {
        canonical: 'https://www.omnitoolsweb.online/tools/json-to-csv',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}