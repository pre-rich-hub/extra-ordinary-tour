export function mergeMessages(
  base: Record<string, unknown>,
  overlay: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...base }
  for (const [key, value] of Object.entries(overlay)) {
    const source = result[key]
    result[key] =
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      source &&
      typeof source === 'object' &&
      !Array.isArray(source)
        ? mergeMessages(
            source as Record<string, unknown>,
            value as Record<string, unknown>,
          )
        : (value ?? source)
  }
  return result
}
