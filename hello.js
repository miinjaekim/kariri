import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import fs from 'fs';
import 'dotenv/config';

const apiKey = process.env.ELEVENLABS_API_KEY;

if (!apiKey) {
  console.error('Please set ELEVENLABS_API_KEY in your .env file');
  process.exit(1);
}

const elevenlabs = new ElevenLabsClient({ apiKey });

async function main() {
  try {
    const audioStream = await elevenlabs.textToSpeech.convert(
      '21m00Tcm4TlvDq8ikWAM', // Rachel voice ID
      {
        text: 'Jambo! Habari gani?',
        modelId: 'eleven_multilingual_v2',
        outputFormat: 'mp3_44100_128',
      }
    );

    // Convert ReadableStream to Buffer
    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    // Save to public directory for browser playback
    const outputPath = 'public/test-output.mp3';
    fs.writeFileSync(outputPath, audioBuffer);
    console.log('Audio saved to:', outputPath);
    console.log('You can play this file in your browser at: http://localhost:5173/test-output.mp3');
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
  }
}

main();