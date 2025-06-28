## video-transcriber

Transcribes video using [openai/whisper](https://github.com/openai/whisper) (tiny.en)

## Local development

### Requirements

- Docker
- pnpm : I haven't tried getting the FE inside docker yet - but it should probably work tbh

### Running

#### Backend
```
docker compose up -d
```
#### Frontend:
First create a file firebase-config.ts similar to firebase-config.sample.ts and put it in the same directory as the firebase-config.sample.ts with the correct values of your firebase configuration.
Then run:
```
pnpm install && pnpm dev
```

