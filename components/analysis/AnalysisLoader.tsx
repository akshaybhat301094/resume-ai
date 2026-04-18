'use client'

export default function AnalysisLoader() {
    return (
        <div className="h-full min-h-[300px] flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-black border-t-[var(--accent)] animate-spin" />
            <div className="space-y-2 text-center">
                <p className="font-mono text-sm font-bold uppercase tracking-widest animate-pulse text-[var(--accent)]">Scanning_Manuscript...</p>
            </div>
        </div>
    )
}
