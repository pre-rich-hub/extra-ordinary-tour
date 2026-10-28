/**
 * Checks the configured assistant provider before you rely on it.
 *
 * The most common real failure is a model name the provider's docs list but
 * your account cannot call. That reads as "the assistant is unavailable" from
 * the browser, which hides the cause. This script answers the question those
 * failures leave you with: what can my key actually call, how fast, and is the
 * configured model among them?
 *
 * Usage: pnpm assistant:check
 */
import "dotenv/config";

interface ModelResult {
  model: string;
  status: string;
  firstTokenMs: number;
  totalMs: number;
  note: string;
}

const PROBE_PROMPT = [
  "You are a tour operator's guide. Reply with one sentence naming a place",
  "someone could visit on one of your trips.",
].join(" ");

type TokenParam = "max_tokens" | "max_completion_tokens";

async function probe(
  base: string,
  key: string,
  model: string,
  tokenParam: TokenParam,
): Promise<ModelResult> {
  const startedAt = Date.now();
  try {
    const response = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: PROBE_PROMPT }],
        // Reasoning models spend part of the budget on hidden reasoning before
        // any content. A small limit returns an empty reply that looks like a
        // broken model, so probe with a realistic one.
        [tokenParam]: 600,
        stream: true,
      }),
    });

    if (!response.ok) {
      const body = (await response.text()).replace(/\s+/g, " ").slice(0, 160);
      return { model, status: `HTTP ${response.status}`, firstTokenMs: 0, totalMs: 0, note: body };
    }

    let firstTokenMs = 0;
    let text = "";
    let reasoning = "";
    let buffer = "";
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (payload === "[DONE]") continue;
        try {
          const chunk = JSON.parse(payload) as {
            choices?: { delta?: { content?: string; reasoning?: string } }[];
          };
          const delta = chunk.choices?.[0]?.delta;
          if (delta?.reasoning) reasoning += delta.reasoning;
          if (delta?.content) {
            if (!firstTokenMs) firstTokenMs = Date.now() - startedAt;
            text += delta.content;
          }
        } catch {
          // A partial line, or a keepalive. The next read completes it.
        }
      }
    }

    return {
      model,
      status: "ok",
      firstTokenMs,
      totalMs: Date.now() - startedAt,
      note:
        text.replace(/\s+/g, " ").slice(0, 70) ||
        `answered with no text; used ${reasoning.trim().length} chars of reasoning`,
    };
  } catch (error) {
    return {
      model,
      status: "threw",
      firstTokenMs: 0,
      totalMs: 0,
      note: error instanceof Error ? error.message.slice(0, 160) : String(error),
    };
  }
}

function resolveProvider() {
  const provider = process.env.ASSISTANT_PROVIDER ?? "groq";
  const key =
    provider === "gemini"
      ? process.env.GEMINI_API_KEY
      : provider === "openai"
        ? process.env.OPENAI_API_KEY
        : process.env.GROQ_API_KEY;

  // All three expose an OpenAI-compatible chat completions endpoint.
  const base =
    provider === "gemini"
      ? "https://generativelanguage.googleapis.com/v1beta/openai"
      : provider === "openai"
        ? "https://api.openai.com/v1"
        : (process.env.GROQ_BASE_URL ?? "https://api.groq.com/openai/v1");

  const tokenParam: TokenParam = provider === "openai" ? "max_completion_tokens" : "max_tokens";

  return { provider, key, base, tokenParam };
}

async function main(): Promise<void> {
  const { provider, key, base, tokenParam } = resolveProvider();

  if (!key) {
    console.error(`No API key for provider "${provider}". Add it to .env.`);
    process.exit(1);
  }

  console.log(`provider: ${provider}`);
  console.log(`base:     ${base}`);
  console.log(`key:      ${key.slice(0, 6)}...${key.slice(-4)} (${key.length} chars)\n`);

  const listed = await fetch(`${base}/models`, { headers: { Authorization: `Bearer ${key}` } });
  if (!listed.ok) {
    console.error(`GET /models failed with HTTP ${listed.status}. The key is likely wrong.`);
    console.error((await listed.text()).slice(0, 300));
    process.exit(1);
  }

  const catalogue = ((await listed.json()) as { data?: { id: string }[] }).data ?? [];
  const configured = process.env.ASSISTANT_MODEL;
  const fallback = process.env.ASSISTANT_FALLBACK_MODEL;

  // Audio and moderation models show up in the same list, so skip the obvious
  // non-text ones rather than probing everything.
  const skipped = /whisper|guard|safeguard|tts|embedding|moderation/i;
  const candidates = [
    ...(configured ? [configured] : []),
    ...(fallback ? [fallback] : []),
    ...catalogue.map((m) => m.id).filter((id) => !skipped.test(id)),
  ].filter((id, index, all) => all.indexOf(id) === index);

  console.log(`probing ${candidates.length} model(s), one request each...\n`);
  const results: ModelResult[] = [];
  for (const model of candidates) results.push(await probe(base, key, model, tokenParam));

  const pad = Math.max(...results.map((r) => r.model.length));
  for (const r of results) {
    const inConfig = r.model === configured || r.model === fallback ? "*" : " ";
    const timing = r.status === "ok" ? `first=${r.firstTokenMs}ms total=${r.totalMs}ms` : "";
    console.log(`${inConfig}${r.model.padEnd(pad)}  ${r.status.padEnd(12)} ${timing}`);
    console.log(`   ${r.note}`);
  }

  const ok = results.filter((r) => r.status === "ok").map((r) => r.model);
  const broken = [configured, fallback].filter((m): m is string => !!m && !ok.includes(m));

  console.log(`\n* = in your .env`);
  if (broken.length) {
    console.error(`\nNot callable on this account: ${broken.join(", ")}`);
    console.error("Replace them in .env with one of the models marked ok above.");
    process.exit(1);
  }
  console.log("\nAll configured models respond. The assistant should work.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
