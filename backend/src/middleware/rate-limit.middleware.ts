import { rateLimit } from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  // The health router is mounted at /health, so req.path is the full path here.
  // Matching "/ready" alone would never fire and a probe polling /health/ready
  // would spend the visitor budget.
  skip: (req) => req.path === "/health" || req.path === "/health/ready",
});

export const publicFormLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});
