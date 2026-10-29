/**
 * Vercel function entry.
 *
 * Vercel does not run a listening process. It imports this module and calls the
 * default export with a request and a response, so the Express app is handed
 * over directly rather than bound to a port. `src/server.ts` already skips
 * listen() when VERCEL is set, which keeps the two paths from fighting.
 *
 * The import points at the source module, not dist. Vercel's bundler resolves
 * the .js specifier to the .ts source, and doing it this way means a plain
 * `pnpm typecheck` on a fresh clone resolves without needing a build first.
 */
import app from "../src/server.js";

export default app;
