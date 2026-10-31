import React from 'react';
import { 
  Sparkles, 
  Play, 
  RotateCcw, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Calculator, 
  Leaf, 
  Landmark, 
  Atom, 
  BookOpen, 
  Heart,
  Quote,
  Clock
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { CuteCloudMascot, CozyStudyGirlIllustration } from '../common/AestheticAssets';
import { formatMinutes } from '../../utils/formatters';

export const OverviewDashboard: React.FC = () => {
  const { 
    tasks, 
    categories, 
    startFocusSession, 
    momentum, 
    appLimits, 
    triggerDistractionIntercept, 
    alternatives, 
    setCurrentTab,
    settings
  } = useMindSpace();

  const scheduledTasks = tasks.filter(t => t.status === 'scheduled');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const totalTasks = tasks.length || 6;
  const progressRatio = Math.min(100, Math.round((completedTasks.length / Math.max(1, totalTasks)) * 100));

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return Calculator;
      case 'Leaf': return Leaf;
      case 'Landmark': return Landmark;
      case 'Atom': return Atom;
      case 'BookOpen': return BookOpen;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. Header Greeting with Anime Avatar (Exact match to "Hi, Aiko!" in screenshot) */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 font-['Quicksand',sans-serif]">
              Hi, {settings.userName || 'Aiko'}! 🌸
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-purple-600 font-medium">
            Ready to achieve something amazing today?
          </p>
        </div>

        {/* Cute Anime Girl Avatar in Pastel Gradient Ring */}
        <div 
          onClick={() => setCurrentTab('focus')}
          className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-purple-400 via-pink-400 to-indigo-400 cursor-pointer shadow-md shadow-purple-200 hover:scale-105 transition-transform"
          title="Click to enter Focus Sanctuary"
        >
          <div className="w-full h-full rounded-full bg-purple-50 overflow-hidden flex items-center justify-center">
            <CozyStudyGirlIllustration className="w-14 h-14 translate-y-1" />
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
        </div>
      </div>

      {/* 2. Daily Goal Purple Gradient Card (Exact match to the card in reference image) */}
      <div className="relative overflow-hidden p-5 sm:p-6 rounded-[30px] bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-200 space-y-4">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="text-xs font-bold text-purple-200 uppercase tracking-wider block">
              Daily Goal
            </span>
            <div className="text-2xl sm:text-3xl font-black mt-0.5 tracking-tight flex items-baseline gap-1.5">
              <span>{completedTasks.length}</span>
              <span className="text-base text-purple-200 font-medium">/ {totalTasks} Tasks</span>
            </div>
          </div>

          {/* Cute Cloud Mascot Sitting On Top Right */}
          <div className="w-14 h-11 -mt-1 animate-float">
            <CuteCloudMascot className="w-full h-full drop-shadow-md" />
          </div>
        </div>

        {/* Progress Bar with Floating Position */}
        <div className="space-y-1 relative z-10">
          <div className="w-full h-2.5 rounded-full bg-purple-900/40 p-0.5 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-300 to-pink-300 transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${progressRatio}%` }}
            />
          </div>
        </div>

        {/* Inspirational Quote Banner (Exact match to screenshot quote banner) */}
        <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 text-xs text-purple-100 flex items-center gap-2 relative z-10">
          <Quote className="w-4 h-4 text-amber-200 shrink-0 rotate-180" />
          <span className="font-semibold italic">
            "Discipline today, success tomorrow." ✨
          </span>
        </div>
      </div>

      {/* 3. Today's Schedule Card (Exact match to screenshot schedule list) */}
      <div className="p-5 sm:p-6 rounded-[30px] bg-white border border-purple-100 shadow-[0_8px_30px_rgba(139,92,246,0.04)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2 font-['Quicksand',sans-serif]">
            <span>Today's Schedule</span>
            <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
              {scheduledTasks.length} upcoming
            </span>
          </h3>
          <button
            onClick={() => setCurrentTab('planner')}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {scheduledTasks.slice(0, 4).map(task => {
            const cat = categories.find(c => c.id === task.categoryId) || categories[0];
            const Icon = getCategoryIcon(cat.icon);

            return (
              <div
                key={task.id}
                onClick={() => startFocusSession(task, task.estimatedMinutes)}
                className="p-3.5 rounded-2xl bg-[#FAF7FD] hover:bg-purple-50/70 border border-purple-100/70 transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Subject Pastel Square Icon (Matching Screenshot Lilac/Mint/Pink/Indigo squares) */}
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      color: cat.color,
                      border: `1px solid ${cat.color}30`
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-slate-800 group-hover:text-purple-700 transition-colors truncate">
                      {task.title}
                    </div>
                    <div className="text-[11px] text-purple-600/70 font-medium truncate">
                      {cat.name} • {task.description || `${task.estimatedMinutes}m session`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold font-mono text-purple-700 bg-white px-2.5 py-1 rounded-xl border border-purple-100 shadow-xs">
                    {task.scheduledTime || '09:00 AM'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startFocusSession(task, task.estimatedMinutes);
                    }}
                    className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-sm transition-all active:scale-95"
                    title="Start Focus Timer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Anti-Scrolling Shield & Gentle Return Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Anti-Scrolling Shield */}
        <div 
          onClick={() => setCurrentTab('antiscroll')}
          className="p-5 rounded-[28px] bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerDistractionIntercept('Instagram');
              }}
              className="text-[11px] font-bold text-pink-700 bg-white px-2.5 py-1 rounded-xl border border-pink-200 shadow-xs hover:bg-pink-100 transition-colors"
            >
              Test Intercept 🌸
            </button>
          </div>

          <div>
            <h4 className="text-sm font-extrabold text-slate-800 group-hover:text-pink-700 transition-colors">
              Anti-Scrolling Sanctuary
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Intentional pauses before feeds steal your calm.
            </p>
          </div>

          <div className="text-[11px] font-bold text-pink-700 bg-white/80 px-2.5 py-1 rounded-xl border border-pink-100 flex items-center justify-between">
            <span>Reclaimed Time Today:</span>
            <span className="font-mono text-purple-700">+{formatMinutes(momentum.screenTimeSavedMinutes)}</span>
          </div>
        </div>

        {/* Study Streak & Return Momentum */}
        <div 
          onClick={() => setCurrentTab('wellbeing')}
          className="p-5 rounded-[28px] bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <RotateCcw className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-purple-700 bg-white px-2.5 py-1 rounded-xl border border-purple-100 shadow-xs">
              {momentum.currentMomentumScore}% Momentum
            </span>
          </div>

          <div>
            <h4 className="text-sm font-extrabold text-slate-800 group-hover:text-purple-700 transition-colors">
              Return Momentum
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              {momentum.totalReturns} gentle redirections back to presence without guilt.
            </p>
          </div>

          <div className="text-[11px] font-bold text-purple-700 bg-white/80 px-2.5 py-1 rounded-xl border border-purple-100 flex items-center justify-between">
            <span>Study Streak:</span>
            <span className="text-indigo-700 font-extrabold">{momentum.studyStreakDays || 12} Days 🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};
