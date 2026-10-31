import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Smile, 
  User, 
  Briefcase, 
  Plus, 
  Trash2, 
  Zap, 
  Heart,
  BookOpen,
  GraduationCap,
  FolderKanban,
  FlaskConical,
  Coffee
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { 
  EmilyAvatar, 
  ClayBunnyWithHeart, 
  SmilingPlantPot, 
  BunnyProfileIcon,
  ClayCloud,
  ClayStar,
  ClayShield
} from '../reference/ClayIcons';
import { Priority, UserProfile } from '../../types';

export const WelcomeOnboardingModal: React.FC = () => {
  const { 
    isOnboardingOpen, 
    closeOnboarding, 
    completeOnboarding, 
    categories,
    userProfile 
  } = useMindSpace();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 State: Profile Personalization
  const [name, setName] = useState(userProfile.name || 'Emily');
  const [role, setRole] = useState(userProfile.role || 'Productivity & Focus Explorer');
  const [quote, setQuote] = useState(userProfile.quote || 'Small progress every day adds up to big results 🌱');
  const [avatarStyle, setAvatarStyle] = useState<UserProfile['avatarStyle']>(userProfile.avatarStyle || 'emily');

  // Step 2 State: Initial Tasks
  const [starterTasks, setStarterTasks] = useState([
    {
      title: 'Design landing page UI & Prototype',
      categoryId: 'cat-projects',
      priority: 'P1' as Priority,
      estimatedMinutes: 45
    },
    {
      title: 'Write project proposal & architecture',
      categoryId: 'cat-projects',
      priority: 'P2' as Priority,
      estimatedMinutes: 35
    },
    {
      title: 'Review Machine Learning Chapter 4',
      categoryId: 'cat-university',
      priority: 'P2' as Priority,
      estimatedMinutes: 40
    },
    {
      title: 'Research competitors & cognitive friction',
      categoryId: 'cat-research',
      priority: 'P3' as Priority,
      estimatedMinutes: 30
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('cat-projects');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('P2');
  const [newTaskDuration, setNewTaskDuration] = useState(30);

  // Step 3 State: Schedule Check
  const [scheduleSlots, setScheduleSlots] = useState([
    { time: '09:00 AM', title: 'Deep Work: Design landing page UI', duration: '45m', type: 'focus' },
    { time: '10:00 AM', title: 'Team stand-up & alignment', duration: '20m', type: 'reminder' },
    { time: '10:30 AM', title: 'Hydrate & Cozy 5m Screen Break 🍵', duration: '15m', type: 'break' },
    { time: '11:00 AM', title: 'Write project proposal doc', duration: '35m', type: 'focus' },
    { time: '01:30 PM', title: 'Mindful lunch & 10m outdoor stroll', duration: '45m', type: 'break' },
    { time: '02:30 PM', title: 'Review Machine Learning Chapter 4', duration: '40m', type: 'focus' },
  ]);

  const [isAiOrganized, setIsAiOrganized] = useState(false);

  if (!isOnboardingOpen) return null;

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    setStarterTasks(prev => [
      ...prev,
      {
        title: newTaskTitle.trim(),
        categoryId: newTaskCategory,
        priority: newTaskPriority,
        estimatedMinutes: newTaskDuration
      }
    ]);
    setNewTaskTitle('');
  };

  const handleRemoveTask = (index: number) => {
    setStarterTasks(prev => prev.filter((_, i) => i !== index));
  };

  const handleAiAutoSchedule = () => {
    setIsAiOrganized(true);
    // Dynamically regenerate slots based on starter tasks
    let startHour = 9;
    let startMin = 0;
    const generated: typeof scheduleSlots = [];

    starterTasks.forEach((task, idx) => {
      const timeStr = `${startHour.toString().padStart(2, '0')}:${startMin === 0 ? '00' : '30'} ${startHour < 12 ? 'AM' : 'PM'}`;
      generated.push({
        time: timeStr,
        title: `${task.title}`,
        duration: `${task.estimatedMinutes}m`,
        type: 'focus'
      });

      startMin += 30;
      if (startMin >= 60) {
        startMin = 0;
        startHour += 1;
      }

      // Add gentle break between tasks
      if (idx % 2 === 0) {
        const breakTimeStr = `${startHour.toString().padStart(2, '0')}:${startMin === 0 ? '00' : '30'} ${startHour < 12 ? 'AM' : 'PM'}`;
        generated.push({
          time: breakTimeStr,
          title: 'Gentle Return Break & Hydration 🍵',
          duration: '10m',
          type: 'break'
        });
        startMin += 30;
        if (startMin >= 60) {
          startMin = 0;
          startHour += 1;
        }
      }
    });

    setScheduleSlots(generated);
  };

  const handleFinish = () => {
    completeOnboarding({
      name: name.trim() || 'Emily',
      role: role.trim() || 'Productivity & Focus Explorer',
      quote: quote.trim() || 'Small progress every day adds up to big results 🌱',
      avatarStyle: avatarStyle,
      tasks: starterTasks
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fadeIn font-['Nunito',sans-serif]">
      <div className="relative w-full max-w-2xl bg-[#F7F4EE] rounded-[36px] border-2 border-[#EADFCB] shadow-[0_24px_64px_rgba(76,29,149,0.18)] overflow-hidden my-auto">
        
        {/* Claymorphic Accent Header */}
        <div className="bg-gradient-to-r from-[#EDE9FE] via-[#F3E8FF] to-[#FCE7F3] p-6 sm:p-7 border-b border-[#E3D7F5] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-purple-700">
                Welcome to MINDSPACE • First-Time Setup
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Quicksand',sans-serif] flex items-center gap-2">
              <span>Personalize Your Sanctuary</span>
              <ClayCloud className="w-8 h-8 -mt-1 inline-block" />
            </h2>
            <p className="text-xs font-bold text-purple-900/70">
              Set your goals, plan your rhythm, and protect your attention from endless scrolling.
            </p>
          </div>

          <button
            onClick={closeOnboarding}
            className="text-xs font-black text-purple-600 hover:text-purple-800 bg-white/70 hover:bg-white px-3 py-1.5 rounded-full transition-all border border-purple-200/60 shadow-xs"
          >
            Skip for now
          </button>
        </div>

        {/* Multi-Step Stepper Progress Bar */}
        <div className="bg-white/80 px-6 py-3 border-b border-[#EAE3D2] flex items-center justify-between">
          {[
            { num: 1, title: 'Your Profile' },
            { num: 2, title: 'Set Tasks' },
            { num: 3, title: 'Check Schedule' }
          ].map((s) => (
            <div 
              key={s.num} 
              onClick={() => setStep(s.num as any)}
              className={`flex items-center gap-2 cursor-pointer transition-all ${
                step === s.num ? 'opacity-100 font-black' : 'opacity-60 hover:opacity-90'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                step === s.num 
                  ? 'bg-[#8B5CF6] text-white shadow-xs' 
                  : step > s.num 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-200 text-slate-600'
              }`}>
                {step > s.num ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
              </div>
              <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[68vh] overflow-y-auto">
          
          {/* ======================================================== */}
          {/* STEP 1: Personal Profile & Avatar                        */}
          {/* ======================================================== */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-black text-slate-900">What should we call you?</h3>
                <p className="text-xs font-bold text-slate-500">
                  MINDSPACE personalizes your daily greetings, focus summaries, and motivation.
                </p>
              </div>

              {/* Avatar Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wide">
                  Choose Your Companion Avatar
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'emily', label: 'Emily Clay', component: <EmilyAvatar className="w-14 h-14" /> },
                    { id: 'bunny', label: 'Gentle Bunny', component: <ClayBunnyWithHeart className="w-14 h-14" /> },
                    { id: 'plant', label: 'Smiling Plant', component: <SmilingPlantPot className="w-14 h-14" /> },
                    { id: 'bear', label: 'Zen Scholar', component: <BunnyProfileIcon className="w-14 h-14" /> },
                  ].map(item => (
                    <div
                      key={item.id}
                      onClick={() => setAvatarStyle(item.id as any)}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                        avatarStyle === item.id 
                          ? 'border-[#8B5CF6] bg-purple-50 shadow-md scale-102' 
                          : 'border-[#EAE3D2] bg-white hover:border-purple-200'
                      }`}
                    >
                      <div className="shrink-0">{item.component}</div>
                      <span className="text-[11px] font-black text-slate-800 text-center">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4 bg-white p-5 rounded-3xl border border-[#EAE3D2] shadow-xs">
                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Emily, Alex, Sarah..."
                    className="w-full bg-[#FAF7F2] border border-[#E5DECD] rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    Your Role / What are you working on?
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="e.g. Computer Science Student, Research Fellow, Product Designer..."
                    className="w-full bg-[#FAF7F2] border border-[#E5DECD] rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    Daily Mantra / Motivation Quote
                  </label>
                  <input
                    type="text"
                    value={quote}
                    onChange={e => setQuote(e.target.value)}
                    placeholder="e.g. Small progress every day adds up to big results 🌱"
                    className="w-full bg-[#FAF7F2] border border-[#E5DECD] rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: Set Initial Tasks & Life Categories             */}
          {/* ======================================================== */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Set Today's Key Tasks</h3>
                <p className="text-xs font-bold text-slate-500">
                  Organize your work across University, Projects, Research, Learning, and Personal.
                </p>
              </div>

              {/* 5 Categories Pills Preview */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <span
                    key={cat.id}
                    className="px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-2xs border"
                    style={{ backgroundColor: `${cat.color}15`, borderColor: `${cat.color}40`, color: cat.color }}
                  >
                    <span>{cat.name}</span>
                  </span>
                ))}
              </div>

              {/* Current Tasks List */}
              <div className="space-y-2.5">
                {starterTasks.map((task, idx) => {
                  const cat = categories.find(c => c.id === task.categoryId) || categories[0];
                  return (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-2xl border border-[#EAE3D2] flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 truncate">{task.title}</p>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <span>{cat.name}</span>
                            <span>•</span>
                            <span>{task.estimatedMinutes}m</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          task.priority === 'P1' ? 'bg-rose-100 text-rose-700' :
                          task.priority === 'P2' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {task.priority}
                        </span>
                        <button
                          onClick={() => handleRemoveTask(idx)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Task Inline */}
              <div className="bg-[#EDE9FE]/40 p-4 rounded-3xl border border-[#DDD6FE] space-y-3">
                <div className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add another task for today</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    placeholder="Task title (e.g. Review lecture slides)..."
                    className="flex-1 bg-white border border-[#DDD6FE] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                    onKeyDown={e => e.key === 'Enter' && handleAddTask()}
                  />

                  <select
                    value={newTaskCategory}
                    onChange={e => setNewTaskCategory(e.target.value)}
                    className="bg-white border border-[#DDD6FE] rounded-xl px-2.5 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>

                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value as Priority)}
                    className="bg-white border border-[#DDD6FE] rounded-xl px-2.5 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                  >
                    <option value="P1">High (P1)</option>
                    <option value="P2">Medium (P2)</option>
                    <option value="P3">Low (P3)</option>
                  </select>

                  <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-black transition-all shadow-xs shrink-0"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: Check & Confirm Today's Schedule                 */}
          {/* ======================================================== */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Check Your Daily Schedule</h3>
                  <p className="text-xs font-bold text-slate-500">
                    Review your timeline blocks with anti-scrolling intervals & mindful pauses.
                  </p>
                </div>

                <button
                  onClick={handleAiAutoSchedule}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all shadow-xs self-start sm:self-auto ${
                    isAiOrganized 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-95'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAiOrganized ? 'AI Optimized ✨' : 'Auto-Schedule Day ✨'}</span>
                </button>
              </div>

              {/* Schedule Timeline Preview */}
              <div className="bg-white rounded-3xl p-4 border border-[#EAE3D2] space-y-3">
                <div className="flex items-center justify-between text-xs font-black text-purple-900 pb-2 border-b border-slate-100">
                  <span>Today's Time Slots</span>
                  <span className="text-[11px] font-bold text-slate-400">09:00 AM — 06:00 PM</span>
                </div>

                <div className="space-y-2.5">
                  {scheduleSlots.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-2xl flex items-center justify-between gap-3 border text-xs ${
                        slot.type === 'break' 
                          ? 'bg-emerald-50/60 border-emerald-100 text-emerald-900' 
                          : slot.type === 'reminder'
                            ? 'bg-amber-50/60 border-amber-100 text-amber-900'
                            : 'bg-[#FAF7F2] border-[#ECE6D8] text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-[11px] font-mono font-black text-purple-700 shrink-0">
                          {slot.time}
                        </span>
                        <span className="font-bold truncate">{slot.title}</span>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 shrink-0">
                        {slot.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anti-Scrolling Shield Status Confirmation */}
              <div className="bg-gradient-to-r from-rose-50 to-purple-50 p-3.5 rounded-2xl border border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs">
                  <ClayShield className="w-7 h-7 shrink-0" />
                  <div>
                    <div className="font-black text-rose-900">Anti-Scrolling Intentional Pause Active</div>
                    <div className="text-[10px] font-bold text-rose-700/80">
                      Gentle Return suggestions will protect your study sessions from social scrolling.
                    </div>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-white px-6 py-4 border-t border-[#EAE3D2] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step < 3 ? (
              <button
                onClick={() => setStep((step + 1) as any)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-black shadow-md transition-all active:scale-95"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white text-xs font-black shadow-lg hover:opacity-95 transition-all active:scale-95 animate-pulse"
              >
                <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>Launch My MINDSPACE 🚀</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};