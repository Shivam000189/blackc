import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { YearInsightCount } from "../../types";
import { ChartCard } from "./ChartCard";

interface YearTrendChartProps {
  data?: YearInsightCount[];
  loading?: boolean;
  error?: string | null;
}

export const YearTrendChart: React.FC<YearTrendChartProps> = ({
  data,
  loading = false,
  error = null,
}) => {
  const chartData = data || [];
  const empty = !loading && !error && chartData.length === 0;

  return (
    <ChartCard
      title="Insight Trends"
      loading={loading}
      error={error}
      empty={empty}
      heightClass="h-[150px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="yearGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4355b9" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#4355b9" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f5" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#999" }} tickLine={false} axisLine={{ stroke: "#eaeaf0" }} />
          <YAxis tick={{ fontSize: 9, fill: "#999" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 6,
              border: "1px solid #e2e8f0",
              fontSize: 11,
              backgroundColor: "#ffffff",
              color: "#0A0A0A",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              padding: "4px 8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#4355b9"
            strokeWidth={2}
            fill="url(#yearGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
