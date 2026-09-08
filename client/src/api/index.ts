import { apiClient } from "./client";
import type {
  FilterOptions,
  FilterParams,
  FiltersResponse,
  InsightsResponse,
  StatsData,
  StatsResponse,
} from "../types";

export const MOCK_FILTERS: FilterOptions = {
  topics: [
    "Energy",
    "Water",
    "Financial services",
    "Information Technology",
    "Government",
    "Healthcare",
    "Aerospace",
    "Retail",
    "Manufacturing",
    "Environment",
  ],
  sectors: [
    "Energy",
    "Environment",
    "Government",
    "Health",
    "Retail",
    "Financial services",
    "Aerospace, defence & security",
    "Information Technology",
  ],
  regions: [
    "Africa",
    "Asia",
    "Europe",
    "Middle East",
    "North America",
    "South America",
    "World",
  ],
  pestles: [
    "Economic",
    "Environmental",
    "Political",
    "Social",
    "Technological",
    "Health",
  ],
  sources: [
    "IEA",
    "World Bank",
    "UN",
    "IMF",
    "OECD",
    "Gartner",
    "Forbes",
    "CIA World Fact Book",
  ],
  countries: [
    "United States of America",
    "China",
    "India",
    "United Kingdom",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "Nigeria",
    "South Africa",
    "Canada",
    "Australia",
    "Mexico",
    "Russia",
    "Italy",
    "Spain",
    "South Korea",
    "Saudi Arabia",
    "Indonesia",
    "Turkey",
  ],
  end_years: [
    2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028,
    2029, 2030,
  ],
};

export const MOCK_STATS: StatsData = {
  intensityByTopic: [
    { topic: "Energy", avgIntensity: 12.4 },
    { topic: "Water", avgIntensity: 9.8 },
    { topic: "Financial services", avgIntensity: 8.6 },
    { topic: "Information Technology", avgIntensity: 8.1 },
    { topic: "Government", avgIntensity: 7.5 },
    { topic: "Healthcare", avgIntensity: 6.9 },
    { topic: "Aerospace", avgIntensity: 6.2 },
    { topic: "Retail", avgIntensity: 5.8 },
    { topic: "Manufacturing", avgIntensity: 5.1 },
    { topic: "Environment", avgIntensity: 4.7 },
  ],
  countByYear: [
    { year: 2016, count: 18 },
    { year: 2017, count: 42 },
    { year: 2018, count: 78 },
    { year: 2019, count: 112 },
    { year: 2020, count: 156 },
    { year: 2021, count: 203 },
    { year: 2022, count: 245 },
    { year: 2023, count: 289 },
    { year: 2024, count: 312 },
    { year: 2025, count: 267 },
    { year: 2026, count: 198 },
    { year: 2027, count: 134 },
  ],
  intensityByCountry: [
    { country: "United States", avgIntensity: 11.2 },
    { country: "China", avgIntensity: 9.8 },
    { country: "India", avgIntensity: 8.6 },
    { country: "United Kingdom", avgIntensity: 8.1 },
    { country: "Germany", avgIntensity: 7.5 },
    { country: "France", avgIntensity: 7.2 },
    { country: "Japan", avgIntensity: 6.9 },
    { country: "Brazil", avgIntensity: 6.4 },
    { country: "Nigeria", avgIntensity: 5.9 },
    { country: "South Africa", avgIntensity: 5.6 },
    { country: "Canada", avgIntensity: 5.3 },
    { country: "Australia", avgIntensity: 5.1 },
    { country: "Mexico", avgIntensity: 4.8 },
    { country: "Russia", avgIntensity: 4.5 },
    { country: "Italy", avgIntensity: 4.2 },
  ],
  likelihoodVsRelevance: Array.from({ length: 60 }, (_, i) => ({
    likelihood: Math.floor(Math.random() * 5) + 1,
    relevance: Math.floor(Math.random() * 5) + 1,
    intensity: Math.floor(Math.random() * 12) + 2,
    title: `Insight #${i + 1}: ${
      [
        "Energy policy",
        "Water scarcity",
        "Market trend",
        "Tech adoption",
        "Regulatory change",
        "Climate impact",
      ][i % 6]
    }`,
  })),
  countByRegion: [
    { region: "Africa", count: 142 },
    { region: "Asia", count: 287 },
    { region: "Europe", count: 213 },
    { region: "Middle East", count: 98 },
    { region: "North America", count: 356 },
    { region: "South America", count: 124 },
    { region: "World", count: 67 },
  ],
  intensityByRegionTopic: [
    { region: "Africa", topic: "Energy", avgIntensity: 8.2 },
    { region: "Africa", topic: "Water", avgIntensity: 9.1 },
    { region: "Africa", topic: "Government", avgIntensity: 6.4 },
    { region: "Asia", topic: "Energy", avgIntensity: 10.5 },
    { region: "Asia", topic: "Information Technology", avgIntensity: 9.8 },
    { region: "Asia", topic: "Manufacturing", avgIntensity: 7.2 },
    { region: "Europe", topic: "Energy", avgIntensity: 9.4 },
    { region: "Europe", topic: "Environment", avgIntensity: 8.6 },
    { region: "Europe", topic: "Financial services", avgIntensity: 7.9 },
    { region: "North America", topic: "Energy", avgIntensity: 11.8 },
    { region: "North America", topic: "Information Technology", avgIntensity: 10.2 },
    { region: "North America", topic: "Healthcare", avgIntensity: 8.7 },
    { region: "Middle East", topic: "Energy", avgIntensity: 12.1 },
    { region: "Middle East", topic: "Government", avgIntensity: 7.5 },
    { region: "South America", topic: "Energy", avgIntensity: 7.8 },
    { region: "South America", topic: "Environment", avgIntensity: 6.9 },
  ],
};

export const MOCK_INSIGHTS = Array.from({ length: 96 }, (_, i) => ({
  _id: `ins_${i + 1}`,
  title: `Insight ${i + 1}: ${
    [
      "Renewable energy expansion",
      "Water conservation strategy",
      "Financial market analysis",
      "Digital transformation",
      "Policy reform",
      "Healthcare innovation",
      "Aerospace development",
      "Retail evolution",
      "Manufacturing automation",
      "Environmental sustainability",
    ][i % 10]
  }`,
  sector: MOCK_FILTERS.sectors[i % MOCK_FILTERS.sectors.length],
  topic: MOCK_FILTERS.topics[i % MOCK_FILTERS.topics.length],
  region: MOCK_FILTERS.regions[i % MOCK_FILTERS.regions.length],
  country: MOCK_FILTERS.countries[i % MOCK_FILTERS.countries.length],
  intensity: Math.floor(Math.random() * 12) + 2,
  likelihood: Math.floor(Math.random() * 5) + 1,
  relevance: Math.floor(Math.random() * 5) + 1,
  pestle: MOCK_FILTERS.pestles[i % MOCK_FILTERS.pestles.length],
  source: MOCK_FILTERS.sources[i % MOCK_FILTERS.sources.length],
  end_year: (MOCK_FILTERS.end_years || [])[i % (MOCK_FILTERS.end_years?.length || 1)],
  added: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(
    2,
    "0"
  )}`,
  url: "https://example.com/insight",
  insight: "Key strategic projection derived from historical metrics.",
  start_year: null,
  impact: null,
  published: null,
}));

export const fetchFilters = async (): Promise<FilterOptions> => {
  const response = await apiClient.get<FiltersResponse>("/filters");
  const d = response.data;
  const filterObj: FilterOptions = (d.data || d) as FilterOptions;
  if (filterObj.endYears && !filterObj.end_years) {
    filterObj.end_years = filterObj.endYears;
  }
  return filterObj;
};

export const fetchInsights = async (params: FilterParams = {}): Promise<InsightsResponse> => {
  const cleanParams: Record<string, any> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      cleanParams[key] = value;
    }
  });

  const response = await apiClient.get<InsightsResponse>("/insights", { params: cleanParams });
  const d = response.data;
  return {
    success: d.success,
    count: d.count,
    total: d.total ?? d.data?.length ?? 0,
    page: d.page ?? 1,
    limit: d.limit ?? 10,
    totalPages: d.totalPages ?? 1,
    data: d.data || [],
  };
};

export const fetchStats = async (params: FilterParams = {}): Promise<StatsData> => {
  const cleanParams: Record<string, any> = {};

  const allowedKeys = [
    "topic",
    "sector",
    "region",
    "pestle",
    "source",
    "country",
    "end_year",
  ];
  allowedKeys.forEach((key) => {
    const val = (params as any)[key];
    if (val !== undefined && val !== "" && val !== null) {
      cleanParams[key] = val;
    }
  });

  const response = await apiClient.get<StatsResponse>("/stats", { params: cleanParams });
  const raw = (response.data.data || response.data) as StatsData;

  // Normalize fields between backend schema and visualization expectation
  const stats: StatsData = {
    intensityByTopic: raw.intensityByTopic || [],
    countByYear: raw.countByYear || raw.insightsByYear || [],
    insightsByYear: raw.insightsByYear || raw.countByYear || [],
    intensityByCountry: raw.intensityByCountry || [],
    countByRegion: raw.countByRegion || raw.regionDistribution || [],
    regionDistribution: raw.regionDistribution || raw.countByRegion || [],
    sectorDistribution: raw.sectorDistribution || [],
    intensityByRegionTopic: raw.intensityByRegionTopic || raw.topicRegionHeatmap || [],
    topicRegionHeatmap: raw.topicRegionHeatmap || raw.intensityByRegionTopic || [],
    likelihoodVsRelevance: raw.likelihoodVsRelevance || [],
  };

  return stats;
};
