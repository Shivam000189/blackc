import { Document } from "mongoose";
import { IRawInsight, IInsight } from "../types/insight.types";

const toNumberOrNull = (val: any): number | null => {
  if (val === "" || val === null || val === undefined) return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
};

const toStringOrNull = (val: any): string | null => {
  if (val === "" || val === null || val === undefined) return null;
  return String(val).trim();
};

const toDateOrNull = (val: any): Date | null => {
  if (val === "" || val === null || val === undefined) return null;
  const date = new Date(val);
  return isNaN(date.getTime()) ? null : date;
};

export const cleanRecord = (raw: IRawInsight): Omit<IInsight, keyof Document | "_id"> => ({
  end_year: toNumberOrNull(raw.end_year),
  intensity: Number(raw.intensity),
  sector: toStringOrNull(raw.sector),
  topic: String(raw.topic).trim(),
  insight: String(raw.insight).trim(),
  url: String(raw.url).trim(),
  region: toStringOrNull(raw.region),
  start_year: toNumberOrNull(raw.start_year),
  impact: toNumberOrNull(raw.impact),
  added: toDateOrNull(raw.added) as Date,
  published: toDateOrNull(raw.published),
  country: toStringOrNull(raw.country),
  relevance: Number(raw.relevance),
  pestle: String(raw.pestle).trim(),
  source: String(raw.source).trim(),
  title: String(raw.title).trim(),
  likelihood: Number(raw.likelihood),
});