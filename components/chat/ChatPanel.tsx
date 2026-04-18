'use client'

import { useState, useRef, useEffect } from 'react'
import { saveHistory } from '@/lib/localStorage'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import useUIStore from '@/lib/store';

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
                />
            </div>
        </div>
    );
}