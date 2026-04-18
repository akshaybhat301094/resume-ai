import { Message } from '@/types/store';

export async function handleChatMessage(
  input: string,
  resumeText: string | null,
  currentMessages: Message[],
  onUpdate: (messages: Message[] | ((prev: Message[]) => Message[])) => void,
  onError: (error: string) => void
): Promise<void> {
  const text = input.trim();
  if (!text) return;

  const userMessage: Message = { role: 'user', content: text };
  const updatedMessages = [...currentMessages, userMessage];
  onUpdate(updatedMessages);

  const assistantMessage: Message = { role: 'assistant', content: '' };
  onUpdate([...updatedMessages, assistantMessage]);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: updatedMessages,
        resumeText: resumeText || '',
      }),
    });

    if (!res.ok) throw new Error('Chat request failed');
    if (!res.body) throw new Error('No response body');

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;

      onUpdate((prev: Message[]) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...assistantMessage,
          content: fullText,
        };
        return updated;
      });
    }
  } catch (err) {
    onError(`ERROR: CONNECTION_INTERRUPTED. PLEASE_RETRY_TRANSMISSION.`);
    console.error(err);
  }
}
