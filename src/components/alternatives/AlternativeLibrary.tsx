import React, { useState } from 'react';
import { 
  Compass, 
  Wind, 
  Droplet, 
  Brain, 
  PenTool, 
  Flame, 
  Eye, 
  Footprints, 
  Play, 
  Filter, 
  Sparkles 
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { DistractionReason } from '../../types';

export const AlternativeLibrary: React.FC = () => {
  const { alternatives, startFocusSession } = useMindSpace();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedReason, setSelectedReason] = useState<DistractionReason | 'all'>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind': return Wind;
      case 'Droplet': return Droplet;
      case 'Brain': return Brain;
      case 'PenTool': return PenTool;
      case 'Flame': return Flame;
      case 'Eye': return Eye;
      default: return Footprints;
    }
  };

  const filteredAlternatives = alternatives.filter(alt => {
    if (selectedCategory !== 'all' && alt.category !== selectedCategory) return false;
    if (selectedReason !== 'all' && !alt.suitableReasons.includes(selectedReason)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400" />
          <span>Personalized Alternatives to Scrolling</span>
        </h2>
        <p className="text-xs text-slate-400">
          Restore dopamine baseline with real physical & cognitive actions instead of digital feeds.
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-2xl p-1 text-xs">
          {['all', 'mindful', 'physical', 'learning', 'restorative'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Alternatives' : cat}
            </button>
          ))}
        </div>

        <select
          value={selectedReason}
          onChange={e => setSelectedReason(e.target.value as DistractionReason | 'all')}
          className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">Filter by Trigger Reason: All</option>
          <option value="boredom">Triggered by Boredom</option>
          <option value="avoiding_task">Triggered by Task Avoidance</option>
          <option value="need_break">Triggered by Needing a Break</option>
          <option value="habitual">Triggered by Habitual Reflex</option>
        </select>
      </div>

      {/* Alternatives Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlternatives.map(alt => {
          const Icon = getIcon(alt.icon);
          return (
            <div
              key={alt.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                    {alt.durationMinutes} min
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {alt.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {alt.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider capitalize">
                  {alt.category}
                </span>

                <button
                  onClick={() => startFocusSession({
                    id: alt.id,
                    title: alt.title,
                    categoryId: 'cat-hobbies',
                    priority: 'P3',
                    estimatedMinutes: alt.durationMinutes,
                    status: 'scheduled',
                    createdAt: new Date().toISOString()
                  }, alt.durationMinutes)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                  <span>Start Rest</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
