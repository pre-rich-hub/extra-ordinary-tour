import { Router } from "express";
import type { Router as RouterType } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../config/database.js";
import { env } from "../../config/env.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { fail, ok } from "../../utils/api-response.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  authCookieOptions,
  requireAdminAuth,
  signAdminToken,
} from "../../middleware/auth.middleware.js";
import {
  changePasswordSchema,
  loginSchema,
  updateProfileSchema,
} from "./auth.validation.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { uploadFor, urlForFile } from "../../middleware/upload.middleware.js";
import { loginLimiter } from "../../middleware/rate-limit.middleware.js";
import { sendPasswordChangedEmail } from "../../services/email.service.js";

export const authRouter: RouterType = Router();

const profileUpload = uploadFor("admin");

function publicAdmin(admin: {
  id: number;
  email: string | null;
  name: string | null;
  profilePicUrl?: string | null;
}) {
  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    profilePicUrl: admin.profilePicUrl ?? null,
  };
}

authRouter.post(
  "/login",
  loginLimiter,
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await prisma.admin.findFirst({ where: { email } });
    if (!admin?.passwordHash) return fail(res, "Invalid email or password", [], 401);

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return fail(res, "Invalid email or password", [], 401);

    const token = signAdminToken(admin.id, admin.tokenVersion);
    res.cookie(env.AUTH_COOKIE_NAME, token, authCookieOptions);
    return ok(res, "Login successful", publicAdmin(admin));
  }),
);

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(env.AUTH_COOKIE_NAME, authCookieOptions);
  return ok(res, "Logout successful", null);
});

authRouter.get(
  "/me",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const admin = await prisma.admin.findUnique({ where: { id: req.admin!.id } });
    if (!admin) throw new HttpError(404, "Admin not found");
    return ok(res, "Current admin fetched successfully", publicAdmin(admin));
  }),
);

authRouter.put(
  "/profile",
  requireAdminAuth,
  profileUpload.single("profilePic"),
  validate(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const profilePicUrl = req.file ? urlForFile(req.file) : undefined;
    const admin = await prisma.admin.update({
      where: { id: req.admin!.id },
      data: {
        name: req.body.name,
        email: req.body.email,
        ...(profilePicUrl ? { profilePicUrl } : {}),
      },
    });
    return ok(res, "Profile updated successfully", publicAdmin(admin));
  }),
);

authRouter.put(
  "/change-password",
  requireAdminAuth,
  validate(changePasswordSchema),
  asyncHandler(async (req, res) => {
    const admin = await prisma.admin.findUnique({ where: { id: req.admin!.id } });
    if (!admin?.passwordHash) throw new HttpError(404, "Admin not found");

    const valid = await bcrypt.compare(req.body.oldPassword, admin.passwordHash);
    if (!valid) return fail(res, "Old password is incorrect", [], 400);

    const passwordHash = await bcrypt.hash(req.body.newPassword, 12);
    // Bump tokenVersion so every previous session is invalidated.
    await prisma.admin.update({
      where: { id: admin.id },
      data: { passwordHash, tokenVersion: { increment: 1 } },
    });

    if (admin.email) {
      await sendPasswordChangedEmail({ email: admin.email }).catch(() => undefined);
    }

    return ok(res, "Password changed successfully", null);
  }),
);
