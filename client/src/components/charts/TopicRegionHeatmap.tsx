import React, { useMemo } from "react";
import type { TopicRegionHeatmapItem } from "../../types";
import { ChartCard } from "./ChartCard";

interface RegionTopicHeatmapProps {
  data?: TopicRegionHeatmapItem[];
  loading?: boolean;
  error?: string | null;
}

const colors = ["#eef2ff", "#c7d2fe", "#a5b4fc", "#818cf8", "#6366f1", "#4f46e5"];

export const TopicRegionHeatmap: React.FC<RegionTopicHeatmapProps> = ({
  data,
  loading = false,
  error = null,
}) => {
  const chartData = data || [];
  const empty = !loading && !error && chartData.length === 0;

  const regions = useMemo(
    () => [...new Set(chartData.map((d) => d.region))].filter(Boolean),
    [chartData]
  );
  const topics = useMemo(
    () => [...new Set(chartData.map((d) => d.topic))].filter(Boolean).slice(0, 10),
    [chartData]
  );

  const matrix = useMemo(() => {
    return regions.map((r) => ({
      region: r,
      ...Object.fromEntries(
        topics.map((t) => {
          const item = chartData.find((d) => d.region === r && d.topic === t);
          return [t, item ? item.avgIntensity : 0];
        })
      ),
    }));
  }, [chartData, regions, topics]);

  const max = Math.max(...chartData.map((d) => d.avgIntensity || 0), 1);

  return (
    <ChartCard title="Intensity by Region × Topic" loading={loading} error={error} empty={empty}>
      <div className="h-64 overflow-auto scrollbar-thin">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left p-1 text-slate-500 sticky left-0 bg-white z-10">Region</th>
              {topics.map((t) => (
                <th key={t} className="p-1 text-slate-500 font-medium text-center">
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row) => (
              <tr key={row.region}>
                <td className="p-1 font-medium text-slate-700 sticky left-0 bg-white z-10 whitespace-nowrap">
                  {row.region}
                </td>
                {topics.map((t) => {
                  const v = (row as any)[t] || 0;
                  const intensityIndex = Math.min(
                    colors.length - 1,
                    Math.max(0, Math.floor((v / max) * (colors.length - 1)))
                  );
                  const isDark = intensityIndex >= 3;
                  return (
                    <td key={t} className="p-1 text-center">
                      <div
                        className={`rounded px-2 py-1.5 font-medium ${
                          v ? (isDark ? "text-white" : "text-indigo-950") : "text-slate-400"
                        }`}
                        style={{ backgroundColor: v ? colors[intensityIndex] : "#f8fafc" }}
                      >
                        {v ? v : "—"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
};
