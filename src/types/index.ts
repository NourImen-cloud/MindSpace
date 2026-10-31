export type Priority = 'P1' | 'P2' | 'P3' | 'P4'; // P1: Urgent, P2: High, P3: Medium, P4: Low

export type TaskStatus = 'backlog' | 'scheduled' | 'in_progress' | 'completed';

export interface Category {
  id: string;
  name: string;
  color: string; // hex or tailwind color class
  icon: string;
  description?: string;
  isCustom?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  categoryId: string;
  priority: Priority;
  estimatedMinutes: number;
  actualMinutes?: number;
  scheduledTime?: string; // e.g. "09:00 AM"
  scheduledDuration?: number; // minutes
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;
  tags?: string[];
  energyLevel?: 'low' | 'medium' | 'high';
}

export interface ParkingLotItem {
  id: string;
  text: string;
  timestamp: string;
  sessionId?: string;
  convertedToTaskId?: string;
}

export interface FocusSession {
  id: string;
  taskId?: string;
  taskTitle: string;
  targetMinutes: number;
  completedMinutes: number;
  startedAt: string;
  endedAt?: string;
  completed: boolean;
  distractionParkingLot: ParkingLotItem[];
  interruptionCount: number;
  gentleReturnsCount: number;
  reflectionNotes?: string;
  perceivedFocus: 1 | 2 | 3 | 4 | 5; // 1-5 calm rating
}

export type DistractionReason = 
  | 'boredom'
  | 'avoiding_task'
  | 'need_break'
  | 'habitual'
  | 'specific_check'
  | 'other';

export interface DistractionEvent {
  id: string;
  appName: string;
  appCategory: 'social' | 'entertainment' | 'news' | 'messaging' | 'shopping';
  urlOrTitle: string;
  timestamp: string;
  timeSpentSeconds: number;
  intercepted: boolean;
  reason?: DistractionReason;
  gentleReturnChoice?: 'resume_task' | 'micro_focus_5m' | 'intentional_break';
  momentumAwarded: boolean;
}

export interface AppLimit {
  id: string;
  appName: string;
  dailyLimitMinutes: number;
  todayUsedMinutes: number;
  icon: string;
  blocked: boolean;
  strictLock: boolean; // if true, hard cooldown
  category: 'social' | 'entertainment' | 'news' | 'other';
}

export interface AlternativeActivity {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  category: 'physical' | 'mindful' | 'learning' | 'restorative' | 'creative';
  icon: string;
  suitableReasons: DistractionReason[];
}

export interface WeeklyReflection {
  id: string;
  weekStartDate: string;
  winsAndHighlights: string;
  mainDistractionsFaced: string;
  recurringTriggers: string[];
  adjustmentsForNextWeek: string;
  mindfulnessRating: number; // 1-10
  createdAt: string;
}

export interface UserSettings {
  userName: string;
  focusPresetMinutes: number;
  breakDurationMinutes: number;
  enableSoundEffects: boolean;
  ambientSound: 'none' | 'rain' | 'forest' | 'brown_noise' | 'tibetan_bowl';
  ambientVolume: number;
  enableIntentionalPause: boolean;
  pauseBreathingSeconds: number;
  enableDistractionBlocking: boolean;
  enableStrictBlocking: boolean;
  cloudSyncEnabled: boolean;
  localOnlyMode: boolean;
  deviceSyncId: string;
  telemetryEnabled: boolean;
  viewMode: 'desktop' | 'mobile_preview' | 'showcase';
}

export interface ReturnMomentumStats {
  totalReturns: number;
  currentMomentumScore: number;
  screenTimeSavedMinutes: number;
  mindfulChoicesCount: number;
  studyStreakDays: number;
  lastReturnTimestamp?: string;
}
