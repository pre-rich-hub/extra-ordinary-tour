/**
 * Parse a YYYY-MM-DD string into a real calendar date at UTC midnight.
 * Returns null for dates like "2026-02-31", "2026-13-01", or "2026-00-10"
 * that the Date constructor would silently roll over into another day.
 */
export function parseValidDate(date: string): Date | null {
  const [year, month, day] = date.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }
  return parsed;
}
