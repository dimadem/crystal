// app/api/chat/route.ts

import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';
import { createPrompt } from './prompt';

export const runtime = 'edge';

// Create Anthropic API client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!
})

export async function POST(req: Request) {

    // Extract the `messages` from the body of the request
    const { messages } = await req.json();



    // Request the Anthropic API for the response based on the prompt
    const response = await anthropic.messages.create({
        model: 'claude-2.0',
        stream: true,
        messages: [
            // { role: 'assistant', content: prompt },
            { role: 'user', content: createPrompt(messages[0].content) }],
        max_tokens: 200,
        temperature: 0,
        top_k: 1,
        top_p: 1
    })

    // Convert the response into a friendly text-stream
    const stream = AnthropicStream(response)

    // Respond with the stream
    return new StreamingTextResponse(stream)
}
