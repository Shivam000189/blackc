/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get aggregated statistics and analytics across 6 chart dimensions
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
 *     responses:
 *       200:
 *         description: Aggregated data for intensityByTopic, insightsByYear, intensityByCountry, sectorDistribution, regionDistribution, topicRegionHeatmap
 */
import { Request, Response } from "express";
import { Insight } from "../models/Insight";

const buildBaseMatch = (query: any) => {
  const match: any = {};
  if (query.end_year) match.end_year = Number(query.end_year);
  if (query.topic) match.topic = query.topic as string;
  if (query.sector) match.sector = query.sector as string;
  if (query.region) match.region = query.region as string;
  if (query.pestle) match.pestle = query.pestle as string;
  if (query.source) match.source = query.source as string;
  if (query.country) match.country = query.country as string;
  return match;
};

export const getStats = async (req: Request, res: Response): Promise<void> => {
  const baseMatch = buildBaseMatch(req.query);

  const [
    intensityByTopic,
    insightsByYear,
    intensityByCountry,
    sectorDistribution,
    regionDistribution,
    topicRegionHeatmap,
  ] = await Promise.all([
    // 1. Bar chart: avg intensity by topic (scoped to active filters)
    Insight.aggregate([
      { $match: { topic: { $nin: [null, ""] }, ...baseMatch } },
      { $group: { _id: "$topic", avgIntensity: { $avg: "$intensity" } } },
      {
        $project: {
          topic: "$_id",
          avgIntensity: { $round: ["$avgIntensity", 2] },
          _id: 0,
        },
      },
      { $sort: { avgIntensity: -1 } },
    ]),

    // 2. Line chart: count of insights by end_year (scoped to active filters)
    Insight.aggregate([
      { $match: { end_year: { $nin: [null, ""] }, ...baseMatch } },
      { $group: { _id: "$end_year", count: { $sum: 1 } } },
      { $project: { year: "$_id", count: 1, _id: 0 } },
      { $sort: { year: 1 } },
    ]),

    // 3. Choropleth map: avg intensity & relevance by country (scoped to active filters)
    Insight.aggregate([
      { $match: { country: { $nin: [null, ""] }, ...baseMatch } },
      {
        $group: {
          _id: "$country",
          avgIntensity: { $avg: "$intensity" },
          avgRelevance: { $avg: "$relevance" },
        },
      },
      {
        $project: {
          country: "$_id",
          avgIntensity: { $round: ["$avgIntensity", 2] },
          avgRelevance: { $round: ["$avgRelevance", 2] },
          _id: 0,
        },
      },
    ]),

    // 4. Pie/Donut: distribution by sector (scoped to active filters)
    Insight.aggregate([
      { $match: { sector: { $nin: [null, ""] }, ...baseMatch } },
      { $group: { _id: "$sector", count: { $sum: 1 } } },
      { $project: { sector: "$_id", count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ]),

    // 5. Pie/Donut: distribution by region (scoped to active filters)
    Insight.aggregate([
      { $match: { region: { $nin: [null, ""] }, ...baseMatch } },
      { $group: { _id: "$region", count: { $sum: 1 } } },
      { $project: { region: "$_id", count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ]),

    // 6. Heatmap: topic vs region avg intensity (scoped to active filters)
    Insight.aggregate([
      { $match: { topic: { $nin: [null, ""] }, region: { $nin: [null, ""] }, ...baseMatch } },
      {
        $group: {
          _id: { topic: "$topic", region: "$region" },
          avgIntensity: { $avg: "$intensity" },
        },
      },
      {
        $project: {
          topic: "$_id.topic",
          region: "$_id.region",
          avgIntensity: { $round: ["$avgIntensity", 2] },
          _id: 0,
        },
      },
    ]),
  ]);

  res.status(200).json({
    success: true,
    data: {
      intensityByTopic,
      insightsByYear,
      intensityByCountry,
      sectorDistribution,
      regionDistribution,
      topicRegionHeatmap,
    },
  });
};
