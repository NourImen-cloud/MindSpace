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
  Sparkles,
  Heart
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
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Quicksand',sans-serif] flex items-center gap-2">
          <Compass className="w-6 h-6 text-purple-600" />
          <span>Personalized Study Break Alternatives 🌸</span>
        </h2>
        <p className="text-xs text-purple-600/80 font-medium">
          Restore dopamine baseline with real sensory & physical resets instead of mindless feeds.
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 bg-white border border-purple-100 rounded-2xl p-1 text-xs shadow-xs">
          {['all', 'mindful', 'physical', 'learning', 'restorative'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl capitalize font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-purple-600'
              }`}
            >
              {cat === 'all' ? 'All Breaks' : cat}
            </button>
          ))}
        </div>

        <select
          value={selectedReason}
          onChange={e => setSelectedReason(e.target.value as DistractionReason | 'all')}
          className="bg-white border border-purple-100 rounded-2xl px-3 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-purple-600 shadow-xs"
        >
          <option value="all">Filter by Feeling: All</option>
          <option value="boredom">When Bored</option>
          <option value="avoiding_task">When Procrastinating</option>
          <option value="need_break">When Tired</option>
          <option value="habitual">When Habitual Reflex Strikes</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredAlternatives.map(alt => {
          const Icon = getIcon(alt.icon);
          return (
            <div
              key={alt.id}
              className="p-5 rounded-[26px] bg-white border border-purple-100/90 shadow-[0_4px_16px_rgba(139,92,246,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-black text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    {alt.durationMinutes} min
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-800 group-hover:text-purple-700 transition-colors">
                    {alt.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                    {alt.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-50 flex items-center justify-between">
                <span className="text-[10px] text-purple-600 font-extrabold uppercase tracking-wider capitalize">
                  {alt.category}
                </span>

                <button
                  onClick={() => startFocusSession({
                    id: alt.id,
                    title: alt.title,
                    categoryId: 'cat-wellbeing',
                    priority: 'P3',
                    estimatedMinutes: alt.durationMinutes,
                    status: 'scheduled',
                    createdAt: new Date().toISOString()
                  }, alt.durationMinutes)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition-colors shadow-xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Take Break</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
