import { ChatState, Message } from '@/types/store';
import { handleChatMessage } from './chatService';

export const createChatActions = (set: any, get: any): Partial<ChatState> => ({
  sendMessage: async (input, resumeText) => {
    if (!input.trim() || get().isLoadingChat) return;

    set({ isLoadingChat: true });

    await handleChatMessage(
      input,
      resumeText,
      get().messages,
      (messages) => set({ messages: typeof messages === 'function' ? messages(get().messages) : messages }),
      (error) => {
        set((state: any) => {
          const updated = [...state.messages];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: error,
          };
          return { messages: updated };
        });
      }
    );

    set({ isLoadingChat: false });
  },
});
