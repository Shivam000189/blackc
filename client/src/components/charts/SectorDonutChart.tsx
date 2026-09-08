import React from "react";
import type { SectorDistribution } from "../../types";
import { ChartCard } from "./ChartCard";

interface SectorDonutChartProps {
  data?: SectorDistribution[];
  loading?: boolean;
  error?: string | null;
}

export const SectorDonutChart: React.FC<SectorDonutChartProps> = ({
  data,
  loading = false,
  error = null,
}) => {
  const defaultItems = [
    { label: "Energy & Tech", value: 60, color: "#4355b9" },
    { label: "Finance & Gov", value: 20, color: "#f0c040" },
    { label: "Health & Retail", value: 20, color: "#e05070" },
  ];

  let items = defaultItems;
  if (data && data.length >= 3) {
    const total = data.slice(0, 3).reduce((acc, curr) => acc + curr.count, 0) || 1;
    items = [
      {
        label: data[0].sector || "Energy",
        value: Math.round((data[0].count / total) * 100),
        color: "#4355b9",
      },
      {
        label: data[1].sector || "Finance",
        value: Math.round((data[1].count / total) * 100),
        color: "#f0c040",
      },
      {
        label: data[2].sector || "Retail",
        value: Math.max(5, 100 - Math.round((data[0].count / total) * 100) - Math.round((data[1].count / total) * 100)),
        color: "#e05070",
      },
    ];
  }

  const c = 220;
  const p1 = (items[0].value / 100) * c;
  const p2 = (items[1].value / 100) * c;
  const p3 = (items[2].value / 100) * c;

  const empty = !loading && !error && (!data || data.length === 0) && false;

  return (
    <ChartCard
      title="Sector Breakdown"
      loading={loading}
      error={error}
      empty={empty}
      heightClass="h-[150px]"
    >
      <div className="flex items-center justify-between h-full px-2 gap-4">
        {/* Donut SVG */}
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Segment 1: Blue */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="#4355b9"
              strokeWidth="16"
              strokeDasharray={`${p1} ${c - p1}`}
              strokeDashoffset="0"
              className="transition-all duration-500"
            />
            {/* Segment 2: Yellow */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="#f0c040"
              strokeWidth="16"
              strokeDasharray={`${p2} ${c - p2}`}
              strokeDashoffset={`-${p1}`}
              className="transition-all duration-500"
            />
            {/* Segment 3: Pink/Red */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="#e05070"
              strokeWidth="16"
              strokeDasharray={`${p3} ${c - p3}`}
              strokeDashoffset={`-${p1 + p2}`}
              className="transition-all duration-500"
            />
          </svg>
        </div>

        {/* Legend on right */}
        <div className="flex flex-col justify-center gap-2 flex-1 min-w-0">
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px] text-[#555]">
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: it.color }}
                />
                <span className="truncate font-medium text-[#2a2a3a]">{it.label}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold ml-2">{it.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
};
