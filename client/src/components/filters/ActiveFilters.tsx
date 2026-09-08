import React from "react";
import { X, SlidersHorizontal } from "lucide-react";
import type { FilterParams } from "../../types";

interface ActiveFiltersProps {
  filters: FilterParams;
  onRemoveFilter: (key: keyof FilterParams) => void;
  onClearAll: () => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onClearAll,
}) => {
  const activeEntries = Object.entries(filters).filter(([key, val]) => {
    if (["page", "limit", "sortBy", "order"].includes(key)) return false;
    return val !== undefined && val !== "" && val !== null;
  });

  if (activeEntries.length === 0) return null;

  const labelMap: Record<string, string> = {
    topic: "Topic",
    sector: "Sector",
    region: "Region",
    pestle: "PESTLE",
    source: "Source",
    country: "Country",
    end_year: "End Year",
    search: "Search",
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 rounded-xl bg-slate-900/40 border border-slate-800/80">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mr-1">
        <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
        <span>Active Filters:</span>
      </div>
      {activeEntries.map(([key, val]) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/15 text-indigo-200 border border-indigo-500/30"
        >
          <span className="text-indigo-400 text-[11px] font-semibold">{labelMap[key] || key}:</span>
          <span className="text-white max-w-[150px] truncate">{String(val)}</span>
          <button
            onClick={() => onRemoveFilter(key as keyof FilterParams)}
            className="hover:text-white p-0.5 rounded transition hover:bg-indigo-500/30"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs font-semibold text-rose-400 hover:text-rose-300 ml-auto px-2 py-0.5 rounded hover:bg-rose-500/10 transition"
      >
        Clear all
      </button>
    </div>
  );
};
