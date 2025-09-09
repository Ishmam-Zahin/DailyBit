import fetchProblems from '@/actions/fetchProblems';
import ProblemDeleteBtn from '@/components/ProblemDeleteBtn';
import styles from '@/styles/pages/admin/admin.module.scss'
import commonStyles from '@/styles/common.module.scss'
import { SearchParams } from 'next/dist/server/request/search-params';
import Link from 'next/link';

export default async function page(
    {searchParams}: {searchParams: Promise<SearchParams>}
){
    const params = await searchParams;
    const name = params.name || '';
    const sectionName = params.sectionName || 'all';
    const chapterNo = params.chapterNo || -1;
    const query = `?name=${name}&sectionName=${sectionName}&chapterNo=${chapterNo}`;
    try{
        const data = await fetchProblems(query);

        return(
            <table>
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
                                    <div className={styles.actionTd}>
                                        <Link href='/admin'>
                                            <button
                                            className={`${commonStyles.btn} ${commonStyles.btnSmall} ${styles.editBtn}`}
                                            >Edit</button>
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