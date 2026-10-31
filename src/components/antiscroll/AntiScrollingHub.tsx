import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Sliders, 
  Zap, 
  Activity, 
  Sparkles,
  Camera,
  PlaySquare,
  MessageCircle,
  Share2,
  Newspaper,
  Heart
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
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Quicksand',sans-serif] flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-pink-500" />
            <span>Anti-Scrolling Sanctuary</span>
          </h2>
          <p className="text-xs text-purple-600/80 font-medium">
            Gentle friction and mindful pause before infinite feeds steal your study flow.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-white border border-purple-100 rounded-2xl text-xs shadow-xs">
          <button
            onClick={() => setActiveTab('limits')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'limits' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-500 hover:text-purple-600'
            }`}
          >
            App Limits
          </button>
          <button
            onClick={() => setActiveTab('monitor')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'monitor' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-500 hover:text-purple-600'
            }`}
          >
            Live Monitor
          </button>
          <button
            onClick={() => setActiveTab('testbed')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'testbed' ? 'bg-pink-100 text-pink-700 font-extrabold border border-pink-200' : 'text-slate-500 hover:text-pink-600'
            }`}
          >
            Distraction Simulator 🌸
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-[24px] bg-white border border-purple-100 shadow-xs space-y-1">
          <span className="text-[11px] text-slate-400 font-bold">Reclaimed Screen Time</span>
          <div className="text-2xl font-black text-purple-600">
            {formatMinutes(momentum.screenTimeSavedMinutes)}
          </div>
          <p className="text-[10px] text-purple-500/80 font-medium">Saved by gentle pauses today</p>
        </div>

        <div className="p-4 rounded-[24px] bg-white border border-purple-100 shadow-xs space-y-1">
          <span className="text-[11px] text-slate-400 font-bold">Mindful Redirections</span>
          <div className="text-2xl font-black text-teal-600">
            {momentum.totalReturns}
          </div>
          <p className="text-[10px] text-teal-500/80 font-medium">Conscious returns to study</p>
        </div>

        <div className="p-4 rounded-[24px] bg-white border border-purple-100 shadow-xs space-y-1">
          <span className="text-[11px] text-slate-400 font-bold">Monitored Social Time</span>
          <div className="text-2xl font-black text-pink-600">
            {formatMinutes(totalTrackedScreenTime)}
          </div>
          <p className="text-[10px] text-pink-500/80 font-medium">Across 5 distracting apps</p>
        </div>
      </div>

      {/* TAB 1: LIMITS */}
      {activeTab === 'limits' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-600" />
              <span>Configured Daily Limits & Habits</span>
            </h3>
            <span className="text-xs text-purple-600 font-bold">Adjust limits with kindness</span>
          </div>

          <div className="space-y-2.5">
            {appLimits.map(limit => {
              const Icon = getAppIcon(limit.icon);
              const percentage = Math.min(100, Math.round((limit.todayUsedMinutes / limit.dailyLimitMinutes) * 100));
              const isOver = limit.todayUsedMinutes >= limit.dailyLimitMinutes;

              return (
                <div
                  key={limit.id}
                  className="p-4 rounded-[24px] bg-white border border-purple-100/90 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-800">{limit.appName}</div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {limit.todayUsedMinutes}m used of {limit.dailyLimitMinutes}m budget
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateAppLimit(limit.id, { strictLock: !limit.strictLock })}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-colors border ${
                          limit.strictLock
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-purple-50 text-purple-700 border-purple-100'
                        }`}
                      >
                        {limit.strictLock ? <Lock className="w-3 h-3 text-rose-500" /> : <Unlock className="w-3 h-3" />}
                        <span>{limit.strictLock ? 'Strict Block' : 'Gentle Pause'}</span>
                      </button>

                      <button
                        onClick={() => triggerDistractionIntercept(limit.appName)}
                        className="px-2.5 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 text-[11px] font-bold text-purple-700 transition-colors"
                      >
                        Test Intercept
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="w-full h-2 rounded-full bg-purple-50 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isOver ? 'bg-rose-500' : percentage > 75 ? 'bg-amber-400' : 'bg-purple-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>{percentage}% of daily allowance</span>
                      <span>{Math.max(0, limit.dailyLimitMinutes - limit.todayUsedMinutes)}m remaining</span>
                    </div>
                  </div>

                  {/* Limit Slider */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[11px] text-slate-500 font-bold shrink-0">Daily Allowance:</span>
                    <input
                      type="range"
                      min={5}
                      max={90}
                      step={5}
                      value={limit.dailyLimitMinutes}
                      onChange={e => updateAppLimit(limit.id, { dailyLimitMinutes: Number(e.target.value) })}
                      className="flex-1 accent-purple-600 cursor-pointer"
                    />
                    <span className="text-xs font-mono font-black text-purple-700 w-10 text-right">
                      {limit.dailyLimitMinutes}m
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE MONITOR */}
      {activeTab === 'monitor' && (
        <div className="space-y-3.5">
          <div className="p-5 rounded-[26px] bg-white border border-purple-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                <Activity className="w-4 h-4 text-purple-600 animate-pulse" />
                <span>Desktop Browser Extension & Companion Feed</span>
              </div>
              <span className="text-[11px] text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full font-bold">
                Local-First Private
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              MindSpace monitors open tabs locally. No browsing history or URLs ever leave this device.
            </p>
          </div>

          <div className="space-y-2">
            {distractions.map(event => (
              <div
                key={event.id}
                className="p-3.5 rounded-2xl bg-white border border-purple-100 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-800">{event.appName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({event.urlOrTitle})</span>
                    {event.reason && (
                      <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-bold capitalize">
                        {event.reason.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Intercepted gently
                  </div>
                </div>

                <div className="flex items-center gap-1 text-teal-600 text-[11px] font-bold bg-teal-50 px-2.5 py-1 rounded-xl">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Redirected</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DISTRACTION SIMULATOR */}
      {activeTab === 'testbed' && (
        <div className="p-6 rounded-[30px] bg-white border border-purple-100 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-800 font-['Quicksand',sans-serif] flex items-center gap-2">
              <Zap className="w-4 h-4 text-pink-500" />
              <span>Interactive Distraction Interceptor Simulator</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Test how MINDSPACE steps between you and automatic digital reflexes. Click any app below to trigger the 3-stage Intentional Pause:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { name: 'Instagram', icon: Camera, color: 'hover:border-pink-300 hover:bg-pink-50' },
              { name: 'TikTok / Shorts', icon: PlaySquare, color: 'hover:border-rose-300 hover:bg-rose-50' },
              { name: 'Reddit', icon: MessageCircle, color: 'hover:border-orange-300 hover:bg-orange-50' },
              { name: 'X (Twitter)', icon: Share2, color: 'hover:border-sky-300 hover:bg-sky-50' },
            ].map(app => {
              const Icon = app.icon;
              return (
                <button
                  key={app.name}
                  onClick={() => triggerDistractionIntercept(app.name)}
                  className={`p-4 rounded-2xl bg-[#FAF7FD] border border-purple-100/90 transition-all flex flex-col items-center justify-center gap-2 text-slate-800 group active:scale-95 ${app.color}`}
                >
                  <Icon className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black">{app.name}</span>
                  <span className="text-[10px] text-purple-600 font-bold">Trigger Pause 🌸</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
