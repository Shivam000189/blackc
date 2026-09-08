import React from "react";
import type { TopicIntensity } from "../../types";
import { ChartCard } from "./ChartCard";

interface TopicIntensityChartProps {
  data?: TopicIntensity[];
  loading?: boolean;
  error?: string | null;
}

export const TopicIntensityChart: React.FC<TopicIntensityChartProps> = ({
  data,
  loading = false,
  error = null,
}) => {
  const chartData = (data || []).slice(0, 5);
  const empty = !loading && !error && chartData.length === 0;

  const maxVal = Math.max(...chartData.map((d) => d.avgIntensity || 0), 10);

  return (
    <ChartCard
      title="Topic Intensity"
      loading={loading}
      error={error}
      empty={empty}
      heightClass="h-[150px]"
    >
      <div className="flex flex-col justify-between h-full py-1">
        {chartData.map((item, idx) => {
          const pct = Math.min(100, Math.max(15, (item.avgIntensity / maxVal) * 100));
          return (
            <div key={idx} className="flex items-center gap-2 group" title={`${item.topic}: ${item.avgIntensity}`}>
              <span className="text-[10px] text-slate-400 w-3 shrink-0 font-medium">{idx + 1}</span>
              <div className="flex-1 h-3.5 bg-[#f0f0f5] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-[#4355b9] rounded-full transition-all duration-500 group-hover:bg-[#34449c]"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-600 font-medium w-16 truncate shrink-0 text-right">
                {item.topic}
              </span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
};
