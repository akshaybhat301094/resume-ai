const RESUME_KEY = 'resume_ai_text';
const HISTORY_KEY = 'resume_ai_history';

export function saveResume(text: string): void {
    localStorage.setItem(RESUME_KEY, text);
}


export function getResume(): string | null {
    return localStorage.getItem(RESUME_KEY);
}

export function clearResume(): void {
    localStorage.removeItem(RESUME_KEY);
}


// CHAT --- HISTORY 


export type Message = {
    role: 'user' | 'assistant'
    content: string
}


export function saveHistory(messages: Message[]): void {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
}

export function getHistory(): Message[] {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
}

export function clearHistory(): void {
    localStorage.removeItem(HISTORY_KEY);
}