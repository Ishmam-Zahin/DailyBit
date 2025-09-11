'use client'

import Link from "next/link";
import styles from '@/styles/learn.module.scss'
import { usePathname, useRouter } from "next/navigation";

export default function Nav(){
    const path = usePathname();
    return (
        <nav
        className={styles.nav}
        >
            <ul>
                <li>
                    <Link
                    href='/learn/java'
                    className={`${styles.link} ${path === '/learn/java' ? styles.active : ''}`}
                    >
                        JAVA
                    </Link>
                </li>
                <li>
                    <Link
                    href='/learn'
                    className={`${styles.link} ${path === '/learn/python' ? styles.active : ''}`}
                    >
                        PYTHON
                    </Link>
                </li>
                <li>
                    <Link
                    href='/learn'
                    className={`${styles.link} ${path === '/learn/c' ? styles.active : ''}`}
                    >
                        C
                    </Link>
                </li>
                <li>
                    <Link
                    href='/learn'
                    className={`${styles.link} ${path === '/learn/cpp' ? styles.active : ''}`}
                    >
                        C++
                    </Link>
                </li>
                <li>
                    <Link
                    href='/learn'
                    className={`${styles.link} ${path === '/learn/dsa' ? styles.active : ''}`}
                    >
                        DATA STRUCTURES
                    </Link>
                </li>
                <li>
                    <Link
                    href='/learn'
                    className={`${styles.link} ${path === '/learn/algorithms' ? styles.active : ''}`}
                    >
                        ALGORITHMS
                    </Link>
                </li>
            </ul>
        </nav>
    );
}