import ProblemDeleteBtn from '@/components/ProblemDeleteBtn';
import styles from '@/styles/pages/admin/test-cases/testCases.module.scss'
import commonStyles from '@/styles/common.module.scss'
import { SearchParams } from 'next/dist/server/request/search-params';
import Link from 'next/link';
import fetchTestCases from '@/actions/fetchTestCases';
import TestCaseDeleteBtn from '@/components/TestCaseDeleteBtn';

export default async function page(
    {searchParams}: {searchParams: Promise<SearchParams>}
){
    const params = await searchParams;
    const testType = params.testType || 'all';
    const problemId = params.problemId || '';
    const query = `?testType=${testType}&problemId=${problemId}`;
    try{
        const data = await fetchTestCases(query);

        return(
            <table
            className={commonStyles.table}
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Problem Id</th>
                        <th>Test Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((testCase: any) => {
                        return (
                            <tr key={testCase['id']}>
                                <td>{testCase['id']}</td>
                                <td>{testCase['problem']['id']}</td>
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
        );
    }
    catch(err: any){
        return (
            <div>
                <p>{String(err)}</p>
            </div>
        );
    }
}