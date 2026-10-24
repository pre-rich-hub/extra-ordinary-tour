// Legal pages are client-published English text, with Spanish and French translations.
export type LegalBlock =
  | { type: 'paragraph'; lines: string[] }
  | { type: 'list'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'note'; label: string; text: string }

export type LegalDocument = {
  title: string
  intro: LegalBlock[]
  sections: { heading: string; content: LegalBlock[] }[]
}
