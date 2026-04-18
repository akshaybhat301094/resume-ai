'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { saveHistory } from '@/lib/localStorage'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import VoiceButton from './VoiceButton'
import useUIStore from '@/lib/store';
import { Message } from '@/types/store';

export default function ChatPanel() {
    const {
        messages,
        isLoadingChat,
        sendMessage,
        clearChat,
        isAnalysisOpen,
        toggleAnalysis,
        isPreviewOpen,
        togglePreview,
        resumeText,
    } = useUIStore();

    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);
    const isStreamingAssistantRef = useRef(false);
    const awaitingUserTranscriptRef = useRef(true);
    const pendingAssistantDeltaRef = useRef('');

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            saveHistory(messages);
        }
    }, [messages]);

    async function handleSendMessage() {
        await sendMessage(input, resumeText);
        setInput('');
    }

    const appendMessage = useCallback((message: Message) => {
        useUIStore.setState((state) => ({
            messages: [...state.messages, message],
        }));
    }, []);

    const handleVoiceTranscript = useCallback((text: string) => {
        const transcript = text.trim();
        if (!transcript) return;

        appendMessage({ role: 'user', content: transcript });
        awaitingUserTranscriptRef.current = false;

        if (pendingAssistantDeltaRef.current) {
            appendMessage({ role: 'assistant', content: pendingAssistantDeltaRef.current });
            pendingAssistantDeltaRef.current = '';
            isStreamingAssistantRef.current = true;
            return;
        }

        isStreamingAssistantRef.current = false;
    }, [appendMessage]);

    const handleAssistantVoiceDelta = useCallback((delta: string) => {
        if (!delta) return;

        if (awaitingUserTranscriptRef.current) {
            pendingAssistantDeltaRef.current += delta;
            return;
        }

        useUIStore.setState((state) => {
            const updated = [...state.messages];

            if (!isStreamingAssistantRef.current) {
                updated.push({ role: 'assistant', content: delta });
                isStreamingAssistantRef.current = true;
                return { messages: updated };
            }

            const lastIndex = updated.length - 1;
            const last = updated[lastIndex];
            if (!last || last.role !== 'assistant') {
                updated.push({ role: 'assistant', content: delta });
                return { messages: updated };
            }

            updated[lastIndex] = {
                ...last,
                content: `${last.content}${delta}`,
            };

            return { messages: updated };
        });
    }, []);

    const handleAssistantVoiceDone = useCallback(() => {
        isStreamingAssistantRef.current = false;
        awaitingUserTranscriptRef.current = true;
        pendingAssistantDeltaRef.current = '';
    }, []);

    const handleUserSpeechStarted = useCallback(() => {
        // Start of a new user turn; force assistant stream state reset even if done event lags.
        isStreamingAssistantRef.current = false;
        awaitingUserTranscriptRef.current = true;
        pendingAssistantDeltaRef.current = '';
    }, []);

    return (
        <div className="flex flex-col h-full grow w-full bg-white relative">
            <div className="flex-none">
                <ChatHeader 
                    onClearChat={clearChat}
                    isAnalysisOpen={isAnalysisOpen}
                    onToggleAnalysis={toggleAnalysis}
                    isPreviewOpen={isPreviewOpen}
                    onTogglePreview={togglePreview}
                />
            </div>

            <div 
                className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 lg:py-10 space-y-6 lg:space-y-8 bg-[#F9F9F9] bg-[radial-gradient(#E0E0E0_1px,transparent_1px)] bg-[length:20px_20px]"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {messages.length === 0 && (
                    <div className="max-w-xl mx-auto space-y-6 lg:space-y-10 mt-6 lg:mt-12 px-4 lg:px-0">
                        <div className="space-y-4">
                            <div className="bg-black text-white px-2 py-1 inline-block font-mono text-[8px] lg:text-[10px] font-bold">READY_FOR_INPUT</div>
                            <p className="font-display font-black text-2xl lg:text-4xl uppercase tracking-tighter leading-none">
                                Resume ingest complete. Select a signal protocol below or type your query.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                'What are my strongest skills?',
                                'How can I improve my experience section?',
                                'Am I a good fit for a senior engineer role?',
                            ].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => {
                                        setInput(suggestion);
                                    }}
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
                        isLoading={isLoadingChat}
                        isLast={i === messages.length - 1}
                    />
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="flex-none">
                <ChatInput
                    input={input}
                    setInput={setInput}
                    sendMessage={handleSendMessage}
                    isLoading={isLoadingChat}
                    voiceButton={
                        resumeText ? (
                            <VoiceButton
                                resumeText={resumeText}
                                disabled={isLoadingChat}
                                onTranscript={handleVoiceTranscript}
                                onAssistantMessage={handleAssistantVoiceDelta}
                                onAssistantDone={handleAssistantVoiceDone}
                                onUserSpeechStarted={handleUserSpeechStarted}
                            />
                        ) : undefined
                    }
                />
            </div>
        </div>
    );
}