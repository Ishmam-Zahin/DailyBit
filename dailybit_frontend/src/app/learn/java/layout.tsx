import JavaNav from '@/components/JavaNav';

export default function Layout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    return (
        <>
            <JavaNav />
            {children}
        </>
    );
}