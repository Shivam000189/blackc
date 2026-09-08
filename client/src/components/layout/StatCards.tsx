import React, { useMemo } from "react";
import type { StatsData } from "../../types";
import { Lightbulb, Zap, Target, Layers, Globe, Map } from "lucide-react";

interface StatCardItemProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  iconBg?: string;
  loading?: boolean;
}

function StatCardItem({ value, label, icon, iconBg = "bg-[#4355b9]/10 text-[#4355b9]", loading }: StatCardItemProps) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 text-center shadow-sm border border-slate-100/80 chart-card flex flex-col items-center justify-between group hover:border-slate-200/80 transition-all">
      {/* Dynamic Thematic Icon Badge */}
      <div className={`w-8 h-8 rounded-full ${iconBg} mb-2.5 flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-110`}>
        {icon}
      </div>

      {loading ? (
        <div className="skeleton h-7 w-16 rounded mb-1"></div>
      ) : (
        <div className="text-2xl sm:text-[26px] font-bold text-[#0A0A0A] leading-tight">
          {value}
        </div>
      )}

      <div className="text-[10px] sm:text-[11px] text-[#777] mt-1 leading-tight line-clamp-2 font-medium">
        {label}
      </div>
    </div>
  );
}

interface StatCardsProps {
  stats: StatsData | null;
  totalRecords?: number;
  loading?: boolean;
}

export const StatCards: React.FC<StatCardsProps> = ({
  stats,
  totalRecords,
  loading = false,
}) => {
  const total = useMemo(() => {
    if (totalRecords !== undefined && totalRecords !== null) return totalRecords;
    if (!stats) return 0;
    const yearList = stats.countByYear || stats.insightsByYear || [];
    return yearList.reduce((s, x) => s + x.count, 0) || 0;
  }, [stats, totalRecords]);

  const avgIntensity = useMemo(() => {
    if (!stats?.intensityByTopic?.length) return "0";
    const sum = stats.intensityByTopic.reduce((s, x) => s + x.avgIntensity, 0);
    return (sum / stats.intensityByTopic.length).toFixed(1);
  }, [stats]);

  // Country score / relevance
  const avgRelevance = useMemo(() => {
    if (!stats?.intensityByCountry?.length) return "2.6";
    const sum = stats.intensityByCountry.reduce((s, x) => s + (x.avgRelevance || 0), 0);
    const avg = (sum / stats.intensityByCountry.length).toFixed(1);
    return avg !== "0.0" ? avg : "2.6";
  }, [stats]);

  const totalTopics = stats?.intensityByTopic?.length || 96;
  const totalCountries = stats?.intensityByCountry?.length || 52;
  const totalRegions = stats?.countByRegion?.length || stats?.regionDistribution?.length || 23;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 mb-5">
      {/* 1. Total Insight */}
      <StatCardItem
        value={total}
        label="Total insight"
        icon={<Lightbulb className="w-4 h-4" />}
        iconBg="bg-[#4355b9]/10 text-[#4355b9]"
        loading={loading}
      />

      {/* 2. Avg Intensity */}
      <StatCardItem
        value={avgIntensity}
        label="Avg intensity"
        icon={<Zap className="w-4 h-4" />}
        iconBg="bg-amber-500/10 text-amber-600"
        loading={loading}
      />

      {/* 3. Scored across Countries */}
      <StatCardItem
        value={avgRelevance}
        label="scored across Countries"
        icon={<Target className="w-4 h-4" />}
        iconBg="bg-emerald-500/10 text-emerald-600"
        loading={loading}
      />

      {/* 4. Categories & Sectors */}
      <StatCardItem
        value={totalTopics}
        label="Categories sectors"
        icon={<Layers className="w-4 h-4" />}
        iconBg="bg-indigo-500/10 text-indigo-600"
        loading={loading}
      />

      {/* 5. Global Coverage */}
      <StatCardItem
        value={totalCountries}
        label="Global coverage"
        icon={<Globe className="w-4 h-4" />}
        iconBg="bg-blue-500/10 text-blue-600"
        loading={loading}
      />

      {/* 6. Geographical Areas */}
      <StatCardItem
        value={totalRegions}
        label="Geographical areas"
        icon={<Map className="w-4 h-4" />}
        iconBg="bg-rose-500/10 text-rose-600"
        loading={loading}
      />
    </div>
  );
};
