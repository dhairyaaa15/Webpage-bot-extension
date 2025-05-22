import os
from dotenv import load_dotenv
from agno.agent import Agent
from agno.tools.crawl4ai import Crawl4aiTools
from agno.models.google import Gemini
from io import StringIO
import sys
import re

load_dotenv()
api_key = os.getenv("GEMINI_API")

crawl_tool = Crawl4aiTools()

agent = Agent(
    model=Gemini(id="gemini-1.5-flash", api_key=api_key),
    description="You are an AI that extracts insights from a given webpage after scraping data!",
    tools=[crawl_tool],
    show_tool_calls=False,
)

def get_webpage_analysis(url):
    old_stdout = sys.stdout
    sys.stdout = captured_output = StringIO()
    try:
        agent.print_response(f"Scrape {url} and tell me about this webpage.")
        sys.stdout = old_stdout
        full_output = captured_output.getvalue()
        print("DEBUG: Agent output:\n", full_output)  # Add this line
        lines = full_output.split('\n')
        response_lines = []
        in_response_section = False

        for line in lines:
            # Start of response section
            if "Response" in line and "━" in line:
                in_response_section = True
                continue
            # End of response section
            if in_response_section and ("━" in line and line.strip().startswith("┗")):
                break
            # Collect lines in response section
            if in_response_section and "┃" in line:
                # Only extract the part after the first '┃'
                parts = line.split('┃', 1)
                if len(parts) > 1:
                    content = parts[1].strip()
                    if content:
                        response_lines.append(content)

        clean_response = ' '.join(response_lines).strip()
        # Remove ANSI escape codes
        clean_response = re.sub(r'\x1B\[[0-?]*[ -/]*[@-~]', '', clean_response)
        # Remove any remaining box characters
        clean_response = clean_response.replace('┃', '').replace('┗', '').replace('━', '')
        # Remove extra spaces
        clean_response = re.sub(r'\s+', ' ', clean_response).strip()
        if not clean_response:
            clean_response = "No insights could be extracted from the webpage."
        return clean_response
    except Exception as e:
        sys.stdout = old_stdout
        return f"Error occurred: {str(e)}"
    finally:
        sys.stdout = old_stdout
