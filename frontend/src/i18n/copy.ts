import { useTranslations } from 'next-intl'
import { copyKey } from './copy-key'

type Translator = ReturnType<typeof useTranslations>
export function createCopy(t: Translator) {
  return function copy<T>(
    source: T,
    values?: Record<string, string | number>,
  ): T {
    if (typeof source !== 'string') return source
    const key = copyKey(source)
    const localizedValues =
      values &&
      Object.fromEntries(
        Object.entries(values).map(([name, value]) => [
          name,
          typeof value === 'string' && t.has(copyKey(value))
            ? t(copyKey(value))
            : value,
        ]),
      )
    return (t.has(key) ? t(key, localizedValues) : source) as T
  }
}
/** UI phrases use next-intl; feature catalogues stay in server-only loaders. */
export function useCopy() {
  return createCopy(useTranslations('Copy'))
}
