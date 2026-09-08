'use client';

import createAccount from '@/actions/createAccount';
import { useAppSelector } from '@/redux/ReduxStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export default function Page() {
    const token = useAppSelector((state) => state.user.token);
    const [image, setImage] = useState<string | null>(null);

    const router = useRouter();

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (file) {
            setImage(URL.createObjectURL(file));
        } else {
            setImage(null);
        }
    };

    const mutation = useMutation({
        mutationFn: createAccount,

        onSuccess: () => {
            toast.success('account created! now log in');
            router.push('/login');
        },

        onError: (err: any) => {
            if (typeof err !== 'string') {
                err = 'error occured';
            }

            toast.error(err);
        },
    });

    const handleSignup = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const form = new FormData(e.currentTarget);

            mutation.mutate({
                form,
                token,
            });
        },
        [mutation, token]
    );

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg sm:p-8">

                <h2 className="mb-6 text-center text-2xl font-bold tracking-wide text-green-800">
                    CREATE ACCOUNT
                </h2>

                <form
                    onSubmit={handleSignup}
                    className="flex flex-col gap-4"
                >
                    <img
                        src={image || '/placeholder.png'}
                        className="mx-auto mb-2 h-24 w-24 rounded-full border-2 border-gray-200 bg-gray-100 object-cover"
                        alt="Preview"
                    />

                    <label
                        htmlFor="image"
                        className="mx-auto w-fit cursor-pointer rounded-md bg-green-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-900"
                    >
                        PHOTO
                    </label>

                    <input
                        hidden
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <div className="flex gap-3">
                        <input
                            type="number"
                            name="age"
                            placeholder="age"
                            className="h-12 min-w-0 flex-1 rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-700/20"
                        />

                        <select
                            name="gender"
                            id="gender"
                            className="h-12 min-w-0 flex-1 cursor-pointer rounded-lg border border-gray-300 bg-white px-4 text-base outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-700/20"
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="THIRD_GENDER">
                                Third Gender
                            </option>
                        </select>
                    </div>

                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email address..."
                        className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-700/20"
                    />

                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="user name..."
                        className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-700/20"
                    />

                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password..."
                        className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-700/20"
                    />

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="mt-2 h-12 w-full cursor-pointer rounded-lg bg-green-800 px-6 text-base font-semibold text-white transition-all hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {mutation.isPending
                            ? 'Loading...'
                            : 'CREATE'}
                    </button>
                </form>
            </div>
        </div>
    );
}