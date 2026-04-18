'use client'

import { useState, useRef, useEffect } from 'react'
import { Message } from '@/types/chat'
import { saveHistory, getHistory, clearHistory } from '@/lib/localStorage'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

type Props = {
    resumeText: string
    onClearResume: () => void
    isAnalysisOpen: boolean
    onToggleAnalysis: () => void
    isPreviewOpen: boolean
    onTogglePreview: () => void
}

export default function ChatPanel({ 
    resumeText, 
    onClearResume, 
    isAnalysisOpen, 
    onToggleAnalysis,
    isPreviewOpen,
    onTogglePreview
}: Props) {
    const [messages, setMessages] = useState<Message[]>(() => getHistory())
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Save history to localStorage whenever messages change
    useEffect(() => {
        if (messages.length > 0) saveHistory(messages)
    }, [messages])

    async function sendMessage() {
        const text = input.trim()
        if (!text || isLoading) return

        const userMessage: Message = { role: 'user', content: text }
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)
        setInput('')
        setIsLoading(true)

        const assistantMessage: Message = { role: 'assistant', content: '' }
        setMessages([...updatedMessages, assistantMessage])

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: updatedMessages,
                    resumeText,
                }),
            })

            if (!res.ok) throw new Error('Chat request failed')
            if (!res.body) throw new Error('No response body')

            const reader = res.body.getReader()
            const decoder = new TextDecoder()
            let fullText = ''

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                fullText += chunk

                setMessages(prev => {
                    const updated = [...prev]
                    updated[updated.length - 1] = {
                        role: 'assistant',
                        content: fullText,
                    }
                    return updated
                })
            }

        } catch (err) {
            setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                    role: 'assistant',
                    content: 'ERROR: CONNECTION_INTERRUPTED. PLEASE_RETRY_TRANSMISSION.',
                }
                return updated
            })
        } finally {
            setIsLoading(false)
        }
    }

    const clearChat = () => {
        setMessages([])
        clearHistory()
    }

    return (
        <div className="flex flex-col h-full grow w-full bg-white relative">
            <div className="flex-none">
                <ChatHeader 
                    onClearChat={clearChat} 
                    onClearResume={onClearResume}
                    isAnalysisOpen={isAnalysisOpen}
                    onToggleAnalysis={onToggleAnalysis}
                    isPreviewOpen={isPreviewOpen}
                    onTogglePreview={onTogglePreview}
                />
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8 bg-[#F9F9F9] bg-[radial-gradient(#E0E0E0_1px,transparent_1px)] bg-[length:20px_20px]">
                {messages.length === 0 && (
                    <div className="max-w-xl mx-auto space-y-10 mt-12">
                        <div className="space-y-4">
                            <div className="bg-black text-white px-2 py-1 inline-block font-mono text-[10px] font-bold">READY_FOR_INPUT</div>
                            <p className="font-display font-black text-4xl uppercase tracking-tighter leading-none">
                                Resume ingest complete. Select a signal protocol below or type your query.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                'What are my strongest skills?',
                                'How can I improve my experience section?',
                                'Am I a good fit for a senior engineer role?',
                            ].map(suggestion => (
                                <button
                                    key={suggestion}
                                    onClick={() => { setInput(suggestion); }}
                                    className="brutalist-button-secondary text-left text-xs lowercase flex justify-between items-center group font-mono"
                                >
                                    <span>{suggestion}</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <ChatMessage 
                        key={i} 
                        message={msg} 
                        isLoading={isLoading} 
                        isLast={i === messages.length - 1} 
                    />
                ))}

                <div ref={bottomRef} />
            </div>

            <div className="flex-none">
                <ChatInput 
                    input={input} 
                    setInput={setInput} 
                    onSend={sendMessage} 
                    isLoading={isLoading} 
                />
            </div>
        </div>
    )
}