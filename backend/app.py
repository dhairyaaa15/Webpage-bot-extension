from flask import Flask, request, jsonify
from analyzer import get_webpage_analysis
from chatbot import get_chatbot_response

app = Flask(__name__)
system_prompts = {}  # Store by session_id

@app.post("/analyze")
def analyze():
    url = request.json["url"]
    prompt_preview = get_webpage_analysis(url)
    return {
        "message": "Webpage analyzed",
        "prompt_preview": prompt_preview,
        "session_id": "test123"
    }

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    session_id = data.get("session_id", "default")
    question = data.get("question")

    if not question:
        return jsonify({"error": "Missing question"}), 400
    if session_id not in system_prompts:
        return jsonify({"error": "No prompt found. Analyze a webpage first."}), 400

    answer = get_chatbot_response(system_prompts[session_id], question)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)