import getProblems from '@/actions/getProblems';
import ProblemDeleteBtn from '@/components/ProblemDeleteBtn';
import styles from '@/styles/pages/admin/admin.module.scss'
import Link from 'next/link';

export default async function page(){
    try{
        const data = await getProblems();

        return(
            <div
            className={styles.problemsSection}
            >
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
                                    <td>{problem['problemName']}</td>
                                    <td>{problem['sectionName']}</td>
                                    <td>{problem['chapterId']}</td>
                                    <td>{problem['timeLimit']}</td>
                                    <td>{problem['timeout']}</td>
                                    <td
                                    >
                                        <div className={styles.actionTd}>
                                            <Link href='/admin'>
                                                <button
                                                className={`${styles.btn} ${styles.btnSmall} ${styles.editBtn}`}
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
            </div>
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