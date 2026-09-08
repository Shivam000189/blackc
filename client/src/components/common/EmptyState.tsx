import React from "react";
import { FilterX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data matches these filters",
  description = "Try adjusting or clearing your active filters to see insights.",
  onReset,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
        <FilterX className="w-7 h-7" />
      </div>
      <h4 className="text-lg font-semibold text-slate-200 mb-1">{title}</h4>
      <p className="text-sm text-slate-400 max-w-sm mb-5">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition duration-150 flex items-center gap-2"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};
