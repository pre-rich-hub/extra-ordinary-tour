import { describe, expect, it } from "vitest";
import {
  buildBookingTrends,
  utcDateKey,
} from "../../src/modules/admin/dashboard.trends.js";

describe("buildBookingTrends", () => {
  const now = new Date("2026-10-28T12:00:00.000Z");

  it("returns a zero-filled 30-day UTC series ending today", () => {
    const trends = buildBookingTrends([], now);

    expect(trends).toHaveLength(30);
    expect(trends[0]).toEqual({ date: "2026-09-29", count: 0 });
    expect(trends.at(-1)).toEqual({ date: "2026-10-28", count: 0 });
    expect(trends.every((entry) => entry.count === 0)).toBe(true);
  });

  it("counts bookings in their UTC day bucket", () => {
    const trends = buildBookingTrends(
      [
        { createdAt: new Date("2026-10-28T00:00:00.000Z") },
        { createdAt: new Date("2026-10-28T23:59:59.000Z") },
        { createdAt: new Date("2026-10-27T23:59:59.000Z") },
      ],
      now,
    );

    expect(trends.at(-1)).toEqual({ date: "2026-10-28", count: 2 });
    expect(trends.at(-2)).toEqual({ date: "2026-10-27", count: 1 });
  });

  it("ignores rows outside the window", () => {
    const trends = buildBookingTrends(
      [{ createdAt: new Date("2026-09-28T12:00:00.000Z") }],
      now,
    );

    expect(trends.reduce((sum, entry) => sum + entry.count, 0)).toBe(0);
  });

  it("keeps the series ascending across a month boundary", () => {
    const trends = buildBookingTrends(
      [{ createdAt: new Date("2026-09-30T10:00:00.000Z") }],
      new Date("2026-10-02T12:00:00.000Z"),
      3,
    );

    expect(trends).toEqual([
      { date: "2026-09-30", count: 1 },
      { date: "2026-10-01", count: 0 },
      { date: "2026-10-02", count: 0 },
    ]);
  });
});

describe("utcDateKey", () => {
  it("formats the UTC calendar day, not the local day", () => {
    expect(utcDateKey(new Date("2026-10-28T00:30:00.000Z"))).toBe("2026-10-28");
    expect(utcDateKey(new Date("2026-10-27T23:30:00.000Z"))).toBe("2026-10-27");
  });
});
