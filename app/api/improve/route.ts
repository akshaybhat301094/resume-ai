import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

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
            model: 'gpt-4o',
            response_format: { type: 'json_object' }, // forces JSON output
            messages: [
                {
                    role: 'system',
                    content: `You are an expert resume coach and ATS specialist.
Analyse the given resume and return a JSON object with exactly this structure:

{
  "ats_score": <number 0-100>,
  "ats_reasoning": "<2-3 sentences explaining the score>",
  "missing_sections": [
    {
      "section": "<section name>",
      "reason": "<why it matters>"
    }
  ],
  "bullet_rewrites": [
    {
      "original": "<original bullet from resume>",
      "improved": "<rewritten version>",
      "reason": "<what was improved and why>"
    }
  ],
  "top_strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "quick_wins": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>"]
}

Rules:
- ATS score should reflect keyword density, formatting clarity, and section completeness
- Pick the 3 weakest bullets for rewriting — skip bullets that are already strong
- Missing sections should only list sections that are genuinely absent
- Quick wins should be specific and immediately actionable
- Return only the JSON object, no extra text`,
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