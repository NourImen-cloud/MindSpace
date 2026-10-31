import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Task,
  Category,
  FocusSession,
  DistractionEvent,
  AppLimit,
  AlternativeActivity,
  WeeklyReflection,
  UserSettings,
  ReturnMomentumStats,
  DistractionReason,
  ParkingLotItem,
  Project,
  Reminder,
  UserProfile,
  Priority
} from '../types';
import {
  DEFAULT_CATEGORIES,
  INITIAL_TASKS,
  INITIAL_APP_LIMITS,
  INITIAL_ALTERNATIVES,
  INITIAL_DISTRACTION_EVENTS,
  INITIAL_SETTINGS,
  INITIAL_MOMENTUM_STATS,
  INITIAL_PROJECTS,
  INITIAL_REMINDERS,
  INITIAL_USER_PROFILE,
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  exportAllData,
  importAllData
} from './storage';
import { soundEngine } from '../utils/audio';
import { generateId } from '../utils/formatters';

interface MindSpaceContextType {
  // User Profile & Personalization
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  isOnboardingOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  completeOnboarding: (data: {
    name: string;
    role: string;
    quote?: string;
    avatarStyle?: UserProfile['avatarStyle'];
    tasks?: Array<{ title: string; categoryId: string; priority: Priority; estimatedMinutes: number }>;
  }) => void;
  resetToNewUser: () => void;

  // Projects & Reminders
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;

  // Tasks & Categories
  tasks: Task[];
  categories: Category[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;

  // Active Focus Session
  activeFocusSession: FocusSession | null;
  isFocusModalOpen: boolean;
  focusSecondsRemaining: number;
  isTimerRunning: boolean;
  startFocusSession: (task?: Task, durationMinutes?: number) => void;
  pauseFocusTimer: () => void;
  resumeFocusTimer: () => void;
  stopFocusSession: (completed?: boolean) => void;
  addParkingLotItem: (text: string) => void;
  closeFocusModal: () => void;
  lastCompletedSession: FocusSession | null;
  dismissSummaryModal: () => void;

  // Anti-Scrolling & Distraction Interception
  distractions: DistractionEvent[];
  appLimits: AppLimit[];
  updateAppLimit: (id: string, updates: Partial<AppLimit>) => void;
  activeIntercept: {
    isOpen: boolean;
    appName: string;
    reason?: DistractionReason;
    stage: 'pause' | 'reason' | 'gentle_return';
  } | null;
  triggerDistractionIntercept: (appName: string) => void;
  setDistractionReason: (reason: DistractionReason) => void;
  proceedToGentleReturn: () => void;
  completeGentleReturn: (choice: 'resume_task' | 'micro_focus_5m' | 'intentional_break') => void;
  cancelIntercept: () => void;

  // Personalized Alternatives
  alternatives: AlternativeActivity[];

  // Digital Wellbeing & Momentum
  momentum: ReturnMomentumStats;
  reflections: WeeklyReflection[];
  addReflection: (reflection: Omit<WeeklyReflection, 'id' | 'createdAt'>) => void;

  // Soundscape
  currentAmbient: string;
  ambientVolume: number;
  setAmbientSound: (type: 'none' | 'rain' | 'forest' | 'brown_noise' | 'tibetan_bowl') => void;
  setAmbientVolume: (volume: number) => void;

  // Settings & Sync
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  exportDatabase: () => string;
  importDatabase: (json: string) => boolean;
  resetAllData: () => void;

  // Navigation tab
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const MindSpaceContext = createContext<MindSpaceContextType | null>(null);

export const MindSpaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local state initialized from local-first storage
  const [tasks, setTasks] = useState<Task[]>(() => loadFromStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS));
  const [categories, setCategories] = useState<Category[]>(() => loadFromStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES));
  const [appLimits, setAppLimits] = useState<AppLimit[]>(() => loadFromStorage(STORAGE_KEYS.APP_LIMITS, INITIAL_APP_LIMITS));
  const [alternatives] = useState<AlternativeActivity[]>(() => loadFromStorage(STORAGE_KEYS.ALTERNATIVES, INITIAL_ALTERNATIVES));
  const [distractions, setDistractions] = useState<DistractionEvent[]>(() => loadFromStorage(STORAGE_KEYS.DISTRACTIONS, INITIAL_DISTRACTION_EVENTS));
  const [reflections, setReflections] = useState<WeeklyReflection[]>(() => loadFromStorage(STORAGE_KEYS.REFLECTIONS, []));
  const [settings, setSettings] = useState<UserSettings>(() => loadFromStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS));
  const [momentum, setMomentum] = useState<ReturnMomentumStats>(() => loadFromStorage(STORAGE_KEYS.MOMENTUM, INITIAL_MOMENTUM_STATS));
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS));
  const [reminders, setReminders] = useState<Reminder[]>(() => loadFromStorage(STORAGE_KEYS.REMINDERS, INITIAL_REMINDERS));
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadFromStorage(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE));
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => !userProfile.hasCompletedOnboarding);

  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // Focus Timer State
  const [activeFocusSession, setActiveFocusSession] = useState<FocusSession | null>(null);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [focusSecondsRemaining, setFocusSecondsRemaining] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [lastCompletedSession, setLastCompletedSession] = useState<FocusSession | null>(null);

  // Anti-Scrolling Interception Modal State
  const [activeIntercept, setActiveIntercept] = useState<{
    isOpen: boolean;
    appName: string;
    reason?: DistractionReason;
    stage: 'pause' | 'reason' | 'gentle_return';
  } | null>(null);

  // Soundscape state
  const [currentAmbient, setCurrentAmbientState] = useState<string>(settings.ambientSound || 'none');
  const [ambientVolume, setAmbientVolumeState] = useState<number>(settings.ambientVolume ?? 0.35);

  // Save to storage automatically on change
  useEffect(() => { saveToStorage(STORAGE_KEYS.TASKS, tasks); }, [tasks]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.CATEGORIES, categories); }, [categories]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.APP_LIMITS, appLimits); }, [appLimits]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.DISTRACTIONS, distractions); }, [distractions]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.REFLECTIONS, reflections); }, [reflections]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.SETTINGS, settings); }, [settings]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.MOMENTUM, momentum); }, [momentum]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.PROJECTS, projects); }, [projects]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.REMINDERS, reminders); }, [reminders]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.USER_PROFILE, userProfile); }, [userProfile]);

  // User Profile & Onboarding Handlers
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...updates };
      if (updates.name) {
        setSettings(s => ({ ...s, userName: updates.name! }));
      }
      return updated;
    });
  };

  const openOnboarding = () => setIsOnboardingOpen(true);
  const closeOnboarding = () => setIsOnboardingOpen(false);

  const completeOnboarding = (data: {
    name: string;
    role: string;
    quote?: string;
    avatarStyle?: UserProfile['avatarStyle'];
    tasks?: Array<{ title: string; categoryId: string; priority: Priority; estimatedMinutes: number }>;
  }) => {
    updateUserProfile({
      name: data.name || 'Emily',
      role: data.role || 'Productivity & Focus Explorer',
      quote: data.quote || 'Small progress every day adds up to big results 🌱',
      avatarStyle: data.avatarStyle || 'emily',
      hasCompletedOnboarding: true
    });

    if (data.tasks && data.tasks.length > 0) {
      const newTasks: Task[] = data.tasks.map((t, index) => ({
        id: 'task-' + generateId(),
        title: t.title,
        categoryId: t.categoryId,
        priority: t.priority || 'P2',
        estimatedMinutes: t.estimatedMinutes || 30,
        scheduledTime: index === 0 ? '09:00 AM' : index === 1 ? '11:00 AM' : index === 2 ? '02:00 PM' : '04:00 PM',
        scheduledDuration: t.estimatedMinutes || 30,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      }));
      setTasks(newTasks);
    }

    setIsOnboardingOpen(false);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const resetToNewUser = () => {
    const freshProfile: UserProfile = {
      ...INITIAL_USER_PROFILE,
      hasCompletedOnboarding: false
    };
    setUserProfile(freshProfile);
    setProjects(INITIAL_PROJECTS);
    setReminders(INITIAL_REMINDERS);
    setTasks(INITIAL_TASKS);
    setIsOnboardingOpen(true);
  };

  // Projects Handlers
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProj: Project = { ...project, id: 'proj-' + generateId() };
    setProjects(prev => [...prev, newProj]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Reminders Handlers
  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newRem: Reminder = { ...reminder, id: 'rem-' + generateId() };
    setReminders(prev => [...prev, newRem]);
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  // Timer Tick Hook
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && focusSecondsRemaining > 0) {
      interval = setInterval(() => {
        setFocusSecondsRemaining(prev => {
          if (prev <= 1) {
            handleSessionCompletedNatural();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, focusSecondsRemaining]);

  const handleSessionCompletedNatural = () => {
    setIsTimerRunning(false);
    if (activeFocusSession) {
      const finished: FocusSession = {
        ...activeFocusSession,
        completedMinutes: activeFocusSession.targetMinutes,
        endedAt: new Date().toISOString(),
        completed: true,
      };
      setLastCompletedSession(finished);
      setActiveFocusSession(null);
      setIsFocusModalOpen(false);

      if (settings.enableSoundEffects) {
        soundEngine.playChime('complete');
      }

      // Celebrate gently
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10b981', '#6366f1', '#f59e0b', '#38bdf8']
        });
      } catch (e) {
        console.warn('Confetti skipped:', e);
      }

      // Award return momentum
      setMomentum(prev => ({
        ...prev,
        currentMomentumScore: Math.min(100, prev.currentMomentumScore + 5),
        mindfulChoicesCount: prev.mindfulChoicesCount + 1,
      }));
    }
  };

  // Task Handlers
  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const created: Task = {
      ...newTask,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [created, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addCategory = (newCat: Omit<Category, 'id'>) => {
    const created: Category = {
      ...newCat,
      id: 'cat-' + generateId(),
      isCustom: true,
    };
    setCategories(prev => [...prev, created]);
  };

  // Focus Handlers
  const startFocusSession = (task?: Task, durationMinutes?: number) => {
    const duration = durationMinutes || settings.focusPresetMinutes || 25;
    const session: FocusSession = {
      id: generateId(),
      taskId: task?.id,
      taskTitle: task?.title || 'Intentional Deep Focus',
      targetMinutes: duration,
      completedMinutes: 0,
      startedAt: new Date().toISOString(),
      completed: false,
      distractionParkingLot: [],
      interruptionCount: 0,
      gentleReturnsCount: 0,
      perceivedFocus: 5,
    };

    setActiveFocusSession(session);
    setFocusSecondsRemaining(duration * 60);
    setIsTimerRunning(true);
    setIsFocusModalOpen(true);

    if (task) {
      updateTask(task.id, { status: 'in_progress' });
    }

    if (settings.enableSoundEffects) {
      soundEngine.playChime('start');
    }
  };

  const pauseFocusTimer = () => {
    setIsTimerRunning(false);
  };

  const resumeFocusTimer = () => {
    setIsTimerRunning(true);
  };

  const stopFocusSession = (completed = false) => {
    setIsTimerRunning(false);
    if (activeFocusSession) {
      const elapsedMinutes = Math.max(1, Math.round((activeFocusSession.targetMinutes * 60 - focusSecondsRemaining) / 60));
      const finished: FocusSession = {
        ...activeFocusSession,
        completedMinutes: elapsedMinutes,
        endedAt: new Date().toISOString(),
        completed,
      };

      if (activeFocusSession.taskId && completed) {
        updateTask(activeFocusSession.taskId, { status: 'completed', completedAt: new Date().toISOString() });
      }

      setLastCompletedSession(finished);
      setActiveFocusSession(null);
    }
    setIsFocusModalOpen(false);
  };

  const addParkingLotItem = (text: string) => {
    if (!text.trim()) return;
    const item: ParkingLotItem = {
      id: generateId(),
      text: text.trim(),
      timestamp: new Date().toISOString(),
      sessionId: activeFocusSession?.id,
    };
    if (activeFocusSession) {
      setActiveFocusSession({
        ...activeFocusSession,
        distractionParkingLot: [...activeFocusSession.distractionParkingLot, item]
      });
    }
  };

  const closeFocusModal = () => {
    setIsFocusModalOpen(false);
  };

  const dismissSummaryModal = () => {
    setLastCompletedSession(null);
  };

  // Anti-Scrolling & Distraction Interception Handlers
  const triggerDistractionIntercept = (appName: string) => {
    setActiveIntercept({
      isOpen: true,
      appName,
      stage: 'pause'
    });
  };

  const setDistractionReason = (reason: DistractionReason) => {
    if (activeIntercept) {
      setActiveIntercept({
        ...activeIntercept,
        reason,
        stage: 'gentle_return'
      });
    }
  };

  const proceedToGentleReturn = () => {
    if (activeIntercept) {
      setActiveIntercept({
        ...activeIntercept,
        stage: 'reason'
      });
    }
  };

  const completeGentleReturn = (choice: 'resume_task' | 'micro_focus_5m' | 'intentional_break') => {
    if (!activeIntercept) return;

    const newDistractionEvent: DistractionEvent = {
      id: generateId(),
      appName: activeIntercept.appName,
      appCategory: 'social',
      urlOrTitle: `${activeIntercept.appName.toLowerCase().replace(/\s+/g, '')}.com`,
      timestamp: new Date().toISOString(),
      timeSpentSeconds: 0,
      intercepted: true,
      reason: activeIntercept.reason || 'habitual',
      gentleReturnChoice: choice,
      momentumAwarded: true
    };

    setDistractions(prev => [newDistractionEvent, ...prev]);

    // Update Momentum (Non-judgmental, purely positive!)
    setMomentum(prev => ({
      ...prev,
      totalReturns: prev.totalReturns + 1,
      currentMomentumScore: Math.min(100, prev.currentMomentumScore + 6),
      screenTimeSavedMinutes: prev.screenTimeSavedMinutes + 12,
      mindfulChoicesCount: prev.mindfulChoicesCount + 1,
      lastReturnTimestamp: new Date().toISOString()
    }));

    if (settings.enableSoundEffects) {
      soundEngine.playChime('return_momentum');
    }

    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#34d399', '#38bdf8', '#818cf8']
      });
    } catch {
      // ignore
    }

    setActiveIntercept(null);

    // Follow through with the chosen action
    if (choice === 'resume_task') {
      const topTask = tasks.find(t => t.status === 'scheduled' || t.status === 'in_progress') || tasks[0];
      if (topTask) {
        startFocusSession(topTask, 20);
      }
    } else if (choice === 'micro_focus_5m') {
      const topTask = tasks.find(t => t.status === 'scheduled') || tasks[0];
      startFocusSession(topTask, 5);
    } else if (choice === 'intentional_break') {
      // Start 5 min mindful rest
      startFocusSession(undefined, 5);
    }
  };

  const cancelIntercept = () => {
    setActiveIntercept(null);
  };

  const updateAppLimit = (id: string, updates: Partial<AppLimit>) => {
    setAppLimits(prev => prev.map(limit => limit.id === id ? { ...limit, ...updates } : limit));
  };

  // Soundscape handlers
  const setAmbientSound = (type: 'none' | 'rain' | 'forest' | 'brown_noise' | 'tibetan_bowl') => {
    setCurrentAmbientState(type);
    updateSettings({ ambientSound: type });
    if (type === 'none') {
      soundEngine.stopAmbient();
    } else {
      soundEngine.startAmbient(type as 'rain' | 'forest' | 'brown_noise' | 'tibetan_bowl', ambientVolume);
    }
  };

  const setAmbientVolume = (volume: number) => {
    setAmbientVolumeState(volume);
    soundEngine.setAmbientVolume(volume);
    updateSettings({ ambientVolume: volume });
  };

  // Settings & Storage Handlers
  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const addReflection = (reflection: Omit<WeeklyReflection, 'id' | 'createdAt'>) => {
    const created: WeeklyReflection = {
      ...reflection,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    setReflections(prev => [created, ...prev]);
  };

  const exportDatabase = () => {
    return exportAllData();
  };

  const importDatabase = (json: string): boolean => {
    const ok = importAllData(json);
    if (ok) {
      setTasks(loadFromStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS));
      setCategories(loadFromStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES));
      setAppLimits(loadFromStorage(STORAGE_KEYS.APP_LIMITS, INITIAL_APP_LIMITS));
      setDistractions(loadFromStorage(STORAGE_KEYS.DISTRACTIONS, INITIAL_DISTRACTION_EVENTS));
      setReflections(loadFromStorage(STORAGE_KEYS.REFLECTIONS, []));
      setSettings(loadFromStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS));
      setMomentum(loadFromStorage(STORAGE_KEYS.MOMENTUM, INITIAL_MOMENTUM_STATS));
      setProjects(loadFromStorage(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS));
      setReminders(loadFromStorage(STORAGE_KEYS.REMINDERS, INITIAL_REMINDERS));
      setUserProfile(loadFromStorage(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE));
    }
    return ok;
  };

  const resetAllData = () => {
    localStorage.clear();
    setTasks(INITIAL_TASKS);
    setCategories(DEFAULT_CATEGORIES);
    setAppLimits(INITIAL_APP_LIMITS);
    setDistractions(INITIAL_DISTRACTION_EVENTS);
    setReflections([]);
    setSettings(INITIAL_SETTINGS);
    setMomentum(INITIAL_MOMENTUM_STATS);
    setProjects(INITIAL_PROJECTS);
    setReminders(INITIAL_REMINDERS);
    setUserProfile(INITIAL_USER_PROFILE);
    setIsOnboardingOpen(true);
  };

  return (
    <MindSpaceContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        isOnboardingOpen,
        openOnboarding,
        closeOnboarding,
        completeOnboarding,
        resetToNewUser,
        projects,
        addProject,
        updateProject,
        deleteProject,
        reminders,
        addReminder,
        updateReminder,
        deleteReminder,
        tasks,
        categories,
        addTask,
        updateTask,
        deleteTask,
        addCategory,
        activeFocusSession,
        isFocusModalOpen,
        focusSecondsRemaining,
        isTimerRunning,
        startFocusSession,
        pauseFocusTimer,
        resumeFocusTimer,
        stopFocusSession,
        addParkingLotItem,
        closeFocusModal,
        lastCompletedSession,
        dismissSummaryModal,
        distractions,
        appLimits,
        updateAppLimit,
        activeIntercept,
        triggerDistractionIntercept,
        setDistractionReason,
        proceedToGentleReturn,
        completeGentleReturn,
        cancelIntercept,
        alternatives,
        momentum,
        reflections,
        addReflection,
        currentAmbient,
        ambientVolume,
        setAmbientSound,
        setAmbientVolume,
        settings,
        updateSettings,
        exportDatabase,
        importDatabase,
        resetAllData,
        currentTab,
        setCurrentTab
      }}
    >
      {children}
    </MindSpaceContext.Provider>
  );
};

export const useMindSpace = () => {
  const context = useContext(MindSpaceContext);
  if (!context) {
    throw new Error('useMindSpace must be used within a MindSpaceProvider');
  }
  return context;
};
