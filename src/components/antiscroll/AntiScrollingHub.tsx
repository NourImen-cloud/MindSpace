import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Smartphone, 
  Lock, 
  Unlock, 
  Sliders, 
  Play, 
  Zap, 
  Activity, 
  Clock, 
  Sparkles,
  Camera,
  PlaySquare,
  MessageCircle,
  Share2,
  Newspaper
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { formatMinutes } from '../../utils/formatters';

export const AntiScrollingHub: React.FC = () => {
  const { 
    appLimits, 
    updateAppLimit, 
    triggerDistractionIntercept, 
    distractions, 
    momentum 
  } = useMindSpace();

  const [activeTab, setActiveTab] = useState<'limits' | 'monitor' | 'testbed'>('limits');

  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return Camera;
      case 'PlaySquare': return PlaySquare;
      case 'MessageCircle': return MessageCircle;
      case 'Share2': return Share2;
      default: return Newspaper;
    }
  };

  const totalTrackedScreenTime = appLimits.reduce((acc, l) => acc + l.todayUsedMinutes, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>Anti-Scrolling System</span>
          </h2>
          <p className="text-xs text-slate-400">
            Gentle friction and mindful pause before mindless feeds hijack your attention.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl text-xs">
          <button
            onClick={() => setActiveTab('limits')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'limits' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            App Limits
          </button>
          <button
            onClick={() => setActiveTab('monitor')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'monitor' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Monitor
          </button>
          <button
            onClick={() => setActiveTab('testbed')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'testbed' ? 'bg-emerald-600/30 text-emerald-300 font-semibold border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Distraction Simulator
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Reclaimed Screen Time</span>
          <div className="text-2xl font-bold text-emerald-400">
            {formatMinutes(momentum.screenTimeSavedMinutes)}
          </div>
          <p className="text-[10px] text-slate-400">Saved by gentle pauses today</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Mindful Redirections</span>
          <div className="text-2xl font-bold text-teal-400">
            {momentum.totalReturns}
          </div>
          <p className="text-[10px] text-slate-400">Conscious returns to what matters</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Monitored Social Time</span>
          <div className="text-2xl font-bold text-indigo-400">
            {formatMinutes(totalTrackedScreenTime)}
          </div>
          <p className="text-[10px] text-slate-400">Across 5 distracting applications</p>
        </div>
      </div>

      {/* TAB 1: CUSTOMIZABLE APP & WEBSITE LIMITS (Features 9 & 10) */}
      {activeTab === 'limits' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Configured Daily Limits & Blocking Rules</span>
            </h3>
            <span className="text-xs text-slate-400">Adjust limits without shame</span>
          </div>

          <div className="space-y-3">
            {appLimits.map(limit => {
              const Icon = getAppIcon(limit.icon);
              const percentage = Math.min(100, Math.round((limit.todayUsedMinutes / limit.dailyLimitMinutes) * 100));
              const isOver = limit.todayUsedMinutes >= limit.dailyLimitMinutes;

              return (
                <div
                  key={limit.id}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-100">{limit.appName}</div>
                        <div className="text-[11px] text-slate-400">
                          {limit.todayUsedMinutes}m used of {limit.dailyLimitMinutes}m daily budget
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Strict Lock Toggle */}
                      <button
                        onClick={() => updateAppLimit(limit.id, { strictLock: !limit.strictLock })}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium transition-colors border ${
                          limit.strictLock
                            ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                        }`}
                        title={limit.strictLock ? 'Strict Lock Enabled (Hard cooldown)' : 'Gentle Pause Enabled (Permits intentional override)'}
                      >
                        {limit.strictLock ? <Lock className="w-3 h-3 text-rose-400" /> : <Unlock className="w-3 h-3" />}
                        <span>{limit.strictLock ? 'Strict Block' : 'Gentle Pause'}</span>
                      </button>

                      {/* Simulator Trigger */}
                      <button
                        onClick={() => triggerDistractionIntercept(limit.appName)}
                        className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
                      >
                        Test Intercept
                      </button>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isOver ? 'bg-rose-500' : percentage > 75 ? 'bg-amber-400' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{percentage}% of daily allowance</span>
                      <span>{Math.max(0, limit.dailyLimitMinutes - limit.todayUsedMinutes)}m remaining</span>
                    </div>
                  </div>

                  {/* Daily Limit Slider */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[11px] text-slate-400 shrink-0">Daily Allowance:</span>
                    <input
                      type="range"
                      min={5}
                      max={90}
                      step={5}
                      value={limit.dailyLimitMinutes}
                      onChange={e => updateAppLimit(limit.id, { dailyLimitMinutes: Number(e.target.value) })}
                      className="flex-1 accent-emerald-500 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-emerald-400 font-semibold w-10 text-right">
                      {limit.dailyLimitMinutes}m
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE MONITOR STREAM (Feature 5) */}
      {activeTab === 'monitor' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Activity className="w-4 h-4 text-teal-400 animate-pulse" />
                <span>Desktop Browser Extension & Companion Feed</span>
              </div>
              <span className="text-[11px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 font-mono">
                Tracking: Active (Local Only)
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              MindSpace monitors open browser tabs and mobile foreground activity locally on this device. No browsing data or URLs ever leave your machine.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Recent Interceptions & Awareness Events
            </h4>

            {distractions.slice(0, 6).map(event => (
              <div
                key={event.id}
                className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{event.appName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({event.urlOrTitle})</span>
                    {event.reason && (
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 capitalize">
                        Reason: {event.reason.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Intercepted successfully
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Redirected</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DISTRACTION SIMULATOR TESTBED */}
      {activeTab === 'testbed' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Interactive Distraction Interceptor Simulator</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Test how MINDSPACE steps between you and automatic digital reflexes. Click any app below to trigger the 3-stage Intentional Pause:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { name: 'Instagram', icon: Camera, color: 'hover:border-pink-500/50 hover:bg-pink-500/10' },
              { name: 'TikTok / Shorts', icon: PlaySquare, color: 'hover:border-rose-500/50 hover:bg-rose-500/10' },
              { name: 'Reddit', icon: MessageCircle, color: 'hover:border-orange-500/50 hover:bg-orange-500/10' },
              { name: 'X (Twitter)', icon: Share2, color: 'hover:border-sky-500/50 hover:bg-sky-500/10' },
            ].map(app => {
              const Icon = app.icon;
              return (
                <button
                  key={app.name}
                  onClick={() => triggerDistractionIntercept(app.name)}
                  className={`p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 transition-all flex flex-col items-center justify-center gap-2 text-slate-200 group active:scale-95 ${app.color}`}
                >
                  <Icon className="w-6 h-6 text-slate-400 group-hover:scale-110 group-hover:text-white transition-all" />
                  <span className="text-xs font-semibold">{app.name}</span>
                  <span className="text-[10px] text-slate-400">Trigger Intercept</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
