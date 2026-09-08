'use client';

import { useAppSelector } from '@/redux/ReduxStore';
import Link from 'next/link';
import LogOutBtn from './LogOutBtn';
import { User } from '@/helper/types';

export default function MainHeader() {
    const user: User = useAppSelector((state) => state.user);

    return (
        <header className="flex h-24 items-center justify-between px-4 text-base">
            {/* Left Header */}
            <div className="flex h-full items-center">
                {/* Logo */}
                <div className="mr-8 self-center text-2xl font-extrabold italic text-green-600">
                    <Link href="/">
                        DailyBit
                    </Link>
                </div>

                {/* Navigation Dropdown Buttons */}
                <button className="flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-green-600 hover:text-white">
                    Tutorials

                    <svg
                        className="h-5 w-5 fill-current"
                        aria-hidden="true"
                    >
                        <use href="/sprite.svg#icon-arrow_drop_down" />
                    </svg>
                </button>

                <button className="flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-green-600 hover:text-white">
                    References

                    <svg
                        className="h-5 w-5 fill-current"
                        aria-hidden="true"
                    >
                        <use href="/sprite.svg#icon-arrow_drop_down" />
                    </svg>
                </button>

                <button className="flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-green-600 hover:text-white">
                    Excercises

                    <svg
                        className="h-5 w-5 fill-current"
                        aria-hidden="true"
                    >
                        <use href="/sprite.svg#icon-arrow_drop_down" />
                    </svg>
                </button>

                <button className="flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-green-600 hover:text-white">
                    Certificates

                    <svg
                        className="h-5 w-5 fill-current"
                        aria-hidden="true"
                    >
                        <use href="/sprite.svg#icon-arrow_drop_down" />
                    </svg>
                </button>

                {/* Search */}
                <div className="relative ml-8 self-center">
                    <input
                        type="text"
                        placeholder="search..."
                        className="w-64 rounded-full border border-gray-300 px-5 py-3 pr-14 text-base outline-none transition-all duration-200 focus:w-72 focus:border-gray-400"
                    />

                    <svg
                        className="absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2"
                        aria-hidden="true"
                    >
                        <use href="/sprite.svg#icon-search" />
                    </svg>
                </div>
            </div>

            {/* Right Header */}
            <div className="flex h-full items-center justify-center gap-4">
                {/* Jobs */}
                <Link
                    href="/learn"
                    className="flex items-center justify-center gap-2 rounded-full px-5 py-2.5 transition-colors hover:bg-gray-200 active:bg-gray-300"
                >
                    <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                    >
                        <use href="/sprite.svg#icon-briefcase" />
                    </svg>

                    Jobs
                </Link>

                {/* Forum */}
                <Link
                    href="/learn"
                    className="flex items-center justify-center gap-2 rounded-full px-5 py-2.5 transition-colors hover:bg-gray-200 active:bg-gray-300"
                >
                    <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                    >
                        <use href="/sprite.svg#icon-forum" />
                    </svg>

                    Forum
                </Link>

                {/* Login */}
                {!user.token && (
                    <Link
                        href="/login"
                        className="flex min-w-fit items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-2.5 text-white transition-colors hover:bg-gray-900"
                    >
                        <svg
                            className="h-5 w-5 fill-white"
                            aria-hidden="true"
                        >
                            <use href="/sprite.svg#icon-login" />
                        </svg>

                        Login
                    </Link>
                )}

                {/* Sign Up */}
                {!user.token && (
                    <Link
                        href="/signup"
                        className="flex min-w-fit items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-2.5 text-white transition-colors hover:bg-gray-900"
                    >
                        <svg
                            className="h-5 w-5 fill-white"
                            aria-hidden="true"
                        >
                            <use href="/sprite.svg#icon-user" />
                        </svg>

                        Sign Up
                    </Link>
                )}

                {/* Profile */}
                {user.token && (
                    <div className="flex w-fit flex-row items-center justify-center gap-4">
                        <img
                            src={user.avatarLink ?? ''}
                            alt="profile image"
                            className="h-12 w-12 rounded-full object-cover"
                        />

                        <Link
                            href="/learn"
                            className="flex min-w-fit items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-2.5 text-white transition-colors hover:bg-gray-900"
                        >
                            Profile
                        </Link>
                    </div>
                )}

                {/* Logout */}
                {user.token && <LogOutBtn />}
            </div>
        </header>
    );
}