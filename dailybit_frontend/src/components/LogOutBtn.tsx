import logOutUser from '@/actions/logOutUser';
import { useAppDispatch, useAppSelector } from '@/redux/ReduxStore';
import { resetUser } from '@/redux/userSlice';
import styles from '@/styles/learn.module.scss'
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LogOutBtn(){
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const mutation = useMutation({
        mutationFn: logOutUser,
        onSuccess: (data) => {
            dispatch(resetUser());
            toast.success('logout successfull');
        },
        onError: (err: any) =>{
            toast.error(err);
        }
    })
    return (
        <button
        className={styles.btn}
        onClick={() => {
            mutation.mutate(user.token);
        }}
        disabled={mutation.isPending}
        >
            {/* <svg className={styles.icon}>
                <use href="/sprite.svg#icon-user" />
            </svg> */}
            {mutation.isPending ? 'Loading...' : 'Log Out'}
        </button>
    );
}