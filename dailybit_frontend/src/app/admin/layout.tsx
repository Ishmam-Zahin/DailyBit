import styles from '@/styles/pages/admin/admin.module.scss'
import commonStyles from '@/styles/common.module.scss'
import Link from 'next/link'

export default function layout(
    {
        children
    }:
    Readonly<{
        children: React.ReactNode
    }>
){
    return(
        <>
            <header
            className={styles.heading}
            >
                <h1>Admin Panel</h1>
                <div
                className={styles.utility}
                >
                    <button
                    className={commonStyles.btn}
                    >Settings</button>
                    <button
                    className={commonStyles.btn}
                    >logout</button>
                </div>
            </header>
            <main
            className={styles.main}
            >
                <div
                className={styles.navSection}
                >
                    <nav>
                        <h2>TABLES</h2>
                        <ul className={styles.navList}>
                            <Link className={styles.navList} href="/admin/problems">
                                <li>Problems</li>
                            </Link>
                            <Link className={styles.navList} href="/admin">
                                <li>Test Cases</li>
                            </Link>
                            <Link className={styles.navList} href="/admin">
                                <li>Users</li>
                            </Link>
                            <Link className={styles.navList} href="/admin">
                                <li>Posts</li>
                            </Link>
                            <Link className={styles.navList} href="/admin">
                                <li>Comments</li>
                            </Link>
                        </ul>
                    </nav>
                </div>
                {children}
            </main>
        </>
    )
}