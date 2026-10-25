import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { createTranslator } from 'next-intl'
import {
  root,
  catalogueSpecs,
  sourceOverlay,
  readCatalogue,
} from './i18n-catalogue.mjs'
const read = (file) =>
  JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const en = read('src/messages/en.json')
const placeholders = (s) =>
  [...s.matchAll(/\{(\w+)(?:[,}])/g)].map((m) => m[1]).sort()
function check(source, translated, label) {
  if (typeof source === 'string') {
    assert.equal(typeof translated, 'string', `${label}: missing string`)
    assert.ok(translated.trim(), `${label}: empty translation`)
    assert.deepEqual(
      placeholders(translated),
      placeholders(source),
      `${label}: ICU placeholders`,
    )
    assert.ok(
      !(source === translated && source.length > 100),
      `${label}: English paragraph placeholder`,
    )
  } else if (Array.isArray(source)) {
    assert.ok(Array.isArray(translated), `${label}: missing array`)
    assert.equal(translated.length, source.length, `${label}: incomplete array`)
    source.forEach((value, index) =>
      check(value, translated[index], `${label}[${index}]`),
    )
  } else if (source && typeof source === 'object') {
    assert.deepEqual(
      Object.keys(translated ?? {}).sort(),
      Object.keys(source).sort(),
      `${label}: keys`,
    )
    Object.entries(source).forEach(([key, value]) =>
      check(value, translated[key], `${label}.${key}`),
    )
  } else assert.equal(translated, source, `${label}: stable value`)
}
// Draft languages may hold partial catalogues: each record present must be
// complete, and missing records fall back to English until publication.
const publication = fs.readFileSync(
  path.join(root, 'src/i18n/publication.ts'),
  'utf8',
)
const locales = [...publication.matchAll(/^\s+(\w\w): '(published|draft)'/gm)]
  .map(([, locale, state]) => ({ locale, draft: state === 'draft' }))
  .filter(({ locale }) => locale !== 'en')
for (const { locale, draft } of locales) {
  const messages = read(`src/messages/${locale}.json`)
  check(en, messages, `${locale}.UI`)
  for (const lang of ['en', locale]) {
    const tree = lang === 'en' ? en : messages
    const t = createTranslator({
      locale: lang,
      messages: tree,
      onError: (error) => {
        throw error
      },
    })
    for (const [namespace, entries] of Object.entries(tree))
      for (const [key, value] of Object.entries(entries)) {
        const values = Object.fromEntries(
          placeholders(value).map((p) => [p, 2]),
        )
        t(`${namespace}.${key}`, values)
      }
  }
  for (const spec of catalogueSpecs) {
    const records = readCatalogue(spec)
    assert.equal(
      new Set(records.map((record) => record[spec.key])).size,
      records.length,
      `${spec.feature}: duplicate IDs`,
    )
    const translated = read(
      `src/features/${spec.feature}/data/locales/${locale}.json`,
    )
    const source = sourceOverlay(spec)
    const present = Object.keys(translated).length
    check(
      draft
        ? Object.fromEntries(
            Object.entries(source).filter(([id]) => id in translated),
          )
        : source,
      translated,
      `${locale}.${spec.feature}`,
    )
    console.log(
      draft
        ? `${locale} (draft): ${spec.feature} ${present} of ${records.length} records`
        : `${locale}: ${spec.feature} ${records.length} records complete`,
    )
  }
}
console.log(
  `UI: ${Object.keys(en.Copy).length} phrases; keys, ICU arguments and catalogue structure verified.`,
)

// A UI phrase must be registered before it can silently fall back to English.
const { default: ts } = await import('typescript')
const keys = new Set(Object.values(en.Copy))
const files = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? files(path.join(dir, entry.name))
        : [path.join(dir, entry.name)],
    )
for (const file of files(path.join(root, 'src')).filter(
  (file) =>
    file.endsWith('.tsx') && !/\/(?:admin|auth|\(private\))\//.test(file),
)) {
  const tree = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(tree) === 'copy' &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    )
      assert.ok(
        keys.has(node.arguments[0].text),
        `${file}: unregistered UI phrase ${node.arguments[0].text}`,
      )
    ts.forEachChild(node, visit)
  }
  visit(tree)
}
console.log('UI copy calls: all literal messages registered.')
