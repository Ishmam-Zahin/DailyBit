import styles from '@/styles/pages/admin/create-problem/create-problem.module.scss'
import commonStyles from '@/styles/common.module.scss'
import ProblemForm from '@/components/ProblemForm';
import fetchSections from '@/actions/fetchSections';
import { cookies } from 'next/headers';

export default async function page(){
    const cooki = await cookies();
    const token = cooki.get('jwt_token')?.value ?? null;
    const sections = await fetchSections({token});
    return (
        <div
        className={styles.container}
        >
            <div
            className={styles.content}
            >
                <h2>Create a New Problem</h2>
                <ProblemForm sections = {sections} /> 
            </div>
        </div>
    );
}