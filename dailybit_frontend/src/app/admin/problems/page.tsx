import fetchProblems from '@/actions/fetchProblems';
import ProblemDeleteBtn from '@/components/ProblemDeleteBtn';
import styles from '@/styles/pages/admin/problems/problems.module.scss'
import commonStyles from '@/styles/common.module.scss'
import { SearchParams } from 'next/dist/server/request/search-params';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function page(
    {searchParams}: {searchParams: Promise<SearchParams>}
){
    const cooki = await cookies();
    const token = cooki.get('jwt_token')?.value ?? null;
    const params = await searchParams;
    const name = params.name || '';
    const sectionName = params.sectionName || 'all';
    const chapterNo = params.chapterNo || -1;
    const queryString = `?name=${name}&sectionName=${sectionName}&chapterNo=${chapterNo}`;
    try{
        const data = await fetchProblems({queryString, token});

        return(
            <table
            className={commonStyles.table}
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Section</th>
                        <th>Chapter</th>
                        <th>Time Limit</th>
                        <th>Timeout</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((problem: any) => {
                        return (
                            <tr key={problem['id']}>
                                <td>{problem['id']}</td>
                                <td>{problem['name']}</td>
                                <td>{problem['section']['name']}</td>
                                <td>{problem['chapterNo']}</td>
                                <td>{problem['timeLimit']}</td>
                                <td>{problem['timeout']}</td>
                                <td
                                >
                                    <div className={commonStyles.actionTd}>
                                        <Link href={`/admin/edit-problem/${problem['id']}`}>
                                            <button
                                            className={`${commonStyles.btn} ${commonStyles.editBtn}`}
                                            >
                                                Edit
                                            </button>
                                        </Link>
                                        <ProblemDeleteBtn problemId={problem['id']}/>
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