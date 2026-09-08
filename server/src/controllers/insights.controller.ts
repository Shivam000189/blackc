/**
 * @swagger
 * /insights:
 *   get:
 *     summary: Get filtered, searchable, and paginated insights
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema: { type: string }
 *       - in: query
 *         name: sector
 *         schema: { type: string }
 *       - in: query
 *         name: region
 *         schema: { type: string }
 *       - in: query
 *         name: pestle
 *         schema: { type: string }
 *       - in: query
 *         name: source
 *         schema: { type: string }
 *       - in: query
 *         name: country
 *         schema: { type: string }
 *       - in: query
 *         name: end_year
 *         schema: { type: string }
 *       - in: query
 *         name: completeness
 *         schema: { type: string, enum: [all, complete, incomplete], default: all }
 *         description: Filter records by data completeness (all, complete only, incomplete with null fields)
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [added, intensity, relevance, likelihood, end_year] }
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 25 }
 *     responses:
 *       200:
 *         description: Paginated list of insights
 */
import { Response } from "express";
import { Insight } from "../models/Insight";
import { PaginatedRequest } from "../middleware/paginate";

export const getInsights = async (req: PaginatedRequest, res: Response): Promise<void> => {
  const {
    end_year,
    topic,
    sector,
    region,
    pestle,
    source,
    country,
    completeness,
    search,
    sortBy = "added",
    order = "desc",
  } = req.query;
  const { page = 1, limit = 25, skip = 0 } = req.pagination || {};

  const conditions: any[] = [];

  if (end_year) conditions.push({ end_year: Number(end_year) });
  if (topic) conditions.push({ topic: topic as string });
  if (sector) conditions.push({ sector: sector as string });
  if (region) conditions.push({ region: region as string });
  if (pestle) conditions.push({ pestle: pestle as string });
  if (source) conditions.push({ source: source as string });
  if (country) conditions.push({ country: country as string });

  // Data Completeness Filter
  if (completeness === "incomplete") {
    conditions.push({
      $or: [
        { topic: null },
        { sector: null },
        { region: null },
        { pestle: null },
        { source: null },
        { country: null },
      ],
    });
  } else if (completeness === "complete") {
    conditions.push({
      $nor: [
        { topic: null },
        { sector: null },
        { region: null },
        { pestle: null },
        { source: null },
        { country: null },
      ],
    });
  }

  // Text search across title and insight
  if (search) {
    conditions.push({
      $or: [
        { title: { $regex: search as string, $options: "i" } },
        { insight: { $regex: search as string, $options: "i" } },
      ],
    });
  }

  const query = conditions.length > 0 ? { $and: conditions } : {};

  const sortDirection = order === "asc" ? 1 : -1;
  const sortField = ["added", "intensity", "relevance", "likelihood", "end_year"].includes(
    sortBy as string
  )
    ? (sortBy as string)
    : "added";

  const [insights, total] = await Promise.all([
    Insight.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit)
      .lean(),
    Insight.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    count: insights.length,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: insights,
  });
};
