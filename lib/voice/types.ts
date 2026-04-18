export type RealtimeMessage =
  | { type: 'input_audio_buffer.speech_started' }
  | { type: 'input_audio_buffer.speech_stopped' }
  | { type: 'conversation.item.input_audio_transcription.completed'; transcript?: unknown }
  | { type: 'response.audio.delta'; delta?: unknown }
  | { type: 'response.audio_transcript.delta'; delta?: unknown }
  | { type: 'response.done' }
  | { type: 'error'; error?: unknown }
  | { type: string; [key: string]: unknown }

export interface RealtimeSessionConfig {
  type: 'session.update'
  session: {
    modalities: ['text', 'audio']
    instructions: string
    voice: string
    input_audio_transcription: {
      model: string
    }
    turn_detection: {
      type: 'server_vad'
      threshold: number
      silence_duration_ms: number
    }
  }
}
