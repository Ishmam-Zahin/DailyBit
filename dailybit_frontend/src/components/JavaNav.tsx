'use client'

import styles from '@/styles/learn.module.scss'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function JavaNav(){
    const path = usePathname()
    return (
        <nav
        className={styles.sectionNav}
        >
            <h2>BASIC</h2>
            <ul>
                <li>
                    <Link
                    href='/learn/java'
                    className={`${styles.link} ${path === '/learn/java' ? styles.active : ''}`}
                    >
                        Java Intro
                    </Link>
                </li>
                <li>
                    <Link
                    href='/learn/java/chapter-1'
                    className={`${styles.link} ${path === '/learn/java/chapter-1' ? styles.active : ''}`}
                    >
                        Chapter 01
                    </Link>
                </li>
                <li>
                    <Link
                    href='/learn/java/chapter-2'
                    className={`${styles.link} ${path === '/learn/java/chapter-2' ? styles.active : ''}`}
                    >
                        Chapter 02
                    </Link>
                </li>
                <li>
                    <Link
                    href='/learn/java/chapter-3'
                    className={`${styles.link} ${path === '/learn/java/chapter-3' ? styles.active : ''}`}
                    >
                        Chapter 03
                    </Link>
                </li>
                <li>
                    <Link
                    href='/learn/java'
                    className={`${styles.link} ${path === '/learn/java/chapter-4' ? styles.active : ''}`}
                    >
                        Chapter 04
                    </Link>
                </li>
                <li>
                    <Link
                    href='/learn/java'
                    className={`${styles.link} ${path === '/learn/java/chapter-5' ? styles.active : ''}`}
                    >
                        Chapter 05
                    </Link>
                </li>
            </ul>
        </nav>
    );
}