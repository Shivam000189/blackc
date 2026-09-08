import React, { useState } from "react";
import type { FilterOptions, FilterParams } from "../../types";
import { FilterSelect } from "./FilterSelect";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";

interface FilterBarProps {
  filters: FilterParams;
  filterOptions: FilterOptions;
  onUpdate: (key: keyof FilterParams, value: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  filterOptions,
  onUpdate,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const endYears = filterOptions.end_years || filterOptions.endYears || [];

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 mb-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#4355b9]" />
          <h2 className="text-sm font-semibold text-[#0A0A0A]">Filter & Segment Dataset</h2>
          <span className="text-[11px] text-[#999] hidden sm:inline">
            Dynamically populating from database
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-[#555] hover:text-[#0A0A0A] flex items-center gap-1 cursor-pointer font-medium transition"
        >
          {isExpanded ? "Collapse" : "Expand"}
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2.5 pt-1 animate-in fade-in duration-150">
          <FilterSelect
            label="Topic"
            value={filters.topic}
            options={filterOptions.topics || []}
            onChange={(v) => onUpdate("topic", v)}
          />
          <FilterSelect
            label="Sector"
            value={filters.sector}
            options={filterOptions.sectors || []}
            onChange={(v) => onUpdate("sector", v)}
          />
          <FilterSelect
            label="Region"
            value={filters.region}
            options={filterOptions.regions || []}
            onChange={(v) => onUpdate("region", v)}
          />
          <FilterSelect
            label="PESTLE"
            value={filters.pestle}
            options={filterOptions.pestles || []}
            onChange={(v) => onUpdate("pestle", v)}
          />
          <FilterSelect
            label="Source"
            value={filters.source}
            options={filterOptions.sources || []}
            onChange={(v) => onUpdate("source", v)}
          />
          <FilterSelect
            label="Country"
            value={filters.country}
            options={filterOptions.countries || []}
            onChange={(v) => onUpdate("country", v)}
          />
          <FilterSelect
            label="End Year"
            value={filters.end_year}
            options={endYears}
            onChange={(v) => onUpdate("end_year", v)}
          />
          <div className="flex-1 min-w-[120px]">
            <label className="block text-[11px] font-medium text-[#666] mb-1">
              Data Completeness
            </label>
            <select
              value={filters.completeness || "all"}
              onChange={(e) => onUpdate("completeness", e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-[#ddd] rounded-md text-xs text-[#444] focus:outline-none focus:border-[#4355b9] focus:ring-1 focus:ring-[#4355b9]/20 transition cursor-pointer"
            >
              <option value="all">All records</option>
              <option value="complete">Complete only</option>
              <option value="incomplete">Incomplete only</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
