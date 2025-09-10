import styles from '@/styles/pages/admin/edit-test-case/editTestCase.module.scss'
import commonStyles from '@/styles/common.module.scss'
import ProblemForm from '@/components/ProblemForm';
import fetchSections from '@/actions/fetchSections';
import fetchProblemDetails from '@/actions/fetchProblemDetails';
import Link from 'next/link';
import fetchTestCaseDetails from '@/actions/fetchTestCaseDetails';
import TestCaseForm from '@/components/TestCaseForm';

export default async function page(
    {
        params
    }:
    {
        params: Promise<{id: String}>
    }
){
    const {id} = await params;
    const testCaseDetails = await fetchTestCaseDetails(id);
    return (
        <div
        className={styles.container}
        >
            <div
            className={styles.content}
            >
                <h2>Edit Test Case</h2>
                <TestCaseForm testCaseDetails={testCaseDetails} update = {true} />
            </div>
        </div>
    );
}