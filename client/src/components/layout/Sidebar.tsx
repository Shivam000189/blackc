import React, { useState } from "react";
import { BarChart2, Table2 } from "lucide-react";

interface SidebarProps {
  activePage: "charts" | "table";
  onPageChange: (page: "charts" | "table") => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-[#b5c7f8] flex flex-col py-5 shrink-0 select-none border-r border-[#a4baf5]/60 h-screen sticky top-0 z-30 transition-all duration-300 ease-in-out ${
        isHovered
          ? "w-64 px-4 shadow-2xl shadow-[#394998]/15"
          : "w-14 px-2 shadow-none"
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-5 w-full">
        {/* Brand Header */}
        <div
          className={`flex items-center gap-3 cursor-pointer overflow-hidden transition-all duration-200 ${
            isHovered ? "px-1 justify-start" : "justify-center"
          }`}
          onClick={() => onPageChange("charts")}
          title="Blackcoffer Analytics"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0 bg-white shadow-sm p-0.5 hover:scale-105 transition-transform">
            <img
              src="/blackc.jfif"
              alt="Blackcoffer Logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div
            className={`flex flex-col transition-all duration-300 overflow-hidden whitespace-nowrap ${
              isHovered
                ? "opacity-100 max-w-[180px] translate-x-0"
                : "opacity-0 max-w-0 -translate-x-2 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#1e295f] text-sm leading-tight tracking-tight">
                Blackcoffer
              </span>
              <span className="px-1.5 py-0.2 bg-[#4355b9] text-white text-[9px] font-bold rounded-full uppercase tracking-wider">
                Pro
              </span>
            </div>
            <span className="text-[10px] text-[#394998]/80 font-medium">
              Analytics & Insights
            </span>
          </div>
        </div>

        {/* Navigation Category Label (when expanded) */}
        <div
          className={`text-[10px] font-bold uppercase tracking-wider text-[#394998]/70 px-1.5 overflow-hidden whitespace-nowrap transition-all duration-300 ${
            isHovered ? "opacity-100 max-h-5" : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          Views & Modules
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 w-full">
          {/* Nav 1: Graphs & Charts View */}
          <button
            type="button"
            onClick={() => onPageChange("charts")}
            title="Graphs & Charts View"
            className={`w-full rounded-xl flex items-center transition-all duration-200 cursor-pointer overflow-hidden ${
              isHovered ? "px-3 py-2.5 gap-3 justify-start" : "p-2 justify-center"
            } ${
              activePage === "charts"
                ? "bg-[#4355b9] text-white shadow-md shadow-[#4355b9]/25 font-semibold"
                : "text-[#28387e] hover:bg-white/50 hover:text-[#182870] font-medium"
            }`}
          >
            <div
              className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                activePage === "charts" ? "bg-white/20" : "bg-[#a4baf5]/50 text-[#28387e]"
              }`}
            >
              <BarChart2 className="w-4 h-4" />
            </div>

            <div
              className={`flex flex-col text-left transition-all duration-300 overflow-hidden whitespace-nowrap ${
                isHovered
                  ? "opacity-100 max-w-[170px] translate-x-0"
                  : "opacity-0 max-w-0 -translate-x-2 pointer-events-none"
              }`}
            >
              <span className="text-xs leading-tight">Analytics View</span>
              <span
                className={`text-[10px] leading-tight mt-0.5 ${
                  activePage === "charts" ? "text-white/80" : "text-[#4355b9]/80"
                }`}
              >
                Graphs & metrics
              </span>
            </div>
          </button>

          {/* Nav 2: Raw Insight Records Table View */}
          <button
            type="button"
            onClick={() => onPageChange("table")}
            title="Raw Insight Records View"
            className={`w-full rounded-xl flex items-center transition-all duration-200 cursor-pointer overflow-hidden ${
              isHovered ? "px-3 py-2.5 gap-3 justify-start" : "p-2 justify-center"
            } ${
              activePage === "table"
                ? "bg-[#4355b9] text-white shadow-md shadow-[#4355b9]/25 font-semibold"
                : "text-[#28387e] hover:bg-white/50 hover:text-[#182870] font-medium"
            }`}
          >
            <div
              className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                activePage === "table" ? "bg-white/20" : "bg-[#a4baf5]/50 text-[#28387e]"
              }`}
            >
              <Table2 className="w-4 h-4" />
            </div>

            <div
              className={`flex flex-col text-left transition-all duration-300 overflow-hidden whitespace-nowrap ${
                isHovered
                  ? "opacity-100 max-w-[170px] translate-x-0"
                  : "opacity-0 max-w-0 -translate-x-2 pointer-events-none"
              }`}
            >
              <span className="text-xs leading-tight">Raw Insights</span>
              <span
                className={`text-[10px] leading-tight mt-0.5 ${
                  activePage === "table" ? "text-white/80" : "text-[#4355b9]/80"
                }`}
              >
                Data table & records
              </span>
            </div>
          </button>
        </nav>
      </div>
    </aside>
  );
};


