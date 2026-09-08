import logOutUser from '@/actions/logOutUser';
import { useAppDispatch, useAppSelector } from '@/redux/ReduxStore';
import { resetUser } from '@/redux/userSlice';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function LogOutBtn() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const mutation = useMutation({
        mutationFn: logOutUser,

        onSuccess: () => {
            dispatch(resetUser());
            toast.success('Logout successful');
        },

        onError: (err: Error) => {
            toast.error(err.message || 'Logout failed');
        },
    });

    return (
        <button
            type="button"
            onClick={() => {
                mutation.mutate(user.token);
            }}
            disabled={mutation.isPending}
            className="
                flex
                min-w-fit
                cursor-pointer
                items-center
                justify-center
                rounded-lg
                bg-[var(--main-color-primary-dark)]
                px-4
                py-2
                text-sm
                text-white
                transition-colors
                duration-100
                hover:bg-[var(--main-color-dark-1)]
                disabled:cursor-not-allowed
                disabled:opacity-60
            "
        >
            {mutation.isPending ? 'Loading...' : 'Log Out'}
        </button>
    );
}