'use client'

import createAccount from "@/actions/createAccount";
import { useAppSelector } from "@/redux/ReduxStore";
import styles from "@/styles/learn.module.scss"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
    const token = useAppSelector(state => state.user.token);
    const [image, setImage] = useState<string | null>(null);

    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
        else setImage(null);
    };
    const mutation = useMutation({
        mutationFn: createAccount,
        onSuccess: (data)=>{
            toast.success('account created! now log in');
            router.push("/login");
        },
        onError: (err: any) => {
            if(typeof err !== 'string'){
                err = 'error occured';
            }
            toast.error(err);
        }
    });

    const handleSignup = useCallback(async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        mutation.mutate({form, token});
    }, []);

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signup}>
                <h2>CREATE ACCOUNT</h2>
                <form
                onSubmit={handleSignup}
                >
                    <img
                        src={image || "/placeholder.png"}
                        className={styles.displayImg}
                        alt="Preview"
                    />
                    <label
                        htmlFor="image"
                        className={styles.fileSelector}
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
                    <div
                    className={styles.ageXgender}
                    >
                        <input
                        type="number"
                        placeholder="age"
                        name="age"
                        />
                        <select name="gender" id="gender">
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="THIRD_GENDER">Third Gender</option>
                        </select>
                    </div>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email address..."
                    />
                    <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="user name..."
                    />
                    <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password..."
                    />
                    <button
                    type="submit"
                    className={styles.btn}
                    disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Loading...' : 'CREATE'}
                    </button>
                </form>
            </div>
        </div>
    );
}
