import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Loaded before any test imports src/config/env.js, so the suite runs
    // without a local .env and without touching a real database.
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts"],
  },
});
