// Summarize the monthly AI-answer runs (geo.md, G0/G5). Reads the fixed
// question set and every dated results file, validates them, and prints
// mention and citation rates per run, engine and language, plus factual
// errors and questions the site is never cited for. Works offline.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { catalogueSpecs, readCatalogue, root } from './i18n-catalogue.mjs'

const dir = path.join(root, 'docs/geo')
const origin = 'https://extraordinaryethiopiatours.com'
const engines = [
  'chatgpt',
  'perplexity',
  'google-ai-mode',
  'google-ai-overview',
  'gemini',
  'claude',
  'copilot',
]

function parseCsv(file) {
  const text = fs.readFileSync(file, 'utf8')
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') field += text[++i]
      else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') (row.push(field), (field = ''))
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      ;(row.push(field), (field = ''))
      if (row.some(Boolean)) rows.push(row)
      row = []
    } else field += c
  }
  row.push(field)
  if (row.some(Boolean)) rows.push(row)
  const [header, ...body] = rows
  return body.map((cells, n) => {
    assert.equal(
      cells.length,
      header.length,
      `${path.basename(file)} row ${n + 2}: ${cells.length} cells, expected ${header.length}`,
    )
    return Object.fromEntries(header.map((h, i) => [h, cells[i].trim()]))
  })
}

// Questions: unique ids, known languages, targets that are real pages.
const pages = new Set(
  [
    '',
    '/about',
    '/about-ethiopia',
    '/travel-guide',
    '/tours',
    '/destinations',
    '/layover',
    '/blog',
    '/contact',
  ].concat(
    ['tours', 'destinations', 'blog'].flatMap((feature) =>
      readCatalogue(
        catalogueSpecs.find((spec) => spec.feature === feature),
      ).map((record) => `/${feature}/${record.slug}`),
    ),
  ),
)
const questions = new Map()
for (const q of parseCsv(path.join(dir, 'questions.csv'))) {
  assert.ok(!questions.has(q.id), `questions.csv: duplicate ${q.id}`)
  assert.ok(
    ['en', 'es', 'fr'].includes(q.locale),
    `${q.id}: locale ${q.locale}`,
  )
  const [, locale, ...rest] = q.target.split('/')
  assert.ok(
    locale === q.locale && pages.has(rest.length ? `/${rest.join('/')}` : ''),
    `${q.id}: target ${q.target} is not a ${q.locale} page`,
  )
  questions.set(q.id, q)
}

// Results: one file per run, named by its date.
const runs = fs
  .readdirSync(path.join(dir, 'results'))
  .filter((f) => /^\d{4}-\d{2}-\d{2}\.csv$/.test(f))
  .sort()
  .map((file) => {
    const date = file.slice(0, 10)
    const rows = parseCsv(path.join(dir, 'results', file))
    for (const [n, r] of rows.entries()) {
      const where = `${file} row ${n + 2}`
      assert.equal(r.date, date, `${where}: date ${r.date}`)
      assert.ok(engines.includes(r.engine), `${where}: engine ${r.engine}`)
      assert.ok(questions.has(r.question_id), `${where}: ${r.question_id}`)
      for (const key of ['brand_mentioned', 'site_cited'])
        assert.ok(['yes', 'no'].includes(r[key]), `${where}: ${key} ${r[key]}`)
      assert.ok(
        r.site_cited === 'yes'
          ? r.cited_url.startsWith(origin)
          : r.cited_url === '',
        `${where}: cited_url must be a site URL exactly when site_cited is yes`,
      )
    }
    return { date, rows }
  })

console.log(`${questions.size} questions; ${runs.length} recorded runs.`)
if (!runs.length) {
  console.log(
    'No runs yet. Copy docs/geo/results/template.csv to docs/geo/results/<YYYY-MM-DD>.csv and record one row per question and engine.',
  )
  process.exit(0)
}

const pct = (rows, test) =>
  rows.length
    ? `${Math.round((100 * rows.filter(test).length) / rows.length)}%`
    : '-'
const mentioned = (r) => r.brand_mentioned === 'yes'
const cited = (r) => r.site_cited === 'yes'
const onTarget = (r) =>
  cited(r) &&
  new URL(r.cited_url).pathname.replace(/\/$/, '') ===
    questions.get(r.question_id).target
const summary = (rows) => ({
  answers: rows.length,
  mentioned: pct(rows, mentioned),
  cited: pct(rows, cited),
  'cited target page': pct(rows, onTarget),
})

console.log('\nBy run')
console.table(
  Object.fromEntries(runs.map((run) => [run.date, summary(run.rows)])),
)

const latest = runs.at(-1)
const group = (key) =>
  Object.fromEntries(
    [...new Set(latest.rows.map(key))]
      .sort()
      .map((k) => [k, summary(latest.rows.filter((r) => key(r) === k))]),
  )
console.log(`\nLatest run (${latest.date}) by engine`)
console.table(group((r) => r.engine))
console.log(`\nLatest run (${latest.date}) by language`)
console.table(group((r) => questions.get(r.question_id).locale))

const errors = latest.rows.filter((r) => r.factual_errors)
console.log(
  `\nFactual errors about the business (${latest.date}): ${errors.length}`,
)
for (const r of errors)
  console.log(`- ${r.engine} ${r.question_id}: ${r.factual_errors}`)

const competitors = new Map()
for (const r of latest.rows)
  for (const name of r.competitors
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean))
    competitors.set(name, (competitors.get(name) ?? 0) + 1)
console.log(`\nCompetitors named most often (${latest.date})`)
for (const [name, count] of [...competitors]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10))
  console.log(`- ${name}: ${count}`)

const everCited = new Set(
  runs.flatMap((run) => run.rows.filter(cited).map((r) => r.question_id)),
)
const never = [...questions.keys()].filter((id) => !everCited.has(id))
console.log(
  `\nNever cited in any run: ${never.length ? never.join(', ') : 'none'}`,
)
