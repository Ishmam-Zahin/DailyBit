'use client'

import commonStyles from '@/styles/common.module.scss'
import styles from '@/styles/components/testCaseFilterForm.module.scss'
import { useRouter } from "next/navigation";

export default function TestCaseFilterForm(){
    const router = useRouter();

    const filterTestCases = (formData: FormData) => {
        const testType = formData.get('testType')?.toString() || 'all';
        const problemId = formData.get('problemId')?.toString() || '';

        router.push(`/admin/test-cases?testType=${testType}&problemId=${problemId}`);
    }

    return(
        <form
        className={styles.form}
        action={filterTestCases}
        >

            <input
            className={commonStyles.input}
            type="text"
            placeholder='problem ID...'
            name='problemId'/>
            <select
            className={commonStyles.select}
            name = "testType"
            defaultValue={"all"}
            >
                <option value="all">All</option>
                <option value="INCLUDE">INCLUDE</option>
                <option value="EXCLUDE">EXCLUDE</option>
                <option value="EXACT">EXACT</option>
            </select>

            <button
            className={`${commonStyles.btn}`}
            type='submit'
            >
                Filter
            </button>
        </form>
    );
}