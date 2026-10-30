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
    id: 'cat-studies',
    name: 'University & Studies',
    color: '#10b981', // Emerald
    icon: 'GraduationCap',
    description: 'Coursework, assignments, exam preparation, and lectures'
  },
  {
    id: 'cat-projects',
    name: 'Personal Projects',
    color: '#8b5cf6', // Violet
    icon: 'FolderKanban',
    description: 'Creative apps, portfolio, building things that matter'
  },
  {
    id: 'cat-research',
    name: 'Research & Writing',
    color: '#0ea5e9', // Sky Blue
    icon: 'FlaskConical',
    description: 'Literature review, note synthesis, experimental work'
  },
  {
    id: 'cat-learning',
    name: 'Self-Learning',
    color: '#f59e0b', // Amber
    icon: 'BookOpen',
    description: 'Books, online courses, languages, technical skills'
  },
  {
    id: 'cat-hobbies',
    name: 'Hobbies & Personal',
    color: '#ec4899', // Pink
    icon: 'Sparkles',
    description: 'Music, sports, meditation, cooking, and leisure'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Review Machine Learning Chapter 4: Neural Architectures',
    description: 'Summarize backpropagation and attention mechanisms in my research notebook.',
    categoryId: 'cat-studies',
    priority: 'P1',
    estimatedMinutes: 50,
    scheduledTime: '09:30',
    scheduledDuration: 50,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    tags: ['Exams', 'Deep Work'],
    energyLevel: 'high'
  },
  {
    id: 'task-2',
    title: 'Design Database Schema for MindSpace Sync Protocol',
    description: 'Specify offline SQLite / IndexedDB entity relations and conflict resolution.',
    categoryId: 'cat-projects',
    priority: 'P2',
    estimatedMinutes: 45,
    scheduledTime: '11:00',
    scheduledDuration: 45,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    tags: ['Architecture', 'Dev'],
    energyLevel: 'high'
  },
  {
    id: 'task-3',
    title: 'Literature Search: Cognitive Friction in Digital Habit Reversal',
    description: 'Collect 3 recent peer-reviewed articles on intentional pauses and impulse delays.',
    categoryId: 'cat-research',
    priority: 'P2',
    estimatedMinutes: 35,
    scheduledTime: '14:00',
    scheduledDuration: 35,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    tags: ['Reading', 'Paper'],
    energyLevel: 'medium'
  },
  {
    id: 'task-4',
    title: 'Practice 20 minutes Spanish conversation vocabulary',
    description: 'Review Anki spaced repetition deck for conversational idioms.',
    categoryId: 'cat-learning',
    priority: 'P3',
    estimatedMinutes: 20,
    status: 'backlog',
    createdAt: new Date().toISOString(),
    tags: ['Language', 'Anki'],
    energyLevel: 'low'
  },
  {
    id: 'task-5',
    title: 'Afternoon Mindful Walk & Sunlight Exposure',
    description: 'Step outside without headphones to rest optic nerves and reset mental fatigue.',
    categoryId: 'cat-hobbies',
    priority: 'P3',
    estimatedMinutes: 20,
    scheduledTime: '16:00',
    scheduledDuration: 20,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
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
    todayUsedMinutes: 24,
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
    appName: 'News Portals & Feeds',
    dailyLimitMinutes: 20,
    todayUsedMinutes: 8,
    icon: 'Newspaper',
    blocked: false,
    strictLock: false,
    category: 'news'
  }
];

export const INITIAL_ALTERNATIVES: AlternativeActivity[] = [
  {
    id: 'alt-1',
    title: 'Two-Minute Box Breathing',
    description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s. Instantly reduces nervous system agitation.',
    durationMinutes: 3,
    category: 'mindful',
    icon: 'Wind',
    suitableReasons: ['avoiding_task', 'boredom', 'habitual', 'need_break']
  },
  {
    id: 'alt-2',
    title: 'Hydrate & Desk Spinal Stretch',
    description: 'Drink a full glass of cold water and stretch neck, shoulders, and lower back.',
    durationMinutes: 5,
    category: 'physical',
    icon: 'Droplet',
    suitableReasons: ['need_break', 'habitual']
  },
  {
    id: 'alt-3',
    title: 'Review 1 Study Flashcard or Concept',
    description: 'Pick one difficult formula or vocabulary item and test your recall.',
    durationMinutes: 5,
    category: 'learning',
    icon: 'Brain',
    suitableReasons: ['boredom', 'avoiding_task']
  },
  {
    id: 'alt-4',
    title: 'Quick Brain-Dump Journaling',
    description: 'Write whatever thought or anxiety is pulling your attention onto a physical note.',
    durationMinutes: 5,
    category: 'restorative',
    icon: 'PenTool',
    suitableReasons: ['avoiding_task', 'boredom']
  },
  {
    id: 'alt-5',
    title: '5-Minute Micro Focus Session',
    description: 'Open your current task and promise to work for just 300 seconds without judgement.',
    durationMinutes: 5,
    category: 'learning',
    icon: 'Flame',
    suitableReasons: ['avoiding_task', 'habitual']
  },
  {
    id: 'alt-6',
    title: 'Look out the Window at 20-20 Distance',
    description: 'Rest eye convergence by staring at the furthest tree or horizon line.',
    durationMinutes: 3,
    category: 'restorative',
    icon: 'Eye',
    suitableReasons: ['need_break', 'boredom']
  },
  {
    id: 'alt-7',
    title: 'Brisk 10-Minute Outdoor Stroll',
    description: 'Get natural ambient light and fresh air to restore dopamine baseline naturally.',
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
  userName: 'Alex',
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
  currentMomentumScore: 85,
  screenTimeSavedMinutes: 125,
  mindfulChoicesCount: 19,
  lastReturnTimestamp: new Date().toISOString()
};

export const STORAGE_KEYS = {
  TASKS: 'mindspace_tasks',
  CATEGORIES: 'mindspace_categories',
  SESSIONS: 'mindspace_sessions',
  DISTRACTIONS: 'mindspace_distractions',
  APP_LIMITS: 'mindspace_limits',
  ALTERNATIVES: 'mindspace_alternatives',
  REFLECTIONS: 'mindspace_reflections',
  SETTINGS: 'mindspace_settings',
  MOMENTUM: 'mindspace_momentum',
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
    version: '1.0.0',
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
