import styles from '@/styles/pages/admin/test-cases/testCases.module.scss'
import commonStyles from '@/styles/common.module.scss'
import ProblemFilterForm from '@/components/ProblemFilterForm';
import fetchSections from '@/actions/fetchSections';
import Link from 'next/link';
import TestCaseFilterForm from '@/components/TestCaseFilterForm';

export default function layout(
    {
        children
    }:
    Readonly<{
        children: React.ReactNode
    }>
){
    return (
        <div
        className={styles.testCaseSection}
        >
            <div
            className={styles.actionContainer}
            >
                <TestCaseFilterForm />
                <Link href = "/admin/create-test-case">
                    <button
                    className={commonStyles.btn}
                    >
                        Create New
                    </button>
                </Link>
            </div>
            {children}
        </div>
    );
}