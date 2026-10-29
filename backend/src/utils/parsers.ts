// Line-oriented lists (layover itinerary/includes) keep commas inside a line,
// so unlike parseOptionalJsonArrayString this only splits on newlines.
export function parseLineList(value: unknown): string[] {
  if (typeof value !== "string") return [];
  const trimmed = value.trim();
  if (trimmed === "") return [];

  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
        return parsed;
      }
    } catch {
      // Fall through to the newline split below.
    }
  }

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseJsonArray(value: unknown): unknown[] {
  if (!value || typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function parseOptionalJsonArrayString(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") return "[]";
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return JSON.stringify(parsed);
  } catch {
    const items = value
      .split(/[\r\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    return JSON.stringify(items);
  }
  return "[]";
}

export function parseCategoryIds(value: unknown): number[] {
  if (Array.isArray(value)) return value.map(Number).filter(Number.isInteger);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(Number).filter(Number.isInteger);
    } catch {
      return value.split(",").map(Number).filter(Number.isInteger);
    }
  }
  return [];
}

export function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

export function toBoolean(value: unknown): boolean {
  return (
    value === true ||
    value === "true" ||
    value === "1" ||
    value === "on" ||
    value === 1
  );
}
