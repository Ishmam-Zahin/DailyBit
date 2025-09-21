'use client'

import { createProblem } from '@/actions/createProblem';
import { updateProblem } from '@/actions/updateProblem';
import { javaTemplate } from '@/helper/defaultTemplates';
import { useAppSelector } from '@/redux/ReduxStore';
import commonStyles from '@/styles/common.module.scss'
import styles from '@/styles/components/problemForm.module.scss'
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProblemForm(
    {
        sections,
        problemDetails,
        update = false
    }:
    {
        sections: any[],
        problemDetails?: any,
        update?: boolean
    }
){
    const token = useAppSelector(state => state.user.token);
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: update ? updateProblem : createProblem,
        onSuccess: (data) => {
            toast.success(data);
            router.push('/admin/problems')
        },
        onError: (err: any) => {
            // toast.error(err);
            console.log(err);
        }
    });

    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        mutation.mutate({formData, token});
    }
    return (
        <form
        className={styles.form}
        onSubmit={handleSubmit}>
            <label
            htmlFor="id">ID: </label>
            <input
            className={commonStyles.input}
            name='id'
            id='id'
            placeholder='enter unique ID...'
            defaultValue={problemDetails?.id || ''}
            type="text" /><br/>

            <label
            htmlFor="name">Name: </label>
            <input
            className={commonStyles.input}
            name='name'
            id='name'
            placeholder='enter unique name...'
            defaultValue={problemDetails?.name || ''}
            type="text" /><br/>

            <label htmlFor="sectionName">Section: </label>
            <select
            className={commonStyles.select}
            name="sectionName"
            id="sectionName"
            defaultValue={problemDetails?.section['name'] || ''}
            >
                {sections.map((section : any) => <option key={section['name']} value={section['name']}>{section['name']}</option>)}
            </select><br/>

            <label
            htmlFor="chapterNo">Chapter No: </label>
            <input
            className={commonStyles.input}
            name='chapterNo'
            id='chapterNo'
            min={1}
            defaultValue={problemDetails?.chapterNo || 1}
            type="number" /><br/>

            <label
            htmlFor="timeLimit">Time Limit: </label>
            <input
            className={commonStyles.input}
            name='timeLimit'
            id='timeLimit'
            min={1}
            defaultValue={problemDetails?.timeLimit || 2}
            type="number" /><br/>

            <label
            htmlFor="timeOut">Time Out: </label>
            <input
            className={commonStyles.input}
            name='timeOut'
            id='timeOut'
            min={1}
            defaultValue={problemDetails?.timeOut || 5}
            type="number" /><br/>

            <label
            htmlFor="defaultTemplate">Default Template: </label>
            <textarea
            className={commonStyles.textarea}
            name='defaultTemplate'
            id='defaultTemplate'
            placeholder='enter default template...'
            defaultValue={problemDetails?.defaultTemplate || javaTemplate}
            /><br/>

            <button
            className={`${commonStyles.btn}`}
            >
                {problemDetails ? 'Update' : 'Create'}
            </button>
        </form>
    );
}