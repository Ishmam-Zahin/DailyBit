import styles from '@/styles/pages/admin/edit-problem/edit-problem.module.scss'
import commonStyles from '@/styles/common.module.scss'
import ProblemForm from '@/components/ProblemForm';
import fetchSections from '@/actions/fetchSections';
import fetchProblemDetails from '@/actions/fetchProblemDetails';
import Link from 'next/link';
import TestCaseDeleteBtn from '@/components/TestCaseDeleteBtn';
import { cookies } from 'next/headers';

export default async function page(
    {
        params
    }:
    {
        params: Promise<{problemId: string}>
    }
){
    const cooki = await cookies();
    const token = cooki.get('jwt_token')?.value ?? null;
    const {problemId} = await params;
    const p1 = fetchSections({token});
    const p2 = fetchProblemDetails({problemId, token});
    const [sections, problemDetails] = await Promise.all([p1, p2]);
    return (
        <div
        className={styles.container}
        >
            <div
            className={styles.content}
            >
                <h2>Edit Problem</h2>
                <ProblemForm sections = {sections} problemDetails={problemDetails} update = {true} /> 
                <h2>Test Cases</h2>
                <div
                className={styles.tableContainer}
                >
                    <table
                    className={commonStyles.table}
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Test Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {problemDetails.testCases.map((testCase: any) => {
                                return (
                                    <tr key={testCase['id']}>
                                        <td>{testCase['id']}</td>
                                        <td>{testCase['testType']}</td>
                                        <td
                                        >
                                            <div className={commonStyles.actionTd}>
                                                <Link href={`/admin/edit-test-case/${testCase['id']}`}>
                                                    <button
                                                    className={`${commonStyles.btn} ${commonStyles.editBtn}`}
                                                    >
                                                        Edit
                                                    </button>
                                                </Link>
                                                <TestCaseDeleteBtn id={testCase['id']} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}