'use client'

import { useState, useEffect } from 'react'
import { getResume, clearResume as clearLocalResume } from '@/lib/localStorage'
import LandingPage from '@/components/landing/LandingPage'
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
    const [resumeText, setResumeText] = useState<string | null>(null)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(true)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<'preview' | 'chat' | 'analysis'>('chat')

    useEffect(() => {
        const saved = getResume()
        if (saved) {
            setResumeText(saved)
        }
    }, [])

    const handleResumeLoaded = (text: string, url: string) => {
        setResumeText(text)
        setPdfUrl(url)
        setIsPreviewOpen(true)
        setActiveTab('preview')
    }

    const handleClearResume = () => {
        clearLocalResume()
        setResumeText(null)
        setPdfUrl(null)
    }

    return (
        <ErrorBoundary>
            <main className="h-screen flex flex-col bg-[#F9F9F9] overflow-hidden uppercase font-sans">
                {!resumeText ? (
                    <LandingPage onResumeLoaded={handleResumeLoaded} />
                ) : (
                    <WorkspaceLayout
                        resumeText={resumeText}
                        pdfUrl={pdfUrl}
                        activeTab={activeTab}
                        isPreviewOpen={isPreviewOpen}
                        isAnalysisOpen={isAnalysisOpen}
                        onTabChange={setActiveTab}
                        onTogglePreview={() => setIsPreviewOpen(!isPreviewOpen)}
                        onToggleAnalysis={() => setIsAnalysisOpen(!isAnalysisOpen)}
                        onClearResume={handleClearResume}
                    />
                )}
            </main>
        </ErrorBoundary>
    )
}
