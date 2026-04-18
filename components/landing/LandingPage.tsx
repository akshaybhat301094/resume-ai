'use client'

import ResumeUploader from '@/components/ResumeUploader'

type Props = {
    onResumeLoaded: (text: string, url: string) => void
}

export default function LandingPage({ onResumeLoaded }: Props) {
    return (
        <div className="flex-1 overflow-y-auto w-full">
            <div className="min-h-full flex flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-xl space-y-12 py-12">
                    <header className="space-y-4 text-center sm:text-left">
                        <div className="inline-block bg-black text-white px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase">
                            SYSTEM v2.5.0 // ACTIVE
                        </div>
                        <h1 className="text-6xl sm:text-7xl font-display font-black text-black leading-none uppercase tracking-tighter">
                            Resume<br />Reader
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="h-0.5 flex-1 bg-black" />
                            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-black whitespace-nowrap">
                                Technical Analysis Terminal
                            </p>
                        </div>
                    </header>

                    <ResumeUploader onResumeLoaded={onResumeLoaded} />
                </div>

                <footer className="mt-auto py-8 font-mono text-[10px] font-bold uppercase w-full max-w-xl flex-col sm:flex-row flex justify-between gap-2">
                    <span>STATUS: WAITING_FOR_INPUT</span>
                    <span>ID: 982-RESUME-AI</span>
                </footer>
            </div>
        </div>
    )
}
