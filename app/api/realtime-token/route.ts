import { API_KEY, REALTIME_MODEL, REALTIME_SESSIONS_API_URL } from '@/lib/openai'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    if (!API_KEY) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 })
    }

    const res = await fetch(REALTIME_SESSIONS_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: REALTIME_MODEL,
        voice: 'alloy',
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Failed to create realtime session (${res.status}): ${body}`)
    }

    const data = await res.json()
    const clientSecret = data?.client_secret?.value
    if (!clientSecret) {
      throw new Error('Missing client_secret in realtime session response')
    }

    return NextResponse.json({
      client_secret: clientSecret,
      model: REALTIME_MODEL,
    })
  } catch (err) {
    console.error('Error generating realtime token:', err)
    return NextResponse.json({ error: 'Failed to generate realtime token' }, { status: 500 })
  }
}