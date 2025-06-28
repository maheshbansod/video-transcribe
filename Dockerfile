FROM python:3.12-slim-bookworm
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

RUN apt-get update && apt-get install -y ffmpeg \
    && apt install -y libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# todo: look into this optimisation again properly
# RUN --mount=type=cache,target=/root/.cache/uv \
#     --mount=type=bind,source=be/uv.lock,target=uv.lock \
#     --mount=type=bind,source=be/pyproject.toml,target=pyproject.toml \
#     uv sync --locked --no-install-project

# Copy the project into the image
ADD be/ /app

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked

CMD ["uv", "run", "uvicorn", "app.main:app", "--reload", "--host","0.0.0.0", "--port", "8000"]

