# Phase 0 SEO evidence

These are **baseline/planning artifacts**, not production SEO configuration or active redirect rules. Start with [baseline-report.md](baseline-report.md).

| File                        | Purpose                                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `route-inventory.csv`       | Actual local production-build metadata/HTML for all 399 URLs from the application's sitemap                                   |
| `project-summary.json`      | Capture timestamp, local base URL, Next build ID, Git commit, counts and exact duplicate groups                               |
| `search-intent-map.csv`     | 399 locale-specific intent/query hypotheses; no keyword volume, ranking or demand claims                                      |
| `legacy-inventory.csv`      | Public legacy pages: initial/final statuses, redirect chains, metadata and headings                                           |
| `legacy-discovery.json`     | Robots rules, sitemap response evidence, full discovered-from links, crawl bounds and remaining queue; no full article bodies |
| `legacy-url-decisions.json` | Explicit mapping inputs, confidence and reasons; edit decisions here rather than silently changing generated CSVs             |
| `legacy-url-map.csv`        | Generated migration proposals; every target must exist in the project inventory; unresolved cases remain explicit             |
| `business-facts.md`         | Business/profile sources, inconsistencies and unavailable identity fields                                                     |
| `technical-probes.csv`      | Local redirect/private/error response observations for Phase 1                                                                |
| `baseline-report.md`        | Findings, limits, remaining launch dependencies and the Phase 1 handoff                                                       |

## Reproduce

Requires Node with the existing frontend dependencies installed and Python 3 (standard library only). The scripts are development tools, not an application runtime dependency.

From `frontend`, start a **production** build/server. Rebuild first if application code or publication settings changed; a dev server is not a production baseline.

```bash
corepack pnpm build
corepack pnpm start --port 3104
```

In another terminal, from `frontend`:

```bash
python3 scripts/seo-baseline.py --project-base http://127.0.0.1:3104
python3 scripts/seo-phase0.py
python3 scripts/seo-phase0-check.py
```

The baseline crawler obtains project URLs from the actual sitemap instead of maintaining another route registry. The intent generator reads the existing feature catalogues and translations. It never edits page content, metadata, URLs or publication settings.

The legacy crawl reads the public client's robots.txt, follows its sitemap index and internal links on the client host, skips admin/media/search/feed actions, uses two workers with a delay, and stops at 500 HTML URLs by default. A nonempty remaining queue or fetch failure is a coverage limitation, not evidence that an old URL disappeared. Use `--scope project` or `--scope legacy` to refresh one side. Refreshing evidence can reveal drift that requires updating mapping decisions.

Legacy proposals are based on explicit tour-code matches and content-purpose comparison, not automatic fuzzy URL matching. Meaningful query URLs (including WordPress templates) are kept distinct from the homepage. CSV `old_initial_status` describes the requested URL; `old_final_status` describes its destination after following redirects.

Project `url`/`canonical` fields intentionally use the future production origin, while `checked_url` identifies the local server actually queried. A local 200 response is not proof that the new app is deployed on the live domain. Live discovery is a separate dataset.

Do not treat inventory entries as permission to launch, redirect every old page to the homepage, publish legal text or infer search rankings. Search Console/log/backlink imports can extend the public-link/sitemap coverage later. Keep the original capture evidence when replacing a baseline.
