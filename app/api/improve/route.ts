import { NextRequest, NextResponse } from 'next/server'
import { openai, AI_MODEL } from '@/lib/openai'
import { IMPROVE_SYSTEM_PROMPT } from '@/lib/prompts'

export async function POST(req: NextRequest) {
    try {
        const { resumeText } = await req.json()

        if (!resumeText) {
            return NextResponse.json(
                { error: 'No resume text provided' },
                { status: 400 }
            )
        }

        const response = await openai.chat.completions.create({
            model: AI_MODEL,
            response_format: { type: 'json_object' }, // forces JSON output
            messages: [
                {
                    role: 'system',
                    content: IMPROVE_SYSTEM_PROMPT,
                },
                {
                    role: 'user',
                    content: `Please analyse this resume:\n\n${resumeText}`,
                },
            ],
        })

        const raw = response.choices[0].message.content
        if (!raw) throw new Error('Empty response from OpenAI')

        const result = JSON.parse(raw)
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json(
            { error: 'Analysis failed' },
            { status: 500 }
        )
    }
}