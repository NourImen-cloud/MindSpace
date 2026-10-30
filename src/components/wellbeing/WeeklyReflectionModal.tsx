import React, { useState } from 'react';
import { 
  BookHeart, 
  Sparkles, 
  Save, 
  Award, 
  CheckCircle2, 
  History, 
  FileText 
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { MindSpaceAIEngine } from '../../utils/aiEngine';

export const WeeklyReflectionModal: React.FC = () => {
  const { 
    reflections, 
    addReflection, 
    momentum, 
    tasks 
  } = useMindSpace();

  const [wins, setWins] = useState('');
  const [distractionsFaced, setDistractionsFaced] = useState('');
  const [triggers, setTriggers] = useState('');
  const [adjustments, setAdjustments] = useState('');
  const [rating, setRating] = useState<number>(8);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;

  const handleGenerateReport = () => {
    const report = MindSpaceAIEngine.generateWeeklyReport(
      reflections,
      momentum.totalReturns,
      momentum.screenTimeSavedMinutes,
      completedTasksCount
    );
    setGeneratedReport(report);
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wins.trim() && !adjustments.trim()) return;

    addReflection({
      weekStartDate: new Date().toISOString().split('T')[0],
      winsAndHighlights: wins.trim(),
      mainDistractionsFaced: distractionsFaced.trim(),
      recurringTriggers: triggers.split(',').map(s => s.trim()).filter(Boolean),
      adjustmentsForNextWeek: adjustments.trim(),
      mindfulnessRating: rating
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    setWins('');
    setDistractionsFaced('');
    setTriggers('');
    setAdjustments('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BookHeart className="w-5 h-5 text-pink-400" />
            <span>Weekly Reflection & Self-Evaluation</span>
          </h2>
          <p className="text-xs text-slate-400">
            Pause once a week to honor progress and recalibrate routines with kindness.
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-950 transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate AI Weekly Digest</span>
        </button>
      </div>

      {/* AI Generated Weekly Report Narrative (Feature 26) */}
      {generatedReport && (
        <div className="p-6 rounded-3xl bg-indigo-950/40 border border-indigo-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Personalized Weekly Attention Report</span>
            </div>
            <button
              onClick={() => setGeneratedReport(null)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Dismiss
            </button>
          </div>
          <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            {generatedReport}
          </div>
        </div>
      )}

      {/* Reflection Journal Form */}
      <form onSubmit={handleSaveReflection} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span>Guided Reflection Questions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              1. What went well this week? (Mindful wins & accomplishments)
            </label>
            <textarea
              rows={3}
              placeholder="Completed my research summary, stayed off TikTok before lunch..."
              value={wins}
              onChange={e => setWins(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              2. What distracted you most frequently?
            </label>
            <textarea
              rows={3}
              placeholder="Instagram explore feed when feeling tired at 2 PM..."
              value={distractionsFaced}
              onChange={e => setDistractionsFaced(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              3. Recurring triggers identified (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Post-lunch dip, Difficult coding problem, Fatigue"
              value={triggers}
              onChange={e => setTriggers(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              4. One small adjustment to test next week
            </label>
            <input
              type="text"
              placeholder="e.g. Take a 10-minute walk at 1:30 PM before opening social apps"
              value={adjustments}
              onChange={e => setAdjustments(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Rating Slider */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Overall Attention Calmness Rating:</span>
            <span className="font-bold text-pink-400">{rating} / 10</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            className="w-full accent-pink-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Reflection saved to local journal!</span>
            </span>
          ) : <div />}

          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-950"
          >
            <Save className="w-4 h-4" />
            <span>Save Reflection Entry</span>
          </button>
        </div>
      </form>

      {/* Past Reflections List */}
      {reflections.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" />
            <span>Reflection Archives</span>
          </h4>
          <div className="space-y-2">
            {reflections.map(r => (
              <div
                key={r.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Week of {r.weekStartDate}</span>
                  <span className="text-pink-400 font-bold bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                    Rating: {r.mindfulnessRating}/10
                  </span>
                </div>
                {r.winsAndHighlights && (
                  <p className="text-slate-300"><strong>Wins:</strong> {r.winsAndHighlights}</p>
                )}
                {r.adjustmentsForNextWeek && (
                  <p className="text-teal-300"><strong>Adjustment:</strong> {r.adjustmentsForNextWeek}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
