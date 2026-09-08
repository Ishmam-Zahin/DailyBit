import MainHeader from '@/components/MainHeader';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <MainHeader />

            <main className="grid h-[calc(100vh-9rem)] grid-cols-[20rem_1fr] overflow-hidden">
                {children}
            </main>
        </>
    );
}