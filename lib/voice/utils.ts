export function asOptionalString(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}

export function getErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== 'object') return null
  const maybeMessage = (error as { message?: unknown }).message
  return typeof maybeMessage === 'string' ? maybeMessage : null
}
