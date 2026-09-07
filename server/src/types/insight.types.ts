import { Document } from "mongoose";

export interface IRawInsight {
  end_year: string | number;
  intensity: string | number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string | number;
  impact: string | number;
  added: string;
  published: string;
  country: string;
  relevance: string | number;
  pestle: string;
  source: string;
  title: string;
  likelihood: string | number;
}

// Shape after cleaning / what MongoDB stores
export interface IInsight extends Document {
  end_year: number | null;
  intensity: number;
  sector: string | null;
  topic: string;
  insight: string;
  url: string;
  region: string | null;
  start_year: number | null;
  impact: number | null;
  added: Date;
  published: Date | null;
  country: string | null;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
}

// Query parameters that will hit GET /api/insights
export interface IInsightFilters {
  end_year?: string;
  topic?: string;
  sector?: string;
  region?: string;
  pestle?: string;
  source?: string;
  country?: string;
}