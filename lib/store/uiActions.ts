import { UIState } from '@/types/store';
import { clearPDFFile } from '@/lib/indexedDB';

export const createUIActions = (set: any): Partial<UIState> => ({
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),

  togglePreview: () => set((state: UIState) => ({ isPreviewOpen: !state.isPreviewOpen })),

  toggleAnalysis: () => set((state: UIState) => ({ isAnalysisOpen: !state.isAnalysisOpen })),

  setResumeData: (text, url) => set(() => ({ resumeText: text, pdfUrl: url })),

  clearResumeData: async () => {
    await clearPDFFile();
    set(() => ({ resumeText: null, pdfUrl: null }));
  },

  clearChat: () => set({ messages: [] }),
});
