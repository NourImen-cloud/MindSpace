import React, { useState } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Play, 
  Tag, 
  Flame, 
  Clock, 
  Sparkles,
  GraduationCap,
  FolderKanban,
  FlaskConical,
  BookOpen
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { Priority, Task } from '../../types';

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
  const [newCategory, setNewCategory] = useState(categories[0]?.id || 'cat-studies');
  const [newPriority, setNewPriority] = useState<Priority>('P2');
  const [newEstimatedMinutes, setNewEstimatedMinutes] = useState(30);
  const [newEnergy, setNewEnergy] = useState<'low' | 'medium' | 'high'>('high');
  const [newTagInput, setNewTagInput] = useState('');

  // New Category form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState('#10b981');

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
      tags: tags.length ? tags : ['Focus'],
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
      description: 'Custom activity category'
    });
    setNewCatName('');
    setShowNewCategoryModal(false);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'FolderKanban': return FolderKanban;
      case 'FlaskConical': return FlaskConical;
      case 'BookOpen': return BookOpen;
      default: return Sparkles;
    }
  };

  const getPriorityBadge = (priority: Priority) => {
    switch (priority) {
      case 'P1': return { label: 'P1 Urgent', bg: 'bg-rose-500/15 text-rose-300 border-rose-500/30' };
      case 'P2': return { label: 'P2 High', bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
      case 'P3': return { label: 'P3 Medium', bg: 'bg-blue-500/15 text-blue-300 border-blue-500/30' };
      case 'P4': return { label: 'P4 Low', bg: 'bg-slate-500/15 text-slate-400 border-slate-500/30' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar & Category Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>Personal Activities & Tasks</span>
            <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
              {filteredTasks.length} tasks
            </span>
          </h2>
          <p className="text-xs text-slate-400">Organize your studies, research, personal projects and life commitments.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewCategoryModal(true)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors"
          >
            + New Category
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Category Pills (Feature 1: 5 Core Categories) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-100 text-slate-900 font-semibold shadow'
              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
          }`}
        >
          All Activities
        </button>
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          const Icon = getCategoryIcon(cat.icon);
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all border ${
                isSelected
                  ? 'border-transparent text-white font-semibold shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700/60'
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

      {/* Tasks List grouped into Active vs Completed */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
            <Sparkles className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-300">No tasks in this category yet</p>
            <p className="text-xs text-slate-400 mt-1">Create a task to structure your day with intentionality.</p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const cat = categories.find(c => c.id === task.categoryId) || categories[0];
            const pBadge = getPriorityBadge(task.priority);
            const isDone = task.status === 'completed';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group ${
                  isDone
                    ? 'bg-slate-900/30 border-slate-800/60 opacity-60'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:shadow-lg'
                }`}
              >
                {/* Left check & info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    onClick={() => {
                      updateTask(task.id, {
                        status: isDone ? 'scheduled' : 'completed',
                        completedAt: isDone ? undefined : new Date().toISOString()
                      });
                    }}
                    className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors shrink-0"
                    title={isDone ? 'Mark as active' : 'Mark as done'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 hover:stroke-emerald-400" />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-semibold text-slate-100 ${isDone ? 'line-through text-slate-400' : ''}`}>
                        {task.title}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${pBadge.bg}`}>
                        {pBadge.label}
                      </span>
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md border"
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
                      <p className="text-xs text-slate-400 line-clamp-1">{task.description}</p>
                    )}

                    {/* Meta info tags */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{task.estimatedMinutes}m est</span>
                      </div>
                      {task.scheduledTime && (
                        <div className="flex items-center gap-1 text-teal-400">
                          <span>Scheduled: {task.scheduledTime}</span>
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

                {/* Right action buttons */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {!isDone && (
                    <button
                      onClick={() => startFocusSession(task, task.estimatedMinutes)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors"
                      title="Focus on this task now"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Focus Now</span>
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100">Create New Activity Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read research paper on habit loops"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Description / Notes</label>
                <textarea
                  placeholder="Key sub-points or outcome definition..."
                  rows={2}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as Priority)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="P1">P1 Urgent & Important</option>
                    <option value="P2">P2 High Priority</option>
                    <option value="P3">P3 Medium Priority</option>
                    <option value="P4">P4 Low / Someday</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Estimated Focus (Minutes)</label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    step={5}
                    value={newEstimatedMinutes}
                    onChange={e => setNewEstimatedMinutes(Number(e.target.value))}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Mental Energy Required</label>
                  <select
                    value={newEnergy}
                    onChange={e => setNewEnergy(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="high">High (Deep Analytical)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="low">Low (Light / Routine)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Study, Thesis, Sprint"
                  value={newTagInput}
                  onChange={e => setNewTagInput(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-950"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100">Add Responsibility Category</h3>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Health & Fitness"
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Color Theme</label>
                <div className="flex items-center gap-2">
                  {['#10b981', '#6366f1', '#0ea5e9', '#f59e0b', '#ec4899', '#8b5cf6'].map(col => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setNewCatColor(col)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        newCatColor === col ? 'scale-110 border-white' : 'border-transparent'
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
                  className="px-3 py-1.5 rounded-xl text-xs text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
