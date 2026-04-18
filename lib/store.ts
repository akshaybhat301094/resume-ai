import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UIState, ChatState, AnalysisState } from '@/types/store';
import { createUIActions } from './store/uiActions';
import { createChatActions } from './store/chatActions';
import { createAnalysisActions } from './store/analysisActions';

const useUIStore = create<UIState & ChatState & AnalysisState>()(
  persist(
    devtools((set, get) => ({
      // UI State
      activeTab: 'preview',
      isPreviewOpen: false,
      isAnalysisOpen: false,
      resumeText: null,
      pdfUrl: null,

      // Chat State
      messages: [],
      isLoadingChat: false,

      // Analysis State
      analysis: null,
      error: null,
      isLoadingAnalysis: false,

      // UI Actions
      ...createUIActions(set),

      // Chat Actions
      ...createChatActions(set, get),

      // Analysis Actions
      ...createAnalysisActions(set, get),
    })),
    {
      name: 'ui-storage',
      partialize: (state) => ({ resumeText: state.resumeText, pdfUrl: state.pdfUrl }),
    }
  )
);

export default useUIStore;