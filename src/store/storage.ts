import { 
  Task, 
  Category, 
  FocusSession, 
  DistractionEvent, 
  AppLimit, 
  AlternativeActivity, 
  WeeklyReflection, 
  UserSettings, 
  ReturnMomentumStats 
} from '../types';

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'cat-university',
    name: 'University',
    color: '#8B5CF6', // Lilac purple
    icon: 'GraduationCap',
    description: 'Coursework, assignments, lecture notes, and exam prep'
  },
  {
    id: 'cat-projects',
    name: 'Projects',
    color: '#6366F1', // Electric indigo
    icon: 'FolderKanban',
    description: 'Software development, portfolio pieces, and side builds'
  },
  {
    id: 'cat-research',
    name: 'Research',
    color: '#0EA5E9', // Sky blue
    icon: 'FlaskConical',
    description: 'Literature review, empirical data, paper summaries'
  },
  {
    id: 'cat-learning',
    name: 'Learning',
    color: '#F59E0B', // Amber
    icon: 'BookOpen',
    description: 'Self-study, language practice, Anki decks, and books'
  },
  {
    id: 'cat-personal',
    name: 'Personal',
    color: '#EC4899', // Sakura rose
    icon: 'Heart',
    description: 'Hobbies, fitness, mindfulness, cooking, and rest'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Design Landing Page UI & Prototype',
    description: 'Complete visual wireframes and design system tokens in Figma.',
    categoryId: 'cat-projects',
    priority: 'P1',
    estimatedMinutes: 45,
    scheduledTime: '09:00 AM',
    scheduledDuration: 45,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    tags: ['Figma', 'UI'],
    energyLevel: 'high'
  },
  {
    id: 'task-2',
    title: 'Write Project Proposal & Architecture Doc',
    description: 'Detail system entities, conflict resolution, and offline-first storage.',
    categoryId: 'cat-projects',
    priority: 'P2',
    estimatedMinutes: 35,
    scheduledTime: '11:00 AM',
    scheduledDuration: 35,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    tags: ['Architecture', 'Docs'],
    energyLevel: 'high'
  },
  {
    id: 'task-3',
    title: 'Research Competitors & Cognitive Friction Literature',
    description: 'Collect 3 recent peer-reviewed studies on intentional delays in habit loops.',
    categoryId: 'cat-research',
    priority: 'P2',
    estimatedMinutes: 30,
    scheduledTime: '02:00 PM',
    scheduledDuration: 30,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    tags: ['Literature', 'Paper'],
    energyLevel: 'medium'
  },
  {
    id: 'task-4',
    title: 'Review Machine Learning Chapter 4: Neural Networks',
    description: 'Prepare notes on backpropagation and attention layer math for university exam.',
    categoryId: 'cat-university',
    priority: 'P2',
    estimatedMinutes: 40,
    scheduledTime: '04:00 PM',
    scheduledDuration: 40,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    tags: ['Exams', 'Lecture'],
    energyLevel: 'high'
  },
  {
    id: 'task-5',
    title: 'Practice 20 Minutes Japanese & Spanish Vocabulary',
    description: 'Complete daily spaced repetition review on Anki without phone interruptions.',
    categoryId: 'cat-learning',
    priority: 'P3',
    estimatedMinutes: 20,
    status: 'backlog',
    createdAt: new Date().toISOString(),
    tags: ['Language', 'Anki'],
    energyLevel: 'medium'
  },
  {
    id: 'task-6',
    title: 'Afternoon Tea & Desk Spinal Stretch 🍵',
    description: 'Brew warm tea, rest eyes from screen convergence, and stretch upper back.',
    categoryId: 'cat-personal',
    priority: 'P4',
    estimatedMinutes: 15,
    status: 'completed',
    createdAt: new Date().toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    tags: ['Wellbeing', 'Rest'],
    energyLevel: 'low'
  }
];

export const INITIAL_APP_LIMITS: AppLimit[] = [
  {
    id: 'limit-1',
    appName: 'Instagram',
    dailyLimitMinutes: 25,
    todayUsedMinutes: 18,
    icon: 'Camera',
    blocked: false,
    strictLock: false,
    category: 'social'
  },
  {
    id: 'limit-2',
    appName: 'TikTok / Shorts',
    dailyLimitMinutes: 15,
    todayUsedMinutes: 12,
    icon: 'PlaySquare',
    blocked: false,
    strictLock: true,
    category: 'entertainment'
  },
  {
    id: 'limit-3',
    appName: 'Reddit',
    dailyLimitMinutes: 30,
    todayUsedMinutes: 22,
    icon: 'MessageCircle',
    blocked: false,
    strictLock: false,
    category: 'social'
  },
  {
    id: 'limit-4',
    appName: 'X (Twitter)',
    dailyLimitMinutes: 20,
    todayUsedMinutes: 14,
    icon: 'Share2',
    blocked: false,
    strictLock: false,
    category: 'social'
  },
  {
    id: 'limit-5',
    appName: 'Web Feeds & News',
    dailyLimitMinutes: 20,
    todayUsedMinutes: 9,
    icon: 'Newspaper',
    blocked: false,
    strictLock: false,
    category: 'news'
  }
];

export const INITIAL_ALTERNATIVES: AlternativeActivity[] = [
  {
    id: 'alt-1',
    title: 'Two-Minute Box Breathing 🌸',
    description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s. Calms the nervous system gently.',
    durationMinutes: 3,
    category: 'mindful',
    icon: 'Wind',
    suitableReasons: ['avoiding_task', 'boredom', 'habitual', 'need_break']
  },
  {
    id: 'alt-2',
    title: 'Hydrate & Make a Warm Tea 🍵',
    description: 'Brew warm herbal or green tea and stretch neck, shoulders, and back.',
    durationMinutes: 5,
    category: 'physical',
    icon: 'Droplet',
    suitableReasons: ['need_break', 'habitual']
  },
  {
    id: 'alt-3',
    title: 'Review 1 Study Flashcard 🧠',
    description: 'Pick one difficult formula, definition, or vocabulary card to review.',
    durationMinutes: 5,
    category: 'learning',
    icon: 'Brain',
    suitableReasons: ['boredom', 'avoiding_task']
  },
  {
    id: 'alt-4',
    title: 'Brain-Dump Journaling 📝',
    description: 'Write whatever thought or anxiety is pulling your attention onto paper.',
    durationMinutes: 5,
    category: 'restorative',
    icon: 'PenTool',
    suitableReasons: ['avoiding_task', 'boredom']
  },
  {
    id: 'alt-5',
    title: '5-Minute Cozy Micro Focus ⏱️',
    description: 'Work on your current task for just 300 seconds without pressure or guilt.',
    durationMinutes: 5,
    category: 'learning',
    icon: 'Flame',
    suitableReasons: ['avoiding_task', 'habitual']
  },
  {
    id: 'alt-6',
    title: 'Look out the Window at the Clouds ☁️',
    description: 'Rest optic convergence by staring at distant trees or the sky.',
    durationMinutes: 3,
    category: 'restorative',
    icon: 'Eye',
    suitableReasons: ['need_break', 'boredom']
  },
  {
    id: 'alt-7',
    title: 'Brisk 10-Minute Walk Outside 🐾',
    description: 'Natural ambient light and gentle movement restore dopamine baseline.',
    durationMinutes: 10,
    category: 'physical',
    icon: 'Footprints',
    suitableReasons: ['need_break', 'boredom', 'habitual']
  }
];

export const INITIAL_DISTRACTION_EVENTS: DistractionEvent[] = [
  {
    id: 'dist-1',
    appName: 'Instagram',
    appCategory: 'social',
    urlOrTitle: 'instagram.com/explore',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    timeSpentSeconds: 45,
    intercepted: true,
    reason: 'avoiding_task',
    gentleReturnChoice: 'micro_focus_5m',
    momentumAwarded: true
  },
  {
    id: 'dist-2',
    appName: 'Reddit',
    appCategory: 'social',
    urlOrTitle: 'reddit.com/r/popular',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    timeSpentSeconds: 30,
    intercepted: true,
    reason: 'boredom',
    gentleReturnChoice: 'resume_task',
    momentumAwarded: true
  },
  {
    id: 'dist-3',
    appName: 'X (Twitter)',
    appCategory: 'social',
    urlOrTitle: 'x.com/home',
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    timeSpentSeconds: 60,
    intercepted: true,
    reason: 'habitual',
    gentleReturnChoice: 'intentional_break',
    momentumAwarded: true
  }
];

export const INITIAL_SETTINGS: UserSettings = {
  userName: 'Emily',
  focusPresetMinutes: 25,
  breakDurationMinutes: 5,
  enableSoundEffects: true,
  ambientSound: 'rain',
  ambientVolume: 0.35,
  enableIntentionalPause: true,
  pauseBreathingSeconds: 5,
  enableDistractionBlocking: true,
  enableStrictBlocking: false,
  cloudSyncEnabled: false,
  localOnlyMode: true,
  deviceSyncId: 'MS-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
  telemetryEnabled: false,
  viewMode: 'desktop'
};

export const INITIAL_MOMENTUM_STATS: ReturnMomentumStats = {
  totalReturns: 14,
  currentMomentumScore: 88,
  screenTimeSavedMinutes: 135,
  mindfulChoicesCount: 19,
  studyStreakDays: 12,
  lastReturnTimestamp: new Date().toISOString()
};

export const STORAGE_KEYS = {
  TASKS: 'mindspace_tasks_v3',
  CATEGORIES: 'mindspace_categories_v3',
  SESSIONS: 'mindspace_sessions_v3',
  DISTRACTIONS: 'mindspace_distractions_v3',
  APP_LIMITS: 'mindspace_limits_v3',
  ALTERNATIVES: 'mindspace_alternatives_v3',
  REFLECTIONS: 'mindspace_reflections_v3',
  SETTINGS: 'mindspace_settings_v3',
  MOMENTUM: 'mindspace_momentum_v3',
};

// Safe Local-First Storage Helpers
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to load key ${key} from localStorage:`, e);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save key ${key} to localStorage:`, e);
  }
}

export function exportAllData(): string {
  const data = {
    version: '3.0.0',
    exportedAt: new Date().toISOString(),
    tasks: loadFromStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS),
    categories: loadFromStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES),
    sessions: loadFromStorage(STORAGE_KEYS.SESSIONS, []),
    distractions: loadFromStorage(STORAGE_KEYS.DISTRACTIONS, INITIAL_DISTRACTION_EVENTS),
    appLimits: loadFromStorage(STORAGE_KEYS.APP_LIMITS, INITIAL_APP_LIMITS),
    alternatives: loadFromStorage(STORAGE_KEYS.ALTERNATIVES, INITIAL_ALTERNATIVES),
    reflections: loadFromStorage(STORAGE_KEYS.REFLECTIONS, []),
    settings: loadFromStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS),
    momentum: loadFromStorage(STORAGE_KEYS.MOMENTUM, INITIAL_MOMENTUM_STATS),
  };
  return JSON.stringify(data, null, 2);
}

export function importAllData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.tasks) saveToStorage(STORAGE_KEYS.TASKS, data.tasks);
    if (data.categories) saveToStorage(STORAGE_KEYS.CATEGORIES, data.categories);
    if (data.sessions) saveToStorage(STORAGE_KEYS.SESSIONS, data.sessions);
    if (data.distractions) saveToStorage(STORAGE_KEYS.DISTRACTIONS, data.distractions);
    if (data.appLimits) saveToStorage(STORAGE_KEYS.APP_LIMITS, data.appLimits);
    if (data.alternatives) saveToStorage(STORAGE_KEYS.ALTERNATIVES, data.alternatives);
    if (data.reflections) saveToStorage(STORAGE_KEYS.REFLECTIONS, data.reflections);
    if (data.settings) saveToStorage(STORAGE_KEYS.SETTINGS, data.settings);
    if (data.momentum) saveToStorage(STORAGE_KEYS.MOMENTUM, data.momentum);
    return true;
  } catch (e) {
    console.error('Import failed:', e);
    return false;
  }
}
