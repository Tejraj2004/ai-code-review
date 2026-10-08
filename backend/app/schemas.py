from pydantic import BaseModel


class UserCreate(BaseModel):
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class CodeReviewRequest(BaseModel):
    language: str
    code: str


class CodeReviewResponse(BaseModel):
    id: int
    language: str
    code: str
    review: str