from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from sqlalchemy.orm import Session

from app.database import get_db
from app.models import CodeReview
from app.schemas import (
    CodeReviewRequest,
    CodeReviewResponse
)

from app.auth import verify_token
from app.services.ai_reviewer import review_code


router = APIRouter(
    prefix="/reviews",
    tags=["Code Review"]
)


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:
        user_id = verify_token(token)
        return user_id

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )


@router.post(
    "",
    response_model=CodeReviewResponse
)
def create_review(
    request: CodeReviewRequest,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):

    if not request.code.strip():
        raise HTTPException(
            status_code=400,
            detail="Code cannot be empty"
        )

    if len(request.code) > 30000:
        raise HTTPException(
            status_code=400,
            detail="Code is too large"
        )

    ai_review = review_code(
        request.language,
        request.code
    )

    new_review = CodeReview(
        user_id=user_id,
        language=request.language,
        code=request.code,
        review=ai_review
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return new_review


@router.get("")
def get_reviews(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):

    reviews = (
        db.query(CodeReview)
        .filter(CodeReview.user_id == user_id)
        .order_by(CodeReview.created_at.desc())
        .all()
    )

    return reviews