'use client'

type Props = {
    onClearChat: () => void
    onClearResume: () => void
    isAnalysisOpen: boolean
    onToggleAnalysis: () => void
}

export default function ChatHeader({ onClearChat, onClearResume, isAnalysisOpen, onToggleAnalysis }: Props) {
    return (
        <div className="flex items-center justify-between px-8 py-6 border-b-2 border-black bg-white">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black flex items-center justify-center font-display font-black text-white text-xl">R</div>
                <h1 className="font-display font-black text-2xl uppercase tracking-tighter text-black">Console</h1>
            </div>
            <div className="flex items-center gap-6">
                {!isAnalysisOpen && (
                    <button
                        onClick={onToggleAnalysis}
                        className="flex items-center gap-2 px-3 py-1 bg-white border-2 border-black font-mono text-[10px] font-black uppercase tracking-widest text-[#003BFF] hover:bg-[#003BFF] hover:text-white transition-all brutalist-shadow-sm"
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#003BFF] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#003BFF]"></span>
                        </span>
                        [ANALYSE_RESUME]
                    </button>
                )}
                <button
                    onClick={onClearChat}
                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#757575] hover:text-black hover:underline"
                >
                    [CLEAR_LOG]
                </button>
                <button
                    onClick={onClearResume}
                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-[#003BFF] hover:underline"
                >
                    [NEW_RESUME]
                </button>
            </div>
        </div>
    )
}
