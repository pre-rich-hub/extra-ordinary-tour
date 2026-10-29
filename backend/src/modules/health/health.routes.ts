import { Router } from "express";
import type { Router as RouterType } from "express";

export const healthRouter: RouterType = Router();

healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

healthRouter.get("/ready", (_req, res) => {
  res.json({ status: "ok" });
});
