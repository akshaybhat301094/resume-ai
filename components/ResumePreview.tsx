'use client'

import { useState } from 'react';
import useUIStore from '@/lib/store';

export default function ResumePreview() {
    const { pdfUrl, resumeText, togglePreview } = useUIStore();
    const [scale, setScale] = useState(1);

    const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
    const resetZoom = () => setScale(1);

    return (
        <div className="w-full h-full flex flex-col bg-white border-r-2 border-black overflow-hidden">
            {/* Header */}
            <div 
                className="px-4 lg:px-8 py-4 lg:py-6 border-b-2 border-black bg-white flex justify-between items-center shrink-0 z-10 h-auto lg:h-[88px]"
                style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))' }}
            >
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

            {/* Zoom Controls - Mobile only when PDF is shown */}
            {pdfUrl && (
                <div className="lg:hidden flex items-center justify-center gap-2 py-2 px-4 border-b-2 border-black bg-white shrink-0">
                    <button 
                        onClick={zoomOut}
                        className="w-8 h-8 border-2 border-black flex items-center justify-center font-mono text-sm font-black hover:bg-black hover:text-white transition-colors"
                    >
                        −
                    </button>
                    <button 
                        onClick={resetZoom}
                        className="px-3 h-8 border-2 border-black flex items-center justify-center font-mono text-[10px] font-bold hover:bg-black hover:text-white transition-colors"
                    >
                        {Math.round(scale * 100)}%
                    </button>
                    <button 
                        onClick={zoomIn}
                        className="w-8 h-8 border-2 border-black flex items-center justify-center font-mono text-sm font-black hover:bg-black hover:text-white transition-colors"
                    >
                        +
                    </button>
                </div>
            )}

            {/* Content area */}
            <div className="flex-1 overflow-auto bg-[#F9F9F9]">
                {pdfUrl ? (
                    <div 
                        className="w-full h-full overflow-auto lg:overflow-hidden"
                        style={{ 
                            WebkitOverflowScrolling: 'touch',
                            touchAction: 'manipulation',
                        }}
                    >
                        {scale !== 1 ? (
                            <div
                                style={{
                                    transform: `scale(${scale})`,
                                    transformOrigin: 'top left',
                                    width: `${100 / scale}%`,
                                    height: `${100 / scale}%`,
                                    overflow: 'auto',
                                    WebkitOverflowScrolling: 'touch',
                                }}
                            >
                                <iframe 
                                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
                                    className="w-full h-full border-none"
                                    title="Resume Preview"
                                    style={{ 
                                        display: 'block',
                                        minHeight: '100vh',
                                    }}
                                />
                            </div>
                        ) : (
                            <iframe 
                                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} 
                                className="w-full h-full border-none"
                                title="Resume Preview"
                                style={{ 
                                    display: 'block',
                                    minHeight: '100%',
                                }}
                            />
                        )}
                    </div>
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
            <div className="px-6 py-2 border-t-2 border-black bg-white flex justify-between shrink-0">
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
