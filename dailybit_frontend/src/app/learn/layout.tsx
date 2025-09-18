import MainHeader from '@/components/MainHeader';
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
            <MainHeader />
            <Nav />
            <main
            className={styles.main}
            >
                {children}
            </main>
        </>
    );
}