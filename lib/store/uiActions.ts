import { UIState } from '@/types/store';

export const createUIActions = (set: any): Partial<UIState> => ({
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),

  togglePreview: () => set((state: UIState) => ({ isPreviewOpen: !state.isPreviewOpen })),

  toggleAnalysis: () => set((state: UIState) => ({ isAnalysisOpen: !state.isAnalysisOpen })),

  setResumeData: (text, url) => set(() => ({ resumeText: text, pdfUrl: url })),

  clearResumeData: () => set(() => ({ resumeText: null, pdfUrl: null })),

  clearChat: () => set({ messages: [] }),
});
