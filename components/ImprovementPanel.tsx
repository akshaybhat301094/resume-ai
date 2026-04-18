'use client'

import AnalysisHeader from './analysis/AnalysisHeader'
import AnalysisEmptyState from './analysis/AnalysisEmptyState'
import AnalysisLoader from './analysis/AnalysisLoader'
import AtsScoreCard from './analysis/AtsScoreCard'
import MissingSections from './analysis/MissingSections'
import BulletRewrites from './analysis/BulletRewrites'
import StrengthsAndWins from './analysis/StrengthsAndWins'
import useUIStore from '@/lib/store';

export default function ImprovementPanel() {
  const { analysis, isLoadingAnalysis, error, runAnalysis, resumeText, toggleAnalysis } = useUIStore();

  const handleRunAnalysis = () => {
    runAnalysis(resumeText);
  };

  return (
    <div className="w-full flex flex-col h-full bg-white overflow-y-auto">
      <AnalysisHeader
        hasAnalysis={!!analysis}
        isLoading={isLoadingAnalysis}
        onRunAnalysis={handleRunAnalysis}
        onClose={toggleAnalysis}
      />

      <div className="p-6 space-y-8 brutalist-dot-grid flex-1">
        {!analysis && !isLoadingAnalysis && (
          <AnalysisEmptyState onRunAnalysis={handleRunAnalysis} error={error} />
        )}

        {isLoadingAnalysis && (
          <AnalysisLoader />
        )}

        {analysis && !isLoadingAnalysis && (
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