// Quiz.tsx
'use client'

import { QuizQuestion, QuizRequest } from '@/helper/types';
import { useState } from 'react';

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
    const [showExplanation, setShowExplanation] = useState(false);

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
        <div className="text-[1.6rem] w-full min-h-[30rem] relative border border-[var(--main-color-primary-dark)] p-4">
            {/* Show Explanation Modal */}
            {showExplanation && (
                <div className="bg-[rgba(128,128,128,0.728)] absolute w-full h-full flex justify-center items-center">
                    <h3 className="text-[#1f2937] text-[2rem] mb-4">
                        Explanation
                    </h3>
                    <p className="text-[#374151] text-[1.6rem] leading-relaxed text-center">
                        {questions[currentQuestion].explanation}
                    </p>
                    <button
                        className="bg-[var(--main-color-primary-dark)] text-white px-6 py-3 rounded-2xl flex gap-3 justify-center items-center min-w-fit cursor-pointer bg-gray-400"
                        onClick={() => setShowExplanation(false)}
                    >
                        Close
                    </button>
                </div>
            )}

            {/* Start Quiz Screen */}
            {questions.length === 0 && (
                <div className="bg-[rgba(128,128,128,0.728)] absolute w-full h-full flex justify-center items-center">
                    <button
                        className="bg-[var(--main-color-primary-dark)] text-white px-6 py-3 rounded-2xl flex gap-3 justify-center items-center min-w-fit cursor-pointer"
                    >
                        Start Quiz
                    </button>
                </div>
            )}

            {/* Results Screen */}
            {showResult && (
                <div className="bg-[rgba(128,128,128,0.728)] absolute w-full h-full flex justify-center items-center">
                    <p>Final Score: {score} / {questions.length}</p>
                    <button
                        className="bg-[var(--main-color-primary-dark)] text-white px-6 py-3 rounded-2xl flex gap-3 justify-center items-center min-w-fit cursor-pointer"
                        onClick={resetQuiz}
                    >
                        Play Again
                    </button>
                </div>
            )}

            {/* Quiz Questions */}
            {(questions.length > 0 && !showResult) && (
                <>
                    <h2 className="border border-[var(--main-color-primary-dark)] text-center px-8 py-4 text-[2rem] rounded-[2rem]">
                        {questions[currentQuestion].question}
                    </h2>

                    <div className="grid grid-cols-2 grid-rows-2 mt-8 gap-8">
                        {questions[currentQuestion].options.map((option, index) => {
                            const letters = ['A', 'B', 'C', 'D'];
                            const isSelected = selected === option;
                            const isCorrect = revealAnswer && option[0] === questions[currentQuestion].correct_answer;
                            const isWrong = revealAnswer && isSelected && option[0] !== questions[currentQuestion].correct_answer;
                            return (
                                <button
                                    key={option}
                                    data-letter={letters[index]}
                                    className={`w-full h-full border border-[var(--main-color-primary-light)] px-8 py-4 cursor-pointer
                                        ${isSelected ? 'bg-[var(--main-color-gray-1)]' : ''}
                                        ${isCorrect ? 'bg-[var(--main-color-primary-light)]' : ''}
                                        ${isWrong ? 'bg-red-600' : ''}`}
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
                    <div className="flex gap-4 mt-4">
                        {/* Show explanation button - only show after answer is revealed */}
                        {revealAnswer && (
                            <button
                                className="bg-[var(--main-color-primary-dark)] text-white px-6 py-3 rounded-2xl flex gap-3 justify-center items-center min-w-fit cursor-pointer"
                                onClick={() => setShowExplanation(true)}
                            >
                                Show Explanation
                            </button>
                        )}

                        {/* Evaluate button - only show when answer is selected but not revealed */}
                        {selected && !revealAnswer && (
                            <button
                                className="bg-[var(--main-color-primary-dark)] text-white px-6 py-3 rounded-2xl flex gap-3 justify-center items-center min-w-fit cursor-pointer"
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
                                className="bg-[var(--main-color-primary-dark)] text-white px-6 py-3 rounded-2xl flex gap-3 justify-center items-center min-w-fit cursor-pointer"
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
                                className="bg-[var(--main-color-primary-dark)] text-white px-6 py-3 rounded-2xl flex gap-3 justify-center items-center min-w-fit cursor-pointer"
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