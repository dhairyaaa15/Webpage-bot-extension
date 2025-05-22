from flask import Flask, request, jsonify
from flask_cors import CORS
from analyzer import get_webpage_analysis
from chatbot import get_chatbot_response

app = Flask(__name__)
CORS(app)  
system_prompts = {}  # Store by session_id

@app.post("/analyze")
def analyze():
    url = request.json["url"]
    session_id = "test123"
    prompt_preview = get_webpage_analysis(url)
    # Store the analyzed summary as the system prompt for this session
    system_prompts[session_id] = prompt_preview
    return {
        "message": "Webpage analyzed",
        "prompt_preview": prompt_preview,
        "session_id": session_id
    }

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question")
    session_id = data.get("session_id")
    if not question:
        return jsonify({"error": "Missing question"}), 400
    if session_id not in system_prompts:
        return jsonify({"error": "No prompt found. Analyze a webpage first."}), 400

    answer = get_chatbot_response(system_prompts[session_id], question)
    # If answer is a RunResponse, extract the assistant's message content
    if hasattr(answer, "messages"):
        # Find the last assistant message
        assistant_msg = next((m for m in reversed(answer.messages) if getattr(m, "role", None) == "assistant"), None)
        if assistant_msg:
            return jsonify({"answer": assistant_msg.content})
        else:
            return jsonify({"answer": str(answer)})
    # If answer is just a string
    return jsonify({"answer": str(answer)})

if __name__ == "__main__":
    app.run(debug=True)