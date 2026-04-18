const RESUME_KEY = 'resume_ai_text';
const HISTORY_KEY = 'resume_ai_history';

export function saveResume(text: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(RESUME_KEY, text);
}

export function getResume(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(RESUME_KEY);
}

export function clearResume(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(RESUME_KEY);
}

import { Message } from '@/types/chat';
export type { Message };

export function saveHistory(messages: Message[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
}

export function getHistory(): Message[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
}

export function clearHistory(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(HISTORY_KEY);
}