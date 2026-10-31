import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Play, 
  Flame, 
  Coffee, 
  Check, 
  ArrowUpDown,
  Calculator,
  Leaf,
  Landmark,
  Atom,
  BookOpen
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { MindSpaceAIEngine } from '../../utils/aiEngine';
import { SmartScheduleResult } from '../../utils/aiEngine';

export const DailyPlanner: React.FC = () => {
  const { tasks, updateTask, categories, startFocusSession, momentum } = useMindSpace();
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // Tue 21 default (matches screenshot!)
  const [aiResult, setAiResult] = useState<SmartScheduleResult | null>(null);
  const [isApplyingAi, setIsApplyingAi] = useState(false);

  // Week days list matching the exact screenshot (Mon 20 to Sun 26)
  const weekDays = [
    { day: 'Mon', date: 20 },
    { day: 'Tue', date: 21 },
    { day: 'Wed', date: 22 },
    { day: 'Thu', date: 23 },
    { day: 'Fri', date: 24 },
    { day: 'Sat', date: 25 },
    { day: 'Sun', date: 26 },
  ];

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

  const handleGenerateAiSchedule = () => {
    setIsApplyingAi(true);
    setTimeout(() => {
      const result = MindSpaceAIEngine.generateSmartSchedule(tasks, 9, 18);
      setAiResult(result);
      setIsApplyingAi(false);
    }, 400);
  };

  const handleApplyAiSchedule = () => {
    if (!aiResult) return;
    aiResult.scheduledTasks.forEach(item => {
      updateTask(item.task.id, {
        scheduledTime: item.suggestedStartTime,
        scheduledDuration: item.task.scheduledDuration || item.task.estimatedMinutes,
        status: 'scheduled'
      });
    });
    setAiResult(null);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. Planner Header (Exact match to screenshot) */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Quicksand',sans-serif] flex items-center gap-2">
          <span>Planner</span>
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateAiSchedule}
            disabled={isApplyingAi}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin-slow" />
            <span>{isApplyingAi ? 'Auto-Planning...' : 'AI Smart Plan'}</span>
          </button>
          <div className="w-9 h-9 rounded-2xl bg-white border border-purple-100 flex items-center justify-center text-purple-600 shadow-xs">
            <CalendarIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Horizontal Day Selector (Exact match to screenshot Mon 20 to Sun 26) */}
      <div className="flex items-center justify-between gap-1 sm:gap-2 p-2 bg-white rounded-[24px] border border-purple-100/90 shadow-[0_4px_20px_rgba(139,92,246,0.03)] overflow-x-auto">
        {weekDays.map((item, index) => {
          const isSelected = selectedDayIndex === index;
          return (
            <button
              key={item.day}
              onClick={() => setSelectedDayIndex(index)}
              className={`flex-1 min-w-[42px] py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-gradient-to-b from-purple-500 to-purple-600 text-white font-extrabold shadow-md shadow-purple-300 scale-105'
                  : 'text-slate-400 hover:text-purple-600 hover:bg-purple-50/50'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.day}</span>
              <span className="text-sm font-black mt-0.5">{item.date}</span>
            </button>
          );
        })}
      </div>

      {/* AI Schedule Preview Banner */}
      {aiResult && (
        <div className="p-4 rounded-3xl bg-purple-50 border border-purple-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-800 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Smart Schedule Generated (Buffers & 90m Cap)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAiResult(null)}
                className="px-2.5 py-1 rounded-xl text-xs text-slate-500 hover:text-slate-800"
              >
                Dismiss
              </button>
              <button
                onClick={handleApplyAiSchedule}
                className="flex items-center gap-1 px-3 py-1 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply to Day</span>
              </button>
            </div>
          </div>
          <p className="text-xs text-purple-900/80 leading-relaxed font-medium">{aiResult.advice}</p>
        </div>
      )}

      {/* 3. Tasks List Header (Exact match to "Tasks" with "Sort" in screenshot) */}
      <div className="flex items-center justify-between pt-1">
        <h3 className="text-base font-extrabold text-slate-800 font-['Quicksand',sans-serif]">
          Tasks
        </h3>
        <button className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-purple-100 shadow-xs">
          <ArrowUpDown className="w-3 h-3" />
          <span>Sort</span>
        </button>
      </div>

      {/* 4. Task Cards (Exact match to screenshot cards with circle checkboxes and pastel subject icons) */}
      <div className="space-y-2.5">
        {tasks.map(task => {
          const cat = categories.find(c => c.id === task.categoryId) || categories[0];
          const Icon = getCategoryIcon(cat.icon);
          const isDone = task.status === 'completed';

          return (
            <div
              key={task.id}
              className={`p-3.5 sm:p-4 rounded-[22px] bg-white border border-purple-100/90 shadow-[0_4px_16px_rgba(139,92,246,0.03)] flex items-center justify-between gap-3 transition-all hover:border-purple-200 group ${
                isDone ? 'opacity-60 bg-purple-50/30' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Circle Checkbox (Filled purple or outlined) */}
                <button
                  onClick={() => {
                    updateTask(task.id, {
                      status: isDone ? 'scheduled' : 'completed',
                      completedAt: isDone ? undefined : new Date().toISOString()
                    });
                  }}
                  className="transition-transform active:scale-90 text-purple-600 hover:text-purple-700 shrink-0"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 fill-purple-600 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-purple-300 hover:text-purple-500 stroke-[2]" />
                  )}
                </button>

                {/* Subject Color Pill / Icon */}
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${cat.color}15`,
                    color: cat.color,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <div className={`text-xs sm:text-sm font-extrabold text-slate-800 truncate ${isDone ? 'line-through text-slate-400' : ''}`}>
                    {task.title}
                  </div>
                  <div className="text-[11px] text-purple-600/70 font-medium truncate">
                    {cat.name} • {task.description || `${task.estimatedMinutes}m`}
                  </div>
                </div>
              </div>

              {/* Right Side: Quick Focus Trigger */}
              <div className="flex items-center gap-2 shrink-0">
                {!isDone && (
                  <button
                    onClick={() => startFocusSession(task, task.estimatedMinutes)}
                    className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 text-xs font-bold flex items-center gap-1 transition-colors"
                    title="Focus on this task now"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}
                <div className="w-4 h-4 rounded-full border-2 border-purple-200" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Study Streak / Return Momentum Bottom Card (Exact match to "Study Streak: 12 Days" card in screenshot!) */}
      <div className="p-4 sm:p-5 rounded-[26px] bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200 flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-purple-200 tracking-wider">Study Streak</span>
          <div className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <span>{momentum.studyStreakDays || 12} Days</span>
            <span className="text-sm font-bold text-amber-200">🔥</span>
          </div>
          <p className="text-[11px] text-purple-100 font-medium">
            Keep up the amazing momentum, Aiko!
          </p>
        </div>

        {/* Steaming Cozy Tea / Matcha Mug */}
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-2xl shadow-inner">
          <Coffee className="w-7 h-7 text-amber-200 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
