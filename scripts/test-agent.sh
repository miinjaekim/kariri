#!/bin/bash

# Load environment variables
source .env

# Verify environment variables
if [ -z "$KROSAI_API_KEY" ]; then
    echo "Error: KROSAI_API_KEY is not set in .env"
    exit 1
fi

if [ -z "$SW_VOICE_ID" ]; then
    echo "Error: SW_VOICE_ID is not set in .env"
    exit 1
fi

echo "Using voice ID: $SW_VOICE_ID"
echo "Creating Swahili tutor agent..."

# Test agent creation
curl -s -X POST https://api.krosai.com/v1/agents \
  -H "Authorization: Bearer $KROSAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kariri Swahili Tutor",
    "language": "sw",
    "voice_id": "'"$SW_VOICE_ID"'",
    "system_prompt": "You are a friendly Swahili language partner. Your goal is to help learners practice Swahili vocabulary through natural conversations. Keep responses short and focused on the target vocabulary. Always respond in Swahili."
  }' | jq . 