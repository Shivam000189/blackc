import React from "react";
import type { Insight } from "../../types";
import { X, ExternalLink, Calendar, MapPin, Tag, Layers, Zap, Target, Gauge } from "lucide-react";

interface InsightDetailModalProps {
  insight: Insight | null;
  onClose: () => void;
}

export const InsightDetailModal: React.FC<InsightDetailModalProps> = ({
  insight,
  onClose,
}) => {
  if (!insight) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-200 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {insight.sector || "General Sector"}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {insight.pestle || "PESTLE"}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
              {insight.title || "Insight Details"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Insight Text */}
        <div className="my-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Full Insight
          </p>
          <p className="text-sm leading-relaxed text-slate-200">
            {insight.insight || "No extended insight description available."}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Intensity</span>
            </div>
            <p className="text-xl font-bold text-white">{insight.intensity || 0}</p>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
              <Gauge className="w-3.5 h-3.5" />
              <span>Likelihood</span>
            </div>
            <p className="text-xl font-bold text-white">{insight.likelihood || 0}</p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
              <Target className="w-3.5 h-3.5" />
              <span>Relevance</span>
            </div>
            <p className="text-xl font-bold text-white">{insight.relevance || 0}</p>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/50">
            <Tag className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Topic:</span>
            <span className="font-semibold text-slate-200 capitalize">{insight.topic || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/50">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Location:</span>
            <span className="font-semibold text-slate-200">
              {insight.country || "Global"} {insight.region ? `(${insight.region})` : ""}
            </span>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/50">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Timeframe:</span>
            <span className="font-semibold text-slate-200">
              {insight.start_year || "Any"} → {insight.end_year || "Ongoing"}
            </span>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/50">
            <Layers className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Source:</span>
            <span className="font-semibold text-slate-200 truncate">{insight.source || "Unknown"}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-[11px] text-slate-500">
            Added on {insight.added ? new Date(insight.added).toLocaleDateString() : "N/A"}
          </span>

          {insight.url && (
            <a
              href={insight.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-md shadow-indigo-600/20"
            >
              <span>View Source Article</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
