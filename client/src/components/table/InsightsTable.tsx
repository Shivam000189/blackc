import React, { useState } from "react";
import type { Insight, FilterParams } from "../../types";
import { InsightDetailModal } from "./InsightDetailModal";
import { ArrowUpDown, ArrowUp, ArrowDown, Eye } from "lucide-react";

interface InsightsTableProps {
  data?: Insight[];
  loading?: boolean;
  error?: string | null;
  filters: FilterParams;
  onUpdate: (key: keyof FilterParams, value: any) => void;
  totalPages: number;
}

export const InsightsTable: React.FC<InsightsTableProps> = ({
  data,
  loading = false,
  error = null,
  filters,
  onUpdate,
  totalPages,
}) => {
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  const columns: { key: keyof FilterParams | string; label: string; width?: string }[] = [
    { key: "title", label: "Title (INSIGHT)", width: "min-w-[220px]" },
    { key: "topic", label: "Topic" },
    { key: "sector", label: "Section" },
    { key: "region", label: "Region & Country" },
    { key: "intensity", label: "Intensity" },
    { key: "likelihood", label: "LIKELIHOOD" },
    { key: "relevance", label: "RELEVANCE" },
    { key: "end_year", label: "Year" },
    { key: "action", label: "Action", width: "w-20 text-center" },
  ];

  const handleSort = (key: string) => {
    if (key === "action") return;
    const newOrder = filters.sortBy === key && filters.order === "desc" ? "asc" : "desc";
    onUpdate("sortBy", key);
    onUpdate("order", newOrder);
  };

  const renderSortIcon = (col: string) => {
    if (col === "action") return null;
    if (filters.sortBy !== col) {
      return <ArrowUpDown className="w-3 h-3 text-slate-300 ml-1 inline opacity-60" />;
    }
    return filters.order === "desc" ? (
      <ArrowDown className="w-3 h-3 text-[#4355b9] ml-1 inline" />
    ) : (
      <ArrowUp className="w-3 h-3 text-[#4355b9] ml-1 inline" />
    );
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#0A0A0A]">Raw Insight Record</h2>
          <p className="text-[11px] text-[#888]">Paginated and sortable master dataset table</p>
        </div>
        <div className="text-xs text-[#777] bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          Page <span className="font-semibold text-[#0A0A0A]">{filters.page || 1}</span> of{" "}
          <span className="font-semibold text-[#0A0A0A]">{totalPages || 1}</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
          ⚠ Failed to load insights: {error}
        </div>
      )}

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`p-3 font-semibold text-[#555] uppercase text-[10px] tracking-wider select-none ${
                    col.key !== "action" ? "cursor-pointer hover:text-[#4355b9]" : ""
                  } ${col.width || ""}`}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {renderSortIcon(col.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="h-10">
                  {columns.map((c) => (
                    <td key={c.key} className="p-3">
                      <div className="skeleton h-3.5 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : !data || data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-slate-400 text-xs">
                  No records match the selected filter criteria.
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const regionCountry = [row.region, row.country].filter(Boolean).join(", ") || "—";
                return (
                  <tr
                    key={row._id}
                    onClick={() => setSelectedInsight(row)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    title="Click row to view insight details"
                  >
                    <td className="p-3 font-medium text-[#0A0A0A] max-w-xs truncate">
                      {row.title || row.insight}
                    </td>
                    <td className="p-3 text-[#555] max-w-[120px] truncate">{row.topic || "—"}</td>
                    <td className="p-3 text-[#555] max-w-[120px] truncate">{row.sector || "—"}</td>
                    <td className="p-3 text-[#555] max-w-[140px] truncate">{regionCountry}</td>
                    <td className="p-3">
                      <span className="inline-block px-2 py-0.5 bg-[#4355b9]/10 text-[#4355b9] rounded-md font-bold text-[11px]">
                        {row.intensity ?? 0}
                      </span>
                    </td>
                    <td className="p-3 text-[#555] font-medium">{row.likelihood ?? "—"}</td>
                    <td className="p-3 text-[#555] font-medium">{row.relevance ?? "—"}</td>
                    <td className="p-3 text-[#555]">{row.end_year || row.start_year || "—"}</td>
                    <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setSelectedInsight(row)}
                        className="p-1 text-slate-400 hover:text-[#4355b9] hover:bg-[#4355b9]/10 rounded transition cursor-pointer"
                        title="View Full Record"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-[#666]">
          <span>Rows per page:</span>
          <select
            value={filters.limit || 10}
            onChange={(e) => onUpdate("limit", Number(e.target.value))}
            className="px-2 py-1 border border-slate-200 rounded text-xs bg-white text-[#0A0A0A] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#4355b9]"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdate("page", Math.max(1, (filters.page || 1) - 1))}
            disabled={(filters.page || 1) <= 1}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition text-[#0A0A0A] font-medium"
          >
            Previous
          </button>
          <span className="text-xs text-[#777] px-2 font-medium">
            {filters.page || 1} / {totalPages || 1}
          </span>
          <button
            type="button"
            onClick={() => onUpdate("page", (filters.page || 1) + 1)}
            disabled={(filters.page || 1) >= totalPages}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition text-[#0A0A0A] font-medium"
          >
            Next
          </button>
        </div>
      </div>

      {/* Full Record Modal */}
      <InsightDetailModal
        insight={selectedInsight}
        onClose={() => setSelectedInsight(null)}
      />
    </div>
  );
};
