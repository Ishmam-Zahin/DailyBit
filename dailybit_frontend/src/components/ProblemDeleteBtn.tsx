'use client'

import { deleteProblem } from '@/actions/deleteProblem';
import styles from '@/styles/pages/admin/admin.module.scss';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

export default function ProblemDeleteBtn({
    problemId,
}:{
    problemId: string,
}) {
    const [isPending, startTransition] = useTransition()
    return (
        <button
        className={`${styles.btn} ${styles.btnSmall} ${styles.deleteBtn}`}
        disabled = {isPending}
        onClick={() => {
            if (!confirm("Are you sure you want to delete this problem?")) return;
            startTransition( async () => {
                const {status, message} = await deleteProblem(problemId);
                if(status >= 300){
                    toast.error(message);
                }
                else{
                    toast.success(message);
                }
            })
        }}
        >
            {isPending ? 'Deleting...' : 'Delete'}
        </button>
    )
}