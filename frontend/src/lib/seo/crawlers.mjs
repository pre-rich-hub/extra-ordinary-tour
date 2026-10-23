/**
 * AI crawlers named in robots.txt (see geo.md, G1). Retrieval agents fetch
 * pages to answer a user's question and cite them; training agents collect
 * content for model training. Blocking training does not remove the site from
 * AI search. `userAgent` is a representative request header for checks; the
 * Google-Extended and Applebot-Extended tokens only exist in robots.txt.
 */

/** Client decision on training crawlers; pending, so the current behavior (allow) is kept. */
export const allowTraining = true

export const aiCrawlers = [
  {
    token: 'OAI-SearchBot',
    purpose: 'retrieval',
    userAgent:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
  },
  {
    token: 'ChatGPT-User',
    purpose: 'retrieval',
    userAgent:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
  },
  {
    token: 'PerplexityBot',
    purpose: 'retrieval',
    userAgent:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  },
  {
    token: 'Perplexity-User',
    purpose: 'retrieval',
    userAgent:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)',
  },
  {
    token: 'Claude-SearchBot',
    purpose: 'retrieval',
    userAgent:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +claudebot@anthropic.com)',
  },
  {
    token: 'Claude-User',
    purpose: 'retrieval',
    userAgent:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-User/1.0; +claudebot@anthropic.com)',
  },
  {
    token: 'GPTBot',
    purpose: 'training',
    userAgent:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot',
  },
  {
    token: 'ClaudeBot',
    purpose: 'training',
    userAgent:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  },
  {
    token: 'CCBot',
    purpose: 'training',
    userAgent: 'CCBot/2.0 (https://commoncrawl.org/faq/)',
  },
  { token: 'Google-Extended', purpose: 'training' },
  { token: 'Applebot-Extended', purpose: 'training' },
]
