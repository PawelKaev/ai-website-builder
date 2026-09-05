from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from ..services.llm_client import LLMClient
from ..services.html_generator import HTMLGenerator
from ..auth.jwt import verify_token

router = APIRouter(prefix="/generate", tags=["generation"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")
llm_client = LLMClient()
html_generator = HTMLGenerator()

class GenerateRequest(BaseModel):
    user_request: str

@router.post("/structure")
async def generate_structure(
    request: GenerateRequest,
    token: str = Depends(oauth2_scheme)
):
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    structure = await llm_client.generate_site_structure(request.user_request)
    return {"structure": structure}

@router.post("/html")
async def generate_html(
    request: dict,
    token: str = Depends(oauth2_scheme)
):
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    structure = request.get("structure", {})
    html = html_generator.generate(structure)
    return {"html": html}
