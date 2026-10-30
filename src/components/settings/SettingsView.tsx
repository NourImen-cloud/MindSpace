import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  HardDrive, 
  ShieldCheck, 
  Cloud, 
  CloudOff, 
  Download, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  RefreshCw, 
  Lock 
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';

export const SettingsView: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    exportDatabase, 
    importDatabase, 
    resetAllData 
  } = useMindSpace();

  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleDownloadBackup = () => {
    const jsonStr = exportDatabase();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindspace-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importDatabase(importJsonText);
    if (success) {
      setImportStatus('Successfully restored MindSpace database!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Failed to import: Invalid JSON format.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-slate-400" />
          <span>Privacy, Permissions & Local-First Sync</span>
        </h2>
        <p className="text-xs text-slate-400">
          Your attention data belongs to you. Stored locally on this device by default.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Local-First & Synchronization */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>Local-First Data Storage</span>
          </h3>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Device Pairing Code</span>
              <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {settings.deviceSyncId}
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Use this code to pair your mobile phone with this desktop without intermediate cloud servers.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Optional Cloud Sync</div>
                <div className="text-[11px] text-slate-400">End-to-end encrypted backup to private cloud</div>
              </div>
              <button
                onClick={() => updateSettings({ cloudSyncEnabled: !settings.cloudSyncEnabled })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.cloudSyncEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.cloudSyncEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Local-Only Isolation Mode</div>
                <div className="text-[11px] text-slate-400">Completely disables any external network requests</div>
              </div>
              <button
                onClick={() => updateSettings({ localOnlyMode: !settings.localOnlyMode })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.localOnlyMode ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.localOnlyMode ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Privacy & Tracking Permissions */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Privacy & Monitoring Controls</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Intentional Pause Interceptor</div>
                <div className="text-[11px] text-slate-400">Intervene before opening selected feeds</div>
              </div>
              <button
                onClick={() => updateSettings({ enableIntentionalPause: !settings.enableIntentionalPause })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.enableIntentionalPause ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.enableIntentionalPause ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Strict Lockout Enforcement</div>
                <div className="text-[11px] text-slate-400">Enforce hard cooldown when limit is exceeded</div>
              </div>
              <button
                onClick={() => updateSettings({ enableStrictBlocking: !settings.enableStrictBlocking })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.enableStrictBlocking ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.enableStrictBlocking ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Mindfulness Sound Chimes</div>
                <div className="text-[11px] text-slate-400">Tibetan singing bowl audio feedback on completion</div>
              </div>
              <button
                onClick={() => updateSettings({ enableSoundEffects: !settings.enableSoundEffects })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.enableSoundEffects ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.enableSoundEffects ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Telemetry & Analytics</div>
                <div className="text-[11px] text-slate-400">Disabled by default (Zero third-party trackers)</div>
              </div>
              <button
                onClick={() => updateSettings({ telemetryEnabled: !settings.telemetryEnabled })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.telemetryEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.telemetryEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Backup & Restore */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Download className="w-4 h-4 text-indigo-400" />
          <span>Local Data Portability (Export & Restore)</span>
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            onClick={handleDownloadBackup}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Full JSON Backup</span>
          </button>

          <div className="text-xs text-slate-400">
            Export all tasks, categories, distraction history, limits, and reflections in open JSON format.
          </div>
        </div>

        {/* Paste JSON to restore */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-semibold text-slate-400 block">
            Or Paste Backup JSON to Restore:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste exported JSON here..."
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleImport}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200"
            >
              Restore
            </button>
          </div>
          {importStatus && (
            <p className="text-xs text-emerald-400">{importStatus}</p>
          )}
        </div>

        {/* Danger Zone: Reset */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-rose-300">Reset Local Database</div>
            <div className="text-[11px] text-slate-400">Clears local storage and reloads default state</div>
          </div>

          {showConfirmReset ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllData();
                  setShowConfirmReset(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                Yes, Reset Everything
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-medium"
            >
              Reset Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
