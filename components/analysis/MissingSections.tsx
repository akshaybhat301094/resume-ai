'use client'

import { MissingSection } from '@/types/resume'

type Props = {
    sections: MissingSection[]
}

export default function MissingSections({ sections }: Props) {
    if (sections.length === 0) return null

    return (
        <div className="space-y-4">
            <span className="mono-label text-red-600 font-black">! CRITICAL_DATA_GAPS_DETECTED</span>
            <div className="grid grid-cols-1 gap-2">
                {sections.map((m, i) => (
                    <div key={i} className="p-4 bg-white border-2 border-black border-l-[6px] border-l-red-500 brutalist-shadow-xs">
                        <p className="font-display font-black uppercase text-sm mb-1">{m.section}</p>
                        <p className="font-mono text-[10px] text-gray-500 uppercase">{m.reason}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
