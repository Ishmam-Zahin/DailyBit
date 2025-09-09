import styles from '@/styles/pages/admin/admin.module.scss'
import commonStyles from '@/styles/common.module.scss'
import ProblemFilterForm from '@/components/ProblemFilterForm';
import fetchSections from '@/actions/fetchSections';

export default async function layout(
    {
        children
    }:
    Readonly<{
        children: React.ReactNode
    }>
){
    const sections = await fetchSections();
    return (
        <div
        className={styles.problemsSection}
        >
            <div
            className={styles.actionContainer}
            >
                <ProblemFilterForm sections={sections}/>
                <button
                className={`${commonStyles.btn} ${commonStyles.createBtn}`}
                >
                    Create New Problem
                </button>
            </div>
            {children}
        </div>
    );
}