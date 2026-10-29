import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return sourceFiles(full)
    return /\.(ts|tsx|mjs|js|css)$/.test(entry.name) ? [full] : []
  })
}

const localImages = new Set<string>()
for (const file of sourceFiles(join(root, 'src'))) {
  const text = readFileSync(file, 'utf8')
  for (const match of text.matchAll(/['"`](\/images\/[^'"`\s)]+)['"`]/g)) {
    localImages.add(match[1])
  }
}

const vercelIgnore = readFileSync(join(root, '.vercelignore'), 'utf8')

describe('local image deployment allowlist', () => {
  it('keeps every referenced local image in the deployment', () => {
    expect(localImages.size).toBeGreaterThan(0)

    for (const image of localImages) {
      const file = join(root, 'public', image.replace(/^\//, ''))
      expect(existsSync(file), `${image} is referenced but missing`).toBe(true)
      expect(
        vercelIgnore,
        `${image} is not allowlisted in .vercelignore`,
      ).toContain(`!public${image}`)
    }
  })
})
