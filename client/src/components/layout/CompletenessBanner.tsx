import React, { useState, useEffect } from "react";
import type { CompletenessStats } from "../../types";
import { fetchCompletenessStats, MOCK_COMPLETENESS } from "../../api";
import { Info, CheckCircle2, AlertCircle, X, ShieldCheck } from "lucide-react";

interface CompletenessBannerProps {
  currentCompleteness?: "all" | "complete" | "incomplete";
  onCompletenessChange: (value: "all" | "complete" | "incomplete") => void;
}

export const CompletenessBanner: React.FC<CompletenessBannerProps> = ({
  currentCompleteness = "all",
  onCompletenessChange,
}) => {
  const [stats, setStats] = useState<CompletenessStats>(MOCK_COMPLETENESS);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    fetchCompletenessStats()
      .then((data) => {
        if (!cancelled) {
          setStats(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Completeness fetch error:", err);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const completePercent = stats.total > 0 ? Math.round((stats.complete / stats.total) * 100) : 0;

  return (
    <div className="relative mb-5 bg-gradient-to-r from-white via-white to-slate-50 border border-slate-200/80 rounded-xl p-3.5 sm:p-4 shadow-sm transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Status Area */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#4355b9]/10 text-[#4355b9] flex items-center justify-center shrink-0 border border-[#4355b9]/15">
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                {loading ? (
                  <span className="inline-block skeleton h-4 w-44 rounded" />
                ) : (
                  <span>
                    <strong className="text-[#4355b9]">{stats.complete.toLocaleString()}</strong> of{" "}
                    <strong>{stats.total.toLocaleString()}</strong> records complete ({completePercent}%)
                    <span className="font-normal text-slate-500">
                      {" "}— {stats.incomplete.toLocaleString()} missing one or more required fields
                    </span>
                  </span>
                )}
              </span>

              {/* Info Tooltip Trigger */}
              <button
                type="button"
                onClick={() => setShowTooltip(!showTooltip)}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#4355b9] bg-slate-100 hover:bg-[#4355b9]/10 px-2 py-0.5 rounded-full transition cursor-pointer"
                title="View completeness definition & missing fields breakdown"
              >
                <Info className="w-3.5 h-3.5 text-[#4355b9]" />
                <span>Criteria</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">
              Required fields: <code className="text-[10px] text-slate-700 bg-slate-100 px-1 py-0.5 rounded">topic</code>,{" "}
              <code className="text-[10px] text-slate-700 bg-slate-100 px-1 py-0.5 rounded">sector</code>,{" "}
              <code className="text-[10px] text-slate-700 bg-slate-100 px-1 py-0.5 rounded">region</code>,{" "}
              <code className="text-[10px] text-slate-700 bg-slate-100 px-1 py-0.5 rounded">pestle</code>,{" "}
              <code className="text-[10px] text-slate-700 bg-slate-100 px-1 py-0.5 rounded">source</code>,{" "}
              <code className="text-[10px] text-slate-700 bg-slate-100 px-1 py-0.5 rounded">country</code>.
            </p>
          </div>
        </div>

        {/* Right Filter Chips */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-slate-100/90 p-1 rounded-lg border border-slate-200/60 text-xs">
          <button
            type="button"
            onClick={() => onCompletenessChange("all")}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition cursor-pointer ${
              currentCompleteness === "all"
                ? "bg-white text-[#4355b9] shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All records ({stats.total})
          </button>
          <button
            type="button"
            onClick={() => onCompletenessChange("complete")}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition cursor-pointer flex items-center gap-1 ${
              currentCompleteness === "complete"
                ? "bg-emerald-600 text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-emerald-700"
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            Complete ({stats.complete})
          </button>
          <button
            type="button"
            onClick={() => onCompletenessChange("incomplete")}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition cursor-pointer flex items-center gap-1 ${
              currentCompleteness === "incomplete"
                ? "bg-amber-600 text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-amber-700"
            }`}
          >
            <AlertCircle className="w-3 h-3" />
            Incomplete ({stats.incomplete})
          </button>
        </div>
      </div>

      {/* Popover / Tooltip Modal Breakdown */}
      {showTooltip && (
        <div className="mt-3 p-3.5 bg-white border border-slate-200 rounded-xl shadow-lg animate-in fade-in duration-150">
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100 mb-2.5">
            <div>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#4355b9]" />
                Data Completeness Standard
              </h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                A record is classified as <strong>Complete</strong> only when all 6 required fields are non-null. Records with one or more null fields are classified as <strong>Incomplete</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition"
              title="Close breakdown"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Missing Field Counts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="block text-[10px] text-slate-500 font-medium">Missing Topic</span>
              <span className="text-xs font-bold text-slate-900">
                {stats.missingFieldBreakdown.topic} <span className="text-[10px] font-normal text-slate-400">records</span>
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="block text-[10px] text-slate-500 font-medium">Missing Sector</span>
              <span className="text-xs font-bold text-slate-900">
                {stats.missingFieldBreakdown.sector} <span className="text-[10px] font-normal text-slate-400">records</span>
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="block text-[10px] text-slate-500 font-medium">Missing Region</span>
              <span className="text-xs font-bold text-slate-900">
                {stats.missingFieldBreakdown.region} <span className="text-[10px] font-normal text-slate-400">records</span>
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="block text-[10px] text-slate-500 font-medium">Missing PESTLE</span>
              <span className="text-xs font-bold text-slate-900">
                {stats.missingFieldBreakdown.pestle} <span className="text-[10px] font-normal text-slate-400">records</span>
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="block text-[10px] text-slate-500 font-medium">Missing Source</span>
              <span className="text-xs font-bold text-slate-900">
                {stats.missingFieldBreakdown.source} <span className="text-[10px] font-normal text-slate-400">records</span>
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="block text-[10px] text-slate-500 font-medium">Missing Country</span>
              <span className="text-xs font-bold text-slate-900">
                {stats.missingFieldBreakdown.country} <span className="text-[10px] font-normal text-slate-400">records</span>
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 italic">
            * Note: A record can be missing more than one field simultaneously, so individual breakdown counts may overlap.
          </p>
        </div>
      )}
    </div>
  );
};
