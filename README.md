## video-transcriber

Transcribes video using [openai/whisper](https://github.com/openai/whisper) (tiny.en)

## Local development

### Requirements

- Docker
- pnpm : I haven't tried getting the FE inside docker yet - but it should probably work tbh

### Running

#### Backend
You need a .env file at `be/.env` with the same format as `be/.env.sample`

While running inside docker, you can simply copy .env.sample and it should work as it is.

```
docker compose up -d
```
##### Migrations
Get into the container and run migrations:
```
docker compose exec app bash
```
Run this:
```
source .venv/bin/activate
alembic upgrade head
```
You may need to restart the container probably ( or maybe not)
#### Frontend:
First create a file `firebase-config.ts` similar to `firebase-config.sample.ts` and put it in the same directory as the `firebase-config.sample.ts` with the correct values of your firebase configuration.
Then run:
```
pnpm install && pnpm dev
```

