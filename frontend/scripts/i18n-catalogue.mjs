import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'
import { fileURLToPath } from 'node:url'
export const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)
export const catalogueSpecs = [
  {
    feature: 'tours',
    file: 'tours',
    binding: 'tours',
    key: 'slug',
    fields: [
      'title',
      'days',
      'style',
      'season',
      'from',
      'group',
      'teaser',
      'summary',
      'includes',
      'excludes',
      'itinerary',
      'places',
    ],
  },
  {
    feature: 'destinations',
    file: 'destinations',
    binding: 'destinations',
    key: 'slug',
    fields: [
      'name',
      'region',
      'tag',
      'teaser',
      'intro',
      'bestTime',
      'duration',
      'altitude',
      'highlights',
      'paragraphs',
    ],
  },
  {
    feature: 'blog',
    file: 'posts',
    binding: 'posts',
    key: 'slug',
    fields: [
      'title',
      'category',
      'date',
      'readTime',
      'authorRole',
      'excerpt',
      'body',
    ],
  },
  {
    feature: 'layover',
    file: 'layover-packages',
    binding: 'layoverPackages',
    key: 'slug',
    fields: [
      'hours',
      'title',
      'price',
      'teaser',
      'itinerary',
      'includes',
      'best',
    ],
  },
  {
    feature: 'gallery',
    file: 'gallery',
    binding: 'galleryPhotos',
    key: 'id',
    fields: ['alt', 'title', 'location', 'caption'],
  },
  {
    feature: 'reviews',
    file: 'testimonials',
    binding: 'testimonials',
    key: 'id',
    fields: ['quote', 'detail', 'title', 'date'],
  },
  {
    feature: 'about',
    file: 'company',
    binding: 'whyUs',
    key: 'icon',
    fields: ['label', 'place', 'title', 'text', 'body'],
  },
]
export function readCatalogue(spec) {
  const filename = path.join(
    root,
    `src/features/${spec.feature}/data/${spec.file}.ts`,
  )
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
  const module = { exports: {} }
  vm.runInNewContext(code, { exports: module.exports, module }, { filename })
  return JSON.parse(JSON.stringify(module.exports[spec.binding]))
}
export function sourceOverlay(spec) {
  return Object.fromEntries(
    readCatalogue(spec).map((record) => [
      record[spec.key],
      Object.fromEntries(
        spec.fields
          .filter((field) => record[field] !== undefined)
          .map((field) => [field, record[field]]),
      ),
    ]),
  )
}
