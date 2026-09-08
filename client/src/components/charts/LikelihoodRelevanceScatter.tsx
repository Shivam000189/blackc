import React from "react";
import type { LikelihoodRelevancePoint } from "../../types";
import { ChartCard } from "./ChartCard";

interface LikelihoodRelevanceScatterProps {
  data?: LikelihoodRelevancePoint[];
  loading?: boolean;
  error?: string | null;
}

export const LikelihoodRelevanceScatter: React.FC<LikelihoodRelevanceScatterProps> = ({
  data,
  loading = false,
  error = null,
}) => {
  // Aggregate or map into 7 columns representing likelihood levels 1-5 or segments
  const displayItems = [
    { label: "1", top: 30, height: 40, active: false, tooltip: "Low Likelihood" },
    { label: "2", top: 45, height: 35, active: false, tooltip: "Moderate Likelihood" },
    { label: "3", top: 20, height: 60, active: false, tooltip: "Medium Likelihood" },
    { label: "4", top: 15, height: 75, active: true, tooltip: "High Relevance & Likelihood" },
    { label: "5", top: 50, height: 30, active: false, tooltip: "High Likelihood" },
    { label: "6", top: 35, height: 45, active: false, tooltip: "Strategic Impact" },
  ];

  // Adjust if data is present
  if (data && data.length > 0) {
    const buckets: { [key: number]: number[] } = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    data.forEach((d) => {
      const k = Math.min(6, Math.max(1, Math.round(d.likelihood || 3)));
      buckets[k].push(d.relevance || 3);
    });

    displayItems.forEach((item, idx) => {
      const vals = buckets[idx + 1] || [];
      if (vals.length > 0) {
        const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
        item.top = Math.max(10, Math.min(60, 70 - avg * 12));
        item.height = Math.max(25, Math.min(70, vals.length * 8 + 20));
      }
    });
  }

  const empty = !loading && !error && (!data || data.length === 0) && false;

  return (
    <ChartCard
      title="Likelihood & Relevance Matrix"
      loading={loading}
      error={error}
      empty={empty}
      heightClass="h-[150px]"
    >
      <div className="relative w-full h-full flex flex-col justify-between pt-2">
        {/* Subtle grid lines */}
        <div className="absolute inset-x-0 top-3 h-[105px] flex flex-col justify-between pointer-events-none opacity-40">
          <div className="border-b border-dashed border-slate-200 w-full" />
          <div className="border-b border-dashed border-slate-200 w-full" />
          <div className="border-b border-dashed border-slate-200 w-full" />
          <div className="border-b border-dashed border-slate-200 w-full" />
        </div>

        {/* Floating bars */}
        <div className="relative z-10 flex items-center justify-between h-[110px] px-2">
          {displayItems.map((item, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center h-full justify-center group relative cursor-pointer"
            >
              {/* Floating Pill track / bar */}
              <div className="w-2.5 h-full relative flex items-center justify-center">
                {/* Background faint column */}
                <div className="w-2 h-full bg-[#f0f0f5]/80 rounded-full absolute" />

                {/* Floating active blue bar */}
                <div
                  className={`w-2.5 rounded-full absolute transition-all duration-300 ${
                    item.active
                      ? "bg-[#4355b9] ring-2 ring-[#4355b9]/30"
                      : "bg-[#d0d3e5] group-hover:bg-[#4355b9]"
                  }`}
                  style={{
                    top: `${item.top}%`,
                    height: `${item.height}%`,
                  }}
                />
              </div>

              {/* Hover tooltip */}
              <div
                className={`absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-20 bg-[#4355b9] text-white text-[9px] py-0.5 px-2 rounded-md whitespace-nowrap shadow-md ${
                  item.active ? "opacity-100" : ""
                }`}
              >
                {item.tooltip}
              </div>

              {/* X Axis label */}
              <span className="text-[9px] text-slate-400 mt-2 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
};
