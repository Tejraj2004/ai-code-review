from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routes.auth_routes import router as auth_router
from app.routes.review_routes import router as review_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI Code Review API",
    description="AI-powered code review platform",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(review_router)


@app.get("/")
def root():
    return {
        "message": "AI Code Review API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }