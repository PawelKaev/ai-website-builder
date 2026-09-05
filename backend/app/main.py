from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.init_db import init_db
from .routes import auth, projects, generation

app = FastAPI(
    title="AI Website Builder API",
    version="1.0.0",
    description="API для ИИ-конструктора сайтов"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(generation.router)

@app.on_event("startup")
async def startup():
    init_db()

@app.get("/")
async def root():
    return {"status": "ok", "service": "AI Website Builder"}
