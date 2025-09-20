import chapterStyles from '@/styles/pages/learn/java/chapters/chapter.module.scss'
import IntroContent from '@/components/learn/java/chapters/IntroContent';
export default function Page() {
    return (
        <div className={chapterStyles.scrollContainer}>
            <div className={chapterStyles.chapterContent}>
                
                <h1 className={chapterStyles.title}>Introduction to Java</h1>

                <IntroContent />

            </div>
        </div>
    );
}