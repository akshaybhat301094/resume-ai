'use client'

type Props = {
    onRunAnalysis: () => void
    error: string | null
}

export default function AnalysisEmptyState({ onRunAnalysis, error }: Props) {
    return (
        <div className="min-h-full flex flex-col items-center justify-center text-center py-6 lg:py-12 space-y-6 lg:space-y-8 px-4">
            <div className="space-y-4">
                <div className="inline-block bg-black text-white px-2 py-1 font-mono text-[8px] uppercase tracking-widest animate-pulse">
                    System_Standby
                </div>
                <p className="font-display font-black text-xl lg:text-3xl uppercase tracking-tighter max-w-xs mx-auto leading-tight lg:leading-normal">
                    Initialize AI inspection for signal improvement.
                </p>
            </div>

            <div className="relative group w-full sm:w-auto">
                <button
                    onClick={onRunAnalysis}
                    className="brutalist-button-primary w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg active:translate-x-1 active:translate-y-1 active:shadow-none transition-all touch-manipulation"
                >
                    RUN_ANALYSIS.EXE
                </button>
            </div>

            {error && (
                <div className="bg-black text-white p-3 lg:p-4 font-mono text-[8px] lg:text-[10px] font-bold uppercase tracking-widest brutalist-shadow border-2 border-red-500 max-w-sm mx-auto">
                    ERROR: {error}
                </div>
            )}
        </div>
    )
}
