from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import hashlib
import tempfile
import whisper

model = whisper.load_model("tiny.en")

app = FastAPI()


def compute_sha256(file_bytes: bytes) -> str:
    return hashlib.sha256(file_bytes).hexdigest()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/transcribe")
async def upload_video(video: UploadFile = File(...)):
    file_bytes = await video.read()
    video_hash = compute_sha256(file_bytes)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
        temp_file.write(file_bytes)
        temp_path = temp_file.name

    result = model.transcribe(temp_path)
    # print(result)

    return JSONResponse({"transcription": result["text"]})
