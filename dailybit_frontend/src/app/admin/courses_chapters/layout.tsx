export default function CoursesChaptersLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex min-h-full">
            {children}
        </div>
    )
}