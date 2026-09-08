import React from "react";

interface LoadingSkeletonProps {
  height?: string;
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  height = "h-48",
  count = 1,
  className = "",
}) => {
  return (
    <div className={`space-y-3 animate-pulse ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`w-full bg-slate-800/60 rounded-xl ${height} border border-slate-700/30`}
        />
      ))}
    </div>
  );
};
