import chapterStyles from '@/styles/pages/learn/java/chapters/chapter-1.module.scss'
import Chapter1Content from '@/components/learn/java/chapters/Chapter1Content'
export default function Page() {
    return (
        <div className={chapterStyles.scrollContainer}>
            <div className={chapterStyles.chapterContent}>
                
                <h1 className={chapterStyles.title}>Chapter 1: Introduction to Java</h1>
                
                <Chapter1Content />
                
            </div>
        </div>
    );
}