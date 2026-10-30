import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  ShieldAlert, 
  Hourglass, 
  Compass, 
  BarChart3, 
  BookHeart, 
  Settings 
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'tasks', label: 'Activities & Tasks', icon: CheckSquare },
  { id: 'planner', label: 'Daily Planner', icon: Calendar },
  { id: 'antiscroll', label: 'Anti-Scrolling', icon: ShieldAlert, highlight: true },
  { id: 'focus', label: 'Focus & Timer', icon: Hourglass },
  { id: 'alternatives', label: 'Alternatives', icon: Compass },
  { id: 'wellbeing', label: 'Digital Wellbeing', icon: BarChart3 },
  { id: 'reflection', label: 'Weekly Reflection', icon: BookHeart },
  { id: 'settings', label: 'Privacy & Sync', icon: Settings },
];

export const Navigation: React.FC = () => {
  const { currentTab, setCurrentTab } = useMindSpace();

  return (
    <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800/80 p-3 flex flex-col justify-between shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Mindful Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left group ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/25 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'
              }`} />
              <span className="truncate">{item.label}</span>
              {item.highlight && (
                <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
              )}
            </button>
          );
        })}
      </div>

      {/* Gentle Mindfulness Prompt at the bottom of navigation */}
      <div className="hidden md:block mt-6 p-3 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 text-[11px] text-slate-400">
        <div className="font-medium text-slate-300 mb-1 flex items-center gap-1.5">
          <span>🌿 Gentle Reminder</span>
        </div>
        <p className="leading-relaxed">
          Attention is your most finite resource. Be kind to yourself when you wander; the victory is in the return.
        </p>
      </div>
    </aside>
  );
};
