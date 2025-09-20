'use client'

import fetchQuizQuestions from '@/actions/fetchQuizQuestions';
import { QuizQuestion, QuizRequest } from '@/helper/types';
import styles from '@/styles/learn.module.scss'
import { useMutation } from '@tanstack/react-query';
import { use, useState } from 'react';
import toast from 'react-hot-toast';

export default function Quiz(
    {
        json = {
            topic: 'java fundamentals',
            difficulty: 'intermediate',
            num_questions: 5,
        },
    }:
    {
        json?: QuizRequest
    }
){
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selected, setSelected] = useState<string | null>(null)
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const[showExplanation, setShowExplanation] = useState(false);
    const mutation = useMutation({
        mutationFn: fetchQuizQuestions,
        onSuccess: (data)=>{
            setQuestions(data['questions']);
        },
        onError: (err)=>{
            console.log(err);
        }
    })
    return (
        <div
        className={styles.quizContainer}
        >
            {revealAnswer && (
                <button
                className={styles.btn}
                onClick={() => setShowExplanation(true)}
                >show why</button>
            )}
            {showExplanation && (
                <div
                className={styles.startContainer}
                >
                    {questions[currentQuestion].explanation}
                    <button
                    className={styles.btn}
                    onClick={()=>setShowExplanation(false)}
                    >
                        cancel
                    </button>
                </div>
            )}
            {questions.length === 0 && (
                <div
                className={styles.startContainer}
                >
                    <button
                    className={styles.btn}
                    onClick={()=>mutation.mutate({json})}
                    >
                        {mutation.isPending ? 'Loading...' : 'Start Quiz'}
                    </button>
                </div>
            )}
            {showResult && (
                <div
                className={styles.startContainer}
                >
                    <p>Score: {score}</p>
                    <button
                    className={styles.btn}
                    onClick={()=>{
                        setSelected(null);
                        setRevealAnswer(false);
                        setQuestions([]);
                        setScore(0);
                        setShowResult(false);
                    }}
                    >
                        {mutation.isPending ? 'Loading...' : 'PLAY AGAIN'}
                    </button>
                </div>
            )}
            {(questions.length > 0) && (
                <>
                    <h2>{questions[currentQuestion].question}</h2>
                    <div
                    className={styles.optionsContainer}
                    >
                        {questions[currentQuestion].options.map(option => {
                            return (
                                <button
                                key={option}
                                className={`${styles.optionBtn} ${selected === option ? styles.selected : ''} ${(revealAnswer && selected && option[0] === questions[currentQuestion].correct_answer) ? styles.correct : ''} ${(revealAnswer && selected && selected === option && option[0] !== questions[currentQuestion].correct_answer) ? styles.wa : ''}`}
                                onClick={()=> {
                                    if(revealAnswer) return;
                                    setSelected(state => {
                                        if(state == option) return null;
                                        return option;
                                    });
                                }}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                    {selected && !revealAnswer && (
                        <button
                        className={styles.btn}
                        onClick={() => {
                            if(selected[0] === questions[currentQuestion].correct_answer){
                                setScore(state => state + 1)
                            }
                            setRevealAnswer(true);
                        }}
                        >EVALUATE</button>
                    )}
                    {revealAnswer && ((currentQuestion + 1) < questions.length) && (
                        <button
                        className={styles.btn}
                        onClick={() => {
                            setSelected(null);
                            setRevealAnswer(false);
                            setCurrentQuestion(state => state + 1);
                        }}
                        >NEXT</button>
                    )}
                    {revealAnswer && ((currentQuestion + 1) === questions.length) && (
                        <button
                        className={styles.btn}
                        onClick={() => {
                            setShowResult(true);
                        }}
                        >FINISH</button>
                    )}
                </>
            )}
        </div>
    );
}