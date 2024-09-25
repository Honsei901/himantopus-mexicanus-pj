from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import facial_recognition

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(facial_recognition.router, prefix="/api")
