from fastapi import FastAPI
from routers import facial_recognition

app = FastAPI()

app.include_router(facial_recognition.router, prefix="/api")
