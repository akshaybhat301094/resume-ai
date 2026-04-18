import { REALTIME_VOICE_SYSTEM_PROMPT } from '@/lib/prompts'
import { REALTIME_VOICE_CONFIG } from './constants'
import { RealtimeSessionConfig } from './types'

export function buildRealtimeSessionConfig(resumeText: string): RealtimeSessionConfig {
  return {
    type: 'session.update',
    session: {
      modalities: ['text', 'audio'],
      instructions: REALTIME_VOICE_SYSTEM_PROMPT(resumeText),
      voice: REALTIME_VOICE_CONFIG.voice,
      input_audio_transcription: { model: REALTIME_VOICE_CONFIG.transcriptionModel },
      turn_detection: {
        type: REALTIME_VOICE_CONFIG.turnDetection.type,
        threshold: REALTIME_VOICE_CONFIG.turnDetection.threshold,
        silence_duration_ms: REALTIME_VOICE_CONFIG.turnDetection.silenceDurationMs,
      },
    },
  }
}
