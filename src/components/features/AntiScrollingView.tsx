import React from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Zap, 
  Activity, 
  Clock, 
  Sparkles,
  Camera,
  PlaySquare,
  MessageCircle,
  Share2,
  Newspaper,
  CheckCircle2
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { formatMinutes } from '../../utils/formatters';
import { ClayShield } from '../reference/ClayIcons';

export const AntiScrollingView: React.FC = () => {
  const { 
    appLimits, 
    updateAppLimit, 
    triggerDistractionIntercept, 
    distractions, 
    momentum 
  } = useMindSpace();

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
      {/* Signature Banner */}
      <div className="p-6 rounded-[30px] bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-pink-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-lg">
          <div className="flex items-center gap-2">
            <ClayShield className="w-8 h-8" />
            <span className="text-xs font-black uppercase tracking-widest text-pink-100 bg-white/20 px-3 py-0.5 rounded-full">
              Signature Core Feature
            </span>
          </div>
          <h2 className="text-2xl font-black font-['Quicksand',sans-serif]">
            Intelligent Anti-Scrolling System
          </h2>
          <p className="text-xs text-pink-100 font-medium leading-relaxed">
            MINDSPACE detects when your fingers reach for distracting apps and gently introduces an intentional breathing pause to restore conscious choice.
          </p>
        </div>

        <button
          onClick={() => triggerDistractionIntercept('Instagram')}
          className="px-5 py-3 rounded-full bg-white text-pink-600 hover:bg-pink-50 font-black text-xs shadow-md transition-all active:scale-95 shrink-0 flex items-center gap-2"
        >
          <Zap className="w-4 h-4 fill-pink-500 text-pink-500" />
          <span>Simulate Intercept 🌸</span>
        </button>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400">Reclaimed Screen Time</span>
          <div className="text-2xl font-black text-purple-600">
            {formatMinutes(momentum.screenTimeSavedMinutes)}
          </div>
          <p className="text-[10px] text-purple-500 font-medium">Saved from mindless feeds today</p>
        </div>

        <div className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400">Mindful Pauses</span>
          <div className="text-2xl font-black text-teal-600">
            {momentum.totalReturns}
          </div>
          <p className="text-[10px] text-teal-500 font-medium">Conscious redirections back to study</p>
        </div>

        <div className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400">Monitored Social Time</span>
          <div className="text-2xl font-black text-pink-600">
            {formatMinutes(totalTrackedScreenTime)}
          </div>
          <p className="text-[10px] text-pink-500 font-medium">Across 5 distracting applications</p>
        </div>
      </div>

      {/* App Limits & Intentional Pause Controls */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#ECE6D8] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900">
            Customizable Daily Limits & Intentional Pauses
          </h3>
          <span className="text-xs font-bold text-purple-600">Gentle protection without guilt</span>
        </div>

        <div className="space-y-3">
          {appLimits.map(limit => {
            const Icon = getAppIcon(limit.icon);
            const percentage = Math.min(100, Math.round((limit.todayUsedMinutes / limit.dailyLimitMinutes) * 100));
            const isOver = limit.todayUsedMinutes >= limit.dailyLimitMinutes;

            return (
              <div
                key={limit.id}
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE6D8] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-white text-purple-600 flex items-center justify-center shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">{limit.appName}</div>
                      <div className="text-[10px] text-slate-500 font-bold">
                        {limit.todayUsedMinutes}m used of {limit.dailyLimitMinutes}m daily budget
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateAppLimit(limit.id, { strictLock: !limit.strictLock })}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-colors ${
                        limit.strictLock
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-white text-purple-700 border-purple-200 shadow-xs'
                      }`}
                    >
                      {limit.strictLock ? <Lock className="w-3 h-3 text-rose-500" /> : <Unlock className="w-3 h-3 text-purple-500" />}
                      <span>{limit.strictLock ? 'Strict Block' : 'Gentle Pause'}</span>
                    </button>

                    <button
                      onClick={() => triggerDistractionIntercept(limit.appName)}
                      className="px-2.5 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 text-[10px] font-black transition-colors"
                    >
                      Trigger Intercept 🌸
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-white overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOver ? 'bg-rose-500' : percentage > 75 ? 'bg-amber-400' : 'bg-purple-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-500">Daily Allowance:</span>
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
    </div>
  );
};
