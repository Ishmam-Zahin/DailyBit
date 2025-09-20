'use client'

import loginUser from "@/actions/loginUser";
import styles from "@/styles/login.module.scss"
import { useAppDispatch} from "@/redux/ReduxStore";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "@/redux/userSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function(){

    const dispatch = useAppDispatch();

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) =>{
            dispatch(setUser(data));
            toast.success('log in successfull');
            router.push('/learn');
        },
        onError(error: any) {
            toast.error(error);
        },
    });

    const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const data = Object.fromEntries(form.entries());
        mutation.mutate(data);
    }, []);
    return (
        <div
        className={styles.container}
        >
            <div
            className={styles.loginContainer}
            >
                <h2>LOG IN</h2>
                <form
                onSubmit={handleLogin}
                >
                    <input
                    type="text"
                    name="userName"
                    placeholder="username or email..."
                    />
                    <input
                    type="password"
                    name="password"
                    placeholder="password"
                    />
                    <button
                    type="submit"
                    className={styles.btn}
                    disabled = {mutation.isPending}
                    >
                        {mutation.isPending ? 'Loading....' : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
}