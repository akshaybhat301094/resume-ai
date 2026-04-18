import { Analysis } from '@/types/resume';

export async function handleAnalysis(
  resumeText: string | null,
  onSuccess: (data: Analysis) => void,
  onError: (error: string) => void
): Promise<void> {
  if (!resumeText) {
    onError('ALARM: SOURCE_SIGNAL_EMPTY. PLEASE_RELOAD_RESUME.');
    return;
  }

  try {
    const res = await fetch('/api/improve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'UPLINK_FAILURE');

    onSuccess(data);
  } catch (err) {
    const errorMessage = (err as Error).message || 'ANALYSIS_FAILURE';
    onError(`CRITICAL_ALARM: ${errorMessage}. RETRY_SIGNAL.`);
  }
}
