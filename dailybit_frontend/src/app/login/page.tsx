'use client';

import loginUser from '@/actions/loginUser';
import { useAppDispatch } from '@/redux/ReduxStore';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { setUser } from '@/redux/userSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page() {
    const dispatch = useAppDispatch();

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: loginUser,

        onSuccess: (data) => {
            dispatch(setUser(data));
            toast.success('log in successfull');
            router.push('/learn');
        },

        onError(error: any) {
            toast.error(error);
        },
    });

    const handleLogin = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const form = new FormData(e.currentTarget);
            const data = Object.fromEntries(form.entries());

            mutation.mutate(data);
        },
        [mutation]
    );

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.13)]">

                {/* Header */}
                <h2 className="mb-8 bg-green-800 px-4 py-4 text-center text-2xl font-semibold tracking-[0.5rem] text-white">
                    LOG IN
                </h2>

                {/* Form */}
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col items-center px-6 pb-8"
                >
                    <input
                        type="text"
                        name="userName"
                        placeholder="username or email..."
                        className="mb-5 w-[70%] rounded-full border-2 border-gray-800 px-5 py-3 text-base outline-none transition focus:border-green-800"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="mb-6 w-[70%] rounded-full border-2 border-gray-800 px-5 py-3 text-base outline-none transition focus:border-green-800"
                    />

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="rounded-lg bg-green-800 px-6 py-2.5 text-base text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {mutation.isPending ? 'Loading....' : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
}