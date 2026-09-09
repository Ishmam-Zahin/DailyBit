'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function JavaNav() {
    const path = usePathname();

    const links = [
        { href: '/learn/java', label: 'Java Intro' },
        { href: '/learn/java/chapter-1', label: 'Chapter 01' },
        // { href: '/learn/java/chapter-2', label: 'Chapter 02' },
        // { href: '/learn/java/chapter-3', label: 'Chapter 03' },
        // { href: '/learn/java/chapter-4', label: 'Chapter 04' },
        // { href: '/learn/java/chapter-5', label: 'Chapter 05' },
    ];

    return (
        <nav className="h-full w-full shrink-0 overflow-y-auto bg-gray-200 pt-4 text-base">
            <h2 className="px-4 py-4 text-left text-xl font-medium">
                BASIC
            </h2>

            <ul>
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={`block w-full px-4 py-2 transition-colors duration-100 hover:bg-gray-700 hover:text-white ${
                                path === link.href
                                    ? 'bg-emerald-500 text-white'
                                    : ''
                            }`}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}