# Webpage Explainer Agent

A web-based AI chat assistant powered by Google's Gemini API that can explain webpages in simple terms or answer general questions. Built with Node.js, Express, and a modern web UI.

## Features

- **Webpage Explanation**: Paste a URL and get a simplified explanation of the webpage content.
- **General Chat**: Ask any question and get AI-powered responses.
- **Streaming Responses**: Real-time streaming of AI responses for a smooth user experience.
- **Modern UI**: Beautiful, responsive interface with Tailwind CSS and glassmorphism effects.
- **Chat History**: Persistent chat history stored in local storage.
- **Export Chat**: Export your chat history as a text file.
- **Clear History**: Easily clear chat history.

## Technologies Used

- **Backend**: Node.js, Express.js
- **AI**: Google Gemini API (gemini-2.5-flash model)
- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Web Scraping**: Axios, JSDOM
- **Environment**: dotenv for API key management

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd webpage-explainer-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.example.env` to `.env`
   - Add your Gemini API key to `.env`:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

## Usage

1. Start the server:
   ```bash
   node server.js
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Start chatting! You can:
   - Ask general questions
   - Paste a URL to get an explanation of the webpage

## API Endpoints

- `GET /`: Serves the main web interface
- `GET /stream?q=<query>`: Server-Sent Events endpoint for streaming AI responses

## Project Structure

```
.
├── agent.js          # Gemini client and webpage explanation tool
├── server.js         # Express server setup
├── runner.js         # Main agent logic
├── template/
│   └── index.html    # Web UI
├── .example.env      # Environment variables template
├── .gitignore        # Git ignore rules
├── package.json      # Node.js dependencies
└── README.md         # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Author

Built by TuhinKairi
