import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
    try {
        const { messages, resumeText } = await req.json()

        if (!resumeText) {
            return NextResponse.json(
                { error: 'No resume found' },
                { status: 400 }
            )
        }

        // Build the system prompt with the resume injected
        const systemPrompt = `You are an expert resume coach and career advisor.
The user has uploaded their resume. Here it is:

----- RESUME START -----
${resumeText}
----- RESUME END -----

Your job is to:
- Answer any questions the user has about their resume
- Give honest, specific feedback when asked
- Suggest improvements to bullet points, structure, or wording when asked
- Help the user understand their strengths and gaps

Always refer to specifics from their resume in your answers.
Keep responses concise and actionable.`

        // Create a streaming response from OpenAI
        const stream = await openai.chat.completions.create({
            model: 'gpt-4o',
            stream: true,
            messages: [
                { role: 'system', content: systemPrompt },
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