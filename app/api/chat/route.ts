import { NextRequest, NextResponse } from 'next/server'
import { openai, AI_MODEL } from '@/lib/openai'
import { CHAT_SYSTEM_PROMPT } from '@/lib/prompts'

export async function POST(req: NextRequest) {
    try {
        const { messages, resumeText } = await req.json()

        if (!resumeText) {
            return NextResponse.json(
                { error: 'No resume found' },
                { status: 400 }
            )
        }

        // Create a streaming response from OpenAI
        const stream = await openai.chat.completions.create({
            model: AI_MODEL,
            stream: true,
            messages: [
                { role: 'system', content: CHAT_SYSTEM_PROMPT(resumeText) },
                ...messages, // full chat history from the client
            ],
        })

        // Stream the response back to the browser
        // We use ReadableStream to send chunks as they arrive
        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    const text = chunk.choices[0]?.delta?.content || ''
                    if (text) {
                        // Encode and send each chunk
                        controller.enqueue(new TextEncoder().encode(text))
                    }
                }
                controller.close()
            },
        })

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        })

    } catch (error) {
        return NextResponse.json(
            { error: 'Chat failed' },
            { status: 500 }
        )
    }
}