// Same stable FNV-1a key as src/i18n/copy-key.ts.
const source = process.argv[2]
if (!source)
  throw new Error('Usage: node scripts/i18n-key.mjs "English UI phrase"')
let hash = 2166136261
for (let i = 0; i < source.length; i++)
  hash = Math.imul(hash ^ source.charCodeAt(i), 16777619)
console.log(
  JSON.stringify({ [`m${(hash >>> 0).toString(36)}`]: source }, null, 2),
)
