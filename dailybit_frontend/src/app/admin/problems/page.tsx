import filterProblems from '@/actions/filterProblems';
import getProblems from '@/actions/getProblems';
import ProblemDeleteBtn from '@/components/ProblemDeleteBtn';
import styles from '@/styles/pages/admin/admin.module.scss'
import { SearchParams } from 'next/dist/server/request/search-params';
import Link from 'next/link';

export default async function page(
    {searchParams}: {searchParams: Promise<SearchParams>}
){
    const params = await searchParams;
    const name = params.name || '';
    const language = params.language || 'all';
    const sectionName = params.sectionName || '';
    const chapter = params.chapter || -1;
    const query = `?name=${name}&language=${language}&sectionName=${sectionName}&chapter=${chapter}`;
    try{
        const data = await getProblems(query);

        return(
            <div
            className={styles.problemsSection}
            >
                <div
                className={styles.actionContainer}
                >
                    <form action={filterProblems}>

                        <input type="text" placeholder='name...' name='name'/>
                        <select name="language" id="form-language" defaultValue={'all'}>
                            <option value="all">All Languages</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="js">JavaScript</option>
                        </select>
                        <input type="text" placeholder='section...' name='sectionName'/>
                        <input type="number" placeholder='chapter...' name='chapter'/>

                        <button
                        className={`${styles.btn} ${styles.exportBtn}`}
                        type='submit'
                        >
                            Filter
                        </button>
                    </form>
                    <button
                    className={`${styles.btn} ${styles.createBtn}`}
                    >Create New Problem</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Language</th>
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
                                    <td>{problem['language']}</td>
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