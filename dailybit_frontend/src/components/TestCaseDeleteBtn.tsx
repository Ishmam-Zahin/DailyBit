'use client'

import styles from '@/styles/components/testCaseDeleteBtn.module.scss'
import commonStyles from '@/styles/common.module.scss'
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { deleteTestCase } from '@/actions/deleteTestCase';

export default function TestCaseDeleteBtn({
    id,
}:{
    id: string,
}) {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: deleteTestCase,
        onSuccess: (data) => {
            toast.success(data);
            router.refresh();
        },
        onError: (err: any) => {
            toast.error(err);
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
            mutation.mutate(id)
        }}
        >
            Delete
        </button>
    )
}