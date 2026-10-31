import React, { useState } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Play, 
  Tag, 
  Clock, 
  Sparkles,
  Calculator,
  Leaf,
  Landmark,
  Atom,
  BookOpen
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { Priority } from '../../types';

export const TaskManager: React.FC = () => {
  const { 
    tasks, 
    categories, 
    addTask, 
    updateTask, 
    deleteTask, 
    startFocusSession, 
    addCategory 
  } = useMindSpace();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0]?.id || 'cat-math');
  const [newPriority, setNewPriority] = useState<Priority>('P2');
  const [newEstimatedMinutes, setNewEstimatedMinutes] = useState(30);
  const [newEnergy, setNewEnergy] = useState<'low' | 'medium' | 'high'>('high');
  const [newTagInput, setNewTagInput] = useState('');

  // New Category form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState('#8B5CF6');

  const filteredTasks = tasks.filter(t => {
    if (selectedCategory === 'all') return true;
    return t.categoryId === selectedCategory;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const tags = newTagInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    addTask({
      title: newTitle.trim(),
      description: newDescription.trim() || undefined,
      categoryId: newCategory,
      priority: newPriority,
      estimatedMinutes: newEstimatedMinutes,
      status: 'scheduled',
      tags: tags.length ? tags : ['Study'],
      energyLevel: newEnergy,
    });

    setNewTitle('');
    setNewDescription('');
    setNewTagInput('');
    setShowAddModal(false);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory({
      name: newCatName.trim(),
      color: newCatColor,
      icon: 'Sparkles',
      description: 'Custom subject or activity'
    });
    setNewCatName('');
    setShowNewCategoryModal(false);
  };

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

  const getPriorityBadge = (priority: Priority) => {
    switch (priority) {
      case 'P1': return { label: 'P1 Urgent', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'P2': return { label: 'P2 High', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'P3': return { label: 'P3 Medium', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'P4': return { label: 'P4 Low', bg: 'bg-slate-50 text-slate-600 border-slate-200' };
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Quicksand',sans-serif] flex items-center gap-2">
            <span>Subjects & Study Tasks</span>
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
              {filteredTasks.length} tasks
            </span>
          </h2>
          <p className="text-xs text-purple-600/80 font-medium">
            Manage your assignments, readings, and subjects with ease.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewCategoryModal(true)}
            className="px-3 py-2 rounded-2xl bg-white border border-purple-200 text-xs font-bold text-purple-700 hover:bg-purple-50 shadow-xs transition-colors"
          >
            + New Subject
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs font-black shadow-md shadow-purple-200 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:text-purple-700 border border-purple-100'
          }`}
        >
          All Subjects
        </button>
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          const Icon = getCategoryIcon(cat.icon);
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold shrink-0 transition-all border ${
                isSelected
                  ? 'border-transparent text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-purple-700 border-purple-100'
              }`}
              style={{
                backgroundColor: isSelected ? cat.color : undefined,
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tasks List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-purple-200">
            <Sparkles className="w-8 h-8 text-purple-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No tasks in this subject yet</p>
            <p className="text-xs text-slate-400 mt-1">Create an assignment to keep your study flow organized.</p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const cat = categories.find(c => c.id === task.categoryId) || categories[0];
            const pBadge = getPriorityBadge(task.priority);
            const isDone = task.status === 'completed';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-[22px] border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 group ${
                  isDone
                    ? 'bg-white/60 border-purple-100/50 opacity-60'
                    : 'bg-white border-purple-100/90 shadow-[0_4px_16px_rgba(139,92,246,0.03)] hover:border-purple-200 hover:shadow-md'
                }`}
              >
                {/* Left checkbox & info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    onClick={() => {
                      updateTask(task.id, {
                        status: isDone ? 'scheduled' : 'completed',
                        completedAt: isDone ? undefined : new Date().toISOString()
                      });
                    }}
                    className="mt-0.5 text-purple-400 hover:text-purple-700 transition-colors shrink-0"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 fill-purple-600 text-white" />
                    ) : (
                      <Circle className="w-5 h-5 text-purple-300 hover:text-purple-600 stroke-[2]" />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-extrabold text-slate-800 ${isDone ? 'line-through text-slate-400' : ''}`}>
                        {task.title}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${pBadge.bg}`}>
                        {pBadge.label}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: `${cat.color}15`,
                          borderColor: `${cat.color}35`,
                          color: cat.color
                        }}
                      >
                        {cat.name}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-xs text-slate-500 line-clamp-1">{task.description}</p>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium pt-0.5">
                      <div className="flex items-center gap-1 text-purple-600">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{task.estimatedMinutes}m est</span>
                      </div>
                      {task.scheduledTime && (
                        <div className="flex items-center gap-1 text-indigo-600 font-semibold">
                          <span>{task.scheduledTime}</span>
                        </div>
                      )}
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex items-center gap-1 text-slate-400">
                          <Tag className="w-3 h-3" />
                          <span>{task.tags.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {!isDone && (
                    <button
                      onClick={() => startFocusSession(task, task.estimatedMinutes)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-bold transition-colors"
                      title="Focus on this task now"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Focus</span>
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 rounded-[32px] w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-800 font-['Quicksand',sans-serif]">
              Create New Study Task ✨
            </h3>
            <form onSubmit={handleCreateTask} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read Physics Chapter 3: Kinematics"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Description / Sub-goals</label>
                <textarea
                  placeholder="Formulas to memorize, questions 1-10..."
                  rows={2}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Subject</label>
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

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as Priority)}
                    className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-bold"
                  >
                    <option value="P1">P1 Urgent</option>
                    <option value="P2">P2 High Priority</option>
                    <option value="P3">P3 Medium</option>
                    <option value="P4">P4 Low / Optional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Estimated Minutes</label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    step={5}
                    value={newEstimatedMinutes}
                    onChange={e => setNewEstimatedMinutes(Number(e.target.value))}
                    className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Energy Level</label>
                  <select
                    value={newEnergy}
                    onChange={e => setNewEnergy(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-bold"
                  >
                    <option value="high">High (Deep Focus)</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low (Light / Restorative)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-2xl text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-black text-xs shadow-md shadow-purple-200"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 rounded-[32px] w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-800 font-['Quicksand',sans-serif]">
              Add Subject 🌸
            </h3>
            <form onSubmit={handleCreateCategory} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Subject Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chemistry"
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-purple-600 font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Color Tag</label>
                <div className="flex items-center gap-2">
                  {['#8B5CF6', '#10B981', '#F43F5E', '#6366F1', '#F59E0B', '#EC4899'].map(col => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setNewCatColor(col)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        newCatColor === col ? 'scale-110 border-purple-700' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewCategoryModal(false)}
                  className="px-3 py-1.5 rounded-2xl text-xs font-bold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-2xl bg-purple-600 text-white font-black text-xs shadow-sm"
                >
                  Create Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
