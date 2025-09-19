import chapterStyles from '@/styles/pages/learn/java/chapters/chapter.module.scss'

import Chapter2Content from '@/components/learn/java/chapters/Chapter2Content';
export default function Page() {
    const chapterTitle: string = "Control Flow Statements";
    return (
        <div className={chapterStyles.scrollContainer}>
            <div className={chapterStyles.chapterContent}>

                <h1 className={chapterStyles.title}>{chapterTitle}</h1>
                
                <Chapter2Content />
                
            </div>
        </div>
    );
}