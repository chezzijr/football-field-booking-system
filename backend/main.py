from fastapi import FastAPI
from config import settings

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Hello FastAPI", "app_name": settings.app_name}
