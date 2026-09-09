// /app/learn/layout.tsx
import MainHeader from '@/components/MainHeader';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <MainHeader />

            <main className="grid h-[calc(100vh-6rem)] grid-cols-[180px_1fr] grid-rows-[1fr] overflow-hidden">
                {children}
            </main>
        </>
    );
}