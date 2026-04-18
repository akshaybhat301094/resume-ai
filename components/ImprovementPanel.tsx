'use client'

import { useState } from 'react'
import { Analysis } from '@/types/resume'
import AnalysisHeader from './analysis/AnalysisHeader'
import AnalysisEmptyState from './analysis/AnalysisEmptyState'
import AnalysisLoader from './analysis/AnalysisLoader'
import AtsScoreCard from './analysis/AtsScoreCard'
import MissingSections from './analysis/MissingSections'
import BulletRewrites from './analysis/BulletRewrites'
import StrengthsAndWins from './analysis/StrengthsAndWins'

type Props = {
    resumeText: string
    onClose: () => void
}

export default function ImprovementPanel({ resumeText, onClose }: Props) {
    const [analysis, setAnalysis] = useState<Analysis | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function runAnalysis() {
        if (!resumeText) {
            setError('ALARM: SOURCE_SIGNAL_EMPTY. PLEASE_RELOAD_RESUME.')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/improve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeText }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'UPLINK_FAILURE')

            setAnalysis(data)

        } catch (err: any) {
            setError(`CRITICAL_ALARM: ${err.message || 'ANALYSIS_FAILURE'}. RETRY_SIGNAL.`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full flex flex-col h-full bg-white overflow-y-auto">
            <AnalysisHeader
                hasAnalysis={!!analysis}
                isLoading={isLoading}
                onRunAnalysis={runAnalysis}
                onClose={onClose}
            />

            <div className="p-6 space-y-8 brutalist-dot-grid flex-1">
                {!analysis && !isLoading && (
                    <AnalysisEmptyState onRunAnalysis={runAnalysis} error={error} />
                )}

                {isLoading && (
                    <AnalysisLoader />
                )}

                {analysis && !isLoading && (
                    <div className="space-y-12 pb-12">
                        <AtsScoreCard
                            score={analysis.ats_score}
                            reasoning={analysis.ats_reasoning}
                        />

                        <MissingSections sections={analysis.missing_sections} />

                        <BulletRewrites rewrites={analysis.bullet_rewrites} />

                        <StrengthsAndWins
                            strengths={analysis.top_strengths}
                            quickWins={analysis.quick_wins}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}