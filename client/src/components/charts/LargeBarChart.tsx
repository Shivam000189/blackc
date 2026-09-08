import React, { useState } from "react";
import type { YearInsightCount } from "../../types";
import { ChartCard } from "./ChartCard";

interface LargeBarChartProps {
  data?: YearInsightCount[];
  loading?: boolean;
  error?: string | null;
}

export const LargeBarChart: React.FC<LargeBarChartProps> = ({
  data,
  loading = false,
  error = null,
}) => {
  // 12 to 13 items
  const defaultBars = [
    { label: "1", value: 45, info: "Energy 2016" },
    { label: "2", value: 18, info: "Policy 2017" },
    { label: "3", value: 72, info: "Economy 2018" },
    { label: "4", value: 38, info: "Tech 2019" },
    { label: "5", value: 8, info: "Gov 2020" },
    { label: "6", value: 12, info: "Finance 2021" },
    { label: "7", value: 35, info: "Security 2022" },
    { label: "8", value: 88, info: "Energy 2023 - Peak Growth" },
    { label: "9", value: 65, info: "Environment 2024" },
    { label: "10", value: 92, info: "Innovation 2025" },
    { label: "11", value: 42, info: "Retail 2026" },
    { label: "12", value: 20, info: "Healthcare 2027" },
    { label: "13", value: 70, info: "Global Trade 2028" },
  ];

  const [activeIdx, setActiveIdx] = useState<number>(7); // Default active on #8

  let bars = defaultBars;
  if (data && data.length >= 8) {
    const maxVal = Math.max(...data.map((d) => d.count), 1);
    bars = data.slice(0, 13).map((d, i) => ({
      label: String(i + 1),
      value: Math.min(100, Math.max(10, Math.round((d.count / maxVal) * 100))),
      info: `Year ${d.year}: ${d.count} insights`,
    }));
  }

  return (
    <ChartCard
      title="Timeline Intensity Distribution"
      loading={loading}
      error={error}
      className="col-span-1 lg:col-span-2 xl:col-span-3"
      heightClass="h-[210px]"
    >
      <div className="flex flex-col justify-between h-full pt-6 pb-2">
        {/* Bars Container */}
        <div className="flex items-end justify-between h-[155px] gap-2 px-3 relative">
          {bars.map((bar, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
              >
                {/* Highlight line & circle for active element */}
                {isSelected && (
                  <>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#4355b9] text-white text-[10px] font-medium py-0.5 px-2.5 rounded-full whitespace-nowrap shadow-lg z-30 transition-all">
                      {bar.info}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#4355b9]" />
                    </div>
                    <div className="absolute top-0 bottom-0 w-[1.5px] bg-[#4355b9] z-20 pointer-events-none flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#4355b9] -mt-1 shadow-sm" />
                    </div>
                  </>
                )}

                {/* Capsule track */}
                <div className="w-full max-w-[18px] h-[130px] bg-[#f0f0f5] rounded-full flex items-end relative overflow-hidden">
                  <div
                    className={`w-full rounded-full transition-all duration-300 ${
                      isSelected ? "bg-[#4355b9]" : "bg-[#4355b9]/85 group-hover:bg-[#4355b9]"
                    }`}
                    style={{ height: `${bar.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* X-Axis Numbers */}
        <div className="flex justify-between px-3 pt-2 border-t border-slate-100/80">
          {bars.map((bar, idx) => (
            <span
              key={idx}
              className={`flex-1 text-center text-[10px] font-medium transition-colors ${
                activeIdx === idx ? "text-[#4355b9] font-bold" : "text-slate-400"
              }`}
            >
              {bar.label}
            </span>
          ))}
        </div>
      </div>
    </ChartCard>
  );
};
