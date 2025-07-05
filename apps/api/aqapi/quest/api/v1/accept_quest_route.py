from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AcceptQuestRequest(BaseModel):
    user_id: int

class AcceptQuestResponse(BaseModel):
    message: str
    quest_id: int
    accepted_by: int

@router.post("/{quest_id}/accept", response_model=AcceptQuestResponse)
async def accept_quest(quest_id: int, request: AcceptQuestRequest):
    return AcceptQuestResponse(
        message="Quest accepted",
        quest_id=quest_id,
        accepted_by=request.user_id
    )
