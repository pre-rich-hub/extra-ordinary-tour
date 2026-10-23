# GEO implementation plan

Prepared: 2026-10-23. Status: **G1 complete in the repository (training-crawler decision pending with the client); G2 partly complete (tour and contact FAQs; planning content needs client facts); G3 audited, fixes are client-owned; G0, G4–G5 not started**.

Implement one phase at a time. For each phase, record changed files, checks, results and any dependency before moving to the next phase. This document does not authorize deployment or changes to external accounts.

## Goal and boundaries

Make Extraordinary Ethiopia Tours easy for AI answer engines (ChatGPT search, Perplexity, Google AI Overviews and AI Mode, Gemini, Claude, Copilot) to fetch, understand, trust and cite, across English, Spanish and French.

GEO builds on the SEO work in [seo.md](seo.md); it does not replace it. Google states that its AI features use the same crawling, indexing and ranking systems as Search and need no special markup, and most other engines retrieve pages through their own search crawler or Bing's index. Indexable, server-rendered, accurate pages are therefore the foundation, and they already exist.

Rules for this project:

- **No invented facts.** Every new fact (prices, altitudes, seasons, visa rules, durations, policies) comes from existing catalogue content or is confirmed by the client. Visa, health and safety answers point to official sources and carry a review date.
- **Visible content first.** Anything written for AI engines is visible to people on the page. No hidden text, cloaked bot-only content or keyword lists.
- **No promised outcomes.** Citations by AI engines cannot be guaranteed or bought, vary per question and change over time. Success is measured, not assumed.
- **Same truthfulness rules as SEO.** No review/rating markup, no FAQ markup as a rich-result deliverable (retired by Google in May 2026), no unverified `sameAs` profiles.

## Current project baseline

Checked on 2026-10-23 against `https://extra-ordinary-tour.vercel.app`, fetched with a GPTBot user agent.

| Area                 | Observed implementation                                                                                                                                                                     | Work remaining                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Rendering            | Main content is in the initial HTML (about 1,100–2,500 words per sampled page, proper H1/H2 structure); AI crawlers that do not run JavaScript see it                                       | Keep it that way; add a check so it cannot regress                                             |
| Crawler access       | `robots.ts` has one rule for `*` (allow `/`, disallow `/api/`); no AI crawler is named; Vercel firewall/bot settings unverified                                                             | Explicit per-crawler policy, client decision on training crawlers, firewall check              |
| Entity identity      | One `TravelAgency` entity with verified address, founder, logo and two profiles (`src/lib/seo/entities.ts`, [business facts](docs/seo/business-facts.md))                                   | Off-site consistency; add Instagram/YouTube/Facebook/Tripadvisor once the client confirms them |
| Structured facts     | Tours carry days, nights, season, start point, group size, includes/excludes and a day-by-day itinerary; destinations carry region, best time, duration and altitude; JSON-LD exposes these | Check each is shown as a compact, labelled block that can be quoted on its own                 |
| Question answering   | No FAQ or practical-planning content (visas, best season, altitude, costs, safety, getting there)                                                                                           | Visible, sourced answers on the pages where travellers ask those questions                     |
| Freshness            | Articles have ISO publish dates; tours, destinations and fixed pages show no update date                                                                                                    | Truthful "last reviewed" dates where content is reviewed                                       |
| `llms.txt`           | Returns 404                                                                                                                                                                                 | Optional; no major engine has confirmed using it                                               |
| Off-site presence    | SafariBookings and SafariGo profiles verified; Google Business Profile, Tripadvisor and directory listings unverified                                                                       | Client-owned work (see G3)                                                                     |
| Measurement          | Vercel Analytics in production; no AI-referral segment, no crawler log review, no question-level baseline                                                                                   | Baseline question set, referral tracking, crawler hit counts                                   |
| Indexes AI relies on | Site not yet live on the real domain; Bing Webmaster Tools and Search Console are Phase 7 tasks in [seo.md](seo.md)                                                                         | ChatGPT search and Copilot draw on Bing; Bing verification and IndexNow matter more for GEO    |

## Phase overview

| Phase                         | Priority         | Deliverable                                                        | Dependency                               |
| ----------------------------- | ---------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| G0. Baseline question set     | First            | Fixed list of traveller questions and a recorded answer baseline   | Manual runs in each AI engine            |
| G1. Crawler access            | Pre-launch       | Explicit AI crawler policy in `robots.ts`, firewall check, audit   | Client decision on training crawlers     |
| G2. Answerable content        | Pre-launch       | Quick-facts blocks, visible FAQs, planning answers, review dates   | Client confirmation of new facts         |
| G3. Off-site entity presence  | Launch and after | Consistent listings and profiles; confirmed `sameAs`               | Client accounts and listings             |
| G4. Machine-readable extras   | Optional         | `llms.txt` and, if useful, an IndexNow integration                 | Production domain for IndexNow           |
| G5. Measurement and iteration | After launch     | AI referral tracking, crawler hit review, monthly question re-runs | Live domain, analytics, server/edge logs |

## Phases

### G0 — Baseline question set

Tasks:

- [ ] Write about 20 fixed questions a real traveller would ask, split across intents: choosing an operator ("Ethiopia historic route tour operator"), planning ("how many days for Lalibela", "best time to visit the Danakil Depression"), logistics (visas, getting to Gondar, altitude), layover tours from Addis Ababa, plus a few in Spanish and French.
- [ ] Run each in ChatGPT search, Perplexity, Google AI Mode/AI Overviews, Gemini and Claude with web search. Record for each answer: brand mentioned (yes/no), site cited (URL), competitors cited, and any factual errors about the business.
- [ ] Store the results as a dated CSV in `docs/geo/` with the exact question text, engine and date.

Done when: a repeatable question set and the first dated results exist. Answers vary by account, location and time; treat single results as anecdotes and trends across re-runs as the signal.

### G1 — Crawler access

Tasks:

- [x] Replace the single `*` rule in `src/app/robots.ts` with explicit groups, keeping `/api/` disallowed for everyone:
  - **Search/retrieval crawlers (allow):** `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Claude-SearchBot`, `Claude-User`. Googlebot and Bingbot stay under `*`, which already allows them.
  - **Training crawlers (client decision, default allow):** `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`. Blocking them keeps content out of model training and does not remove the site from AI search.
- [x] Preserve preview behavior: preview builds still send noindex and no sitemap line.
- [x] Check Vercel firewall/Bot Protection settings so retrieval crawlers are not challenged or blocked; fetch representative pages with each crawler's user agent and confirm HTTP 200 and full HTML.
- [x] Add a `geo:crawl` check (and include it in `seo:audit` or a `geo:audit` gate): robots groups as intended, each listed user agent receives 200 with the H1 and main content in the HTML, no `noindex` in production.

Done when: the policy is explicit, recorded in this file with the client's training decision, and the check passes on a production build and on the Vercel deployment.

G1 result: the crawler list and the training decision live in `src/lib/seo/crawlers.mjs` (`allowTraining`), which `src/app/robots.ts` turns into three groups (`*`, six retrieval crawlers, five training crawlers), each allowing `/` and disallowing `/api/`; setting `allowTraining = false` makes the training group `Disallow: /`. A named group replaces `*` for that crawler, which is why each group repeats the API rule. `corepack pnpm geo:crawl` (also part of `seo:audit`) checks the robots.txt groups and fetches 25 pages (8 page families × 3 languages plus the privacy policy) as each of the 9 crawlers that send requests, requiring HTTP 200, a server-rendered H1, at least 250 words of text and production indexing (`SEO_CHECK_PREVIEW=1` expects noindex instead). On 2026-10-23 it passed on a local production build (225 fetches; `seo:technical` and the 24 unit tests also pass), and all 225 fetches against `extra-ordinary-tour.vercel.app` returned full HTML; that deployment's robots.txt only gains the named groups once this change is deployed. The fetches came from a normal network with crawler user agents, so they show Vercel does not block by user agent; if Bot Protection is turned on later, recheck in Vercel's firewall logs that verified AI crawlers are allowed. **Pending:** the client's training-crawler decision (currently allow, matching earlier behavior).

### G2 — Answerable content

Tasks:

- [x] **Quick facts.** Already present before G2: the page hero shows a labelled `<dl>` (tours: duration, season, group size, price; destinations: best time, suggested stay, altitude, region), and the tour pricing card repeats duration, group size, best season and start/finish. Places link to their destination guides (SEO Phase 4). Nearest airport/how to get there is not in the catalogue and needs client-supplied facts.
- [x] **Direct answers.** Already present: tour teasers/summaries and destination intros open with a plain statement of what the place or journey is. No rewrite needed.
- [ ] **Visible FAQs.** Done for tours and the contact page; destinations deferred (see result). Real HTML headings and text; no `FAQPage` markup.
- [ ] **Planning content.** Needs client facts and official sources; questions listed in [client questions](docs/geo/client-questions.md).
- [ ] **Freshness.** Not started: no content has been reviewed by the client yet, so no "last reviewed" dates are shown.
- [x] **Translation.** All new copy goes through `copy()` with Spanish and French catalogue entries; `i18n:audit` passes (564 phrases).
- [x] Checks: `seo:routes` already enforces one H1, no skipped heading levels and resolving links on every sitemap URL, so it covers the new sections; answers are generated from catalogue data, so they cannot drift from it.

Done when: every tour and destination has a quick-facts block and at least a few verified Q&As, the new pages are live in all three languages, and all checks pass.

G2 result (so far): `src/components/ui/faq.tsx` renders visible questions as H3s under an H2, server-rendered. `src/features/tours/components/tour-faq.tsx` adds four questions to all 50 tour pages, each answered from that tour's own data or the published terms: length with the first and last itinerary day, recommended season (year-round tours answered separately), private/small-group with the group size, and price and booking (quote within 24 hours, 30% deposit, balance 30 days before arrival, link to the terms). `src/features/contact/components/contact-faq.tsx` adds seven general questions to the contact page, restating only what the site already publishes; the visa answer makes no visa-policy claim and points to the official e-visa service. Claims were checked against the catalogue: every tour includes a guide (44 of 50 say "licensed", the birding tours use specialist guides) and 46 of 50 exclude international flights, the visa and insurance, so the general answer says "most tours". Destination pages get no FAQ yet: their catalogue facts are short labels already shown in the hero, and turning them into sentences ("Allow Expedition") reads badly and only repeats the hero; they wait for client-supplied questions. On 2026-10-23: typecheck, 24 unit tests, `i18n:audit`, a production build, all 7 `seo:audit` checks and the headless-browser check passed (the browser check needed one retry after a slow Cloudinary image load timed out the first page).

### G3 — Off-site entity presence

Tasks (mostly client-owned; repository work only where noted):

- [ ] Claim or update Google Business Profile and Bing Places with the exact name, address, phone, website and hours used in `entities.ts`.
- [ ] Make Tripadvisor, SafariBookings, SafariGo, Facebook, Instagram and YouTube profiles consistent with the same facts and link to the new site.
- [ ] Seek genuine mentions: Ethiopia travel guides, tourism-board or association member directories, travel press, partner hotels and airlines' layover pages.
- [ ] Repository: once the client confirms ownership, add the profiles to `sameAs` in `entities.ts` and update [business facts](docs/seo/business-facts.md).
- [ ] Do not buy links, post fake reviews or seed AI-targeted content on third-party sites.

Done when: listings are consistent, confirmed profiles are linked from structured data, and the changes are recorded in the business facts file.

G3 result (so far): the off-site audit is in [entity presence](docs/geo/entity-presence.md). Name and phone match wherever they are shown, but the founding year conflicts (SafariBookings 2019, SafariGo 2011), SafariGo adds an Addis Ababa base, SafariBookings links to `http://www.` and omits the town, and SafariGo has no website link. Web search surfaces only SafariBookings pages; no Google Business Profile, press, association directory or Wikidata entry was found, and Tripadvisor and Facebook block automated checks. The audit also found an unsourced "since 2005" in the new site's homepage description (added in SEO Phase 2), now removed in all three languages. No `sameAs` change: nothing new is confirmed. Everything else here waits for the client; questions added to [client questions](docs/geo/client-questions.md).

### G4 — Machine-readable extras (optional)

Tasks:

- [ ] Publish `/llms.txt`: a short Markdown index of the business, main tour and destination sections, and the contact page, generated from the catalogue so it cannot drift. Describe it as experimental; it is not a ranking or citation signal any major engine has confirmed.
- [ ] After launch, consider IndexNow (used by Bing, which feeds ChatGPT search and Copilot) to notify changed URLs on deploy.
- [ ] Do not create separate Markdown copies of pages or bot-only variants.

Done when: `llms.txt` is generated, listed nowhere as a guarantee, and covered by a check that its links return 200.

### G5 — Measurement and iteration

Tasks:

- [ ] Segment analytics referrals from `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai` and links carrying `utm_source=chatgpt.com`. Track enquiry conversions only once analytics consent is in place.
- [ ] Review edge/server logs or Vercel bot analytics monthly for AI crawler hits per page family and for blocked or failed requests.
- [ ] Re-run the G0 question set monthly; compare mentions, citations, cited URLs and factual errors.
- [ ] Fix factual errors at the source: correct the page, structured data or third-party listing the engine appears to rely on.
- [ ] Prioritize new content from questions where the site is absent or misrepresented, not from guesses.

Done when: a repeatable monthly report exists and the next content work is based on recorded results.

## Status

| Phase | Status                               | Result                                                                              |
| ----- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| G0    | Not started                          |                                                                                     |
| G1    | Complete (training decision pending) | Explicit AI crawler groups; `geo:crawl` passes locally and on Vercel                |
| G2    | In progress                          | Tour and contact FAQs live; destinations and planning content wait for client facts |
| G3    | Audited; waiting on client           | Listing conflicts recorded; unsourced founding year removed from the site           |
| G4    | Not started                          |                                                                                     |
| G5    | Not started                          |                                                                                     |

## Primary references

User-agent names and crawler behavior change; check these when implementing each phase.

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: common crawlers, including Google-Extended](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)
- [OpenAI: crawlers and user agents](https://platform.openai.com/docs/bots)
- [Anthropic: Claude crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity: crawlers](https://docs.perplexity.ai/guides/bots)
- [Bing Webmaster Tools](https://www.bing.com/webmasters) and [IndexNow](https://www.indexnow.org/)
- [llms.txt proposal](https://llmstxt.org/)
