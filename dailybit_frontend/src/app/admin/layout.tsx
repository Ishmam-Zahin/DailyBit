import styles from '@/styles/pages/admin/admin.module.css'

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
                    <button>Settings</button>
                    <button>logout</button>
                </div>
            </header>
            {children}
        </>
    )
}