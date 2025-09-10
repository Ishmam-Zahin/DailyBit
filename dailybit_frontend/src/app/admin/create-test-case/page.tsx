import styles from '@/styles/pages/admin/create-test-case/createTestCase.module.scss'
import commonStyles from '@/styles/common.module.scss'
import TestCaseForm from '@/components/TestCaseForm';

export default function page(){
    return (
        <div
        className={styles.container}
        >
            <div
            className={styles.content}
            >
                <h2>Create a New Test Case</h2>
                <TestCaseForm />
            </div>
        </div>
    );
}