from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import hashlib

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

    # Placeholder: store/retrieve from DB using video_hash
    return JSONResponse({"hash": video_hash})
