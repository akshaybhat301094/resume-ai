'use client'

import { useState, useEffect } from 'react';
import ResumeUploader from '@/components/ResumeUploader';
import ChatPanel from '@/components/chat/ChatPanel';
import ImprovementPanel from '@/components/ImprovementPanel';
import { getResume, clearResume as clearLocalResume } from '@/lib/localStorage';

export default function Home() {
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(true);

  useEffect(() => {
    const saved = getResume();
    if (saved) {
      setResumeText(saved);
    }
  }, []);

  const handleClearResume = () => {
    clearLocalResume();
    setResumeText(null);
  };

  return (
    <main className="h-screen flex flex-col bg-[#F9F9F9] overflow-hidden">
      {!resumeText ? (
        <div className="flex-1 overflow-y-auto w-full">
          <div className="min-h-full flex flex-col items-center justify-center p-6 sm:p-12">
            <div className="w-full max-w-xl space-y-12 py-12">
              <header className="space-y-4 text-center sm:text-left">
                <div className="inline-block bg-black text-white px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase">
                  SYSTEM v2.4.0 // ACTIVE
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

              <ResumeUploader onResumeLoaded={setResumeText} />
            </div>
            
            <footer className="mt-auto py-8 font-mono text-[10px] font-bold uppercase w-full max-w-xl flex justify-between">
               <span>STATUS: WAITING_FOR_INPUT</span>
               <span>ID: 982-RESUME-AI</span>
            </footer>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            {/* Main Chat Console */}
            <div className="flex-1 h-full flex flex-col overflow-hidden border-black relative">
                <ChatPanel 
                    resumeText={resumeText} 
                    onClearResume={handleClearResume} 
                    isAnalysisOpen={isAnalysisOpen}
                    onToggleAnalysis={() => setIsAnalysisOpen(!isAnalysisOpen)}
                />
            </div>

            {/* Collapsible Analysis Panel */}
            <div className={`transition-all duration-300 ease-in-out border-black bg-white overflow-hidden shrink-0 flex flex-col h-full
              ${isAnalysisOpen ? 'lg:w-[450px] border-l-2' : 'lg:w-0 border-l-0'}`}>
                <div className="min-w-[450px] h-full overflow-hidden">
                    <ImprovementPanel resumeText={resumeText} onClose={() => setIsAnalysisOpen(false)} />
                </div>
            </div>
        </div>
      )}
    </main>
  );
}
