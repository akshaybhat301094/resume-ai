'use client'

type Props = {
    score: number
    reasoning: string
}

export default function AtsScoreCard({ score, reasoning }: Props) {
    return (
        <div className="brutalist-card p-6 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 font-mono text-[8px] uppercase">SCORE_METRIC</div>
            <div className="space-y-6">
                <span className="mono-label">ATS_EFFICIENCY_RATING</span>
                <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-7xl lg:text-8xl tracking-tighter">{score}</span>
                    <span className="font-mono text-xl lg:text-2xl text-gray-300">%</span>
                </div>
                <div className="w-full h-8 bg-[#F9F9F9] border-2 border-black p-1">
                    <div
                        className="h-full bg-[var(--accent)] transition-all duration-1000"
                        style={{ width: `${score}%` }}
                    />
                </div>
                <p className="font-mono text-xs lg:text-sm leading-relaxed text-gray-600 uppercase italic">
                    "{reasoning}"
                </p>
            </div>
        </div>
    )
}
