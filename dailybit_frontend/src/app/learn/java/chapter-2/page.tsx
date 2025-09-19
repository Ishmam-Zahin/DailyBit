import chapterStyles from '@/styles/pages/learn/java/chapters/chapter.module.scss'

import Chapter2Content from '@/components/learn/java/chapters/Chapter2Content';
export default function Page() {
    return (
        <div className={chapterStyles.scrollContainer}>
            <div className={chapterStyles.chapterContent}>
                
                <h1 className={chapterStyles.title}>Control Flow Statements</h1>
                
                <Chapter2Content />
                
            </div>
        </div>
    );
}