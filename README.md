# Webpage Analyzer & Chatbot Extension

This project is a full-stack web extension that analyzes any public webpage and enables users to chat with an AI assistant about its content. The system uses a Python Flask backend (with Playwright-powered crawling and Gemini LLM) and a React frontend, designed for use as a browser extension or standalone web app.

---

## Features

- **Webpage Analysis:** Scrape and summarize any public webpage.
- **AI Chatbot:** Ask questions about the analyzed page and get context-aware answers.
- **Session Management:** Each analysis is tied to a session for seamless chat experience.
- **Modern Stack:** Python (Flask, Playwright), React, Gemini LLM, CORS-enabled API.
- **Browser Extension Ready:** Can be loaded as a Chrome/Edge extension or run as a web app.

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js & npm
- [Playwright](https://playwright.dev/python/docs/intro) browsers installed (`playwright install`)
- Gemini API key (set in `.env`)

---

### Backend Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/webpage_extension.git
   cd webpage_extension/backend
   ```

2. **Install dependencies:**
   ```sh
   python -m venv venv
   venv\Scripts\activate  # On Windows
   pip install -r requirements.txt
   ```

3. **Install Playwright browsers:**
   ```sh
   playwright install
   ```

4. **Set up environment variables:**
   - Create a `.env` file with:
     ```
     GEMINI_API=your_gemini_api_key
     ```

5. **Run the backend:**
   ```sh
   python app.py
   ```
   The backend will run at `http://localhost:5000`.

---

### Frontend Setup

1. **Navigate to the frontend:**
   ```sh
   cd ../frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the frontend:**
   ```sh
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.

---

### Using as a Browser Extension

1. Build the frontend if needed:
   ```sh
   npm run build
   ```
2. Load the `frontend/dist` folder as an unpacked extension in your browser.

---

## API Endpoints

- `POST /analyze`  
  **Body:** `{ "url": "<webpage_url>" }`  
  **Response:** `{ "message": "...", "prompt_preview": "...", "session_id": "..." }`

- `POST /ask`  
  **Body:** `{ "question": "<your question>", "session_id": "<session_id>" }`  
  **Response:** `{ "answer": "<AI's answer>" }`

---

## Troubleshooting

- **CORS errors:** The backend uses `flask-cors` to allow frontend requests.
- **Playwright errors:** Run `playwright install` if you see browser missing errors.
- **Serialization errors:** Only strings are returned in API responses for chat answers.

---

## Contributing

Pull requests and issues are welcome! Please open an issue for bugs or feature requests.

---


## Credits

- [Playwright](https://playwright.dev/)
- [Gemini LLM](https://ai.google.dev/gemini-api/docs)
- [React](https://react.dev/)
- [Flask](https://flask.palletsprojects.com/)
