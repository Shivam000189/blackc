import React from "react";
import type { CountryIntensity } from "../../types";
import { ChartCard } from "./ChartCard";

interface CountryIntensityChartProps {
  data?: CountryIntensity[];
  loading?: boolean;
  error?: string | null;
}

export const CountryIntensityChart: React.FC<CountryIntensityChartProps> = ({
  data,
  loading = false,
  error = null,
}) => {
  const chartData = (data && data.length > 0 ? data : [
    { country: "USA", avgIntensity: 8.5 },
    { country: "China", avgIntensity: 11.2 },
    { country: "India", avgIntensity: 6.4 },
    { country: "UK", avgIntensity: 12.8 },
    { country: "Germany", avgIntensity: 9.1 },
    { country: "France", avgIntensity: 3.2 },
    { country: "Japan", avgIntensity: 7.6 },
  ]).slice(0, 7);

  const maxVal = Math.max(...chartData.map((d) => d.avgIntensity || 0), 14);
  const empty = !loading && !error && chartData.length === 0;

  return (
    <ChartCard
      title="Country Intensity"
      loading={loading}
      error={error}
      empty={empty}
      heightClass="h-[150px]"
    >
      <div className="flex items-end justify-between h-full pt-2 pb-1 gap-2">
        {chartData.map((item, idx) => {
          const heightPct = Math.min(100, Math.max(12, ((item.avgIntensity || 1) / maxVal) * 100));
          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
            >
              {/* Tooltip on hover */}
              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10 bg-[#0A0A0A] text-white text-[10px] py-1 px-2 rounded whitespace-nowrap shadow-md">
                {item.country}: {Number(item.avgIntensity).toFixed(1)}
              </div>

              {/* Capsule track */}
              <div className="w-full max-w-[28px] h-[115px] bg-[#f0f0f5] rounded-full p-0.5 flex items-end relative overflow-hidden">
                <div
                  className="w-full bg-[#4355b9] rounded-full transition-all duration-500 group-hover:bg-[#34449c]"
                  style={{ height: `${heightPct}%` }}
                />
              </div>

              {/* Label */}
              <span className="text-[9px] text-slate-500 mt-1 truncate max-w-full text-center font-medium">
                {item.country.slice(0, 3).toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
};
