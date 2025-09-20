'use client'

import { deleteProblem } from '@/actions/deleteProblem';
import styles from '@/styles/components/problemDeleteBtn.module.scss'
import commonStyles from '@/styles/common.module.scss'
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/ReduxStore';

export default function ProblemDeleteBtn({
    problemId,
}:{
    problemId: string,
}) {
    const token = useAppSelector(state => state.user.token);
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: deleteProblem,
        onSuccess: () => {
            toast.success('problem deleted successfully!');
            router.refresh();
        },
        onError: () => {
            toast.error('failed to delete problem!');
        }
    });
    return (
        <button
        className={`${commonStyles.btn} ${styles.deleteBtn}`}
        disabled={mutation.isPending}
        onClick={() => {
            if(!confirm("Are you sure?")){
                return;
            }
            mutation.mutate({problemId, token});
        }}
        >
            Delete
        </button>
    )
}