import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Zap, 
  Clock, 
  Sparkles,
  Camera,
  PlaySquare,
  MessageCircle,
  Share2,
  Newspaper,
  CheckCircle2,
  Plus,
  Trash2,
  X,
  Globe,
  Flame,
  HelpCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { formatMinutes } from '../../utils/formatters';
import { ClayShield, ClayZenMug } from '../reference/ClayIcons';
import { AppLimit } from '../../types';

export const AntiScrollingView: React.FC = () => {
  const { 
    appLimits, 
    addAppLimit,
    updateAppLimit, 
    deleteAppLimit,
    triggerDistractionIntercept, 
    momentum 
  } = useMindSpace();

  // Add Custom App Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAppName, setNewAppName] = useState('');
  const [newAppCategory, setNewAppCategory] = useState<'social' | 'entertainment' | 'news' | 'other'>('social');
  const [newDailyLimit, setNewDailyLimit] = useState(20);
  const [newStrictLock, setNewStrictLock] = useState(false);
  const [newAppIcon, setNewAppIcon] = useState('Globe');

  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return Camera;
      case 'PlaySquare': return PlaySquare;
      case 'MessageCircle': return MessageCircle;
      case 'Share2': return Share2;
      case 'Globe': return Globe;
      default: return Newspaper;
    }
  };

  const handleCreateCustomApp = () => {
    if (!newAppName.trim()) return;
    addAppLimit({
      appName: newAppName.trim(),
      dailyLimitMinutes: newDailyLimit,
      icon: newAppIcon,
      blocked: false,
      strictLock: newStrictLock,
      category: newAppCategory
    });
    setNewAppName('');
    setNewDailyLimit(20);
    setIsAddModalOpen(false);
  };

  const totalTrackedScreenTime = appLimits.reduce((acc, l) => acc + l.todayUsedMinutes, 0);

  return (
    <div className="space-y-6 animate-fadeIn font-['Nunito',sans-serif]">
      
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-7 rounded-[32px] bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-pink-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <ClayShield className="w-8 h-8" />
            <span className="text-[11px] font-black uppercase tracking-widest text-pink-100 bg-white/20 px-3 py-0.5 rounded-full">
              Your Personal Attention Shield
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Quicksand',sans-serif]">
            Anti-Scrolling & App Restrictions
          </h2>
          <p className="text-xs text-pink-100 font-bold leading-relaxed">
            You define exactly which apps and websites to restrict. When you reach for them, MINDSPACE introduces a gentle breathing pause and restorative alternatives without guilt.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-full bg-white text-purple-700 hover:bg-purple-50 font-black text-xs shadow-md transition-all active:scale-95 shrink-0 flex items-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Custom App / Website</span>
        </button>
      </div>

      {/* 2. "How It Works" Visual Step-by-Step Card */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#ECE6D8] shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-purple-900">
          <HelpCircle className="w-5 h-5 text-purple-600" />
          <h3 className="text-sm font-black font-['Quicksand',sans-serif]">
            How MINDSPACE Restricts Apps & Intercepts Distractions
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 font-black flex items-center justify-center text-xs">
              1
            </div>
            <div className="font-black text-slate-800">You Pick Your Apps</div>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
              Define the apps or websites you want to restrict (e.g., YouTube, Instagram, Reddit, Twitch).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-rose-200 text-rose-800 font-black flex items-center justify-center text-xs">
              2
            </div>
            <div className="font-black text-slate-800">Mindful Chime & Pause</div>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
              When opened, it plays a soft chime and shows a 5-second breathing circle to break the automatic reflex.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 font-black flex items-center justify-center text-xs">
              3
            </div>
            <div className="font-black text-slate-800">Habit Check</div>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
              Asks why you opened it (boredom, task avoidance, or quick check) so you regain conscious control.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 font-black flex items-center justify-center text-xs">
              4
            </div>
            <div className="font-black text-slate-800">Gentle Return</div>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
              Gives you 3 positive paths: return to your study task, do a cozy 5-minute micro-focus, or take a real break.
            </p>
          </div>

        </div>
      </div>

      {/* 3. Your Defined Restricted Apps List */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#ECE6D8] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900 font-['Quicksand',sans-serif]">
              Your Restricted Apps & Websites ({appLimits.length})
            </h3>
            <p className="text-xs text-slate-500 font-bold">
              Customize daily allowances, toggle strict locks, or remove apps at any time.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-xs transition-all self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add Another App</span>
          </button>
        </div>

        {appLimits.length === 0 ? (
          <div className="p-10 rounded-2xl border-2 border-dashed border-purple-200 text-center space-y-3 bg-purple-50/30">
            <ClayZenMug className="w-16 h-16 mx-auto" />
            <h4 className="text-sm font-black text-slate-800">No Restricted Apps Defined</h4>
            <p className="text-xs text-slate-500 font-bold max-w-sm mx-auto">
              You currently have no app limits. Click the button below to add any app or website you want MINDSPACE to help you pause.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-purple-600 text-white text-xs font-black shadow-md hover:bg-purple-700 transition-all"
            >
              + Add Your First App
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appLimits.map(limit => {
              const Icon = getAppIcon(limit.icon);
              const percentage = Math.min(100, Math.round((limit.todayUsedMinutes / limit.dailyLimitMinutes) * 100));
              const isOver = limit.todayUsedMinutes >= limit.dailyLimitMinutes;

              return (
                <div
                  key={limit.id}
                  className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE6D8] space-y-3 relative group hover:border-purple-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white text-purple-600 flex items-center justify-center shadow-xs border border-purple-100">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900">{limit.appName}</div>
                        <div className="text-[10px] text-slate-500 font-bold">
                          Daily Allowance: <span className="text-purple-700 font-mono font-black">{limit.dailyLimitMinutes}m</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Delete button */}
                      <button
                        onClick={() => deleteAppLimit(limit.id)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title={`Remove ${limit.appName} from restrictions`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Test Intercept button */}
                      <button
                        onClick={() => triggerDistractionIntercept(limit.appName)}
                        className="px-2.5 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 text-[10px] font-black transition-colors flex items-center gap-1 shadow-2xs"
                        title={`Test the Intentional Pause intercept for ${limit.appName}`}
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>Test Intercept</span>
                      </button>
                    </div>
                  </div>

                  {/* Mode Selector: Gentle Pause vs Strict Block */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-500">Protection Mode:</span>
                    <button
                      onClick={() => updateAppLimit(limit.id, { strictLock: !limit.strictLock })}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-black border transition-colors ${
                        limit.strictLock
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {limit.strictLock ? <Lock className="w-3 h-3 text-rose-500" /> : <Unlock className="w-3 h-3 text-emerald-600" />}
                      <span>{limit.strictLock ? 'Strict Lock (Blocked)' : 'Gentle Pause (Breathing Interruption)'}</span>
                    </button>
                  </div>

                  {/* Slider to adjust daily allowance */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <span>Adjust Time Allowance:</span>
                      <span className="font-mono font-black text-purple-700">{limit.dailyLimitMinutes} mins/day</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      step={5}
                      value={limit.dailyLimitMinutes}
                      onChange={e => updateAppLimit(limit.id, { dailyLimitMinutes: Number(e.target.value) })}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: Add Custom App or Website to Restrict                              */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#F7F4EE] rounded-[32px] border border-[#E9E4D8] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-black text-slate-900">Define Restricted App / Website</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  App or Website Name
                </label>
                <input
                  type="text"
                  value={newAppName}
                  onChange={e => setNewAppName(e.target.value)}
                  placeholder="e.g. YouTube, Twitch, Netflix, Chess.com..."
                  className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  Category
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['social', 'entertainment', 'news', 'other'] as const).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewAppCategory(cat)}
                      className={`p-2 rounded-xl text-[11px] font-black capitalize border transition-all ${
                        newAppCategory === cat
                          ? 'border-purple-600 bg-purple-100 text-purple-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-black text-slate-700">Daily Allowance Budget</label>
                  <span className="text-xs font-mono font-black text-purple-700">{newDailyLimit} mins</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={90}
                  step={5}
                  value={newDailyLimit}
                  onChange={e => setNewDailyLimit(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                  Set to 0m for an immediate breathing pause every time you open it.
                </p>
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Protection Style</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewStrictLock(false)}
                    className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all ${
                      !newStrictLock
                        ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-black text-xs flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Gentle Pause</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                      Breathing pause + conscious return choices
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewStrictLock(true)}
                    className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all ${
                      newStrictLock
                        ? 'border-rose-600 bg-rose-50 text-rose-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-black text-xs flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-rose-600" />
                      <span>Strict Lock</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                      Restricts access during focus sessions
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCustomApp}
                className="px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-black shadow-xs transition-all"
              >
                Save & Restrict App
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};