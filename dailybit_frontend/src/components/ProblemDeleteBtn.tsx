'use client'

import { deleteProblem } from '@/actions/deleteProblem';
import styles from '@/styles/pages/admin/admin.module.scss';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProblemDeleteBtn({
    problemId,
}:{
    problemId: string,
}) {
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
        className={`${styles.btn} ${styles.btnSmall} ${styles.deleteBtn}`}
        disabled = {mutation.isPending}
        onClick={() => {
            if(!confirm('Are you sure you want to delete this problem?')){
                return;
            }
            mutation.mutate(problemId);
        }}
        >
            delete
        </button>
    )
}