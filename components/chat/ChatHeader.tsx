'use client'

import useUIStore from '@/lib/store';

type Props = {
    onClearChat: () => void
    isAnalysisOpen: boolean
    onToggleAnalysis: () => void
    isPreviewOpen: boolean
    onTogglePreview: () => void
}

export default function ChatHeader({ onClearChat, isAnalysisOpen, onToggleAnalysis, isPreviewOpen, onTogglePreview }: Props) {
    const { clearResumeData } = useUIStore();

    return (
        <div 
            className="flex items-center justify-between px-4 lg:px-8 py-4 lg:py-6 border-b-2 border-black bg-white h-auto lg:h-[88px] shrink-0"
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))' }}
        >
            <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-black flex items-center justify-center font-display font-black text-white text-sm lg:text-xl">C</div>
                <h1 className="font-display font-black text-lg lg:text-2xl uppercase tracking-tighter text-black">Console</h1>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-6">
                <div className="flex gap-2">
                    {!isPreviewOpen && (
                        <button
                            onClick={onTogglePreview}
                            className="px-3 py-1 bg-white border-2 border-black font-mono text-[10px] font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all brutalist-shadow-sm"
                        >
                            [VIEW_SOURCE]
                        </button>
                    )}
                    {!isAnalysisOpen && (
                        <button
                            onClick={onToggleAnalysis}
                            className="flex items-center gap-2 px-3 py-1 bg-white border-2 border-black font-mono text-[10px] font-black uppercase tracking-widest text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all brutalist-shadow-sm"
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]"></span>
                            </span>
                            [ANALYSE_RESUME]
                        </button>
                    )}
                </div>
                <button
                    onClick={onClearChat}
                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#757575] hover:text-black hover:underline"
                >
                    [CLEAR_LOG]
                </button>
                <button
                    onClick={() => clearResumeData()}
                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-[var(--accent)] hover:underline"
                >
                    [NEW_RESUME]
                </button>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
                <button
                    onClick={() => clearResumeData()}
                    className="font-mono text-[8px] font-bold uppercase tracking-widest text-black/40"
                >
                    [NEW]
                </button>
            </div>
        </div>
    )
}
