import os
from dotenv import load_dotenv
from agno.agent import Agent
from agno.models.google import Gemini

load_dotenv()
api_key = os.getenv("GEMINI_API")

agent = Agent(
    model=Gemini(id="gemini-1.5-flash", api_key=api_key),
    description="Answer questions based on webpage content.",
)

def get_chatbot_response(system_prompt: str, question: str) -> str:
    return agent.run(f"{system_prompt}\n\nUser: {question}")