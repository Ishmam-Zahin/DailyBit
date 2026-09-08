export type AIQuery = {
    user_id: number
    course_id: number
    chapter_id: number
    query: string
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

export type User = {
  id: number | null
  userName: string | null
  avatarLink: string | null
  role: 'USER' | 'ADMIN' | 'STAFF' | null
  token: string | null
}

export type Conversation = {
  id: number
  user_id: number
  course_id: number
  chapter_id: number
  user_query: string
  llm_response: string
}