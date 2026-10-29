import { describe, expect, it } from "vitest";
import {
  parseCategoryIds,
  parseLineList,
  toBoolean,
  toNumber,
} from "../../src/utils/parsers.js";

describe("toNumber", () => {
  it("parses numeric strings", () => {
    expect(toNumber("125.50")).toBe(125.5);
  });

  it("returns null for empty or non-numeric input", () => {
    expect(toNumber("")).toBeNull();
    expect(toNumber(null)).toBeNull();
    expect(toNumber(undefined)).toBeNull();
    expect(toNumber("abc")).toBeNull();
  });

  it("passes through finite numbers", () => {
    expect(toNumber(42)).toBe(42);
  });
});

describe("toBoolean", () => {
  it("accepts booleans and truthy strings", () => {
    expect(toBoolean(true)).toBe(true);
    expect(toBoolean("true")).toBe(true);
    expect(toBoolean("1")).toBe(true);
    expect(toBoolean("on")).toBe(true);
    expect(toBoolean(1)).toBe(true);
  });

  it("rejects anything else", () => {
    expect(toBoolean(false)).toBe(false);
    expect(toBoolean("false")).toBe(false);
    expect(toBoolean("yes")).toBe(false);
    expect(toBoolean(undefined)).toBe(false);
  });
});

describe("parseCategoryIds", () => {
  it("parses a JSON array string", () => {
    expect(parseCategoryIds('[1,2,3]')).toEqual([1, 2, 3]);
  });

  it("parses a comma-separated string", () => {
    expect(parseCategoryIds("1,2,3")).toEqual([1, 2, 3]);
  });

  it("accepts an actual array", () => {
    expect(parseCategoryIds([1, "2", 3])).toEqual([1, 2, 3]);
  });

  it("filters out non-integers", () => {
    expect(parseCategoryIds("[1,2.5,-4]")).toEqual([1, -4]);
  });

  it("falls back to a comma split for non-JSON strings", () => {
    expect(parseCategoryIds("1, 2 , 3")).toEqual([1, 2, 3]);
  });

  it("returns [] for empty and non-array input", () => {
    expect(parseCategoryIds("")).toEqual([]);
    expect(parseCategoryIds(null)).toEqual([]);
    expect(parseCategoryIds(undefined)).toEqual([]);
    expect(parseCategoryIds(42)).toEqual([]);
  });
});

describe("parseLineList", () => {
  it("splits newline-separated lines and trims them", () => {
    expect(parseLineList("First stop\r\n  Second stop  \n\nThird stop")).toEqual([
      "First stop",
      "Second stop",
      "Third stop",
    ]);
  });

  it("passes through a JSON array of strings", () => {
    expect(parseLineList('["Meet at arrivals","Drive to Entoto"]')).toEqual([
      "Meet at arrivals",
      "Drive to Entoto",
    ]);
  });

  it("preserves commas inside a line", () => {
    expect(parseLineList("Driver, guide and vehicle\nEntrance fees, lunch")).toEqual([
      "Driver, guide and vehicle",
      "Entrance fees, lunch",
    ]);
  });

  it("returns [] for empty and non-string input", () => {
    expect(parseLineList("")).toEqual([]);
    expect(parseLineList("   ")).toEqual([]);
    expect(parseLineList(null)).toEqual([]);
    expect(parseLineList(undefined)).toEqual([]);
    expect(parseLineList(42)).toEqual([]);
  });
});
