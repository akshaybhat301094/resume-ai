export type VoiceState = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking'

export interface VoiceCallbacks {
  onTranscript: (text: string) => void
  onAssistantMessage: (text: string) => void
  onAssistantDone?: () => void
  onUserSpeechStarted?: () => void
}

export interface UseRealtimeVoiceProps {
  resumeText: string
  callbacks: VoiceCallbacks
}

export interface UseRealtimeVoiceReturn {
  voiceState: VoiceState
  error: string | null
  startSession: () => Promise<void>
  endSession: () => void
}
