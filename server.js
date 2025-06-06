import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createAgent, startVoiceSession } from './scripts/krosai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// POST /api/voice
app.post('/api/voice', async (req, res) => {
  try {
    // Create a new agent (or reuse logic can be added later)
    const agent = await createAgent();
    // Start a voice session
    const session = await startVoiceSession(agent.id);
    // Return room_url and token
    res.json({
      room_url: session.room_url,
      token: session.token,
      agent_id: agent.id // for debugging/demo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
}); 