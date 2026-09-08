import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border border-rose-500/30 bg-rose-950/40 text-rose-200 ${className}`}
    >
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-200 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 rounded-lg transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      )}
    </div>
  );
};
