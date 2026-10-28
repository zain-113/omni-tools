import AdBanner300 from '@/components/AdBanner300';

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            {/* Har tool ke theek neeche ad render hoga */}
            <AdBanner300 />
        </>
    );
}