import React from "react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  className?: string;
  heightClass?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  loading = false,
  error = null,
  empty = false,
  className = "",
  heightClass = "h-[160px]",
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-5 chart-card fade-in flex flex-col justify-between ${className}`}
    >
      <h3 className="text-[13px] font-semibold text-[#0A0A0A] mb-3">{title}</h3>
      {loading ? (
        <div className={`${heightClass} flex items-end gap-2`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="skeleton flex-1 rounded"
              style={{ height: `${30 + ((i * 17) % 60)}%` }}
            ></div>
          ))}
        </div>
      ) : error ? (
        <div className={`${heightClass} flex items-center justify-center text-xs text-red-500 bg-red-50 rounded-lg`}>
          ⚠ {error}
        </div>
      ) : empty ? (
        <div className={`${heightClass} flex items-center justify-center text-xs text-slate-400 bg-slate-50 rounded-lg`}>
          No data matches these filters
        </div>
      ) : (
        <div className={`w-full ${heightClass}`}>{children}</div>
      )}
    </div>
  );
};
