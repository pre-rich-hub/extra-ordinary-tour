import { useCopy } from '@/i18n/copy'
import { useLocale } from 'next-intl'
import type { LegalBlock, LegalDocument as Document } from '../types'

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="mt-5 text-pretty leading-[1.75] text-muted-foreground">
          {block.lines.map((line, i) => (
            <span key={line} className={i ? 'block' : undefined}>
              {line}
            </span>
          ))}
        </p>
      )
    case 'list':
      return (
        <ul className="mt-5 list-disc space-y-2 pl-6 leading-[1.7] text-muted-foreground marker:text-accent">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="border-b border-border py-3 pr-6 font-semibold text-foreground"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td
                      key={cell}
                      className="border-b border-border py-3 pr-6 align-top text-muted-foreground"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'note':
      return (
        <p className="mt-6 border-l-2 border-accent bg-muted/50 px-5 py-4 leading-[1.7] text-muted-foreground">
          <strong className="font-semibold text-foreground">
            {block.label}.
          </strong>{' '}
          {block.text}
        </p>
      )
  }
}

/** The client's published legal text, always in its original English. */
export function LegalDocument({ document }: { document: Document }) {
  const copy = useCopy()
  const locale = useLocale()

  return (
    <div className="shell py-14 sm:py-16 lg:py-20">
      <div lang="en" className="mx-auto max-w-2xl">
        {locale !== 'en' && (
          <p
            lang={locale}
            className="mb-10 border border-border bg-card px-5 py-4 text-sm leading-relaxed text-muted-foreground"
          >
            {copy('This document is published in English.')}
          </p>
        )}
        {document.intro.map((block, i) => (
          <Block key={i} block={block} />
        ))}
        {document.sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-[1.75rem]">
              {section.heading}
            </h2>
            {section.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
