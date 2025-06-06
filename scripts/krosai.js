import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const KROSAI_API_KEY = process.env.KROSAI_API_KEY;
const SW_VOICE_ID = process.env.SW_VOICE_ID;

if (!KROSAI_API_KEY) {
  throw new Error('KROSAI_API_KEY is not set in .env');
}

if (!SW_VOICE_ID) {
  throw new Error('SW_VOICE_ID is not set in .env');
}

const API_BASE = 'https://api.krosai.com/v1';

/**
 * Create a new KrosAI agent
 * @returns {Promise<{id: string, name: string, language: string, voice_id: string}>}
 */
async function createAgent() {
  const response = await fetch(`${API_BASE}/agents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${KROSAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Kariri Swahili Tutor',
      language: 'sw',
      voice_id: SW_VOICE_ID,
      system_prompt: 'You are a friendly Swahili language partner. Your goal is to help learners practice Swahili vocabulary through natural conversations. Keep responses short and focused on the target vocabulary. Always respond in Swahili.'
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create agent: ${error.detail || response.statusText}`);
  }

  return response.json();
}

/**
 * Start a voice session with an agent
 * @param {string} agentId - The ID of the agent to start a session with
 * @returns {Promise<{room_url: string, token: string, room_name: string}>}
 */
async function startVoiceSession(agentId) {
  const response = await fetch(`${API_BASE}/agents/${agentId}/voice`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${KROSAI_API_KEY}`,
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to start voice session: ${error.detail || response.statusText}`);
  }

  return response.json();
}

/**
 * Delete an agent
 * @param {string} agentId - The ID of the agent to delete
 * @returns {Promise<void>}
 */
async function deleteAgent(agentId) {
  const response = await fetch(`${API_BASE}/agents/${agentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${KROSAI_API_KEY}`,
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to delete agent: ${error.detail || response.statusText}`);
  }
}

// Export the helper functions
export {
  createAgent,
  startVoiceSession,
  deleteAgent
}; 