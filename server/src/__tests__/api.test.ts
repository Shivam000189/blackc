import request from "supertest";
import app from "../server";
import { Insight } from "../models/Insight";

describe("API Endpoints", () => {
  beforeEach(async () => {
    await Insight.deleteMany({});
  });

  describe("GET /health", () => {
    it("should return status UP", async () => {
      const res = await request(app).get("/health");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("UP");
    });
  });

  describe("GET /api/insights", () => {
    it("should return empty array when no data", async () => {
      const res = await request(app).get("/api/insights");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
      expect(res.body.total).toBe(0);
    });

    it("should return paginated results", async () => {
      await Insight.create([
        { intensity: 6, topic: "oil", insight: "test", url: "http://test.com", relevance: 2, pestle: "Economic", source: "Test", title: "Test 1", likelihood: 3, added: new Date() },
        { intensity: 8, topic: "gas", insight: "test2", url: "http://test2.com", relevance: 3, pestle: "Industries", source: "Test", title: "Test 2", likelihood: 4, added: new Date() },
      ]);

      const res = await request(app).get("/api/insights?page=1&limit=1");
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.total).toBe(2);
      expect(res.body.totalPages).toBe(2);
    });

    it("should filter by topic", async () => {
      await Insight.create([
        { intensity: 6, topic: "oil", insight: "test", url: "http://test.com", relevance: 2, pestle: "Economic", source: "Test", title: "Test 1", likelihood: 3, added: new Date() },
        { intensity: 8, topic: "gas", insight: "test2", url: "http://test2.com", relevance: 3, pestle: "Industries", source: "Test", title: "Test 2", likelihood: 4, added: new Date() },
      ]);

      const res = await request(app).get("/api/insights?topic=oil");
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].topic).toBe("oil");
    });

    it("should reject invalid end_year", async () => {
      const res = await request(app).get("/api/insights?end_year=abc");
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
    it("should filter by completeness (complete vs incomplete)", async () => {
      await Insight.create([
        {
          intensity: 6,
          topic: "oil",
          sector: "Energy",
          region: "North America",
          country: "USA",
          pestle: "Economic",
          source: "EIA",
          insight: "Complete record",
          url: "http://test.com",
          relevance: 2,
          title: "Complete 1",
          likelihood: 3,
          added: new Date(),
        },
        {
          intensity: 8,
          topic: null,
          sector: "Energy",
          region: null,
          country: null,
          pestle: "Economic",
          source: "EIA",
          insight: "Incomplete record",
          url: "http://test2.com",
          relevance: 3,
          title: "Incomplete 1",
          likelihood: 4,
          added: new Date(),
        },
      ]);

      const resComplete = await request(app).get("/api/insights?completeness=complete");
      expect(resComplete.status).toBe(200);
      expect(resComplete.body.data).toHaveLength(1);
      expect(resComplete.body.data[0].title).toBe("Complete 1");

      const resIncomplete = await request(app).get("/api/insights?completeness=incomplete");
      expect(resIncomplete.status).toBe(200);
      expect(resIncomplete.body.data).toHaveLength(1);
      expect(resIncomplete.body.data[0].title).toBe("Incomplete 1");
    });
  });

  describe("GET /api/filters", () => {
    it("should return distinct filter values", async () => {
      await Insight.create([
        { intensity: 6, topic: "oil", insight: "test", url: "http://test.com", relevance: 2, pestle: "Economic", source: "Test", title: "Test", likelihood: 3, added: new Date() },
      ]);

      const res = await request(app).get("/api/filters");
      expect(res.status).toBe(200);
      expect(res.body.data.topics).toContain("oil");
      expect(res.body.data.pestles).toContain("Economic");
    });
  });

  describe("GET /api/stats", () => {
    it("should return aggregated stats", async () => {
      await Insight.create([
        { intensity: 6, topic: "oil", insight: "test", url: "http://test.com", relevance: 2, pestle: "Economic", source: "Test", title: "Test", likelihood: 3, added: new Date(), end_year: 2025, country: "USA", region: "North America", sector: "Energy" },
      ]);

      const res = await request(app).get("/api/stats");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.intensityByTopic).toBeDefined();
      expect(res.body.data.insightsByYear).toBeDefined();
      expect(res.body.data.intensityByCountry).toBeDefined();
    });

    it("should return completeness stats at /api/stats/completeness", async () => {
      await Insight.create([
        {
          intensity: 6,
          topic: "oil",
          sector: "Energy",
          region: "North America",
          country: "USA",
          pestle: "Economic",
          source: "EIA",
          insight: "Complete record",
          url: "http://test.com",
          relevance: 2,
          title: "Complete 1",
          likelihood: 3,
          added: new Date(),
        },
        {
          intensity: 8,
          topic: null,
          sector: null,
          region: null,
          country: null,
          pestle: null,
          source: null,
          insight: "Incomplete record",
          url: "http://test2.com",
          relevance: 3,
          title: "Incomplete 1",
          likelihood: 4,
          added: new Date(),
        },
      ]);

      const res = await request(app).get("/api/stats/completeness");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.total).toBe(2);
      expect(res.body.data.complete).toBe(1);
      expect(res.body.data.incomplete).toBe(1);
      expect(res.body.data.missingFieldBreakdown.topic).toBe(1);
    });
  });
});
