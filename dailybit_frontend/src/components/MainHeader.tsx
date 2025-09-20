'use client'

import { useAppSelector } from '@/redux/ReduxStore';
import styles from '@/styles/learn.module.scss'
import Link from 'next/link';
import LogOutBtn from './LogOutBtn';

export default function MainHeader(){
    const user = useAppSelector(state => state.user);
    return (
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
                {(
                    !user.token && <Link
                    href='/login'
                    className={styles.btn}
                    >
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-login" />
                        </svg>
                        Login
                    </Link>
                )}
                {(
                    !user.token && <Link
                    href='/signup'
                    className={styles.btn}
                    >
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-user" />
                        </svg>
                        Sign Up
                    </Link>
                )}
                {(
                    user.token && <div
                    className={styles.profile}
                    >
                        <img
                        src={user.avatar ?? ''}
                        alt='profile image'
                        />
                        <Link
                        href="/learn"
                        className={styles.btn}
                        >
                            Profile
                        </Link>
                    </div>
                )}
                {
                    (
                        user.token && <LogOutBtn />
                    )
                }
            </div>
        </header>
    );
}