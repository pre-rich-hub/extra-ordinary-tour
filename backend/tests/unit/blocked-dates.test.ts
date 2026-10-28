import { describe, expect, it } from "vitest";
import { parseValidDate } from "../../src/utils/dates.js";

describe("parseValidDate", () => {
  it("rejects dates the JS Date constructor would silently roll over", () => {
    // "2026-02-31" would become March 3, "2024-02-30" would become March 1
    expect(parseValidDate("2026-02-31")).toBeNull();
    expect(parseValidDate("2026-04-31")).toBeNull();
  });

  it("rejects Feb 29 in a non-leap year", () => {
    expect(parseValidDate("2026-02-29")).toBeNull();
  });

  it("rejects out-of-range month and day components", () => {
    expect(parseValidDate("2026-13-01")).toBeNull();
    expect(parseValidDate("2026-00-01")).toBeNull();
    expect(parseValidDate("2026-01-00")).toBeNull();
  });

  it("accepts real calendar dates at UTC midnight", () => {
    expect(parseValidDate("2026-02-28")).toEqual(new Date("2026-02-28T00:00:00.000Z"));
  });

  it("accepts Feb 29 in a leap year", () => {
    expect(parseValidDate("2024-02-29")).toEqual(new Date("2024-02-29T00:00:00.000Z"));
  });
});
