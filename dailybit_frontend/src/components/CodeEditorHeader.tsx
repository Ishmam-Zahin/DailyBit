import styles from '@/styles/learn.module.scss'
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

export default function CodeEditorHeader(
    {
        problemIds,
        problemId,
        setProblemId,
        language,
        setLanguage,
        handleSubmit,
        setOutput,
    }:
    {
        problemIds: string[],
        problemId: string,
        setProblemId: Dispatch<SetStateAction<string>>,
        language: string,
        setLanguage: Dispatch<SetStateAction<string>>,
        handleSubmit: () => Promise<any>,
        setOutput: Dispatch<SetStateAction<string>>,
    }
){
    const mutation = useMutation({
        mutationFn: handleSubmit,
        onSuccess: (data) => {
            setOutput(data);
            toast.success('ACCEPTED')
        },
        onError: (err: any) => {
            setOutput(err);
        }
    })
    return (
        <div
        className={styles.codeEditorHeader}
        >
            <div>
                <label htmlFor="problemId">Problem ID: </label>
                <select
                name="problemId"
                id="problemId"
                defaultValue={problemId}
                onChange={(e) => setProblemId(e.target.value)}
                >
                    <option value="none">None</option>
                    {problemIds.map((problemId) => {
                        return <option key={problemId} value={problemId}>{problemId}</option>
                    })}
                </select>
                <label htmlFor="language">Language: </label>
                <select
                name="language"
                id="language"
                defaultValue={language}
                onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="java">JAVA</option>
                    <option value="python">PYTHON</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                </select>
            </div>
            <div>
                <button
                className={`${styles.btn} ${styles.submitBtn} ${mutation.isPending && styles.disabled}`}
                disabled={mutation.isPending}
                onClick={() => mutation.mutate()}
                >
                    {problemId === 'none' ? 'RUN' : 'SUBMIT'}
                </button>
            </div>
        </div>
    );
}