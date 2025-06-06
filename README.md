# Kariri

**Kariri** is a Swahili voice-conversation MVP built for a hackathon demo. It helps language learners practice active speaking with a real-time, AI-powered Swahili tutor using KrosAI's voice agent API and WebRTC.

---

## Overview
- **Goal:** Turn Swahili vocabulary decks into short, spoken dialogues for active practice.
- **Tech:** Node.js, Express, Vite, KrosAI API, WebRTC (LiveKit backend).
- **Demo:** Backend creates a Swahili agent and voice session; frontend (or LiveKit client) can join the room for real-time conversation.

---

## Features
- Native Swahili voice agent (KrosAI)
- Real-time voice sessions (WebRTC)
- Simple backend API for session management
- CSV deck loader (planned)
- Hackathon-ready: fast setup, minimal dependencies

---

## Quickstart

1. **Clone the repo:**
   ```sh
   git clone https://github.com/miinjaekim/kariri.git
   cd kariri/kariri
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```
3. **Set up your `.env` file:**
   - Copy `.env.example` to `.env` and fill in your KrosAI API key and Swahili voice ID.
4. **Start the backend server:**
   ```sh
   node server.js
   # or
   pnpm start
   ```
5. **Create a session:**
   ```sh
   curl -X POST http://localhost:3001/api/voice
   ```
6. **Join the room:**
   - Use the returned `room_url`, `room_name`, and `token` in a compatible WebRTC/LiveKit client.

---

## Environment Variables
```
KROSAI_API_KEY=your_krosai_api_key
SW_VOICE_ID=sw-default
```

---

## API Endpoints
- `POST /api/voice` — Creates a Swahili agent and starts a voice session. Returns `{ room_url, token, agent_id }`.

---

## License
MIT 