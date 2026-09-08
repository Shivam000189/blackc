import { useState, useEffect, useMemo, useCallback } from "react";
import type { FilterOptions, FilterParams, InsightsResponse, StatsData } from "./types";
import { fetchFilters, fetchInsights, fetchStats, MOCK_FILTERS, MOCK_INSIGHTS, MOCK_STATS } from "./api";
import { Sidebar } from "./components/layout/Sidebar";
import { StatCards } from "./components/layout/StatCards";
import { CompletenessBanner } from "./components/layout/CompletenessBanner";
import { FilterBar } from "./components/filters/FilterBar";
import { TopicIntensityChart } from "./components/charts/TopicIntensityChart";
import { YearTrendChart } from "./components/charts/YearTrendChart";
import { CountryIntensityChart } from "./components/charts/CountryIntensityChart";
import { LikelihoodRelevanceScatter } from "./components/charts/LikelihoodRelevanceScatter";
import { RegionDonutChart } from "./components/charts/RegionDonutChart";
import { SectorDonutChart } from "./components/charts/SectorDonutChart";
import { LargeBarChart } from "./components/charts/LargeBarChart";
import { InsightsTable } from "./components/table/InsightsTable";
import { SplashScreen } from "./components/common/SplashScreen";

function useFilterState() {
  const [filters, setFilters] = useState<FilterParams>({
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: "",
    end_year: "",
    completeness: "all",
    search: "",
    sortBy: "intensity",
    order: "desc",
    page: 1,
    limit: 10,
  });

  const update = useCallback((key: keyof FilterParams, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: key === "page" ? value : 1 }));
  }, []);

  const reset = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      topic: "",
      sector: "",
      region: "",
      pestle: "",
      source: "",
      country: "",
      end_year: "",
      completeness: "all",
      search: "",
      sortBy: "intensity",
      order: "desc",
      page: 1,
    }));
  }, []);

  return { filters, update, reset };
}

export function App() {
  const [activePage, setActivePage] = useState<"charts" | "table">("charts");
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { filters, update } = useFilterState();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(MOCK_FILTERS);

  // Initial loading splash presentation timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Build query params
  const queryParams = useMemo(() => {
    const p: FilterParams = {};
    const entries: [keyof FilterParams, any][] = [
      ["topic", filters.topic],
      ["sector", filters.sector],
      ["region", filters.region],
      ["pestle", filters.pestle],
      ["source", filters.source],
      ["country", filters.country],
      ["end_year", filters.end_year],
      ["completeness", filters.completeness && filters.completeness !== "all" ? filters.completeness : undefined],
      ["search", filters.search],
      ["sortBy", filters.sortBy],
      ["order", filters.order],
      ["page", filters.page],
      ["limit", filters.limit],
    ];

    entries.forEach(([k, v]) => {
      if (v !== "" && v !== undefined && v !== null) {
        (p as any)[k] = v;
      }
    });
    return p;
  }, [filters]);

  // Fetch filters on mount
  useEffect(() => {
    fetchFilters()
      .then((data) => {
        setFilterOptions(data);
      })
      .catch(() => {
        setFilterOptions(MOCK_FILTERS);
      });
  }, []);

  // Stats state
  const [stats, setStats] = useState<StatsData | null>(null);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatsLoading(true);
    setStatsError(null);

    fetchStats(queryParams)
      .then((res) => {
        if (!cancelled) {
          setStats(res);
          setStatsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStats(MOCK_STATS);
          setStatsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [queryParams]);

  // Insights state
  const [insightsData, setInsightsData] = useState<InsightsResponse | null>(null);
  const [insightsLoading, setInsightsLoading] = useState<boolean>(true);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setInsightsLoading(true);
    setInsightsError(null);

    fetchInsights(queryParams)
      .then((res) => {
        if (!cancelled) {
          setInsightsData(res);
          setInsightsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          const limit = Number(queryParams.limit) || 10;
          const page = Number(queryParams.page) || 1;
          const start = (page - 1) * limit;
          const pageData = MOCK_INSIGHTS.slice(start, start + limit);
          setInsightsData({
            data: pageData,
            total: MOCK_INSIGHTS.length,
            page,
            limit,
            totalPages: Math.ceil(MOCK_INSIGHTS.length / limit),
          });
          setInsightsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [queryParams]);

  // Scatter / matrix data derivation
  const scatterPoints = useMemo(() => {
    if (stats?.likelihoodVsRelevance && stats.likelihoodVsRelevance.length > 0) {
      return stats.likelihoodVsRelevance;
    }
    if (insightsData?.data && insightsData.data.length > 0) {
      return insightsData.data
        .filter((d) => d.likelihood > 0 && d.relevance > 0)
        .map((d) => ({
          likelihood: d.likelihood,
          relevance: d.relevance,
          intensity: d.intensity || 5,
          title: d.title || d.insight || "Insight",
        }));
    }
    return MOCK_STATS.likelihoodVsRelevance || [];
  }, [stats, insightsData]);

  return (
    <div className="w-full h-screen bg-[#ececf2] flex flex-row overflow-hidden relative">
      {/* Initial Startup Splash Screen with smooth fade-out */}
      <SplashScreen isLoading={initialLoading} />

      {/* Sidebar navigation */}
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      {/* Main content body spanning full window with independent scrolling */}
      <main className="flex-1 h-screen overflow-y-auto p-5 sm:p-7 scrollbar-thin">
        {/* Page Title */}
        <h1 className="text-xl sm:text-[22px] font-bold text-[#0A0A0A] mb-4">Analytics View</h1>

        {/* 6 Stat Cards on BOTH Pages */}
        <StatCards
          stats={stats}
          totalRecords={insightsData?.total}
          loading={statsLoading}
        />

        {/* Data Completeness Quality Banner */}
        <CompletenessBanner
          currentCompleteness={filters.completeness}
          onCompletenessChange={(val) => update("completeness", val)}
        />

        {/* Filter & Segment Dataset on BOTH Pages */}
        <FilterBar
          filters={filters}
          filterOptions={filterOptions}
          onUpdate={update}
        />

        {/* Page 1: Graphs & Charts View */}
        {activePage === "charts" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-6 fade-in">
            {/* Chart 1: Topic Intensity */}
            <TopicIntensityChart
              data={stats?.intensityByTopic}
              loading={statsLoading}
              error={statsError}
            />

            {/* Chart 2: Year Trend */}
            <YearTrendChart
              data={stats?.countByYear || stats?.insightsByYear}
              loading={statsLoading}
              error={statsError}
            />

            {/* Chart 3: Country Intensity */}
            <CountryIntensityChart
              data={stats?.intensityByCountry}
              loading={statsLoading}
              error={statsError}
            />

            {/* Chart 4: Likelihood vs Relevance Matrix */}
            <LikelihoodRelevanceScatter
              data={scatterPoints}
              loading={statsLoading && insightsLoading}
              error={statsError}
            />

            {/* Chart 5: Regional Distribution Donut */}
            <RegionDonutChart
              data={stats?.countByRegion || stats?.regionDistribution}
              loading={statsLoading}
              error={statsError}
            />

            {/* Chart 6: Sector Breakdown Donut */}
            <SectorDonutChart
              data={stats?.sectorDistribution}
              loading={statsLoading}
              error={statsError}
            />

            {/* Chart 7: Large Overview Timeline Bar Chart */}
            <LargeBarChart
              data={stats?.countByYear || stats?.insightsByYear}
              loading={statsLoading}
              error={statsError}
            />
          </div>
        )}

        {/* Page 2: Raw Insight Record Table */}
        {activePage === "table" && (
          <div className="fade-in pb-6">
            <InsightsTable
              data={insightsData?.data}
              loading={insightsLoading}
              error={insightsError}
              filters={filters}
              onUpdate={update}
              totalPages={insightsData?.totalPages || 1}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
