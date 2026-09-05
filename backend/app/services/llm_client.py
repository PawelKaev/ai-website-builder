import openai
import os
import json
from typing import Dict

class LLMClient:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")
        self.client = openai.OpenAI()
    
    async def generate_site_structure(self, user_request: str) -> Dict:
        prompt = f\"\"\"
        Создай структуру сайта на основе описания бизнеса.
        Описание: \"{user_request}\"
        Верни JSON с полями: business_name, site_type, target_audience, sections
        \"\"\"
        
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Ты — эксперт по веб-дизайну."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)
