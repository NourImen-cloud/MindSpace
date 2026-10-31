import React, { useState } from 'react';
import { 
  BarChart2, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  Calculator, 
  Leaf, 
  Landmark, 
  Atom, 
  Brain, 
  ShieldCheck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { ScrollingHeatmap } from './ScrollingHeatmap';
import { MindSpaceAIEngine } from '../../utils/aiEngine';
import { formatMinutes } from '../../utils/formatters';

export const WellbeingDashboard: React.FC = () => {
  const { 
    appLimits, 
    distractions, 
    momentum, 
    tasks, 
    categories 
  } = useMindSpace();

  const [selectedPeriod, setSelectedPeriod] = useState<'this_week' | 'last_week' | 'month'>('this_week');

  // Weekly bar data matching the screenshot (Mon to Sun)
  const weeklyBars = [
    { day: 'Mon', hours: 2.8, color: 'bg-purple-400' },
    { day: 'Tue', hours: 3.5, color: 'bg-purple-600' },
    { day: 'Wed', hours: 2.1, color: 'bg-purple-400' },
    { day: 'Thu', hours: 4.0, color: 'bg-purple-600' },
    { day: 'Fri', hours: 3.1, color: 'bg-purple-400' },
    { day: 'Sat', hours: 1.5, color: 'bg-pink-400' },
    { day: 'Sun', hours: 1.7, color: 'bg-pink-400' },
  ];

  const maxHours = Math.max(...weeklyBars.map(b => b.hours), 4.5);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return Calculator;
      case 'Leaf': return Leaf;
      case 'Landmark': return Landmark;
      case 'Atom': return Atom;
      default: return Sparkles;
    }
  };

  // Subject completion percentages matching the screenshot
  const subjectProgress = [
    { name: 'Mathematics', percent: 75, color: '#8B5CF6', icon: 'Calculator' },
    { name: 'Biology', percent: 60, color: '#10B981', icon: 'Leaf' },
    { name: 'History', percent: 50, color: '#F59E0B', icon: 'Landmark' },
    { name: 'Physics', percent: 40, color: '#6366F1', icon: 'Atom' },
  ];

  const patternInsights = MindSpaceAIEngine.analyzeDistractionPatterns(distractions);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. Progress Header with Period Dropdown (Exact match to screenshot) */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Quicksand',sans-serif]">
          Progress
        </h2>

        {/* Dropdown pill [ This Week ▾ ] */}
        <div className="relative">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-purple-100 text-xs font-bold text-purple-700 shadow-xs hover:bg-purple-50 transition-colors">
            <span>This Week</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Study Time Card with Weekly Mon-Sun Bar Chart (Exact match to screenshot) */}
      <div className="p-5 sm:p-6 rounded-[30px] bg-white border border-purple-100 shadow-[0_8px_30px_rgba(139,92,246,0.04)] space-y-4">
        <div>
          <span className="text-xs font-bold text-slate-400 tracking-wider">
            Study Time
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-['Quicksand',sans-serif] mt-0.5">
            18h 45m
          </div>
        </div>

        {/* Weekly Bar Chart (Mon-Sun) */}
        <div className="pt-2">
          <div className="flex items-end justify-between gap-2 h-32 px-1">
            {weeklyBars.map(bar => {
              const heightPercent = Math.round((bar.hours / maxHours) * 100);
              return (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="text-[10px] font-bold text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.hours}h
                  </div>
                  {/* Bar */}
                  <div
                    className={`w-full max-w-[28px] rounded-full transition-all duration-500 ${bar.color} hover:brightness-110 shadow-xs`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  {/* Day label */}
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-purple-600">
                    {bar.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Two KPI Cards Side-by-Side (Exact match to Tasks Completed: 23 & Focus Sessions: 12) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="p-4 rounded-[24px] bg-white border border-purple-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400">Tasks Completed</div>
            <div className="text-lg font-black text-slate-800">23</div>
          </div>
        </div>

        <div className="p-4 rounded-[24px] bg-white border border-purple-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400">Focus Sessions</div>
            <div className="text-lg font-black text-slate-800">12</div>
          </div>
        </div>
      </div>

      {/* 4. Subjects Section (Exact match to Subjects with progress bars: Math 75%, Bio 60%, History 50%, Physics 40%) */}
      <div className="p-5 sm:p-6 rounded-[30px] bg-white border border-purple-100 shadow-[0_8px_30px_rgba(139,92,246,0.04)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-800 font-['Quicksand',sans-serif]">
            Subjects
          </h3>
          <span className="text-xs font-bold text-purple-600 cursor-pointer hover:underline">
            View All
          </span>
        </div>

        <div className="space-y-3.5">
          {subjectProgress.map(subj => {
            const Icon = getCategoryIcon(subj.icon);
            return (
              <div key={subj.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-7 h-7 rounded-xl flex items-center justify-center text-xs"
                      style={{ backgroundColor: `${subj.color}15`, color: subj.color }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">{subj.name}</span>
                  </div>
                  <span className="text-xs font-black font-mono" style={{ color: subj.color }}>
                    {subj.percent}%
                  </span>
                </div>

                {/* Subject progress bar */}
                <div className="w-full h-2 rounded-full bg-purple-50 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${subj.percent}%`,
                      backgroundColor: subj.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Circadian Anti-Scrolling Heatmap & Intelligent Distraction Insights */}
      <div className="p-5 sm:p-6 rounded-[30px] bg-white border border-purple-100 shadow-[0_8px_30px_rgba(139,92,246,0.04)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-800 font-['Quicksand',sans-serif] flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-600" />
            <span>Circadian Scrolling Heatmap & Awareness</span>
          </h3>
          <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
            AI Pattern Engine
          </span>
        </div>

        <ScrollingHeatmap events={distractions} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {patternInsights.slice(0, 2).map(insight => (
            <div
              key={insight.id}
              className="p-3.5 rounded-2xl bg-[#FAF7FD] border border-purple-100 text-xs space-y-1"
            >
              <div className="font-extrabold text-purple-900">{insight.title}</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">{insight.description}</p>
              <div className="text-[11px] text-purple-700 font-bold pt-0.5">
                💡 {insight.actionableTip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
