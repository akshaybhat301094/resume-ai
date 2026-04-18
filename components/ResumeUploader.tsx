'use client'

import { useState } from "react";
import useUIStore from '@/lib/store';
import { savePDFFile } from '@/lib/indexedDB';

type Status = 'idle' | 'loading' | 'done' | 'error';

export default function ResumeUploader() {
    const { setResumeData, clearChat, clearAnalysis } = useUIStore();
    const [status, setStatus] = useState<Status>('idle');
    const [fileName, setFileName] = useState<string>('');

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setStatus('error');
            return;
        }

        setFileName(file.name);
        setStatus('loading');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/parse-resume', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                try {
                    await savePDFFile(file);
                    setResumeData(data.text, 'pdf-stored');
                } catch (dbErr) {
                    console.error('IndexedDB save error:', dbErr);
                    setStatus('error');
                    return;
                }
                clearChat();
                clearAnalysis();
                setStatus('done');
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setStatus('error');
        }
    }

    return (
        <div className="space-y-6">
            <div className="relative">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={status === 'loading'}
                />
                <div className={`
                    border-2 border-dashed border-black p-8 text-center transition-all
                    ${status === 'loading' ? 'bg-gray-50 opacity-50' : 'bg-white hover:bg-[#F9F9F9]'}
                `}>
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-display font-black text-xl uppercase tracking-tighter">
                                {status === 'loading' ? 'Ingesting_Manuscript...' : fileName || 'Register_Resume_File'}
                            </p>
                            <p className="font-mono text-[10px] uppercase font-bold text-gray-400 mt-1">
                                [ PDF_STREAM_ONLY_SUPPORTED ]
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {status === 'error' && (
                <div className="bg-black text-white p-4 font-mono text-[10px] font-bold uppercase tracking-widest brutalist-shadow">
                    ERROR: UPLINK_FAILURE. PLEASE_VERIFY_FILE_INTEGRITY.
                </div>
            )}

            {status === 'done' && (
                <div className="bg-[#003BFF] text-white p-4 font-mono text-[10px] font-bold uppercase tracking-widest brutalist-shadow">
                    SIGNAL: INGESTION_SUCCESSFUL. DATA_READY_FOR_PROCESSING.
                </div>
            )}
        </div>
    );
}
