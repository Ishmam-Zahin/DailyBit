// /app/learn/java/layout.tsx
import JavaNav from '@/components/learn/java/JavaNav';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <JavaNav />
            {children}
        </>
    );
}