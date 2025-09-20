import styles from '@/styles/pages/admin/problems/problems.module.scss'
import commonStyles from '@/styles/common.module.scss'
import ProblemFilterForm from '@/components/ProblemFilterForm';
import fetchSections from '@/actions/fetchSections';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function layout(
    {
        children
    }:
    Readonly<{
        children: React.ReactNode
    }>
){
    const cooki = await cookies();
    const token = cooki.get('jwt_token')?.value ?? null;
    const sections = await fetchSections({token});
    return (
        <div
        className={styles.problemsSection}
        >
            <div
            className={styles.actionContainer}
            >
                <ProblemFilterForm sections={sections}/>
                <Link href = "/admin/create-problem">
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