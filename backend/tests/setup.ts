// Unit tests must not depend on the developer's local .env. A fresh clone has
// no .env, so importing src/config/env.js would fail the required-field parse
// before a single test ran, and a stray key in .env would change which provider
// the suite exercised. This file runs before any test imports that module.
//
// dotenv does not overwrite keys already in process.env, so these win over
// anything in .env.
process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://test:test@127.0.0.1:5432/test";
process.env.JWT_SECRET ??= "test-secret-not-used-for-real-signing";

// The assistant is off so the boot check for a provider key does not fire. The
// provider tests set the keys they need themselves.
process.env.ASSISTANT_ENABLED = "false";
process.env.GROQ_API_KEY ??= "gsk_test_key";
process.env.GEMINI_API_KEY ??= "test-key";
process.env.OPENAI_API_KEY ??= "sk-test-key";
