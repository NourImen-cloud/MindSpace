import React from 'react';
import { 
  Wifi, 
  BatteryMedium, 
  Signal, 
  Home, 
  Calendar, 
  Plus, 
  Clock, 
  BarChart2, 
  ShieldAlert 
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, currentTab, setCurrentTab } = useMindSpace();

  if (settings.viewMode !== 'mobile_preview') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex flex-col items-center justify-center p-2 sm:p-6 py-6">
      <div className="text-center mb-3">
        <span className="text-xs text-purple-700 font-extrabold bg-white/80 px-4 py-1.5 rounded-full border border-purple-200 shadow-sm flex items-center gap-2">
          <span>Mobile Phone View — Study Companion</span>
        </span>
      </div>

      {/* Sleek Smartphone Mockup Bezel (Matches the Phone Mockups in the Reference Screenshot) */}
      <div className="w-full max-w-[400px] h-[830px] bg-white border-[9px] border-slate-800 rounded-[50px] shadow-[0_25px_60px_-15px_rgba(139,92,246,0.35)] overflow-hidden flex flex-col relative ring-4 ring-purple-300/40">
        {/* Dynamic Island / Top Phone Notch */}
        <div className="w-full bg-[#FAF7FD] pt-3 px-6 pb-2 flex items-center justify-between z-20 shrink-0 border-b border-purple-100/60">
          <span className="text-[12px] font-bold text-slate-700">9:41</span>
          <div className="w-24 h-4 bg-slate-900 rounded-full" />
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable Phone Inner Screen */}
        <div className="flex-1 overflow-y-auto bg-[#FAF7FD] p-3 pb-24 text-slate-800">
          {children}
        </div>

        {/* Floating Curved Bottom Navigation Dock (Exact match to the 5 tabs in the reference screenshot) */}
        <div className="absolute bottom-2 left-0 right-0 px-4 z-30 pointer-events-none">
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[28px] border border-purple-100/90 shadow-[0_10px_30px_rgba(139,92,246,0.18)] px-4 py-2 flex items-center justify-between">
            {/* Home */}
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
                currentTab === 'dashboard' ? 'text-purple-600' : 'text-slate-400 hover:text-purple-500'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>

            {/* Planner */}
            <button
              onClick={() => setCurrentTab('planner')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
                currentTab === 'planner' ? 'text-purple-600' : 'text-slate-400 hover:text-purple-500'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Planner</span>
            </button>

            {/* Center (+) Floating Action Button */}
            <button
              onClick={() => setCurrentTab('tasks')}
              className="w-12 h-12 -mt-5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-400 flex items-center justify-center transition-transform active:scale-90"
              title="Add Task / View Subjects"
            >
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Focus Timer */}
            <button
              onClick={() => setCurrentTab('focus')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
                currentTab === 'focus' ? 'text-purple-600' : 'text-slate-400 hover:text-purple-500'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span>Focus</span>
            </button>

            {/* Progress / Stats */}
            <button
              onClick={() => setCurrentTab('wellbeing')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
                currentTab === 'wellbeing' ? 'text-purple-600' : 'text-slate-400 hover:text-purple-500'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
