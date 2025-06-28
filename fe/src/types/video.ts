
export type TranscribeResponse = {
  id: string,
  transcription: string;
  cached: boolean
}

export type TranscribeCallbackParams = {
  id: string,
  transcription: string;
  video: Blob
}

export type UploadCallbackParams = {
  video: Blob
}
