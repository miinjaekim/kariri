import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const KROSAI_API_KEY = process.env.KROSAI_API_KEY;

if (!KROSAI_API_KEY) {
  throw new Error('KROSAI_API_KEY is not set in .env');
}

const API_BASE = 'https://api.krosai.com/v1';

async function listAgents() {
  const response = await fetch(`${API_BASE}/agents`, {
    headers: {
      'Authorization': `Bearer ${KROSAI_API_KEY}`,
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to list agents: ${error.detail || response.statusText}`);
  }

  return response.json();
}

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

async function main() {
  try {
    console.log('Listing agents...');
    const agents = await listAgents();
    
    if (agents.length === 0) {
      console.log('No agents found.');
      return;
    }

    console.log('\nFound agents:');
    agents.forEach((agent, index) => {
      console.log(`\n${index + 1}. Agent ID: ${agent.id}`);
      console.log(`   Name: ${agent.name}`);
      console.log(`   Created: ${agent.created_at}`);
    });

    // Delete all agents
    console.log('\nDeleting all agents...');
    for (const agent of agents) {
      await deleteAgent(agent.id);
      console.log(`Deleted agent: ${agent.id}`);
    }
    console.log('\nAll agents have been deleted.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main(); 