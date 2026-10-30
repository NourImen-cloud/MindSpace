import React from 'react';
import { 
  BarChart3, 
  Clock, 
  RotateCcw, 
  ShieldCheck, 
  Flame, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2,
  TrendingUp,
  Brain
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { formatMinutes } from '../../utils/formatters';
import { ScrollingHeatmap } from './ScrollingHeatmap';
import { MindSpaceAIEngine } from '../../utils/aiEngine';

export const WellbeingDashboard: React.FC = () => {
  const { 
    appLimits, 
    distractions, 
    momentum, 
    tasks 
  } = useMindSpace();

  const totalAppMinutes = appLimits.reduce((acc, l) => acc + l.todayUsedMinutes, 0);
  const totalFocusMinutes = tasks
    .filter(t => t.status === 'completed')
    .reduce((acc, t) => acc + (t.actualMinutes || t.estimatedMinutes), 0);

  // Compute AI Pattern Insights
  const patternInsights = MindSpaceAIEngine.analyzeDistractionPatterns(distractions);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-teal-400" />
          <span>Digital Wellbeing & Attention Analytics</span>
        </h2>
        <p className="text-xs text-slate-400">
          Observe your digital rhythms with curiosity, not criticism.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Focus Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            {formatMinutes(totalFocusMinutes || 75)}
          </div>
          <p className="text-[11px] text-slate-400">Deep intentional work today</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Time Reclaimed</span>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-teal-400">
            {formatMinutes(momentum.screenTimeSavedMinutes)}
          </div>
          <p className="text-[11px] text-slate-400">Spared from infinite scrolling</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Return Momentum</span>
            <RotateCcw className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-400">
            {momentum.currentMomentumScore}%
          </div>
          <p className="text-[11px] text-slate-400">{momentum.totalReturns} mindful returns</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Social Screen Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">
            {formatMinutes(totalAppMinutes)}
          </div>
          <p className="text-[11px] text-slate-400">Across monitored feeds</p>
        </div>
      </div>

      {/* Middle Section: Scrolling Heatmap & App Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heatmap */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-rose-400" />
            <span>Circadian Scrolling Pattern Heatmap</span>
          </h3>
          <p className="text-xs text-slate-400">
            Reveals recurring times when fatigue lowers your mental resistance.
          </p>
          <ScrollingHeatmap events={distractions} />
        </div>

        {/* Monitored App Distribution */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Application Usage vs Configured Limits</span>
          </h3>

          <div className="space-y-3 pt-1">
            {appLimits.map(app => {
              const pct = Math.min(100, Math.round((app.todayUsedMinutes / app.dailyLimitMinutes) * 100));
              return (
                <div key={app.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">{app.appName}</span>
                    <span className="font-mono text-slate-400">
                      {app.todayUsedMinutes}m / {app.dailyLimitMinutes}m ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        pct >= 100 ? 'bg-rose-500' : pct > 75 ? 'bg-amber-400' : 'bg-teal-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: AI Intelligent Distraction Pattern Analysis (Feature 24) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Brain className="w-4 h-4 text-teal-400" />
            <span>Intelligent Distraction Pattern Insights</span>
          </h3>
          <span className="text-[10px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 font-mono">
            AI Heuristics Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {patternInsights.map(insight => (
            <div
              key={insight.id}
              className={`p-4 rounded-2xl border space-y-2 text-xs ${
                insight.severity === 'high'
                  ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                  : insight.severity === 'medium'
                  ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                  : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100">{insight.title}</span>
                <span className="text-[10px] uppercase font-mono tracking-wider opacity-75">
                  {insight.severity} priority
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{insight.description}</p>
              <div className="pt-1 text-[11px] text-teal-300 font-medium">
                💡 <span className="underline">Gentle Suggestion:</span> {insight.actionableTip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
