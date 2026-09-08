import React, { useEffect } from "react";
import type { Insight } from "../../types";
import { X, ExternalLink, Calendar, MapPin, Tag, Layers, Zap, Target, Gauge, Sparkles } from "lucide-react";

interface InsightDetailModalProps {
  insight: Insight | null;
  onClose: () => void;
}

export const InsightDetailModal: React.FC<InsightDetailModalProps> = ({
  insight,
  onClose,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (insight) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [insight, onClose]);

  if (!insight) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/45 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-[#1e295f]/15 p-6 sm:p-7 text-[#0A0A0A] overflow-y-auto max-h-[90vh] scrollbar-thin animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex-1 pr-2">
            {/* Category Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#4355b9]/10 text-[#4355b9] border border-[#4355b9]/20">
                {insight.sector || "General Sector"}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                {insight.pestle || "PESTLE"}
              </span>
              {insight.topic && (
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-[#394998] border border-indigo-100">
                  {insight.topic}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] leading-snug">
              {insight.title || insight.insight || "Insight Record Details"}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#0A0A0A] transition cursor-pointer shrink-0"
            title="Close dialog (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Insight Text Box */}
        <div className="my-5 p-4 sm:p-5 rounded-xl bg-[#f8fafc] border border-slate-100 border-l-4 border-l-[#4355b9]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4355b9] uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#4355b9]" />
            <span>Full Insight Summary</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-700">
            {insight.insight || insight.title || "No extended description provided for this record."}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
          {/* Intensity */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-amber-700 text-xs font-semibold mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Intensity</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-700 leading-none">
              {insight.intensity ?? 0}
            </div>
          </div>

          {/* Likelihood */}
          <div className="p-3.5 rounded-xl bg-[#4355b9]/10 border border-[#4355b9]/20 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[#4355b9] text-xs font-semibold mb-1">
              <Gauge className="w-3.5 h-3.5 text-[#4355b9]" />
              <span>Likelihood</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#4355b9] leading-none">
              {insight.likelihood ?? 0}
            </div>
          </div>

          {/* Relevance */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold mb-1">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>Relevance</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-700 leading-none">
              {insight.relevance ?? 0}
            </div>
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-1.5 rounded-lg bg-white shadow-xs text-[#4355b9] border border-slate-100">
              <Tag className="w-4 h-4" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-slate-400 text-[10px] font-medium">Topic</span>
              <span className="font-semibold text-slate-800 capitalize truncate">
                {insight.topic || "—"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-1.5 rounded-lg bg-white shadow-xs text-rose-600 border border-slate-100">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-slate-400 text-[10px] font-medium">Location</span>
              <span className="font-semibold text-slate-800 truncate">
                {[insight.country, insight.region].filter(Boolean).join(", ") || "Global / Unspecified"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-1.5 rounded-lg bg-white shadow-xs text-indigo-600 border border-slate-100">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-slate-400 text-[10px] font-medium">Timeframe</span>
              <span className="font-semibold text-slate-800">
                {insight.start_year || insight.end_year
                  ? `${insight.start_year || "Start"} → ${insight.end_year || "Ongoing"}`
                  : "Not specified"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-1.5 rounded-lg bg-white shadow-xs text-blue-600 border border-slate-100">
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-slate-400 text-[10px] font-medium">Source</span>
              <span className="font-semibold text-slate-800 truncate">
                {insight.source || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <span className="text-[11px] text-slate-400 order-2 sm:order-1">
            {insight.added ? `Added: ${new Date(insight.added).toLocaleDateString()}` : "Master Dataset Record"}
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              Close
            </button>

            {insight.url && (
              <a
                href={insight.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#4355b9] hover:bg-[#37479d] rounded-xl transition shadow-md shadow-[#4355b9]/25 cursor-pointer"
              >
                <span>View Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

