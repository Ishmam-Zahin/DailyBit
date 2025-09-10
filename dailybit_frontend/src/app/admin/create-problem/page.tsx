import styles from '@/styles/pages/admin/create-problem/create-problem.module.scss'
import commonStyles from '@/styles/common.module.scss'
import ProblemForm from '@/components/ProblemForm';
import fetchSections from '@/actions/fetchSections';

export default async function page(){
    const sections = await fetchSections();
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