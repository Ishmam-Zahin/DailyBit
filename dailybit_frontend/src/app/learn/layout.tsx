import MainHeader from '@/components/MainHeader';
import styles from '@/styles/learn.module.scss'


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
            <MainHeader />
            <main
            className={styles.main}
            >
                {children}
            </main>
        </>
    );
}