'use client'

import { useMemo } from 'react'
import { useRealtimeVoice } from '@/lib/hooks/useRealtimeVoice'
import { VoiceState } from '@/types/voice'

type Props = {
  resumeText: string
  disabled?: boolean
  onTranscript: (text: string) => void
  onAssistantMessage: (text: string) => void
  onAssistantDone?: () => void
  onUserSpeechStarted?: () => void
}

const VOICE_LABEL_BY_STATE: Record<VoiceState, string> = {
  idle: 'VOICE',
  connecting: 'CONNECTING',
  listening: 'LISTENING',
  thinking: 'THINKING',
  speaking: 'SPEAKING',
}

const STOP_COMMAND_RE = /\b(stop|end|hang up|disconnect|stop voice|stop listening)\b/i

export default function VoiceButton({
  resumeText,
  disabled = false,
  onTranscript,
  onAssistantMessage,
  onAssistantDone,
  onUserSpeechStarted,
}: Props) {
  const { voiceState, error, startSession, endSession } = useRealtimeVoice({
    resumeText,
    callbacks: {
      onTranscript: (text) => {
        if (STOP_COMMAND_RE.test(text)) {
          endSession()
          return
        }
        onTranscript(text)
      },
      onAssistantMessage,
      onAssistantDone,
      onUserSpeechStarted,
    },
  })

  const isSessionActive = voiceState !== 'idle'
  const isListening = voiceState === 'listening'
  const isSpeaking = voiceState === 'speaking'
  const showWaveform = isListening || isSpeaking

  const buttonLabel = useMemo(() => {
    if (disabled) return 'VOICE_OFF'
    return VOICE_LABEL_BY_STATE[voiceState]
  }, [disabled, voiceState])

  async function handleToggle() {
    if (disabled) return
    if (isSessionActive) {
      endSession()
      return
    }
    await startSession()
  }

  return (
    <div className="relative h-full">
      <button
        onClick={handleToggle}
        disabled={disabled}
        title={error || 'Start voice conversation'}
        className={`relative h-full px-3 lg:px-5 flex items-center gap-2 shrink-0 font-mono text-[10px] lg:text-xs border-2 border-black brutalist-shadow-xs lg:brutalist-shadow-sm overflow-hidden ${
          disabled
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : isSessionActive
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-black hover:text-white'
        }`}
      >
        <span className={isSessionActive ? 'animate-pulse' : ''}>●</span>
        {showWaveform && (
          <span className="flex items-end gap-[2px] h-4">
            {[0, 1, 2, 3].map((idx) => (
              <span
                key={idx}
                className="w-[2px] bg-current rounded-sm animate-pulse"
                style={{
                  height: `${8 + (idx % 2 === 0 ? 6 : 10)}px`,
                  animationDelay: `${idx * 120}ms`,
                  opacity: 0.85,
                }}
              />
            ))}
          </span>
        )}
        <span className="font-black uppercase tracking-tight">{buttonLabel}</span>

        {isListening && (
          <>
            <span className="pointer-events-none absolute inset-0 rounded-[2px] border border-white/40 animate-ping" />
            <span className="pointer-events-none absolute inset-[4px] rounded-[2px] border border-white/30 animate-pulse" />
          </>
        )}

        {isSpeaking && (
          <span className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-white/70 animate-pulse" />
        )}
      </button>

      {error && (
        <p className="absolute left-0 top-full mt-1 font-mono text-[10px] text-red-600 whitespace-nowrap">
          {error}
        </p>
      )}
    </div>
  )
}
