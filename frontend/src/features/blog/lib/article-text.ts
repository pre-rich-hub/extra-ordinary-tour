import type { PostBlock } from '../types'

/**
 * The admin's article box is plain text: blank lines between paragraphs,
 * "## " for a heading and "- " at the start of each list item.
 */
export function parseArticle(text: string): PostBlock[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith('## ')) return { heading: block.slice(3).trim() }
      const lines = block.split('\n').map((line) => line.trim())
      return lines.every((line) => line.startsWith('- '))
        ? { list: lines.map((line) => line.slice(2).trim()) }
        : block
    })
}
