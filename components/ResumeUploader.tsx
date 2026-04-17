'use client'

import { useState } from "react";
import { saveResume, clearHistory } from '@/lib/localStorage';

type Props = {
    onResumeLoaded: (text: string) => void
}

type Status = 'idle' | 'loading' | 'done' | 'error';

const enum STATUS {
    ERROR = 'error',
    LOADING = 'loading',
    DONE = 'done',
    IDLE = 'idle',
}

export default function ResumeUploader({ onResumeLoaded }: Props) {
    const [status, setStatus] = useState<Status>(STATUS.IDLE);
    const [fileName, setFileName] = useState<string>('');

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setStatus(STATUS.ERROR);
            return;
        }

        setFileName(file.name);
        setStatus(STATUS.LOADING);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/parse-resume', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            saveResume(data.text);
            clearHistory();
            onResumeLoaded(data.text);
            setStatus(STATUS.DONE);

        } catch (error) {
            console.error(error);
            setStatus(STATUS.ERROR);
        }
    }

    return (
        <div className="brutalist-card p-1">
            <div className="bg-[#F9F9F9] border-2 border-black p-8 sm:p-12 flex flex-col items-center gap-10">
                <div className="space-y-4 w-full">
                    <div className="flex justify-between items-center border-b-2 border-black pb-4">
                        <span className="mono-label">FILE_INPUT</span>
                        <span className="mono-label">TYPE: PDF</span>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="w-16 h-16 brutalist-border bg-white flex items-center justify-center brutalist-shadow-sm">
                        <span className="text-3xl">■</span>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="font-display font-black text-2xl uppercase tracking-tighter">
                            {status === STATUS.LOADING ? 'PROCESSING_DATA' : 'LOAD_RESUME'}
                        </h3>
                        <p className="font-mono text-[10px] font-bold text-gray-400 uppercase">
                            {fileName || 'SELECT_MANUSCRIPT_TO_BEGIN'}
                        </p>
                    </div>
                </div>

                <label className={`brutalist-button-primary w-full text-center flex items-center justify-center gap-2 ${
                    status === STATUS.LOADING ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}>
                    {status === STATUS.LOADING ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-spin text-xl">◌</span>
                            INGESTING
                        </span>
                    ) : 'FIND_FILE'}
                    <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleFileChange} 
                        className="hidden" 
                        disabled={status === STATUS.LOADING}
                    />
                </label>

                {status === STATUS.ERROR && (
                    <div className="bg-black text-white px-4 py-2 font-mono text-[10px] brutalist-shadow-sm w-full text-center">
                        ALARM: EXTRACTION_FAILURE. RETRY_REQUIRED.
                    </div>
                )}
            </div>
        </div>
    )
}
