import fetchSubmissions from '@/actions/fetchSubmissions';
import { useAppSelector } from '@/redux/ReduxStore';
import styles from '@/styles/learn.module.scss';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SetStateAction, useEffect, useState, Dispatch} from 'react';

type Submission = {
    id: number,
    result: string,
    submitTime: string,
    code: string
}


export default function CodeOutput(
    {
        problemId,
        output,
        setCode,
    }:
    {
        problemId: string,
        output: string,
        setCode: Dispatch<SetStateAction<string>>,
    }
){
    const token = useAppSelector(state=>state.user.token);
    const [activeBlock, setActiveBlock] = useState(1); // 1: output, 2:submissions

    const mutation = useMutation({
        mutationFn: fetchSubmissions
    });
    useEffect(()=>{
        mutation.mutate({problemId, token});
    }, [problemId]);
    const data:Submission[] = mutation.data ?? [];
    return (
        <>
            <div
            className={styles.outputHeader}
            >
                <button
                className={`${styles.btn} ${activeBlock === 1 ? styles.active : ''}`}
                onClick={()=>setActiveBlock(1)}
                >Output</button>
                {problemId !== 'none' && (
                    <>
                        <button
                        className={`${styles.btn} ${activeBlock === 2 ? styles.active : ''}`}
                        onClick={()=>setActiveBlock(2)}
                        >Submissions</button>
                    </>
                )}
            </div>
            {activeBlock === 1 && (
                <div
                className={styles.container}
                >
                    {output}
                </div>
            )}
            {activeBlock === 2 && (
                <div
                className={styles.container}
                >
                    {mutation.isPending ? 'Loading...' : data.length === 0 ? 'no submissions yet' : data.map((sub)=>
                    <div
                    key={sub['id']}
                    className={styles.submissionCard}
                    >
                        <p
                        className={`${sub.result === 'Accepted' ? styles.accept : styles.wa}`}
                        >{sub.result}</p>
                        <p>{sub.submitTime.split('T')[0]}</p>
                        <button
                        className={styles.textBtn}
                        onClick={() =>{
                            setCode(sub.code)
                        }}
                        >
                            <svg className={styles.icon}>
                                <use href="/sprite.svg#icon-embed2" />
                            </svg>
                        </button>
                        <button
                        className={styles.textBtn}
                        >
                            <svg className={styles.icon}>
                                <use href="/sprite.svg#icon-probot" />
                            </svg>
                        </button>
                    </div>)}
                </div>
            )}
        </>
    );
}