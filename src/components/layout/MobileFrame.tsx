import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useMindSpace();

  if (settings.viewMode !== 'mobile_preview') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-6">
      <div className="text-center mb-3">
        <span className="text-xs text-slate-400 font-medium bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
          Mobile Frame Simulation (Cross-Platform Mobile Mode)
        </span>
      </div>

      {/* Simulated Smartphone Bezel */}
      <div className="w-full max-w-[420px] h-[860px] bg-slate-900 border-[8px] border-slate-700/80 rounded-[44px] shadow-2xl shadow-black overflow-hidden flex flex-col relative ring-1 ring-slate-600/30">
        {/* Dynamic Island / Notch */}
        <div className="w-full bg-slate-900 pt-2.5 px-6 pb-2 flex items-center justify-between z-20 shrink-0 border-b border-slate-800/40">
          <span className="text-[12px] font-semibold text-slate-300">09:41</span>
          <div className="w-20 h-4 bg-black rounded-full" />
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Inner Content Scroll Container */}
        <div className="flex-1 overflow-y-auto bg-slate-950 flex flex-col">
          {children}
        </div>

        {/* Home Bar */}
        <div className="w-full bg-slate-900 py-2 flex justify-center shrink-0 border-t border-slate-800/40">
          <div className="w-32 h-1 bg-slate-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
