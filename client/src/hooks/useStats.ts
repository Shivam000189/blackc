import { useEffect, useState } from "react";
import type { FilterParams, StatsData } from "../types";
import { fetchStats } from "../api";

const initialStats: StatsData = {
  intensityByTopic: [],
  insightsByYear: [],
  intensityByCountry: [],
  sectorDistribution: [],
  regionDistribution: [],
  topicRegionHeatmap: [],
};

export function useStats(params: FilterParams) {
  const [stats, setStats] = useState<StatsData>(initialStats);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extract filter dimensions that affect stats
  const filterKey = JSON.stringify({
    topic: params.topic,
    sector: params.sector,
    region: params.region,
    pestle: params.pestle,
    source: params.source,
    country: params.country,
    end_year: params.end_year,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchStats(params);
        if (isMounted) {
          setStats(res);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || "Failed to load statistical chart data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [filterKey]);

  return { stats, loading, error };
}
