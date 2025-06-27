from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from .base import Base


class Video(Base):
    """
    Videos table
    """

    __tablename__ = "videos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=func.gen_random_uuid())

    filename = Column(String(255), nullable=False)

    hash = Column(String(64), unique=True, nullable=False)

    transcription = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), default=func.now())
