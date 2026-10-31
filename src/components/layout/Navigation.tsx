import React from 'react';
import { 
  Home, 
  Calendar, 
  Plus, 
  Clock, 
  BarChart2, 
  ShieldAlert, 
  Compass, 
  BookHeart, 
  Settings,
  Sparkles,
  Heart
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { CuteKittenMascot } from '../common/AestheticAssets';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'planner', label: 'Planner', icon: Calendar },
  { id: 'tasks', label: 'Tasks & Subjects', icon: Plus, isAction: true },
  { id: 'focus', label: 'Focus Timer', icon: Clock },
  { id: 'wellbeing', label: 'Progress & Stats', icon: BarChart2 },
  { id: 'antiscroll', label: 'Anti-Scrolling', icon: ShieldAlert, highlight: true },
  { id: 'alternatives', label: 'Alternatives', icon: Compass },
  { id: 'reflection', label: 'Reflection', icon: BookHeart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Navigation: React.FC = () => {
  const { currentTab, setCurrentTab } = useMindSpace();

  return (
    <aside className="w-full md:w-64 bg-white/70 backdrop-blur-md border-r border-purple-100 p-3.5 flex flex-col justify-between shrink-0 shadow-[4px_0_24px_rgba(139,92,246,0.02)]">
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-extrabold tracking-wider text-purple-400 uppercase flex items-center justify-between">
          <span>Navigation</span>
          <Sparkles className="w-3 h-3 text-purple-400" />
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-200'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/70'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-purple-100/60 text-purple-600 group-hover:bg-purple-200/60'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              <span className="truncate">{item.label}</span>

              {item.highlight && (
                <span className="ml-auto text-[9px] font-extrabold uppercase bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full border border-pink-200">
                  Shield
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Cute Kitten Study Mascot Card at bottom of sidebar (matching screenshot sticker!) */}
      <div className="hidden md:flex flex-col items-center text-center mt-6 p-4 rounded-3xl bg-gradient-to-b from-purple-50 to-pink-50/50 border border-purple-100 shadow-sm relative overflow-hidden">
        <CuteKittenMascot className="w-14 h-14" />
        <div className="mt-2 text-xs font-bold text-purple-900 flex items-center gap-1">
          <span>Aiko's Note</span>
          <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
        </div>
        <p className="text-[11px] text-purple-700/80 mt-1 leading-snug font-medium italic">
          "Small steps every day lead to big results! 🐾"
        </p>
      </div>
    </aside>
  );
};
