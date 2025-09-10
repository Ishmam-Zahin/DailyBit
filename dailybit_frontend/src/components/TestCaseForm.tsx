'use client'

import { createTestCase } from '@/actions/createTestCase';
import { updateTestCase } from '@/actions/updateTestCase';
import { javaTemplate } from '@/helper/defaultTemplates';
import commonStyles from '@/styles/common.module.scss'
import styles from '@/styles/components/testCaseForm.module.scss'
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function TestCaseForm(
    {
        testCaseDetails,
        update = false,
    }:
    {
        testCaseDetails?: any,
        update?: boolean
    }
){
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: update ? updateTestCase : createTestCase,
        onSuccess: (data) => {
            toast.success(data);
            router.push('/admin/test-cases')
        },
        onError: (err: any) => {
            toast.error(err);
        }
    });

    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        mutation.mutate(formData);
    }
    return (
        <form
        className={styles.form}
        onSubmit={handleSubmit}>
            {update && <input type='text' hidden = {true} name = "id" defaultValue={testCaseDetails?.id || ''} />}
            <label
            htmlFor="problemId">Problem ID: </label>
            <input
            className={commonStyles.input}
            name='problemId'
            id='problemId'
            placeholder='enter problem ID...'
            defaultValue={testCaseDetails?.problem.id || ''}
            type="text" /><br/>

            <label htmlFor="testType">Test Type: </label>
            <select
            className={commonStyles.select}
            name="testType"
            id="testType"
            defaultValue={testCaseDetails?.testType || ''}
            >
                <option value="INCLUDE">INCLUDE</option>
                <option value="EXCLUDE">EXCLUDE</option>
                <option value="EXACT">EXACT</option>
            </select><br/>

            <label
            htmlFor="input">Input: </label>
            <textarea
            className={commonStyles.textarea}
            name='input'
            id='input'
            placeholder='enter sample input...'
            defaultValue={testCaseDetails?.input || ''}
            /><br/>

            <label
            htmlFor="output">Output: </label>
            <textarea
            className={commonStyles.textarea}
            name='output'
            id='output'
            placeholder='enter sample output...'
            defaultValue={testCaseDetails?.output || ''}
            /><br/>

            <button
            className={`${commonStyles.btn}`}
            >
                {testCaseDetails ? 'Update' : 'Create'}
            </button>
        </form>
    );
}