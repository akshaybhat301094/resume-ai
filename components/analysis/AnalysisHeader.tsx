'use client'

type Props = {
    hasAnalysis: boolean
    isLoading: boolean
    onRunAnalysis: () => void
    onClose: () => void
}

export default function AnalysisHeader({ hasAnalysis, isLoading, onRunAnalysis, onClose }: Props) {
    return (
        <div className="px-4 lg:px-8 py-4 lg:py-6 border-b-2 border-black bg-white flex justify-between items-center sticky top-0 z-10 h-auto lg:h-[88px]">
            <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[var(--accent)] flex items-center justify-center font-display font-black text-white text-sm lg:text-xl">A</div>
                <h2 className="font-display font-black text-lg lg:text-2xl uppercase tracking-tighter">Analysis</h2>
            </div>
            <div className="flex items-center gap-4 lg:gap-6">
                {hasAnalysis && (
                    <button
                        onClick={onRunAnalysis}
                        disabled={isLoading}
                        className="font-mono text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] hover:underline"
                    >
                        {isLoading ? '[SCANNIG...]' : '[RE_SCAN]'}
                    </button>
                )}
                <button
                    onClick={onClose}
                    className="hidden lg:flex w-8 h-8 border-2 border-black items-center justify-center font-mono text-xs font-black hover:bg-black hover:text-white transition-colors brutalist-shadow-sm"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}
