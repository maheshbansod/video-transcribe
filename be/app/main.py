import uuid
from fastapi import Depends, FastAPI, File, UploadFile
import hashlib
import tempfile
from pydantic import BaseModel
from sqlalchemy.orm import Session
import whisper
from fastapi.middleware.cors import CORSMiddleware

from app.database.session import get_db
from app.models.video import Video

model = whisper.load_model("tiny.en")

print("starting")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def compute_sha256(file_bytes: bytes) -> str:
    return hashlib.sha256(file_bytes).hexdigest()


@app.get("/")
def read_root():
    return {"Hello": "World"}


class TranscribeResponse(BaseModel):
    id: uuid.UUID
    transcription: str
    cached: bool


@app.post("/transcribe", response_model=TranscribeResponse)
async def upload_video(video: UploadFile = File(...), db: Session = Depends(get_db)):
    file_bytes = await video.read()
    video_hash = compute_sha256(file_bytes)

    existing_video = db.query(Video).filter(Video.hash == video_hash).first()
    if existing_video:
        return TranscribeResponse(
            id=existing_video.id,
            transcription=existing_video.transcription,
            cached=True,
        )

    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
        temp_file.write(file_bytes)
        temp_path = temp_file.name

    result = model.transcribe(temp_path, fp16=False)
    transcription = result["text"]

    db_video = Video(
        filename=video.filename[:255] if video.filename else "",
        hash=video_hash,
        transcription=transcription,
    )
    db.add(db_video)
    db.commit()
    db.refresh(db_video)

    return TranscribeResponse(id=db_video.id, transcription=transcription, cached=False)
