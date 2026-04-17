'use client'

import { useState } from 'react'

type BulletRewrite = {
    original: string
    improved: string
    reason: string
}

type MissingSection = {
    section: string
    reason: string
}

type Analysis = {
    ats_score: number
    ats_reasoning: string
    missing_sections: MissingSection[]
    bullet_rewrites: BulletRewrite[]
    top_strengths: string[]
    quick_wins: string[]
}

type Props = {
    resumeText: string
    onClose: () => void
}

export default function ImprovementPanel({ resumeText, onClose }: Props) {
    const [analysis, setAnalysis] = useState<Analysis | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function runAnalysis() {
        setIsLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/improve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeText }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            setAnalysis(data)

        } catch (err) {
            setError('ALARM: ANALYSIS_FAILURE. PLEASE_RETRY_SIGNAL.')
        } finally {
            setIsLoading(false)
        }
    }

    // Modern Brutalist Colors
    function scoreColor(score: number) {
        if (score >= 75) return 'text-black'
        return 'text-black' // Keep it monochrome for brutalist feel, or use accent
    }

    return (
        <div className="w-full flex flex-col h-full bg-white overflow-y-auto">
            
            {/* Header */}
            <div className="px-6 py-4 border-b-2 border-black bg-white flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onClose}
                        className="w-6 h-6 border-2 border-black flex items-center justify-center font-mono text-[10px] font-black hover:bg-black hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#003BFF] animate-pulse" />
                        <h2 className="font-display font-black text-xl uppercase tracking-tighter">Analysis_Report</h2>
                    </div>
                </div>
                {analysis && (
                    <button
                        onClick={runAnalysis}
                        disabled={isLoading}
                        className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#003BFF] hover:underline"
                    >
                        {isLoading ? '[RUNNING...]' : '[RE_SCAN]'}
                    </button>
                )}
            </div>

            <div className="p-6 space-y-8 bg-[#F9F9F9] bg-[radial-gradient(#E0E0E0_1px,transparent_1px)] bg-[length:20px_20px] flex-1">
                
                {!analysis && !isLoading && (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="space-y-2">
                             <p className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">Awaiting Command</p>
                             <p className="font-display font-black text-2xl uppercase tracking-tighter max-w-xs">
                                Initialize AI inspection for signal improvement.
                             </p>
                        </div>
                        <button
                            onClick={runAnalysis}
                            className="brutalist-button-primary"
                        >
                            RUN_ANALYSIS.EXE
                        </button>
                    </div>
                )}

                {isLoading && (
                    <div className="h-64 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-black border-t-[#003BFF] animate-spin" />
                        <p className="font-mono text-xs font-bold uppercase tracking-widest animate-pulse">Scanning_Manuscript...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-black text-white p-4 font-mono text-xs brutalist-shadow">
                        {error}
                    </div>
                )}

                {analysis && !isLoading && (
                    <div className="space-y-8">
                        
                        {/* ATS SCORE CARD */}
                        <div className="brutalist-card p-6 bg-white relative overflow-hidden">
                             <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 font-mono text-[8px] uppercase">SCORE_METRIC</div>
                             <div className="space-y-4">
                                <span className="mono-label">ATS_EFFICIENCY_RATING</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-display font-black text-7xl tracking-tighter">{analysis.ats_score}</span>
                                    <span className="font-mono text-xl text-gray-300">%</span>
                                </div>
                                <div className="w-full h-8 bg-[#F9F9F9] border-2 border-black p-1">
                                    <div 
                                        className="h-full bg-[#003BFF] transition-all duration-1000"
                                        style={{ width: `${analysis.ats_score}%` }}
                                    />
                                </div>
                                <p className="font-mono text-xs leading-relaxed text-gray-600 uppercase">
                                    {analysis.ats_reasoning}
                                </p>
                             </div>
                        </div>

                        {/* STRENGTHS */}
                        <div className="space-y-3">
                            <span className="mono-label">TOP_SIGNALS_DETECTED</span>
                            <div className="grid grid-cols-1 gap-2">
                                {analysis.top_strengths.map((s, i) => (
                                    <div key={i} className="bg-white border-2 border-black p-3 font-mono text-[10px] font-bold flex items-center gap-3 brutalist-shadow-sm">
                                        <span className="text-[#003BFF]">■</span>
                                        {s.toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* MISSING SECTION ALARMS */}
                        {analysis.missing_sections.length > 0 && (
                            <div className="space-y-3">
                                <span className="mono-label text-red-500">MISSING_DATA_ALERTS</span>
                                {analysis.missing_sections.map((s, i) => (
                                    <div key={i} className="bg-black text-white p-4 brutalist-shadow-sm space-y-1">
                                        <h4 className="font-display font-black text-sm uppercase tracking-tight">! {s.section}</h4>
                                        <p className="font-mono text-[10px] text-gray-400 leading-normal">{s.reason.toUpperCase()}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* BULLET REWRITES */}
                        <div className="space-y-4">
                            <span className="mono-label">BULLET_OPTIMIZATION_RECORDS</span>
                            <div className="space-y-6">
                                {analysis.bullet_rewrites.map((b, i) => (
                                    <div key={i} className="border-t-2 border-gray-200 pt-4 space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 opacity-40">
                                                <span className="font-mono text-[8px] font-bold">[ORIGINAL]</span>
                                            </div>
                                            <p className="text-sm border-l-2 border-gray-200 pl-4 py-1 italic">{b.original}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-[8px] font-bold text-[#003BFF]">[IMPROVED_VARIANT]</span>
                                            </div>
                                            <div className="bg-white border-2 border-black p-4 brutalist-shadow-sm font-mono text-xs leading-relaxed">
                                                {b.improved}
                                            </div>
                                        </div>
                                        <div className="bg-gray-100 p-2 font-mono text-[8px] font-bold text-gray-400 uppercase">
                                            RATIONALE: {b.reason}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                         {/* QUICK WINS */}
                         <div className="space-y-3">
                            <span className="mono-label">QUICK_WIN_OPERATIONS</span>
                            <div className="space-y-2">
                                {analysis.quick_wins.map((w, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white border-2 border-black p-4 font-mono text-[10px] brutalist-shadow-sm">
                                        <span className="text-[#003BFF] font-bold">→</span>
                                        <span>{w.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}