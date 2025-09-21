'use client'

import fetchQuizQuestions from '@/actions/fetchQuizQuestions';
import { QuizQuestion, QuizRequest } from '@/helper/types';
import styles from '@/styles/quiz/quiz.module.scss'
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

    const resetQuiz = () => {
        setSelected(null);
        setRevealAnswer(false);
        setQuestions([]);
        setScore(0);
        setShowResult(false);
        setCurrentQuestion(0);
        setShowExplanation(false);
    }

    return (
        <div className={styles.quizContainer}>
            {/* Show Explanation Modal */}
            {showExplanation && (
                <div className={styles.startContainer}>
                    <h3 style={{ color: '#1f2937', fontSize: '2rem', marginBottom: '1rem' }}>
                        Explanation
                    </h3>
                    <p style={{ color: '#374151', fontSize: '1.6rem', lineHeight: '1.6', textAlign: 'center' }}>
                        {questions[currentQuestion].explanation}
                    </p>
                    <button
                        className={`${styles.btn} ${styles.cancel}`}
                        onClick={() => setShowExplanation(false)}
                    >
                        Close
                    </button>
                </div>
            )}

            {/* Start Quiz Screen */}
            {questions.length === 0 && (
                <div className={styles.startContainer}>
                    <button
                        className={styles.btn}
                        onClick={() => mutation.mutate({json})}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Loading...' : 'Start Quiz'}
                    </button>
                </div>
            )}

            {/* Results Screen */}
            {showResult && (
                <div className={styles.startContainer}>
                    <p>Final Score: {score} / {questions.length}</p>
                    <button
                        className={`${styles.btn} ${styles.playAgain}`}
                        onClick={resetQuiz}
                    >
                        Play Again
                    </button>
                </div>
            )}

            {/* Quiz Questions */}
            {(questions.length > 0 && !showResult) && (
                <>
                    <h2>{questions[currentQuestion].question}</h2>
                    
                    <div className={styles.optionsContainer}>
                        {questions[currentQuestion].options.map((option, index) => {
                            const letters = ['A', 'B', 'C', 'D'];
                            return (
                                <button
                                    key={option}
                                    data-letter={letters[index]}
                                    className={`${styles.optionBtn} 
                                        ${selected === option ? styles.selected : ''} 
                                        ${(revealAnswer && option[0] === questions[currentQuestion].correct_answer) ? styles.correct : ''} 
                                        ${(revealAnswer && selected === option && option[0] !== questions[currentQuestion].correct_answer) ? styles.wa : ''}`}
                                    onClick={() => {
                                        if(revealAnswer) return;
                                        setSelected(state => {
                                            if(state == option) return null;
                                            return option;
                                        });
                                    }}
                                >
                                    {option.substring(3)} {/* Remove the "A. ", "B. " etc. prefix since we're showing it in ::before */}
                                </button>
                            );
                        })}
                    </div>

                    {/* Action Buttons Container */}
                    <div className={styles.buttonContainer}>
                        {/* Show explanation button - only show after answer is revealed */}
                        {revealAnswer && (
                            <button
                                className={`${styles.btn} ${styles.showExplanation}`}
                                onClick={() => setShowExplanation(true)}
                            >
                                Show Explanation
                            </button>
                        )}

                        {/* Evaluate button - only show when answer is selected but not revealed */}
                        {selected && !revealAnswer && (
                            <button
                                className={styles.btn}
                                onClick={() => {
                                    if(selected[0] === questions[currentQuestion].correct_answer){
                                        setScore(state => state + 1)
                                    }
                                    setRevealAnswer(true);
                                }}
                            >
                                EVALUATE
                            </button>
                        )}

                        {/* Next button - only show after answer is revealed and not last question */}
                        {revealAnswer && ((currentQuestion + 1) < questions.length) && (
                            <button
                                className={styles.btn}
                                onClick={() => {
                                    setSelected(null);
                                    setRevealAnswer(false);
                                    setCurrentQuestion(state => state + 1);
                                }}
                            >
                                NEXT QUESTION
                            </button>
                        )}

                        {/* Finish button - only show after answer is revealed and is last question */}
                        {revealAnswer && ((currentQuestion + 1) === questions.length) && (
                            <button
                                className={styles.btn}
                                onClick={() => {
                                    setShowResult(true);
                                }}
                            >
                                FINISH QUIZ
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}