import type { Response } from "express";

export type ApiErrorDetail = {
  path?: string;
  message: string;
};

export function ok<T>(res: Response, message: string, data: T, status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data
  });
}

export function fail(res: Response, message: string, errors: ApiErrorDetail[] = [], status = 400) {
  return res.status(status).json({
    success: false,
    message,
    errors
  });
}
