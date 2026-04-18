'use client'

type Props = {
    strengths: string[]
    quickWins: string[]
}

export default function StrengthsAndWins({ strengths, quickWins }: Props) {
    return (
        <>
            {/* TOP STRENGTHS */}
            <div className="space-y-4">
                <span className="mono-label">TOP_SIGNALS_DETECTED</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {strengths.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white border-2 border-black font-display font-black uppercase text-xs brutalist-shadow-xs">
                            <div className="w-2 h-2 bg-green-500" />
                            {s}
                        </div>
                    ))}
                </div>
            </div>

            {/* QUICK WINS */}
            <div className="space-y-4">
                <span className="mono-label">HIGH_IMPACT_ADJUSTMENTS</span>
                <ul className="space-y-2">
                    {quickWins.map((w, i) => (
                        <li key={i} className="flex gap-4 p-4 bg-black text-white font-mono text-[11px] uppercase tracking-widest brutalist-shadow">
                            <span className="text-[var(--accent)]">[{i + 1}]</span>
                            {w}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
