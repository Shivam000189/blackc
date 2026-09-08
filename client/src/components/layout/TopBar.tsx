import React from "react";
import { Search, RotateCcw } from "lucide-react";

interface TopBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  search,
  onSearchChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-lg px-4 py-2.5 flex items-center justify-between gap-3 shadow-sm border border-slate-100 mb-5">
      <div className="flex items-center gap-2.5 flex-1">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search title, insight, topic..."
          className="w-full bg-transparent border-none outline-none text-sm text-[#0A0A0A] placeholder-slate-400 font-normal"
        />
      </div>

      {search && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-[#4355b9] bg-[#4355b9]/10 hover:bg-[#4355b9]/20 px-2.5 py-1 rounded-md transition flex items-center gap-1 shrink-0 cursor-pointer font-medium"
          title="Reset search"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      )}
    </div>
  );
};
