// Release gate: run every SEO check against one production server, in order,
// and report all results instead of stopping at the first failure.
import { spawnSync } from 'node:child_process'

const checks = [
  ['technical', 'scripts/seo-technical.mjs'],
  ['routes', 'scripts/seo-routes.mjs'],
  ['i18n routes', 'scripts/i18n-routes.mjs'],
  ['metadata', 'scripts/seo-metadata.mjs'],
  ['schema', 'scripts/seo-schema.mjs'],
  ['schema.org vocabulary', 'scripts/seo-vocab.mjs'],
]
const results = checks.map(([name, script]) => {
  const run = spawnSync(process.execPath, [script], {
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
  })
  const output = (run.stdout + run.stderr).trim()
  console.log(`\n## ${name}\n${output}`)
  return [name, run.status === 0]
})
const failed = results.filter(([, ok]) => !ok).map(([name]) => name)
console.log(
  failed.length
    ? `\nFAIL: ${failed.join(', ')}`
    : `\nPASS: all ${results.length} SEO checks.`,
)
process.exit(failed.length ? 1 : 0)
