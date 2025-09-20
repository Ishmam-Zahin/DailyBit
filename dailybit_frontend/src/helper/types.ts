export type AIQuery = {
    query: string,
    context: string,
    n_results: 2,
    similarity_threshold: 0.5,
}

export type QuizRequest = {
    topic: string,
    difficulty: string,
    num_questions: 5,
}

export type QuizQuestion = {
    question: string,
    options: string[],
    correct_answer: string,
    explanation: string
}