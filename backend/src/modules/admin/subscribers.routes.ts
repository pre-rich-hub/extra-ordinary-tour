import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";

export const subscribersRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

subscribersRouter.get(
  "/subscribers",
  asyncHandler(async (_req, res) => {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    return ok(
      res,
      "Subscribers fetched successfully",
      subscribers.map((s) => ({
        id: s.id,
        email: s.email,
        createdAt: s.createdAt,
      })),
    );
  }),
);

subscribersRouter.delete(
  "/subscribers/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.subscriber.delete({ where: { id } });
    return ok(res, "Subscriber deleted successfully", null);
  }),
);
