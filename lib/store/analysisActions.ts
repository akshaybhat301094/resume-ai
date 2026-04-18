import { AnalysisState } from '@/types/store';
import { handleAnalysis } from './analysisService';

export const createAnalysisActions = (set: any, get: any): Partial<AnalysisState> => ({
  runAnalysis: async (resumeText) => {

    set({ isLoadingAnalysis: true, error: null });

    await handleAnalysis(
      resumeText,
      (data) => set({ analysis: data }),
      (error) => set({ error })
    );

    set({ isLoadingAnalysis: false });
  },

  clearAnalysis: () => set({ analysis: null, error: null, isLoadingAnalysis: false }),
});
