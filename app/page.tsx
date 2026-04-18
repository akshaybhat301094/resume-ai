'use client'

import LandingPage from '@/components/landing/LandingPage'
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout'
import ErrorBoundary from '@/components/ErrorBoundary'
import useUIStore from '@/lib/store'

export default function Home() {
    const { resumeText } = useUIStore()

    return (
        <ErrorBoundary>
            <main className="h-screen flex flex-col bg-[#F9F9F9] overflow-hidden uppercase font-sans">
                {!resumeText ? (
                    <LandingPage />
                ) : (
                    <WorkspaceLayout />
                )}
            </main>
        </ErrorBoundary>
    )
}
