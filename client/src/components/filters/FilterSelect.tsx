import React from "react";

interface FilterSelectProps {
  label: string;
  value?: string | number;
  options?: (string | number)[];
  onChange: (value: string) => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value = "",
  options = [],
  onChange,
}) => {
  return (
    <div className="flex-1 min-w-[120px]">
      <label className="block text-[11px] font-medium text-[#666] mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 bg-white border border-[#ddd] rounded-md text-xs text-[#444] focus:outline-none focus:border-[#4355b9] focus:ring-1 focus:ring-[#4355b9]/20 transition cursor-pointer"
      >
        <option value="">
          All {label.toLowerCase()} ({options.length})
        </option>
        {options.map((opt) => (
          <option key={String(opt)} value={String(opt)}>
            {String(opt)}
          </option>
        ))}
      </select>
    </div>
  );
};
