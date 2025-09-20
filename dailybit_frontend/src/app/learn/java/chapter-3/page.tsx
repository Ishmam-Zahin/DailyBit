import Chapter3Content from "@/components/learn/java/chapters/Chapter3Content";
import Quiz from "@/components/Quiz";
import chapterStyles from '@/styles/pages/learn/java/chapters/chapter.module.scss'
export default function Page() {
    const chapterTitle: string = "Java Loops";
    return (
        <div className={chapterStyles.scrollContainer}>
            <div className={chapterStyles.chapterContent}>

                <h1 className={chapterStyles.title}>{chapterTitle}</h1>

                <Quiz/>

            </div>
        </div>
    );
}