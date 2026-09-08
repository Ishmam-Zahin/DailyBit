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

export type CourseCreateDTO = {
    name: string
}

export type QuizQuestion = {
    question: string,
    options: string[],
    correct_answer: string,
    explanation: string
}

export type ChapterCreateDTO = {
    courseId: number
    name: string
}

export type Course = {
  id: number
  name: string
  chapters: ChapterSummary[]
}

export type Chapter = {
  id: number
  course_id: number
  name: string
}

export type ChapterSummary = {
  id: number
  name: string
}

export type EmbeddingCreateDTO = {
  course_id: number,
  chapter_id: number,
  text: string
}

export type Embedding = {
  id: number
  course_id: number
  chapter_id: number
  text: string
  embedding: number[] | null
  created_at: string
  updated_at: string
}