import os

class Settings:
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    secret_key: str = os.getenv("SECRET_KEY", "your-secret-key")
    database_url: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/site_builder")
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379")

settings = Settings()
