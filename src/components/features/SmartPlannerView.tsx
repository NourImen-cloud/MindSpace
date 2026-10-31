import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Clock, 
  Play, 
  Coffee, 
  Check, 
  Plus, 
  Tag, 
  GraduationCap, 
  FolderKanban, 
  FlaskConical, 
  BookOpen, 
  Heart,
  CheckCircle2,
  Circle,
  Trash2
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { MindSpaceAIEngine, SmartScheduleResult } from '../../utils/aiEngine';
import { formatTimeSlot } from '../../utils/formatters';

export const SmartPlannerView: React.FC = () => {
  const { tasks, updateTask, deleteTask, categories, startFocusSession, addTask } = useMindSpace();
  const [selectedDayIndex, setSelectedDayIndex] = useState(1);
  const [aiResult, setAiResult] = useState<SmartScheduleResult | null>(null);
  const [isApplyingAi, setIsApplyingAi] = useState(false);
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('cat-university');
  const [newMinutes, setNewMinutes] = useState(35);
  const [newPriority, setNewPriority] = useState<'P1' | 'P2' | 'P3' | 'P4'>('P2');

  const weekDays = [
    { day: 'Mon', date: 20 },
    { day: 'Tue', date: 21 },
    { day: 'Wed', date: 22 },
    { day: 'Thu', date: 23 },
    { day: 'Fri', date: 24 },
    { day: 'Sat', date: 25 },
    { day: 'Sun', date: 26 },
  ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'cat-university': return GraduationCap;
      case 'cat-projects': return FolderKanban;
      case 'cat-research': return FlaskConical;
      case 'cat-learning': return BookOpen;
      default: return Heart;
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

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask({
      title: newTitle.trim(),
      categoryId: newCategory,
      priority: newPriority,
      estimatedMinutes: newMinutes,
      status: 'scheduled',
      energyLevel: 'high',
      tags: ['Daily Plan']
    });
    setNewTitle('');
    setShowAddModal(false);
  };

  const filteredTasks = tasks.filter(t => {
    if (selectedCatFilter === 'all') return true;
    return t.categoryId === selectedCatFilter;
  });

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Quicksand',sans-serif] flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-purple-600" />
            <span>Smart Daily Planning & Activities</span>
          </h2>
          <p className="text-xs text-purple-600/80 font-medium">
            5 Core Categories: University, Projects, Research, Learning, and Personal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateAiSchedule}
            disabled={isApplyingAi}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs font-black shadow-md shadow-purple-200 transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin-slow" />
            <span>{isApplyingAi ? 'Optimizing Schedule...' : 'AI Smart Auto-Plan'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-white border border-purple-200 text-purple-700 text-xs font-bold hover:bg-purple-50 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* AI Schedule Preview Modal / Card */}
      {aiResult && (
        <div className="p-5 rounded-[26px] bg-purple-50 border border-purple-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-800 font-black text-xs">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Smart Schedule Generated (Capped at 90m + Buffer Recovery)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAiResult(null)}
                className="px-2.5 py-1 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Dismiss
              </button>
              <button
                onClick={handleApplyAiSchedule}
                className="flex items-center gap-1 px-3 py-1 rounded-xl bg-purple-600 text-white text-xs font-black shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply to My Day</span>
              </button>
            </div>
          </div>
          <p className="text-xs text-purple-900/80 leading-relaxed font-medium">{aiResult.advice}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {aiResult.scheduledTasks.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-2xl bg-white border border-purple-100 text-xs space-y-1 shadow-xs">
                <div className="flex items-center justify-between text-purple-700 font-black text-[11px]">
                  <span>{item.suggestedStartTime} – {item.suggestedEndTime}</span>
                  <span className="text-teal-600 font-bold">+{item.breakAfterMinutes}m break</span>
                </div>
                <div className="font-extrabold text-slate-800 truncate">{item.task.title}</div>
                <div className="text-[10px] text-slate-500 italic truncate">{item.reasoning}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5 Core Category Filter Pills (University, Projects, Research, Learning, Personal) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCatFilter('all')}
          className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold shrink-0 transition-all ${
            selectedCatFilter === 'all'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-purple-700 border border-purple-100'
          }`}
        >
          All Activities
        </button>
        {categories.map(cat => {
          const isSelected = selectedCatFilter === cat.id;
          const Icon = getCategoryIcon(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCatFilter(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold shrink-0 transition-all border ${
                isSelected
                  ? 'border-transparent text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-purple-700 border-purple-100'
              }`}
              style={{ backgroundColor: isSelected ? cat.color : undefined }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Week Selector Bar */}
      <div className="flex items-center justify-between gap-1 p-2 bg-white rounded-[24px] border border-[#ECE6D8] shadow-xs">
        {weekDays.map((item, index) => {
          const isSelected = selectedDayIndex === index;
          return (
            <button
              key={item.day}
              onClick={() => setSelectedDayIndex(index)}
              className={`flex-1 py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-gradient-to-b from-purple-500 to-purple-600 text-white font-black shadow-md shadow-purple-200'
                  : 'text-slate-400 hover:text-purple-600 hover:bg-purple-50/50'
              }`}
            >
              <span className="text-[10px] font-bold uppercase">{item.day}</span>
              <span className="text-sm font-black mt-0.5">{item.date}</span>
            </button>
          );
        })}
      </div>

      {/* Tasks List */}
      <div className="space-y-2.5">
        {filteredTasks.map(task => {
          const cat = categories.find(c => c.id === task.categoryId) || categories[0];
          const Icon = getCategoryIcon(cat.id);
          const isDone = task.status === 'completed';

          return (
            <div
              key={task.id}
              className={`p-4 rounded-[22px] bg-white border border-[#ECE6D8] shadow-xs flex items-center justify-between gap-3 transition-all hover:border-purple-200 ${
                isDone ? 'opacity-60 bg-purple-50/20' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => {
                    updateTask(task.id, {
                      status: isDone ? 'scheduled' : 'completed',
                      completedAt: isDone ? undefined : new Date().toISOString()
                    });
                  }}
                  className="text-purple-600 hover:text-purple-700 shrink-0"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 fill-purple-600 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-purple-300 hover:text-purple-500 stroke-[2]" />
                  )}
                </button>

                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <div className={`text-xs sm:text-sm font-black text-slate-800 truncate ${isDone ? 'line-through text-slate-400' : ''}`}>
                    {task.title}
                  </div>
                  <div className="text-[11px] text-purple-600 font-medium truncate">
                    {cat.name} • {task.estimatedMinutes}m est {task.scheduledTime ? `• Slot: ${task.scheduledTime}` : ''}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!isDone && (
                  <button
                    onClick={() => startFocusSession(task, task.estimatedMinutes)}
                    className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-black transition-colors"
                    title="Start focus"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 rounded-xl text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 rounded-[32px] w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-800 font-['Quicksand',sans-serif]">
              Create New Activity Task
            </h3>
            <form onSubmit={handleCreateTask} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prepare Research Abstract"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-purple-600 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Activity Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-bold"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Estimated Minutes</label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    step={5}
                    value={newMinutes}
                    onChange={e => setNewMinutes(Number(e.target.value))}
                    className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as 'P1' | 'P2' | 'P3' | 'P4')}
                    className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-bold"
                  >
                    <option value="P1">P1 Urgent</option>
                    <option value="P2">P2 High</option>
                    <option value="P3">P3 Medium</option>
                    <option value="P4">P4 Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-2xl text-xs font-bold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-md shadow-purple-200"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
