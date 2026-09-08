export interface Insight {
  _id: string;
  end_year: number | null;
  intensity: number;
  sector: string | null;
  topic: string;
  insight: string;
  url: string;
  region: string | null;
  start_year: number | null;
  impact: number | null;
  added: string;
  published: string | null;
  country: string | null;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
}

export interface FilterOptions {
  topics: string[];
  sectors: string[];
  regions: string[];
  pestles: string[];
  sources: string[];
  countries: string[];
  endYears?: number[];
  end_years?: number[];
}

export interface FilterParams {
  topic?: string;
  sector?: string;
  region?: string;
  pestle?: string;
  source?: string;
  country?: string;
  end_year?: string | number;
  completeness?: "all" | "complete" | "incomplete";
  search?: string;
  sortBy?: "added" | "intensity" | "relevance" | "likelihood" | "end_year" | "title" | "topic" | "sector" | "region" | "country";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface MissingFieldBreakdown {
  topic: number;
  sector: number;
  region: number;
  pestle: number;
  source: number;
  country: number;
}

export interface CompletenessStats {
  total: number;
  complete: number;
  incomplete: number;
  missingFieldBreakdown: MissingFieldBreakdown;
}

export interface CompletenessResponse {
  success?: boolean;
  data?: CompletenessStats;
  total?: number;
  complete?: number;
  incomplete?: number;
  missingFieldBreakdown?: MissingFieldBreakdown;
}

export interface InsightsResponse {
  success?: boolean;
  count?: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Insight[];
}

export interface FiltersResponse {
  success?: boolean;
  data?: FilterOptions;
  topics?: string[];
  sectors?: string[];
  regions?: string[];
  pestles?: string[];
  sources?: string[];
  countries?: string[];
  endYears?: number[];
  end_years?: number[];
}

export interface TopicIntensity {
  topic: string;
  avgIntensity: number;
}

export interface YearInsightCount {
  year: number;
  count: number;
}

export interface CountryIntensity {
  country: string;
  avgIntensity: number;
  avgRelevance?: number;
}

export interface SectorDistribution {
  sector: string;
  count: number;
}

export interface RegionDistribution {
  region: string;
  count: number;
}

export interface TopicRegionHeatmapItem {
  topic: string;
  region: string;
  avgIntensity: number;
}

export interface LikelihoodRelevancePoint {
  likelihood: number;
  relevance: number;
  intensity: number;
  title: string;
}

export interface StatsData {
  intensityByTopic: TopicIntensity[];
  insightsByYear?: YearInsightCount[];
  countByYear?: YearInsightCount[];
  intensityByCountry: CountryIntensity[];
  sectorDistribution?: SectorDistribution[];
  regionDistribution?: RegionDistribution[];
  countByRegion?: RegionDistribution[];
  topicRegionHeatmap?: TopicRegionHeatmapItem[];
  intensityByRegionTopic?: TopicRegionHeatmapItem[];
  likelihoodVsRelevance?: LikelihoodRelevancePoint[];
}

export interface StatsResponse {
  success?: boolean;
  data?: StatsData;
  intensityByTopic?: TopicIntensity[];
  insightsByYear?: YearInsightCount[];
  countByYear?: YearInsightCount[];
  intensityByCountry?: CountryIntensity[];
  sectorDistribution?: SectorDistribution[];
  regionDistribution?: RegionDistribution[];
  countByRegion?: RegionDistribution[];
  topicRegionHeatmap?: TopicRegionHeatmapItem[];
  intensityByRegionTopic?: TopicRegionHeatmapItem[];
  likelihoodVsRelevance?: LikelihoodRelevancePoint[];
}
