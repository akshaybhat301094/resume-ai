import OpenAI from 'openai'

export const API_KEY = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({ apiKey: API_KEY })

export const AI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'

export const REALTIME_MODEL = process.env.REALTIME_AI_MODEL || 'gpt-4o-realtime-preview-2024-12-17'
export const REALTIME_SESSIONS_API_URL = 'https://api.openai.com/v1/realtime/sessions'