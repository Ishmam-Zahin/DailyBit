from typing import Any

from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter
from src.dto import ChunkCreateDTO, QuizQuestion
from src.models import Chunk
from openai import OpenAI
import json
import os
from dotenv import load_dotenv

load_dotenv()

class RAGPipeLine:
    def __init__(self, model_name: str = 'BAAI/bge-small-en-v1.5', chunk_size: int = 500, overlap_size: int = 100):
        self.transformer = SentenceTransformer(model_name)
        self.splitter = RecursiveCharacterTextSplitter(
            separators = ['\n\n', '\n', ' ', ''],
             chunk_size = chunk_size,
             chunk_overlap = overlap_size,
             length_function = lambda text: len(text.split())
        )
        self.client = OpenAI(
            api_key = os.getenv("OPENROUTER_API_KEY"),
            base_url = 'https://openrouter.ai/api/v1',
        )

    def apply_embedding(self, texts: list[str]) -> list[list[float]]:
        embeddings = self.transformer.encode(texts).tolist()
        return embeddings

    def create_chunks(self, chunk_full: ChunkCreateDTO) -> list[Chunk]:
        paragraphs = chunk_full.text.split('\n\n')

        texts = []

        for paragraph in paragraphs:
            paragraph = paragraph.strip()

            if not paragraph:
                continue

            word_count = len(paragraph.split())

            if word_count <= self.splitter._chunk_size:
                texts.append(paragraph)
            else:
                texts.extend(
                    self.splitter.split_text(paragraph)
                )

        embeddings = self.apply_embedding(texts)

        chunks = []

        for text, embedding in zip(texts, embeddings):
            chunks.append(
                Chunk(
                    course_id=chunk_full.course_id,
                    chapter_id=chunk_full.chapter_id,
                    text=text,
                    embedding=embedding,
                )
            )

        return chunks

    def ask_llm(
        self,
        query: str,
        context: str | None,
        conversation_history: list[dict[str, str]],
        model_name: str = "openrouter/free"
    ) -> str:

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a helpful educational assistant. "
                    "Your job is to answer the user's question using the "
                    "available information.\n\n"

                    "The available information may contain two things:\n"
                    "1. Retrieved course content.\n"
                    "2. Previous conversation history.\n\n"

                    "If retrieved course content is available, use it as the "
                    "primary source as well as conversation history as secondary source for answering the question.\n\n"

                    "If no retrieved course content is available, use the "
                    "conversation history to understand whether the user's "
                    "question is a follow-up to something discussed previously.\n\n"

                    "If the question cannot be answered from either the "
                    "retrieved course content or the conversation history, "
                    "do not guess. Clearly say that there is not enough "
                    "information to answer the question."
                )
            }
        ]

        # Add previous conversation in chronological order.
        for conversation in reversed(conversation_history):
            messages.append(
                {
                    "role": "user",
                    "content": conversation["user_query"],
                }
            )

            messages.append(
                {
                    "role": "assistant",
                    "content": conversation["llm_response"],
                }
            )

        # Build the current question.
        if context is not None:
            current_message = (
                f"Retrieved course context:\n"
                f"{context}\n\n"
                f"Current question:\n"
                f"{query}"
            )
        else:
            current_message = (
                "No relevant course context was found for the current "
                "question.\n\n"
                f"Current question:\n"
                f"{query}\n\n"
                "Try to answer using the previous conversation if it provides "
                "enough information. Otherwise, say that there is not enough "
                "information."
            )

        messages.append(
            {
                "role": "user",
                "content": current_message,
            }
        )

        response = self.client.chat.completions.create(
            model=model_name,
            messages=messages,
        )

        return response.choices[0].message.content


    def generate_quiz(
        self,
        context: str,
        model_name: str = "openrouter/free",
        level: int = 1,
    ) -> list[QuizQuestion]:

        prompt = f"""
    Generate exactly 5 multiple-choice quiz questions from the following
    course material.

    Requirements:
    - Generate exactly 5 questions.
    - Each question must have exactly 4 options.
    - Only ONE option must be correct.
    - Question Difficulty and Source Rules:
        - The question set must follow the specified level: {level}.
        - Level 1: 100% of the questions must be directly based on the provided teaching context. Do not introduce concepts, facts, or topics that are not covered in the context.
        - Level 2: 50% of the questions must be directly based on the provided teaching context, while the other 50% must test knowledge from outside the context but remain within the same topics and concepts taught in the context.
        - Level 3: 100% of the questions must be based on knowledge outside the provided teaching context. However, every question must still relate to the same topics and concepts covered in the context.
    - Do not use information that is not present in the course material.
    - Questions should test understanding, not only memorization.
    - Include a mixture of conceptual, code-based, and reasoning questions
    when appropriate.
    - The "correct_answer" must contain the exact text of the correct option.
    - Every question must have:
    1. question
    2. options
    3. correct_answer
    4. explanation
    - Return ONLY valid JSON.
    - Do not use markdown.
    - Do not wrap the response in ```json or any other code fence.
    - Do not include any text before or after the JSON.

    Required JSON format:
        ]
            {{
                "question": "...",
                "options": [
                    "...",
                    "...",
                    "...",
                    "..."
                ],
                "correct_answer": "...",
                "explanation": "..."
            }}
        ]

    Course material:
    {context}
    """

        response = self.client.chat.completions.create(
            model=model_name,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an educational multiple-choice quiz generator. "
                        "Generate quizzes strictly from the provided course material."
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
        )

        content = response.choices[0].message.content

        try:
            data: list[Any] = json.loads(content)
        except json.JSONDecodeError:
            raise ValueError("LLM returned invalid JSON.")

        return [
            QuizQuestion.model_validate(question)
            for question in data
        ]