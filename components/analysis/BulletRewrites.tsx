'use client'

import { BulletRewrite } from '@/types/resume'

type Props = {
    rewrites: BulletRewrite[]
}

export default function BulletRewrites({ rewrites }: Props) {
    if (rewrites.length === 0) return null

    return (
        <div className="space-y-4">
            <span className="mono-label">BULLET_REWRITE_STREAM</span>
            <div className="space-y-6">
                {rewrites.map((b, i) => (
                    <div key={i} className="space-y-3">
                        <div className="p-4 bg-gray-100 border-2 border-black font-mono text-[11px] leading-relaxed relative">
                            <div className="absolute -top-3 left-2 bg-black text-white px-2 py-0.5 text-[8px] font-bold">[ORIGINAL_SIGNAL]</div>
                            {b.original}
                        </div>
                        <div className="p-4 bg-white border-2 border-black border-l-[6px] border-l-[var(--accent)] font-mono text-[11px] leading-relaxed relative brutalist-shadow-xs">
                            <div className="absolute -top-3 left-2 bg-[var(--accent)] text-white px-2 py-0.5 text-[8px] font-bold">[IMPROVED_VARIANT]</div>
                            {b.improved}
                        </div>
                        <div className="px-2 font-mono text-[9px] uppercase text-[var(--accent)] font-bold">
                            ▲ REASON: {b.reason}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
