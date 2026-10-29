import { z } from "zod";

export const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export function getPagination(query: unknown) {
  const parsed = paginationQuery.parse(query);
  const skip = (parsed.page - 1) * parsed.limit;
  return {
    page: parsed.page,
    limit: parsed.limit,
    skip,
    take: parsed.limit,
  };
}

export function meta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
