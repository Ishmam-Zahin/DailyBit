'use client'

import commonStyles from '@/styles/common.module.scss'
import styles from '@/styles/components/problemFilterForm.module.scss'
import { useRouter } from "next/navigation";

export default function ProblemFilterForm(
    {
        sections
    }:
    {
        sections: any[]
    }
){
    const router = useRouter();

    const filterProblems = (formData: FormData) => {
        const name = formData.get('name')?.toString() || '';
        const sectionName = formData.get('sectionName')?.toString() || 'all';
        const chapterNo = formData.get('chapterNo') || -1;

        router.push(`/admin/problems?name=${name}&sectionName=${sectionName}&chapterNo=${chapterNo}`);
    }

    return(
        <form
        className={styles.form}
        action={filterProblems}
        >

            <input
            className={commonStyles.input}
            type="text"
            placeholder='name...'
            name='name'/>
            <select
            className={commonStyles.select}
            name = "sectionName"
            defaultValue={"all"}
            >
                <option value="all">All</option>
                {sections.map((section : any) => {
                    return <option
                    key={section['name']}
                    value={section['name']}
                    >
                        {section['name']}
                    </option>
                })}
            </select>
            <input
            className={commonStyles.input}
            type="number"
            placeholder='chapter...'
            name='chapterNo'/>

            <button
            className={`${commonStyles.btn}`}
            type='submit'
            >
                Filter
            </button>
        </form>
    );
}