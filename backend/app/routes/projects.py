from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import uuid

from ..core.database import get_db
from ..models.project import Project
from ..auth.jwt import verify_token

router = APIRouter(prefix="/projects", tags=["projects"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None

@router.get("/")
async def list_projects(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    projects = db.query(Project).filter(Project.user_id == uuid.UUID(user_id)).all()
    
    return {
        "projects": [
            {"id": str(p.id), "name": p.name, "status": p.status}
            for p in projects
        ]
    }

@router.post("/")
async def create_project(
    request: ProjectCreate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    project = Project(
        id=uuid.uuid4(),
        user_id=uuid.UUID(user_id),
        name=request.name,
        description=request.description
    )
    
    db.add(project)
    db.commit()
    
    return {"id": str(project.id), "name": project.name}
