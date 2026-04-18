'use client'

import useUIStore from '@/lib/store';

export default function ResumePreview() {
    const { pdfUrl, resumeText, togglePreview } = useUIStore();

    return (
        <div className="w-full h-full flex flex-col bg-white border-r-2 border-black overflow-hidden">
            {/* Header */}
            <div className="px-4 lg:px-8 py-4 lg:py-6 border-b-2 border-black bg-white flex justify-between items-center sticky top-0 z-10 h-auto lg:h-[88px]">
                <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[var(--accent)] flex items-center justify-center font-display font-black text-white text-sm lg:text-xl">R</div>
                    <h2 className="font-display font-black text-lg lg:text-2xl uppercase tracking-tighter">Resume_Source</h2>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[7px] lg:text-[8px] font-bold text-gray-300 uppercase tracking-widest hidden sm:inline">
                        {pdfUrl ? 'STREAM: LIVE' : 'STATUS: OFFLINE'}
                    </span>
                    <button 
                        onClick={togglePreview}
                        className="hidden lg:flex w-8 h-8 border-2 border-black items-center justify-center font-mono text-xs font-black hover:bg-black hover:text-white transition-colors brutalist-shadow-sm"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-hidden bg-[#F9F9F9]">
                {pdfUrl ? (
                    <iframe 
                        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                        className="w-full h-full border-none pointer-events-auto"
                        title="Resume Preview"
                    />
                ) : (
                    <div className="h-full overflow-y-auto p-6 brutalist-dot-grid">
                        <div className="brutalist-card bg-white p-6 min-h-full">
                            <div className="bg-black text-white p-4 mb-6 font-mono text-[10px] font-bold uppercase brutalist-shadow-sm">
                                ALARM: PDF_SOURCE_TEMPORARY_STORAGE_EXPIRED. 
                                SHOWING_CACHED_DATA_STREAM.
                            </div>
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                <span className="mono-label">CACHED_DATA_STREAM</span>
                                <span className="mono-label text-[8px]">Enc: UTF-8</span>
                            </div>
                            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-700">
                                {resumeText || 'No resume data available.'}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Footer Status Bar */}
            <div className="px-6 py-2 border-t-2 border-black bg-white flex justify-between">
                <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-black/40">
                  ID: RESUME-SRC-99
                </span>
                <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[var(--accent)]">
                  TYPE: PDF/APPLICATION
                </span>
            </div>
        </div>
    )
}
