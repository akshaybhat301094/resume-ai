'use client'

type Props = {
    input: string
    setInput: (val: string) => void
    onSend: () => void
    isLoading: boolean
}

export default function ChatInput({ input, setInput, onSend, isLoading }: Props) {
    return (
        <div className="px-4 lg:px-8 py-6 lg:py-8 bg-white border-t-2 border-black bg-[radial-gradient(#F0F0F0_1px,transparent_1px)] bg-[length:16px_16px]">
            <div className="flex gap-2 lg:gap-4 items-center h-[48px] lg:h-[56px]">
                <div className="flex-1 h-full relative">
                    <div className="absolute -top-5 lg:-top-6 left-0 font-mono text-[7px] lg:text-[8px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none">
                        SIGNAL_STREAM [{input.length}]
                    </div>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                onSend()
                            }
                        }}
                        placeholder="TERMINAL_PROMPT..."
                        className="w-full h-full p-2 lg:p-4 border-2 border-black font-mono text-xs lg:text-sm focus:outline-none resize-none bg-white brutalist-shadow-xs lg:brutalist-shadow-sm flex items-center"
                    />
                </div>
                <button 
                    onClick={onSend}
                    disabled={isLoading || !input.trim()}
                    className="brutalist-button-primary px-3 lg:px-8 flex items-center gap-2 h-full relative group overflow-hidden shrink-0"
                >
                    <span className="relative z-10 text-[10px] lg:text-sm font-black uppercase tracking-tighter">
                        {isLoading ? '...' : 'SEND'}
                    </span>
                    {!isLoading && <span className="relative z-10 text-xs hidden sm:inline">→</span>}
                </button>
            </div>
        </div>
    )
}
