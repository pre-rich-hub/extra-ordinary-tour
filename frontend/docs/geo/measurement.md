# GEO measurement routine (G0 and G5)

Monthly, from launch onward. Record results; do not judge from one answer. AI answers vary by account, location, wording and day, so single results are anecdotes and the trend across months is the signal.

## 1. Question run (about an hour)

1. Copy `results/template.csv` to `results/<YYYY-MM-DD>.csv`.
2. For each question in [`questions.csv`](questions.csv), ask it word for word in each engine with web access on, in a fresh chat, signed out or in a private window where possible: `chatgpt` (search on), `perplexity`, `google-ai-mode`, `google-ai-overview` (an ordinary Google search; record only when an AI Overview appears), `gemini`, `claude` (web search on), `copilot`.
3. Record one row per question and engine:

| Column            | Value                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `date`            | The run date, same as the file name                                                          |
| `engine`          | One of the names above                                                                       |
| `question_id`     | `q01`…`q20`                                                                                  |
| `brand_mentioned` | `yes` if the answer names Extraordinary Ethiopia Tours                                       |
| `site_cited`      | `yes` if a source link points to `extraordinaryethiopiatours.com`                            |
| `cited_url`       | That link (empty when `site_cited` is `no`)                                                  |
| `competitors`     | Other operators named, separated by `;`                                                      |
| `factual_errors`  | Anything wrong about the business (founding year, location, prices, services); empty if none |
| `notes`           | Other sources cited (SafariBookings, Tripadvisor…), or anything unusual                      |

4. Run `corepack pnpm geo:report`. It validates the files and prints mention, citation and "cited the intended page" rates by run, engine and language; factual errors; the competitors named most often; and questions the site has never been cited for.

Keep the question set fixed so runs stay comparable. To change it, add new ids instead of rewording old ones, and note the date.

Before launch the old WordPress site still serves the domain, so a pre-launch run measures the old site. It is still worth recording once as the "before" baseline.

## 2. Traffic from AI tools

- **Vercel Web Analytics** (`<Analytics />` is already in the layout for production builds): in the Referrers panel, look for `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai` and `bing.com`. ChatGPT also adds `utm_source=chatgpt.com` to links, and the site keeps query strings through its redirects (checked by `seo:technical`). Note visits per source and their landing pages each month.
- **Google Search Console**: Google counts AI Overviews and AI Mode traffic in the normal Performance report (Search type: Web); there is no separate AI filter. Watch impressions and clicks for the question-shaped queries in `questions.csv`.
- **Bing Webmaster Tools**: Bing's index feeds ChatGPT search and Copilot. After verification (SEO Phase 7), check whether the property offers a Copilot/AI citation report and record its figures here if so.

## 3. Crawler activity

- Check Vercel's Firewall/Observability views for traffic from the AI crawlers in `src/lib/seo/crawlers.mjs`, and whether any were challenged or blocked. Full request logs for cached pages need a Log Drain, which depends on the Vercel plan.
- Run `corepack pnpm geo:crawl` with `SEO_BASE_URL=https://extraordinaryethiopiatours.com` after each deploy that touches routing, headers or firewall settings.

## 4. Acting on results

- **Factual errors**: fix the source the engine seems to use (this site, structured data, or the listing named in `notes`; see [entity presence](entity-presence.md)), not the symptom.
- **Never cited, competitor cited**: open the competitor's cited page and compare what it answers that the target page does not; add only facts the client can confirm.
- **Cited, but not the intended page**: check the target page answers the question directly, near the top, and links to the cited page or from it.
- Log what changed and when, so later runs can be compared against it.

## Not set up

- **Enquiry conversions** are not tracked. Options are Vercel Analytics custom events (cookieless; availability depends on the Vercel plan) or another analytics tool. The client should decide, and confirm whether a consent notice is needed, before anything is added.
