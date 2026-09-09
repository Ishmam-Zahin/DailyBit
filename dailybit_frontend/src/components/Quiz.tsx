// Quiz.tsx
'use client'

import { QuizResponse } from '@/helper/types';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { getQuiz } from '@/actions/ai'; // adjust path
import toast from 'react-hot-toast';
import { Check, X, Loader2 } from 'lucide-react';

type QuizStage = 'start' | 'level' | 'quiz' | 'result';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function Quiz(
    {
        courseId,
        chapterId,
    }:
    {
        courseId: number,
        chapterId: number,
    }
){
    const [stage, setStage] = useState<QuizStage>('start');
    const [questions, setQuestions] = useState<QuizResponse[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);

    const {
        mutate: fetchQuiz,
        isPending: isLoading,
    } = useMutation({
        mutationFn: (level: number) => getQuiz(courseId, chapterId, level),
        onSuccess: (data) => {
            setQuestions(data);
            setStage('quiz');
        },
        onError: () => {
            toast.error('Failed to load quiz. Please try again.');
            setStage('start');
        },
    });

    const resetQuiz = () => {
        setSelected(null);
        setRevealAnswer(false);
        setQuestions([]);
        setScore(0);
        setCurrentQuestion(0);
        setShowExplanation(false);
    };

    const handleExit = () => {
        resetQuiz();
        setStage('start');
    };

    const handleSelectLevel = (level: number) => {
        setStage('quiz');
        fetchQuiz(level);
    };

    const handlePlayAgain = () => {
        resetQuiz();
        setStage('level');
    };

    const current = questions[currentQuestion];

    return (
        <div className="relative w-full min-h-[28rem] rounded-2xl border border-white/10 bg-[var(--main-color-dark-1)] text-white shadow-lg overflow-hidden">

            {/* Explanation Modal */}
            {showExplanation && current && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl bg-[var(--main-color-dark-1)] border border-white/10 p-6 shadow-xl">
                        <h3 className="text-base font-semibold text-white mb-3">
                            Explanation
                        </h3>
                        <p className="text-sm leading-relaxed text-white/70">
                            {current.explanation}
                        </p>
                        <button
                            className="mt-5 w-full cursor-pointer rounded-lg bg-[var(--main-color-primary-dark)] px-4 py-2 text-sm text-white transition-colors hover:bg-[var(--main-color-primary-light)]"
                            onClick={() => setShowExplanation(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Start Screen */}
            {stage === 'start' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <h3 className="text-lg font-semibold text-white">Ready to test yourself?</h3>
                    <button
                        className="cursor-pointer rounded-lg bg-[var(--main-color-primary-dark)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--main-color-primary-light)]"
                        onClick={() => setStage('level')}
                    >
                        Start Quiz
                    </button>
                </div>
            )}

            {/* Difficulty Level Screen */}
            {stage === 'level' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <h3 className="text-lg font-semibold text-white">Select Difficulty</h3>
                    <div className="flex gap-3">
                        <button
                            className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-5 py-2 text-sm text-white transition-colors hover:bg-[var(--main-color-primary-dark)]"
                            onClick={() => handleSelectLevel(1)}
                        >
                            Easy
                        </button>
                        <button
                            className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-5 py-2 text-sm text-white transition-colors hover:bg-[var(--main-color-primary-dark)]"
                            onClick={() => handleSelectLevel(2)}
                        >
                            Medium
                        </button>
                        <button
                            className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-5 py-2 text-sm text-white transition-colors hover:bg-[var(--main-color-primary-dark)]"
                            onClick={() => handleSelectLevel(3)}
                        >
                            Hard
                        </button>
                    </div>
                </div>
            )}

            {/* Loading Screen */}
            {stage === 'quiz' && isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <Loader2 className="animate-spin text-[var(--main-color-primary-light)]" size={28} />
                    <p className="text-sm text-white/70">Fetching quiz...</p>
                </div>
            )}

            {/* Results Screen */}
            {stage === 'result' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <div className="text-center">
                        <p className="text-sm text-white/50">Your Score</p>
                        <p className="text-3xl font-bold text-white mt-1">
                            {score} <span className="text-white/40 text-xl">/ {questions.length}</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            className="cursor-pointer rounded-lg bg-[var(--main-color-primary-dark)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--main-color-primary-light)]"
                            onClick={handlePlayAgain}
                        >
                            Play Again
                        </button>
                        <button
                            className="cursor-pointer rounded-lg border border-white/10 px-5 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
                            onClick={handleExit}
                        >
                            Exit
                        </button>
                    </div>
                </div>
            )}

            {/* Quiz Questions */}
            {stage === 'quiz' && !isLoading && current && (
                <div className="p-5">
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-medium text-white/50">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <button
                            className="cursor-pointer rounded-md px-2 py-1 text-xs text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                            onClick={handleExit}
                        >
                            Exit
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 w-full rounded-full bg-white/10 mb-5 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-[var(--main-color-primary-light)] transition-all"
                            style={{ width: `${((currentQuestion + (revealAnswer ? 1 : 0)) / questions.length) * 100}%` }}
                        />
                    </div>

                    {/* Question */}
                    <h2 className="text-base font-medium leading-snug text-white mb-5">
                        {current.question}
                    </h2>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {current.options.map((option, index) => {
                            const isSelected = selected === option;
                            const isCorrectOption = option === current.correct_answer;
                            const isCorrect = revealAnswer && isCorrectOption;
                            const isWrong = revealAnswer && isSelected && !isCorrectOption;

                            return (
                                <button
                                    key={option}
                                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm cursor-pointer transition-colors
                                        ${isCorrect ? 'border-emerald-500 bg-emerald-500/15 text-white' : ''}
                                        ${isWrong ? 'border-red-500 bg-red-500/15 text-white' : ''}
                                        ${!revealAnswer && isSelected ? 'border-[var(--main-color-primary-light)] bg-white/10 text-white' : ''}
                                        ${!revealAnswer && !isSelected ? 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10' : ''}
                                        ${revealAnswer && !isCorrect && !isWrong ? 'border-white/10 bg-white/5 text-white/50' : ''}
                                    `}
                                    onClick={() => {
                                        if (revealAnswer) return;
                                        setSelected(state => state === option ? null : option);
                                    }}
                                >
                                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold
                                        ${isCorrect ? 'bg-emerald-500 text-white' : ''}
                                        ${isWrong ? 'bg-red-500 text-white' : ''}
                                        ${!isCorrect && !isWrong ? 'bg-white/10 text-white/60' : ''}
                                    `}>
                                        {isCorrect ? <Check size={14} /> : isWrong ? <X size={14} /> : LETTERS[index]}
                                    </span>
                                    <span>{option}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-5">
                        {revealAnswer && (
                            <button
                                className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
                                onClick={() => setShowExplanation(true)}
                            >
                                Show Explanation
                            </button>
                        )}

                        {selected && !revealAnswer && (
                            <button
                                className="ml-auto cursor-pointer rounded-lg bg-[var(--main-color-primary-dark)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--main-color-primary-light)]"
                                onClick={() => {
                                    if (selected === current.correct_answer) {
                                        setScore(state => state + 1);
                                    }
                                    setRevealAnswer(true);
                                }}
                            >
                                Evaluate
                            </button>
                        )}

                        {revealAnswer && ((currentQuestion + 1) < questions.length) && (
                            <button
                                className="ml-auto cursor-pointer rounded-lg bg-[var(--main-color-primary-dark)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--main-color-primary-light)]"
                                onClick={() => {
                                    setSelected(null);
                                    setRevealAnswer(false);
                                    setCurrentQuestion(state => state + 1);
                                }}
                            >
                                Next Question
                            </button>
                        )}

                        {revealAnswer && ((currentQuestion + 1) === questions.length) && (
                            <button
                                className="ml-auto cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
                                onClick={() => setStage('result')}
                            >
                                Finish Quiz
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}