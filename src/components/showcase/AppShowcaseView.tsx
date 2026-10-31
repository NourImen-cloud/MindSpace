import React from 'react';
import { 
  Sparkles, 
  Heart, 
  Calendar, 
  Clock, 
  BarChart2, 
  Award, 
  ShieldCheck, 
  Quote, 
  Palette, 
  Smartphone,
  Play,
  RotateCcw
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { CozyStudyGirlIllustration, CuteKittenMascot, FairyLights } from '../common/AestheticAssets';
import { OverviewDashboard } from '../dashboard/OverviewDashboard';
import { DailyPlanner } from '../activity/DailyPlanner';
import { FocusModeView } from '../focus/FocusModeView';
import { WellbeingDashboard } from '../wellbeing/WellbeingDashboard';

export const AppShowcaseView: React.FC = () => {
  const { currentTab, setCurrentTab, updateSettings } = useMindSpace();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FAF5FF] via-[#FDFBF7] to-[#F5F3FF] text-slate-800 p-4 sm:p-8 lg:p-12 overflow-hidden">
      {/* Top Fairy Lights matching the reference screenshot */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <FairyLights />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 pt-4">
        {/* LEFT COLUMN: Poster Presentation (Matches Left Side of Reference Screenshot) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 p-[2px] shadow-md shadow-purple-200">
              <div className="w-full h-full bg-purple-600 rounded-[14px] flex items-center justify-center text-white">
                <Sparkles className="w-6 h-6 fill-amber-200 text-amber-200" />
              </div>
            </div>
            <div>
              <div className="font-extrabold text-2xl tracking-tight text-slate-800 font-['Quicksand',sans-serif]">
                MindSpace <span className="text-purple-600 text-lg">✦</span>
              </div>
              <p className="text-xs font-bold text-purple-600">Plan. Focus. Achieve.</p>
            </div>
          </div>

          {/* Large Hero Headline (Exact match to "Your Study Companion ♡") */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight font-['Quicksand',sans-serif] leading-tight">
              Your Study <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent italic flex items-center gap-2">
                Companion <span className="text-pink-500 text-3xl not-italic">♡</span>
              </span>
            </h1>
            <p className="text-sm sm:text-base font-bold text-purple-700/80 pt-1">
              Plan your study. Track your progress. Achieve your goals!
            </p>
          </div>

          {/* 4 Feature Cards with Pastel Badges (Exact match to screenshot) */}
          <div className="space-y-3">
            {[
              {
                icon: Calendar,
                title: 'Smart Study Planner',
                desc: 'Organize tasks, subjects & deadlines with ease and AI auto-scheduling.',
                bg: 'bg-purple-100 text-purple-600'
              },
              {
                icon: Clock,
                title: 'Focus Timer',
                desc: 'Stay focused with Pomodoro timer, ambient lofi sounds & boost productivity.',
                bg: 'bg-pink-100 text-pink-600'
              },
              {
                icon: BarChart2,
                title: 'Track Progress & Anti-Scrolling',
                desc: 'Monitor your daily screen time, gentle returns, and stay mindful.',
                bg: 'bg-amber-100 text-amber-600'
              },
              {
                icon: Award,
                title: 'Achievements & Streaks',
                desc: 'Celebrate every mindful return and maintain your 12-day study streak!',
                bg: 'bg-emerald-100 text-emerald-600'
              }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div 
                  key={i}
                  className="p-3.5 rounded-2xl bg-white/90 border border-purple-100 shadow-[0_4px_16px_rgba(139,92,246,0.04)] flex items-start gap-3 hover:border-purple-200 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${f.bg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{f.title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Anime Girl Illustration Banner */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-purple-100/70 via-pink-50 to-indigo-100/60 border border-purple-200/80 shadow-md flex items-center justify-between overflow-hidden">
            <div className="space-y-1 relative z-10 max-w-[200px]">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-white/80 px-2 py-0.5 rounded-full border border-purple-200">
                Aesthetic & Cozy ✨
              </span>
              <h3 className="text-base font-black text-slate-800 font-['Quicksand',sans-serif]">
                A sanctuary for your daily focus
              </h3>
              <p className="text-xs text-purple-800/80 font-medium">
                Designed to make learning peaceful and intentional.
              </p>
            </div>
            <div className="relative z-10 -mr-2">
              <CozyStudyGirlIllustration className="w-36 h-36 drop-shadow-lg" />
            </div>
          </div>

          {/* "Everything you need, in one app! ♡" Sticker Pad Card (Exact match to screenshot bottom card) */}
          <div className="p-5 rounded-3xl bg-white/95 border border-purple-100 shadow-[0_8px_30px_rgba(139,92,246,0.06)] space-y-4">
            <div className="text-center">
              <h3 className="text-base font-black text-slate-800 font-['Quicksand',sans-serif] flex items-center justify-center gap-1.5">
                <span>Everything you need, in one app!</span>
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { icon: Calendar, label: 'Study Planner', col: 'text-purple-600 bg-purple-50' },
                { icon: Clock, label: 'Pomodoro Timer', col: 'text-pink-600 bg-pink-50' },
                { icon: BarChart2, label: 'Progress Tracking', col: 'text-amber-600 bg-amber-50' },
                { icon: Palette, label: 'Beautiful Themes', col: 'text-indigo-600 bg-indigo-50' },
                { icon: Quote, label: 'Mindful Quotes', col: 'text-purple-600 bg-purple-50' },
                { icon: ShieldCheck, label: 'Secure & Private', col: 'text-emerald-600 bg-emerald-50' },
              ].map((pill, i) => {
                const Icon = pill.icon;
                return (
                  <div key={i} className="p-2.5 rounded-2xl bg-[#FAF7FD] border border-purple-100/70 flex flex-col items-center gap-1.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${pill.col}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-700 leading-tight">
                      {pill.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cute Kitten Mascot with Quote Bubble */}
          <div className="flex items-center gap-3 p-3 bg-white/80 rounded-2xl border border-purple-100">
            <CuteKittenMascot className="w-12 h-12 shrink-0" />
            <div className="p-2.5 bg-purple-50 rounded-2xl text-[11px] font-bold text-purple-800 border border-purple-100">
              "Small steps every day lead to big results! 🐾"
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Smartphone Showcase Tabs */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Quick Screen Selector Pills */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 bg-white/90 p-1.5 rounded-full border border-purple-100 shadow-sm">
            {[
              { id: 'dashboard', label: 'Home Screen 🌸' },
              { id: 'planner', label: 'Planner Screen 📅' },
              { id: 'focus', label: 'Focus Timer ⏱️' },
              { id: 'wellbeing', label: 'Progress & Stats 📊' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                  currentTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Live Smartphone Frame Container */}
          <div className="w-full max-w-[420px] h-[840px] bg-white border-[10px] border-slate-800 rounded-[52px] shadow-[0_25px_70px_rgba(139,92,246,0.3)] overflow-hidden flex flex-col relative ring-4 ring-purple-200">
            {/* Dynamic Island Notch */}
            <div className="w-full bg-[#FAF7FD] pt-3 px-6 pb-2 flex items-center justify-between z-20 shrink-0 border-b border-purple-100/60">
              <span className="text-[12px] font-bold text-slate-700">9:41</span>
              <div className="w-24 h-4 bg-slate-900 rounded-full" />
              <span className="text-[11px] font-bold text-purple-600">MindSpace ✨</span>
            </div>

            {/* Live Interactive Screen Content */}
            <div className="flex-1 overflow-y-auto bg-[#FAF7FD] p-4 pb-24 text-slate-800">
              {currentTab === 'dashboard' && <OverviewDashboard />}
              {currentTab === 'planner' && <DailyPlanner />}
              {currentTab === 'focus' && <FocusModeView />}
              {currentTab === 'wellbeing' && <WellbeingDashboard />}
              {currentTab !== 'dashboard' && currentTab !== 'planner' && currentTab !== 'focus' && currentTab !== 'wellbeing' && (
                <OverviewDashboard />
              )}
            </div>

            {/* Bottom Floating Navigation Dock */}
            <div className="absolute bottom-2 left-0 right-0 px-4 z-30 pointer-events-none">
              <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[28px] border border-purple-100/90 shadow-[0_10px_30px_rgba(139,92,246,0.18)] px-4 py-2 flex items-center justify-between">
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className={`text-xs font-bold ${currentTab === 'dashboard' ? 'text-purple-600' : 'text-slate-400'}`}
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentTab('planner')}
                  className={`text-xs font-bold ${currentTab === 'planner' ? 'text-purple-600' : 'text-slate-400'}`}
                >
                  Planner
                </button>
                <button
                  onClick={() => setCurrentTab('focus')}
                  className="w-10 h-10 -mt-4 rounded-full bg-purple-600 text-white shadow-md flex items-center justify-center font-bold"
                >
                  +
                </button>
                <button
                  onClick={() => setCurrentTab('focus')}
                  className={`text-xs font-bold ${currentTab === 'focus' ? 'text-purple-600' : 'text-slate-400'}`}
                >
                  Focus
                </button>
                <button
                  onClick={() => setCurrentTab('wellbeing')}
                  className={`text-xs font-bold ${currentTab === 'wellbeing' ? 'text-purple-600' : 'text-slate-400'}`}
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
