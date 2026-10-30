import React from 'react';
import { 
  Sparkles, 
  Play, 
  RotateCcw, 
  Clock, 
  Calendar, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Wind,
  Coffee,
  Brain
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { getGreeting, formatMinutes } from '../../utils/formatters';

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

  const greeting = getGreeting();
  const scheduledTasks = tasks.filter(t => t.status === 'scheduled');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const topAnchorTask = scheduledTasks[0] || tasks[0];

  const totalScreenTime = appLimits.reduce((acc, l) => acc + l.todayUsedMinutes, 0);

  return (
    <div className="space-y-6">
      {/* Hero Welcome & Mindfulness Status */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                🌿 Mindful Attention
              </span>
              <span className="text-xs text-slate-400">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              {greeting}, {settings.userName || 'Thinker'}.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Your attention is not a race. You have completed{' '}
              <strong className="text-emerald-400">{completedTasks.length} tasks</strong> today with{' '}
              <strong className="text-teal-400">{momentum.totalReturns} gentle returns</strong> to presence.
            </p>
          </div>

          {/* Quick Anchor Focus Card */}
          {topAnchorTask && (
            <div className="w-full sm:w-auto p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg flex flex-col gap-2 shrink-0 max-w-xs">
              <span className="text-[10px] uppercase font-semibold text-teal-400 tracking-wider">
                Current Anchor Task
              </span>
              <div className="text-xs font-bold text-slate-100 truncate">
                {topAnchorTask.title}
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400">
                  {topAnchorTask.estimatedMinutes} min estimated
                </span>
                <button
                  onClick={() => startFocusSession(topAnchorTask, topAnchorTask.estimatedMinutes)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Begin Flow</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3 Core Highlight Pillars: Return Momentum | Anti-Scroll Shield | Daily Planner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Return Momentum */}
        <div 
          onClick={() => setCurrentTab('wellbeing')}
          className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <RotateCcw className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span>{momentum.currentMomentumScore}%</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
              Return Momentum
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {momentum.totalReturns} moments of digital temptation redirected without self-blame.
            </p>
          </div>

          <div className="text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2 py-1 rounded-xl border border-teal-500/20">
            +{formatMinutes(momentum.screenTimeSavedMinutes)} Reclaimed Time
          </div>
        </div>

        {/* Pillar 2: Anti-Scrolling Interceptor */}
        <div 
          onClick={() => setCurrentTab('antiscroll')}
          className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerDistractionIntercept('Instagram');
              }}
              className="text-[10px] font-semibold text-rose-300 bg-rose-500/20 hover:bg-rose-500/30 px-2 py-1 rounded-xl border border-rose-500/30 transition-colors"
            >
              Simulate Intercept
            </button>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-rose-300 transition-colors">
              Anti-Scrolling Protection
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Active monitoring across 5 distracting apps. Intentional Pause ready.
            </p>
          </div>

          <div className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-xl border border-indigo-500/20">
            {formatMinutes(totalScreenTime)} Social Screen Time Today
          </div>
        </div>

        {/* Pillar 3: Daily Timeline Planner */}
        <div 
          onClick={() => setCurrentTab('planner')}
          className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/15 text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-teal-400 flex items-center gap-1">
              <span>{scheduledTasks.length} queued</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-teal-300 transition-colors">
              Smart Daily Planner
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Structured into balanced time slots with built-in buffer resets.
            </p>
          </div>

          <div className="text-[11px] font-mono text-slate-300 bg-slate-800/80 px-2 py-1 rounded-xl border border-slate-700/60">
            Next: {topAnchorTask ? topAnchorTask.scheduledTime || '09:30' : 'Free band'}
          </div>
        </div>
      </div>

      {/* Recommended Alternatives to Mindless Scrolling (Feature 17) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Feeling the urge to scroll right now?
            </h3>
          </div>
          <button
            onClick={() => setCurrentTab('alternatives')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            <span>Explore all 7 alternatives</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {alternatives.slice(0, 3).map(alt => (
            <div
              key={alt.id}
              className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center justify-between text-indigo-300 font-semibold mb-1">
                  <span>{alt.title}</span>
                  <span className="text-[10px] text-teal-400 font-mono">{alt.durationMinutes}m</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{alt.description}</p>
              </div>

              <button
                onClick={() => startFocusSession({
                  id: alt.id,
                  title: alt.title,
                  categoryId: 'cat-hobbies',
                  priority: 'P3',
                  estimatedMinutes: alt.durationMinutes,
                  status: 'scheduled',
                  createdAt: new Date().toISOString()
                }, alt.durationMinutes)}
                className="w-full py-1.5 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current text-emerald-400" />
                <span>Take this Break</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
