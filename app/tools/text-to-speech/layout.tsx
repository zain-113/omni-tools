import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Text to Speech Online - Natural Voice Reader | OmniTools',
    description: 'Listen to articles, notes, and text with natural browser speech synthesis. Free, fast, and completely runs locally on your device.',
    keywords: [
        'text to speech online free',
        'free tts reader',
        'natural voice text to speech',
        'read aloud online',
        'client side text to speech'
    ],
    alternates: {
        canonical: 'https://www.omnitoolsweb.online/tools/text-to-speech',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}