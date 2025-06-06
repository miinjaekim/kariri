import { createAgent, startVoiceSession, deleteAgent } from './krosai.js';

async function main() {
  try {
    console.log('Creating agent...');
    const agent = await createAgent();
    console.log('Agent created:', agent);

    console.log('\nStarting voice session...');
    const session = await startVoiceSession(agent.id);
    console.log('Voice session started:', session);

    // Print the connection details in a format that's easy to copy
    console.log('\n=== COPY THESE VALUES TO test-voice.html ===');
    console.log(`roomUrl: '${session.room_url}'`);
    console.log(`token: '${session.token}'`);
    console.log('===========================================\n');

    // Keep the session alive for testing
    console.log('Session is active. Press Ctrl+C to end the session and delete the agent.');
    
    // Handle cleanup on exit
    process.on('SIGINT', async () => {
      console.log('\nCleaning up...');
      await deleteAgent(agent.id);
      console.log('Agent deleted successfully');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main(); 