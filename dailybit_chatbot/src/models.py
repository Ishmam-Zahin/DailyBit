from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import Text, DateTime, func, Index
from pgvector.sqlalchemy import Vector
from datetime import datetime


class Base(DeclarativeBase):
    pass

class Conversation(Base):
    __tablename__ = 'conversations'

    id: Mapped[int] = mapped_column(primary_key = True, autoincrement = True)
    user_id: Mapped[int] = mapped_column(nullable = False)
    course_id: Mapped[int] = mapped_column(nullable = False)
    chapter_id: Mapped[int] = mapped_column(nullable = False)
    user_query: Mapped[str] = mapped_column(Text, nullable = False)
    llm_response: Mapped[str] = mapped_column(Text, nullable = False)

    __table_args__ = (
        Index(
            'ix_conversations_user_course_chapter',
            'user_id',
            'course_id',
            'chapter_id'
        ),
    )


class Chunk(Base):
    __tablename__ = 'chunks'

    id: Mapped[int] = mapped_column(primary_key = True, autoincrement = True)
    course_id: Mapped[int] = mapped_column(nullable = False)
    chapter_id: Mapped[int] = mapped_column(nullable = False)
    text: Mapped[str] = mapped_column(Text, nullable = False)
    embedding: Mapped[list[float] | None] = mapped_column(Vector(384), nullable = True, default = None)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone = True), server_default = func.now(), nullable = False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone = True), server_default = func.now(), server_onupdate = func.now())