import JavaNav from '@/components/JavaNav';
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
            <JavaNav />
            {children}
        </>
    );
}