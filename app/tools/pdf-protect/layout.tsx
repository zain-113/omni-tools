import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Password Protect PDF Online Free - Encrypt PDF | OmniTools',
    description: 'Secure your PDF files with strong password encryption directly in your browser. 100% private, client-side, and zero file uploads.',
    keywords: [
        'password protect pdf online free',
        'encrypt pdf file',
        'lock pdf with password',
        'client side pdf protect',
        'secure pdf free'
    ],
    alternates: {
        canonical: 'https://www.omnitoolsweb.online/tools/pdf-protect',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}