import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { uploadFor, urlForFile } from "../../middleware/upload.middleware.js";
import { mapBlog } from "../../utils/mappers.js";
import { removeStoredFile } from "../../services/file.service.js";
import { slugify } from "../../utils/slug.js";

export const blogRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

const blogUpload = uploadFor("blog");

// ---------------------- Posts ----------------------

blogRouter.get(
  "/blog",
  asyncHandler(async (_req, res) => {
    const posts = await prisma.blog.findMany({
      include: { category: true },
      orderBy: { id: "desc" },
    });
    return ok(res, "Blog posts fetched successfully", posts.map(mapBlog));
  }),
);

blogRouter.get(
  "/blog/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const post = await prisma.blog.findUnique({ where: { id }, include: { category: true } });
    if (!post) throw new HttpError(404, "Blog post not found");
    return ok(res, "Blog post fetched successfully", mapBlog(post));
  }),
);

blogRouter.post(
  "/blog",
  blogUpload.single("blogImage"),
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    const blogTitle = String(req.body.blogTitle ?? "");
    const slug = slugify(blogTitle);
    const post = await prisma.blog.create({
      data: {
        slug,
        blogTitle,
        description: String(req.body.blogDescription ?? ""),
        imageUrl,
        categoryId: req.body.categoryId ? Number(req.body.categoryId) : null,
        createdAt: new Date(),
      },
      include: { category: true },
    });
    return ok(res, "Blog post created successfully", mapBlog(post), 201);
  }),
);

blogRouter.put(
  "/blog/:id",
  blogUpload.single("blogImage"),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    const blogTitle = String(req.body.blogTitle ?? "");
    const slug = slugify(blogTitle);
    const post = await prisma.blog.update({
      where: { id },
      data: {
        slug,
        blogTitle,
        description: String(req.body.blogDescription ?? ""),
        categoryId: req.body.categoryId ? Number(req.body.categoryId) : null,
        ...(imageUrl ? { imageUrl } : {}),
      },
      include: { category: true },
    });
    return ok(res, "Blog post updated successfully", mapBlog(post));
  }),
);

blogRouter.delete(
  "/blog/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const post = await prisma.blog.findUnique({ where: { id }, select: { imageUrl: true } });
    await prisma.blog.delete({ where: { id } });
    if (post?.imageUrl) await removeStoredFile(post.imageUrl);
    return ok(res, "Blog post deleted successfully", null);
  }),
);

// ---------------------- Categories ----------------------

const blogCategoryNameSchema = z.object({ name: z.string().trim().min(1).max(120) });

blogRouter.get(
  "/blog-categories",
  asyncHandler(async (_req, res) => {
    const categories = await prisma.blogCategory.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { id: "asc" },
    });
    return ok(
      res,
      "Blog categories fetched successfully",
      categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        postCount: cat._count.posts,
      })),
    );
  }),
);

blogRouter.post(
  "/blog-categories",
  asyncHandler(async (req, res) => {
    const body = blogCategoryNameSchema.parse(req.body);
    const category = await prisma.blogCategory.create({
      data: { name: body.name, slug: slugify(body.name) || null },
      include: { _count: { select: { posts: true } } },
    });
    return ok(
      res,
      "Blog category created successfully",
      {
        id: category.id,
        name: category.name,
        slug: category.slug,
        postCount: category._count.posts,
      },
      201,
    );
  }),
);

blogRouter.put(
  "/blog-categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = blogCategoryNameSchema.parse(req.body);
    const category = await prisma.blogCategory.update({
      where: { id },
      data: { name: body.name, slug: slugify(body.name) || null },
      include: { _count: { select: { posts: true } } },
    });
    return ok(res, "Blog category updated successfully", {
      id: category.id,
      name: category.name,
      slug: category.slug,
      postCount: category._count.posts,
    });
  }),
);

blogRouter.delete(
  "/blog-categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.blogCategory.delete({ where: { id } });
    return ok(res, "Blog category deleted successfully", null);
  }),
);
