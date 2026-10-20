/** Stable keys keep repeated UI phrases in one next-intl message catalogue. */
export function copyKey(source: string): string {
  let hash = 2166136261
  for (let i = 0; i < source.length; i++)
    hash = Math.imul(hash ^ source.charCodeAt(i), 16777619)
  return `m${(hash >>> 0).toString(36)}`
}
