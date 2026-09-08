import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  disabled?: boolean;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  totalPages,
  totalRecords,
  limit,
  onPageChange,
  onLimitChange,
  disabled = false,
}) => {
  const startItem = totalRecords > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, totalRecords);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400">
      {/* Left: Range and Limits */}
      <div className="flex items-center gap-3">
        <span>
          Showing <span className="font-semibold text-slate-200">{startItem}</span> to{" "}
          <span className="font-semibold text-slate-200">{endItem}</span> of{" "}
          <span className="font-semibold text-slate-200">{totalRecords.toLocaleString()}</span> entries
        </span>

        <div className="flex items-center gap-1.5 ml-2">
          <span>Rows per page:</span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            disabled={disabled}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1 text-slate-200 text-xs focus:border-indigo-500 outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Right: Page Navigation */}
      <div className="flex items-center gap-1.5">
        <span className="mr-2">
          Page <span className="font-semibold text-slate-200">{page}</span> of{" "}
          <span className="font-semibold text-slate-200">{totalPages || 1}</span>
        </span>

        <button
          onClick={() => onPageChange(1)}
          disabled={page <= 1 || disabled}
          className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || disabled}
          className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || disabled}
          className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page >= totalPages || disabled}
          className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
