import { Analysis } from './resume';

export type Tab = 'preview' | 'chat' | 'analysis';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface UIState {
  activeTab: Tab;
  isPreviewOpen: boolean;
  isAnalysisOpen: boolean;
  resumeText: string | null;
  pdfUrl: string | null;
  setActiveTab: (tab: Tab) => void;
  togglePreview: () => void;
  toggleAnalysis: () => void;
  setResumeData: (text: string, url: string) => void;
  clearResumeData: () => void;
  clearChat: () => void;
}

export interface ChatState {
  messages: Message[];
  isLoadingChat: boolean;
  sendMessage: (input: string, resumeText: string | null) => Promise<void>;
}

export interface AnalysisState {
  analysis: Analysis | null;
  isLoadingAnalysis: boolean;
  error: string | null;
  runAnalysis: (resumeText: string | null) => Promise<void>;
  clearAnalysis: () => void;
}
