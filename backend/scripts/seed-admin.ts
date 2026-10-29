import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { env, isProduction } from "../src/config/env.js";

// Same direct-connection convention as scripts/seed.ts: maintenance scripts
// should not depend on the pooled pgbouncer URL.
const prisma = new PrismaClient({
  ...(env.DIRECT_URL ? { datasourceUrl: env.DIRECT_URL } : {}),
});

/**
 * Creates or updates the single admin account. Reads credentials from
 * ADMIN_EMAIL / ADMIN_PASSWORD env vars, falling back to defaults only when
 * the env vars are empty. In production, fallback credentials are refused.
 */
async function main() {
  if (isProduction && (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD)) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set explicitly in production. " +
        "Refusing to create an admin with fallback credentials.",
    );
  }

  const email = env.ADMIN_EMAIL || "admin@example.com";
  const password = env.ADMIN_PASSWORD || "admin123456";

  const existing = await prisma.admin.findFirst({ where: { email } });
  const passwordHash = await bcrypt.hash(password, 12);
  const data = { email, name: "Admin", passwordHash };

  if (existing) {
    await prisma.admin.update({ where: { id: existing.id }, data });
    console.log(`Admin updated: ${email}`);
  } else {
    await prisma.admin.create({ data });
    console.log(`Admin created: ${email}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
