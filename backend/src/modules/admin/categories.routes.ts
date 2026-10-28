import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { mapCategory } from "../../utils/mappers.js";
import { slugify } from "../../utils/slug.js";

export const categoriesRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

const categoryNameSchema = z.object({
  categoryName: z.string().trim().min(1).max(120),
});

categoriesRouter.get(
  "/categories",
  asyncHandler(async (_req, res) => {
    const categories = await prisma.tourCategory.findMany({
      include: { _count: { select: { tours: true } } },
      orderBy: { id: "asc" },
    });
    return ok(
      res,
      "Categories fetched successfully",
      categories.map(mapCategory),
    );
  }),
);

categoriesRouter.post(
  "/categories",
  asyncHandler(async (req, res) => {
    const body = categoryNameSchema.parse(req.body);
    const category = await prisma.tourCategory.create({
      data: {
        categoryName: body.categoryName,
        slug: slugify(body.categoryName) || null,
      },
      include: { _count: { select: { tours: true } } },
    });
    return ok(res, "Category created successfully", mapCategory(category), 201);
  }),
);

categoriesRouter.put(
  "/categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = categoryNameSchema.parse(req.body);
    const category = await prisma.tourCategory.update({
      where: { id },
      data: {
        categoryName: body.categoryName,
        slug: slugify(body.categoryName) || null,
      },
      include: { _count: { select: { tours: true } } },
    });
    return ok(res, "Category updated successfully", mapCategory(category));
  }),
);

categoriesRouter.delete(
  "/categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.$transaction([
      prisma.tourCategoryJunction.deleteMany({ where: { categoryId: id } }),
      prisma.tourCategory.delete({ where: { id } }),
    ]);
    return ok(res, "Category deleted successfully", null);
  }),
);
