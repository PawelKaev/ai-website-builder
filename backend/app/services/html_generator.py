from typing import Dict

class HTMLGenerator:
    def generate(self, structure: Dict) -> str:
        business_name = structure.get("business_name", "Мой сайт")
        sections_html = ""
        
        for section in structure.get("sections", []):
            sections_html += self._render_section(section)
        
        return f\"\"\"
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{business_name}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: Arial, sans-serif; }}
        section {{ padding: 60px 20px; }}
        .hero {{ background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-align: center; }}
        .hero h1 {{ font-size: 40px; margin-bottom: 20px; }}
    </style>
</head>
<body>
    {sections_html}
</body>
</html>
\"\"\"
    
    def _render_section(self, section: Dict) -> str:
        section_type = section.get("type", "")
        content = section.get("content", {})
        
        if section_type == "hero":
            return f\"\"\"
            <section class="hero">
                <h1>{content.get("headline", "")}</h1>
                <p>{content.get("text", "")}</p>
            </section>
            \"\"\"
        
        return f\"\"\"
        <section>
            <h2>{content.get("headline", section.get("title", ""))}</h2>
            <p>{content.get("text", "")}</p>
        </section>
        \"\"\"
