/**
 * @swagger
 * /filters:
 *   get:
 *     summary: Get distinct filter options for all dropdowns
 *     responses:
 *       200:
 *         description: Distinct non-empty values for topic, sector, region, pestle, source, country, and end_year
 */
import { Request, Response } from "express";
import { Insight } from "../models/Insight";

export const getFilters = async (_req: Request, res: Response): Promise<void> => {
  const [topics, sectors, regions, pestles, sources, countries, endYears] =
    await Promise.all([
      Insight.distinct("topic", { topic: { $nin: [null, ""] } }),
      Insight.distinct("sector", { sector: { $nin: [null, ""] } }),
      Insight.distinct("region", { region: { $nin: [null, ""] } }),
      Insight.distinct("pestle", { pestle: { $nin: [null, ""] } }),
      Insight.distinct("source", { source: { $nin: [null, ""] } }),
      Insight.distinct("country", { country: { $nin: [null, ""] } }),
      Insight.distinct("end_year", { end_year: { $nin: [null, ""] } }),
    ]);

  res.status(200).json({
    success: true,
    data: {
      topics: (topics as string[]).filter(Boolean).sort(),
      sectors: (sectors as string[]).filter(Boolean).sort(),
      regions: (regions as string[]).filter(Boolean).sort(),
      pestles: (pestles as string[]).filter(Boolean).sort(),
      sources: (sources as string[]).filter(Boolean).sort(),
      countries: (countries as string[]).filter(Boolean).sort(),
      endYears: (endYears as number[]).filter((y) => typeof y === "number").sort((a, b) => a - b),
    },
  });
};
