import React, { useEffect, useState } from "react";

interface SplashScreenProps {
  isLoading: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [fade, setFade] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      // Trigger fade-out animation
      setFade(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 700); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#ececf2] flex flex-col items-center justify-center transition-all duration-700 ease-out ${fade ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
        }`}
    >
      {/* Centered Brand Container */}
      <div className="flex flex-col items-center text-center p-8 max-w-sm w-full animate-in fade-in zoom-in duration-500">
        {/* Animated Brand Logo with glowing ring */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-white p-1.5 shadow-xl border border-slate-200/80 flex items-center justify-center relative z-10">
            <img
              src="/blackc.jfif"
              alt="Blackcoffer Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Pulse Ripple Rings */}
          <div className="absolute inset-0 rounded-2xl bg-[#4355b9]/20 animate-ping pointer-events-none -z-0" />
          <div className="absolute -inset-2 rounded-2xl border-2 border-[#4355b9]/30 animate-pulse pointer-events-none" />
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-[#0A0A0A] tracking-tight mb-1">
          Blackcoffer Analytics
        </h1>
        <p className="text-xs text-slate-500 font-medium mb-6">
          Aggregating insights & dataset metrics...
        </p>

        {/* Animated Progress Bar */}
        <div className="w-48 h-1.5 bg-slate-200/80 rounded-full overflow-hidden relative shadow-inner">
          <div className="h-full bg-[#4355b9] rounded-full animate-indeterminate" />
        </div>
      </div>
    </div>
  );
};
