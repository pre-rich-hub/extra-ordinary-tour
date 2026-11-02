import "dotenv/config";
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

// Applies the November 2026 English proofreading corrections to the catalogue
// rows, which is where the English site reads tours, destinations and articles
// from. It patches only the wording it recognises, so any other admin edit
// stays as it is, and a second run changes nothing.
//
//   pnpm copy:fixes --dry-run   report what would change
//   pnpm copy:fixes             write it
const dryRun = process.argv.includes("--dry-run");

type Rule = { find: string; replace: string; regex?: boolean };
const rules: Rule[] = JSON.parse(
  readFileSync(new URL("./data/copy-fixes-2026-11.json", import.meta.url), "utf8"),
);

const prisma = new PrismaClient({
  ...(process.env.DIRECT_URL ? { datasourceUrl: process.env.DIRECT_URL } : {}),
});

function fixText(text: string) {
  let out = text;
  for (const rule of rules) {
    out = rule.regex
      ? out.replace(new RegExp(rule.find, "g"), rule.replace.replace(/\\(\d)/g, "$$$1"))
      : out.split(rule.find).join(rule.replace);
  }
  return out;
}

function fixValue(value: unknown): unknown {
  if (typeof value === "string") return fixText(value);
  if (Array.isArray(value)) return value.map(fixValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fixValue(v)]));
  }
  return value;
}

// JSON columns are corrected value by value so the rules see the real text, not
// its escaped form, and the column stays valid JSON.
function fixField(value: string) {
  const trimmed = value.trimStart();
  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    try {
      const parsed: unknown = JSON.parse(value);
      const fixed = fixValue(parsed);
      return JSON.stringify(fixed) === JSON.stringify(parsed) ? value : JSON.stringify(fixed);
    } catch {
      return fixText(value);
    }
  }
  return fixText(value);
}

function changes<T extends Record<string, unknown>>(row: T, fields: (keyof T & string)[]) {
  const data: Record<string, string> = {};
  for (const field of fields) {
    const value = row[field];
    if (typeof value !== "string") continue;
    const fixed = fixField(value);
    if (fixed !== value) data[field] = fixed;
  }
  return data;
}

async function main() {
  const count = { tours: 0, destinations: 0, posts: 0, fields: 0 };

  for (const row of await prisma.tour.findMany()) {
    const data = changes(row, ["overview", "included", "excluded", "itinerary", "teaser", "highlights"]);
    if (!Object.keys(data).length) continue;
    count.tours += 1;
    count.fields += Object.keys(data).length;
    if (!dryRun) await prisma.tour.update({ where: { id: row.id }, data });
  }

  for (const row of await prisma.destination.findMany()) {
    const data = changes(row, ["description", "teaser", "intro", "highlights"]);
    if (!Object.keys(data).length) continue;
    count.destinations += 1;
    count.fields += Object.keys(data).length;
    if (!dryRun) await prisma.destination.update({ where: { id: row.id }, data });
  }

  for (const row of await prisma.blog.findMany()) {
    const data = changes(row, ["description", "content"]);
    if (!Object.keys(data).length) continue;
    count.posts += 1;
    count.fields += Object.keys(data).length;
    if (!dryRun) await prisma.blog.update({ where: { id: row.id }, data });
  }

  console.log(dryRun ? "Would update:" : "Updated:", count);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
