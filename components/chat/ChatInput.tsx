'use client'

type Props = {
    input: string
    setInput: (value: string) => void
    onSend: () => void
    isLoading: boolean
}

export default function ChatInput({ input, setInput, onSend, isLoading }: Props) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
        }
    }

    return (
        <div className="px-8 py-8 bg-white border-t-2 border-black">
            <div className="flex gap-4 items-end">
                <div className="flex-1 relative">
                    <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="OPERATOR_QUERY_INPUT..."
                        rows={1}
                        className="w-full bg-[#F9F9F9] brutalist-border px-6 py-4 text-sm font-mono
                                 placeholder:text-gray-300 focus:bg-white transition-colors"
                    />
                </div>
                <button
                    onClick={onSend}
                    disabled={!input.trim() || isLoading}
                    className="brutalist-button-primary h-[54px] flex items-center justify-center px-8"
                >
                    SEND_SIGNAL
                </button>
            </div>
            <div className="flex justify-between mt-4 font-mono text-[8px] text-gray-400 uppercase tracking-[.3em]">
                <span>LINK_ESTABLISHED: OPENAI_GPT_4O</span>
                <span>SHIFT+ENTER: NEWLINE</span>
            </div>
        </div>
    )
}
