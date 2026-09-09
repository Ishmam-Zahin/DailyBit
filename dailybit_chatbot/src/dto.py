from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime


class QueryDTO(BaseModel):
    user_id: int = Field(gt = 0)
    course_id: int = Field(gt = 0)
    chapter_id: int = Field(gt = 0)
    query: str = Field(min_length = 1)


class ChunkCreateDTO(BaseModel):
    course_id: int = Field(gt = 0)
    chapter_id: int = Field(gt = 0)
    text: str = Field(min_length = 10)


class ChunkDTO(BaseModel):
    id: int = Field(gt = 0)
    course_id: int = Field(gt = 0)
    chapter_id: int = Field(gt = 0)
    text: str = Field(min_length = 1)
    embedding: list[float] | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes = True)



class QuizQuestion(BaseModel):
    question: str
    options: list[str] = Field(min_length=4, max_length=4)
    correct_answer: str
    explanation: str

    model_config = ConfigDict(from_attributes = True)


class ConversationDTO(BaseModel):
    id: int = Field(gt = 0)
    user_id: int = Field(gt = 0)
    course_id: int = Field(gt = 0)
    chapter_id: int = Field(gt = 0)
    user_query: str = Field(min_length = 1)
    llm_response: str = Field(min_length = 1)

    model_config = ConfigDict(from_attributes = True)