import mongoose, { Schema } from "mongoose";
import { IInsight } from "../types/insight.types";

const InsightSchema = new Schema<IInsight>(
  {
    end_year: { type: Number, default: null, index: true },
    intensity: { type: Number, required: true, index: true },
    sector: { type: String, default: null, index: true },
    topic: { type: String, required: true, index: true },
    insight: { type: String, required: true },
    url: { type: String, required: true },
    region: { type: String, default: null, index: true },
    start_year: { type: Number, default: null },
    impact: { type: Number, default: null },
    added: { type: Date, required: true, index: true },
    published: { type: Date, default: null },
    country: { type: String, default: null, index: true },
    relevance: { type: Number, required: true, index: true },
    pestle: { type: String, required: true, index: true },
    source: { type: String, required: true, index: true },
    title: { type: String, required: true },
    likelihood: { type: Number, required: true, index: true },
  },
  { timestamps: false, collection: "insights" }
);

// Compound indexes for common filter + default sort patterns (ESR Rule)
InsightSchema.index({ topic: 1, region: 1, added: -1 });
InsightSchema.index({ topic: 1, added: -1 });
InsightSchema.index({ sector: 1, added: -1 });
InsightSchema.index({ country: 1, added: -1 });
InsightSchema.index({ pestle: 1, sector: 1, region: 1 });

export const Insight = mongoose.model<IInsight>("Insight", InsightSchema);