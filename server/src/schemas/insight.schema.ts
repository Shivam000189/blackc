import { z } from "zod";

export const insightFiltersSchema = z.object({
  end_year: z.string().regex(/^\d{4}$/, "end_year must be a 4-digit year").optional(),
  topic: z.string().min(1).optional(),
  sector: z.string().min(1).optional(),
  region: z.string().min(1).optional(),
  pestle: z.string().min(1).optional(),
  source: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  completeness: z.enum(["all", "complete", "incomplete"]).optional(),
  search: z.string().min(1).max(100).optional(),
  sortBy: z.enum(["added", "intensity", "relevance", "likelihood", "end_year"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional(),
});

export const statsQuerySchema = insightFiltersSchema.omit({
  search: true,
  sortBy: true,
  order: true,
  page: true,
  limit: true,
});

export type InsightFiltersInput = z.infer<typeof insightFiltersSchema>;
