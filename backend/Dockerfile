FROM ghcr.io/astral-sh/uv:python3.14-alpine

WORKDIR /app

COPY requirements.txt .
RUN uv pip install --system -r requirements.txt

COPY . .

EXPOSE 7676
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7676"]
