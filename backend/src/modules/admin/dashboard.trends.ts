export const TREND_DAYS = 30;

export function utcDateKey(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export type TrendBooking = { createdAt: Date };
export type BookingTrend = { date: string; count: number };

/**
 * Build a continuous UTC-day series ending today. The admin chart draws every
 * bucket it receives, so sparse data must be zero-filled rather than omitted.
 */
export function buildBookingTrends(
  rows: TrendBooking[],
  now: Date,
  days = TREND_DAYS,
): BookingTrend[] {
  const start = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - (days - 1),
    ),
  );

  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = utcDateKey(row.createdAt);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    const key = utcDateKey(date);
    return { date: key, count: counts.get(key) ?? 0 };
  });
}
