from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy import create_engine, Select
from sqlalchemy.orm import sessionmaker, Session
from src.models import Base, Chunk, Conversation
from src.dto import ChunkCreateDTO, ChunkDTO, QueryDTO, QuizResponse
from src.rag_pipeline import RAGPipeLine
from openai import RateLimitError
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
db_url = os.getenv("DB_URL")
engine = create_engine(url = db_url)
session = sessionmaker(bind = engine, autoflush = False, autocommit = False)

Base.metadata.create_all(bind = engine)

rag_pipeline = RAGPipeLine()

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()


@app.get('/')
def greet():
    return 'Server Working!!!'


@app.post('/embedding')
def create_embeddings(chunk_full: ChunkCreateDTO, db: Session = Depends(get_db)):
    chunks = rag_pipeline.create_chunks(chunk_full)

    db.add_all(chunks)
    db.commit()

    return {'message': 'success'}

@app.get("/embedding", response_model=list[ChunkDTO])
def get_embeddings(
    course_id: int | None = Query(default=None, gt=0),
    chapter_id: int | None = Query(default=None, gt=0),
    cursor: int | None = Query(default=None, gt=0),
    db: Session = Depends(get_db)
):
    statement = Select(Chunk)

    # Filter by course if provided
    if course_id is not None:
        statement = statement.where(
            Chunk.course_id == course_id
        )

    # Filter by chapter if provided
    if chapter_id is not None:
        statement = statement.where(
            Chunk.chapter_id == chapter_id
        )

    # Cursor condition
    if cursor is not None:
        statement = statement.where(
            Chunk.id > cursor
        )

    # Pagination
    statement = (
        statement
        .order_by(Chunk.id)
        .limit(15)
    )

    result = db.execute(statement)

    chunks: list[Chunk] = result.scalars().all()

    return [
        ChunkDTO.model_validate(chunk)
        for chunk in chunks
    ]

from fastapi import HTTPException, Query
from sqlalchemy import delete


@app.delete("/embedding")
def delete_embeddings(
    course_id: int | None = Query(default=None, gt=0),
    chapter_id: int | None = Query(default=None, gt=0),
    id: int | None = Query(default=None, gt=0),
    db: Session = Depends(get_db)
):
    statement = delete(Chunk)

    # If id is provided, delete that specific chunk
    if id is not None:
        statement = statement.where(
            Chunk.id == id
        )

    # Filter by course if provided
    if course_id is not None:
        statement = statement.where(
            Chunk.course_id == course_id
        )

    # Filter by chapter if provided
    if chapter_id is not None:
        statement = statement.where(
            Chunk.chapter_id == chapter_id
        )

    try:
        result = db.execute(statement)

        if result.rowcount == 0:
            raise HTTPException(
                status_code=404,
                detail="No matching chunks found."
            )

        db.commit()

        return {
            "message": f"{result.rowcount} chunk(s) deleted successfully.",
            "deleted_count": result.rowcount
        }

    except HTTPException:
        raise

    except Exception:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Failed to delete chunks."
        )

@app.post("/query")
def ask_query(query: QueryDTO, db: Session = Depends(get_db)):

    query_embedding = rag_pipeline.apply_embedding(
        [query.query]
    )[0]

    statement = (
        Select(Chunk)
        .where(
            Chunk.course_id == query.course_id,
            Chunk.chapter_id == query.chapter_id,
            Chunk.embedding.cosine_distance(query_embedding) < 0.4,
        )
        .order_by(
            Chunk.embedding.cosine_distance(query_embedding)
        )
        .limit(3)
    )

    result = db.execute(statement)

    # Get up to 3 matching chunks
    chunks: list[Chunk] = result.scalars().all()

    # Combine retrieved chunks into one context
    context: str | None = None

    if chunks:
        context = "\n\n".join(
            chunk.text for chunk in chunks
        )

    conversation_statement = (
        Select(Conversation)
        .where(
            Conversation.user_id == query.user_id,
            Conversation.course_id == query.course_id,
            Conversation.chapter_id == query.chapter_id,
        )
        .order_by(
            Conversation.id.desc()
        )
        .limit(10)
    )

    conversation_result = db.execute(
        conversation_statement
    )

    conversation_history: list[Conversation] = (
        conversation_result.scalars().all()
    )

    conversation_history_data: list[dict[str, str]] = [
        {
            "user_query": conversation.user_query,
            "llm_response": conversation.llm_response,
        }
        for conversation in conversation_history
    ]

    try:

        llm_response = rag_pipeline.ask_llm(
            query=query.query,
            context=context,
            conversation_history=conversation_history_data,
        )

    except RateLimitError:
        raise HTTPException(
            status_code=503,
            detail="AI service is temporarily unavailable. Please try again later."
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal server error."
        )

    try:

        new_conversation = Conversation(
            user_id=query.user_id,
            course_id=query.course_id,
            chapter_id=query.chapter_id,
            user_query=query.query,
            llm_response=llm_response,
        )

        db.add(new_conversation)
        db.commit()

    except Exception:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Failed to save conversation."
        )

    return {
        "response": llm_response
    }


@app.get("/quiz", response_model=QuizResponse)
def get_quiz(
    course_id: int,
    chapter_id: int,
    db: Session = Depends(get_db)
):
    statement = (
        Select(Chunk)
        .where(
            Chunk.course_id == course_id,
            Chunk.chapter_id == chapter_id
        )
        .order_by(Chunk.id)
    )

    result = db.execute(statement)

    chunks: list[Chunk] = result.scalars().all()

    if not chunks:
        raise HTTPException(
            status_code=404,
            detail="No course content found for this chapter."
        )

    context = "\n\n".join(
        f"Chunk {index + 1}:\n{chunk.text}"
        for index, chunk in enumerate(chunks)
    )

    try:
        quiz = rag_pipeline.generate_quiz(
            context=context
        )

        return quiz

    except RateLimitError:
        raise HTTPException(
            status_code=503,
            detail="AI service is temporarily unavailable. Please try again later."
        )

    except ValueError:
        raise HTTPException(
            status_code=502,
            detail="AI service returned an invalid quiz format."
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal server error."
        )