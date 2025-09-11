import Nav from '@/components/Nav';
import styles from '@/styles/learn.module.scss'
import Link from 'next/link';

export default function layout(
    {
        children
    }:
    Readonly<{
        children: React.ReactNode
    }>
){
    return (
        <>
            <header
            className={styles.header}
            >
                <div
                className={styles.leftHeader}
                >
                    <div
                    className={styles.logo}
                    >
                        DailyBit
                    </div>
                    <button
                    className={styles.drop}
                    >
                        Tutorials
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-arrow_drop_down" />
                        </svg>
                    </button>
                    <button
                    className={styles.drop}
                    >
                        References
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-arrow_drop_down" />
                        </svg>
                    </button>
                    <button
                    className={styles.drop}
                    >
                        Excercises
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-arrow_drop_down" />
                        </svg>
                    </button>
                    <button
                    className={styles.drop}
                    >
                        Certificates
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-arrow_drop_down" />
                        </svg>
                    </button>
                    <div
                    className={styles.searchContainer}
                    >
                        <input
                        placeholder='search...'
                        type="text" />
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-search" />
                        </svg>
                    </div>
                </div>
                <div
                className={styles.rightHeader}
                >
                    <Link
                    href='/learn'
                    className={styles.textBtn}
                    >
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-briefcase" />
                        </svg>
                        Jobs
                    </Link>
                    <Link
                    href='/learn'
                    className={styles.textBtn}
                    >
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-forum" />
                        </svg>
                        Forum
                    </Link>
                    <Link
                    href='/learn'
                    className={styles.btn}
                    >
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-login" />
                        </svg>
                        Login</Link>
                    <Link
                    href='/learn'
                    className={styles.btn}
                    >
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-user" />
                        </svg>
                        Sign Up
                    </Link>
                </div>
            </header>
            <Nav />
            <main
            className={styles.main}
            >
                {children}
            </main>
        </>
    );
}