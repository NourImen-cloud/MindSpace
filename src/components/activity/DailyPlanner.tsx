import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Clock, 
  Play, 
  Coffee, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { MindSpaceAIEngine, SmartScheduleResult } from '../../utils/aiEngine';
import { formatTimeSlot } from '../../utils/formatters';

export const DailyPlanner: React.FC = () => {
  const { tasks, updateTask, categories, startFocusSession } = useMindSpace();
  const [aiResult, setAiResult] = useState<SmartScheduleResult | null>(null);
  const [isApplyingAi, setIsApplyingAi] = useState(false);

  // Time slots for the day (08:00 to 20:00)
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

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
    <div className="space-y-6">
      {/* Header & AI Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-teal-400" />
            <span>Daily Planner & Smart Scheduling</span>
          </h2>
          <p className="text-xs text-slate-400">
            Assign tasks to realistic time slots with intentional buffer breaks.
          </p>
        </div>

        <button
          onClick={handleGenerateAiSchedule}
          disabled={isApplyingAi}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-950 transition-all active:scale-95 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span>{isApplyingAi ? 'Optimizing Schedule...' : 'AI Smart Auto-Plan'}</span>
        </button>
      </div>

      {/* AI Schedule Preview Modal / Banner if generated */}
      {aiResult && (
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Smart Schedule Generated</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAiResult(null)}
                className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-slate-200"
              >
                Dismiss
              </button>
              <button
                onClick={handleApplyAiSchedule}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply to My Day</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{aiResult.advice}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
            {aiResult.scheduledTasks.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-indigo-300 font-medium">
                  <span>{item.suggestedStartTime} – {item.suggestedEndTime}</span>
                  <span className="text-[10px] text-teal-400">+{item.breakAfterMinutes}m break</span>
                </div>
                <div className="font-semibold text-slate-200 truncate">{item.task.title}</div>
                <div className="text-[10px] text-slate-400 italic line-clamp-1">{item.reasoning}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Timeline */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Today's Flow</span>
          <span className="text-slate-400 normal-case font-normal text-xs">90m max focus blocks recommended</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {timeSlots.map(time => {
            const scheduledForSlot = tasks.filter(t => t.scheduledTime && t.scheduledTime.startsWith(time.split(':')[0]));
            const isMiddayBreak = time === '13:00';

            return (
              <div key={time} className="py-3 flex items-start gap-4 group">
                {/* Time Label */}
                <div className="w-16 pt-1 text-right font-mono text-xs font-semibold text-slate-400 shrink-0">
                  {formatTimeSlot(time)}
                </div>

                {/* Content in Slot */}
                <div className="flex-1 min-w-0 space-y-2">
                  {scheduledForSlot.length > 0 ? (
                    scheduledForSlot.map(task => {
                      const cat = categories.find(c => c.id === task.categoryId) || categories[0];
                      return (
                        <div
                          key={task.id}
                          className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-between gap-3"
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-100 truncate">
                                {task.title}
                              </span>
                              <span
                                className="text-[10px] font-medium px-1.5 py-0.5 rounded border"
                                style={{
                                  backgroundColor: `${cat.color}15`,
                                  borderColor: `${cat.color}30`,
                                  color: cat.color
                                }}
                              >
                                {cat.name}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              <span>{task.estimatedMinutes} minutes</span>
                              {task.tags && (
                                <span className="text-slate-400">• {task.tags.join(', ')}</span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => startFocusSession(task, task.estimatedMinutes)}
                            className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-medium flex items-center gap-1 shrink-0"
                            title="Start Focus on this scheduled slot"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span className="hidden sm:inline">Focus</span>
                          </button>
                        </div>
                      );
                    })
                  ) : isMiddayBreak ? (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/80 flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-amber-400" />
                      <span>Circadian Reset Window: Ideal for lunch, hydration, and 15m screen-free rest.</span>
                    </div>
                  ) : (
                    <div className="py-2 text-xs text-slate-400 font-mono italic">
                      Open mental bandwidth
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
