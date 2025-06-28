import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { TranscribeCallbackParams, TranscribeResponse, UploadCallbackParams } from "@/types/video";

const API_HOST = "http://localhost:8000";

type VideoUploaderProps = {
  onTranscribe: (d: TranscribeCallbackParams) => void
  onUpload: (d: UploadCallbackParams) => void
}

const VideoUploader = (props: VideoUploaderProps) => {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    streamRef.current = stream;
    chunksRef.current = [];

    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setVideoBlob(blob);
    };

    recorder.start();
    setMediaRecorder(recorder);
  };

  const handleStopRecording = () => {
    mediaRecorder?.stop();
    setMediaRecorder(null);
    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

  const handleUploadInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoBlob(file);
  };

  const handleUpload = async () => {
    if (!videoBlob) return;

    props.onUpload({ video: videoBlob });

    const formData = new FormData();
    formData.append("video", videoBlob);

    setIsTranscribing(true);
    try {
      const response = await fetch(`${API_HOST}/transcribe`, {
        method: "POST",
        body: formData,
      });
      const { id, transcription }: TranscribeResponse = await response.json();
      props.onTranscribe({ video: videoBlob, id, transcription });
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {<div className="flex gap-2">
        {!mediaRecorder && <Button onClick={handleStartRecording}>
          Start Screen Recording
        </Button>}
        {mediaRecorder && <Button onClick={handleStopRecording}>Stop Recording</Button>}
        <input type="file" accept="video/*" onChange={handleUploadInput} />
      </div>}

      {videoBlob && (
        <div className="space-y-2">
          <video
            src={URL.createObjectURL(videoBlob)}
            controls
            className="max-w-full h-[400px]"
          />
          {!isTranscribing && <Button onClick={handleUpload}>Upload Video</Button>}
          {isTranscribing && <>Transcribing...</>}
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
