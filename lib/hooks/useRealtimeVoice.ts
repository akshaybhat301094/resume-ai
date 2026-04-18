'use client'

import { useState, useRef, useCallback } from 'react'
import { VoiceState, UseRealtimeVoiceProps, UseRealtimeVoiceReturn } from '@/types/voice'
import { buildRealtimeSessionConfig } from '@/lib/voice/sessionConfig'
import { RealtimeMessage } from '@/lib/voice/types'
import {
  asOptionalString,
  getErrorMessage,
} from '@/lib/voice/utils'

export function useRealtimeVoice({ resumeText, callbacks }: UseRealtimeVoiceProps): UseRealtimeVoiceReturn {
  const { onTranscript, onAssistantMessage, onAssistantDone, onUserSpeechStarted } = callbacks
  const [voiceState, setVoiceState] = useState<VoiceState>('idle')
  const [error, setError] = useState<string | null>(null)

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const dataChannelRef = useRef<RTCDataChannel | null>(null)
  const micStreamRef = useRef<MediaStream | null>(null)
  const audioElementRef = useRef<HTMLAudioElement | null>(null)

  const teardownSession = useCallback(() => {
    micStreamRef.current?.getTracks().forEach((track) => track.stop())
    dataChannelRef.current?.close()
    peerConnectionRef.current?.close()

    if (audioElementRef.current) {
      audioElementRef.current.srcObject = null
    }

    micStreamRef.current = null
    dataChannelRef.current = null
    peerConnectionRef.current = null
    audioElementRef.current = null
  }, [])

  const startSession = useCallback(async () => {
    if (voiceState !== 'idle') return

    setError(null)
    setVoiceState('connecting')

    try {
      const tokenRes = await fetch('/api/realtime-token')
      if (!tokenRes.ok) throw new Error('Failed to get realtime token')

      const tokenData = (await tokenRes.json()) as { client_secret?: string; model?: string; error?: string }
      const clientSecret = tokenData.client_secret
      const model = tokenData.model

      if (!clientSecret || !model) {
        throw new Error(tokenData.error || 'Invalid realtime token response')
      }

      const pc = new RTCPeerConnection()
      peerConnectionRef.current = pc

      const audioEl = document.createElement('audio')
      audioEl.autoplay = true
      audioElementRef.current = audioEl

      pc.ontrack = (event) => {
        audioEl.srcObject = event.streams[0] ?? null
      }

      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      micStreamRef.current = micStream
      micStream.getTracks().forEach((track) => {
        pc.addTrack(track, micStream)
      })

      const dc = pc.createDataChannel('oai-events')
      dataChannelRef.current = dc

      dc.addEventListener('open', () => {
        dc.send(JSON.stringify(buildRealtimeSessionConfig(resumeText)))
        setVoiceState('listening')
      })

      dc.addEventListener('message', (event) => {
        if (typeof event.data !== 'string') return

        const msg = JSON.parse(event.data) as RealtimeMessage
        switch (msg.type) {
          case 'input_audio_buffer.speech_started':
            onUserSpeechStarted?.()
            setVoiceState('listening')
            break
          case 'input_audio_buffer.speech_stopped':
            setVoiceState('thinking')
            break
          case 'conversation.item.input_audio_transcription.completed': {
            const transcript = asOptionalString(msg.transcript)
            if (transcript) onTranscript(transcript)
            break
          }
          case 'response.audio_transcript.delta': {
            setVoiceState('speaking')
            const transcriptDelta = asOptionalString(msg.delta)
            if (transcriptDelta) onAssistantMessage(transcriptDelta)
            break
          }
          case 'response.done':
            setVoiceState('listening')
            onAssistantDone?.()
            break
          case 'error':
            console.error('Realtime API error:', msg.error)
            setError(getErrorMessage(msg.error) || 'Voice error occurred')
            setVoiceState('idle')
            teardownSession()
            break
        }
      })

      dc.addEventListener('close', () => {
        setVoiceState('idle')
      })

      dc.addEventListener('error', () => {
        setError('Realtime data channel failed.')
        setVoiceState('idle')
        teardownSession()
      })

      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      const sdpResponse = await fetch(`https://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${clientSecret}`,
          'Content-Type': 'application/sdp',
        },
      })

      if (!sdpResponse.ok) {
        const body = await sdpResponse.text()
        throw new Error(`SDP exchange failed: ${body}`)
      }

      const answerSdp = await sdpResponse.text()
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp })
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setError('Microphone permission denied')
      } else {
        setError(err instanceof Error ? err.message : 'Failed to start voice session')
      }
      setVoiceState('idle')
      teardownSession()
    }
  }, [resumeText, onTranscript, onAssistantMessage, onAssistantDone, onUserSpeechStarted, teardownSession, voiceState])

  const endSession = useCallback(() => {
    teardownSession()
    setVoiceState('idle')
  }, [teardownSession])

  return { voiceState, error, startSession, endSession }
}