import os
import requests
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

API_KEY = "SUA_CHAVE_AQUI"
MODEL = "gemini-2.0-flash"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    messages = body.get("messages", [])

    prompt_text = "\n".join([f"{m['role'].capitalize()}: {m['content']}" for m in messages])

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt_text}
                ]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        data = response.json()

        text_raw = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "Sem resposta")
        
        text = text_raw.replace("Model:","").strip()
        return {"reply": text}
    else:
        return {
            "error": f"API Error {response.status_code}",
            "details": response.text
        }