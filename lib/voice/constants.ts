export const REALTIME_VOICE_CONFIG = {
  voice: 'alloy',
  transcriptionModel: 'whisper-1',
  turnDetection: {
    type: 'server_vad',
    threshold: 0.5,
    silenceDurationMs: 800,
  },
} as const
