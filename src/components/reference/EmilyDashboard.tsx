import React, { useState } from 'react';
import { 
  Home, 
  CheckSquare, 
  FolderKanban, 
  Calendar as CalendarIcon, 
  BarChart2, 
  MessageSquare, 
  Users, 
  Settings as SettingsIcon, 
  Search, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Check, 
  Heart, 
  Clock, 
  Video, 
  Sparkles,
  ShieldAlert,
  RotateCcw,
  Compass,
  Bot,
  Zap,
  Play,
  Edit2,
  Trash2,
  X,
  Sliders,
  CalendarCheck,
  UserCheck,
  Flag
} from 'lucide-react';
import { 
  EmilyAvatar, 
  SmilingPlantPot, 
  ClayCloud, 
  ClayClipboard, 
  ClayCalendarIcon, 
  ClayFlag, 
  ClayStar, 
  ClayBunnyWithHeart, 
  BunnyProfileIcon,
  ClayFolder,
  ClayShield,
  ClayZenMug 
} from './ClayIcons';
import { useMindSpace } from '../../store/MindSpaceContext';
import { AntiScrollingView } from '../features/AntiScrollingView';
import { GentleReturnView } from '../features/GentleReturnView';
import { SmartPlannerView } from '../features/SmartPlannerView';
import { FocusModeView } from '../focus/FocusModeView';
import { AlternativeLibrary } from '../alternatives/AlternativeLibrary';
import { WeeklyReflectionModal } from '../wellbeing/WeeklyReflectionModal';
import { SettingsView } from '../settings/SettingsView';
import { Project, Reminder, Task, Priority, UserProfile } from '../../types';

export const EmilyDashboard: React.FC = () => {
  const { 
    startFocusSession, 
    tasks, 
    addTask,
    updateTask,
    deleteTask,
    categories,
    projects,
    addProject,
    updateProject,
    deleteProject,
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    userProfile,
    updateUserProfile,
    openOnboarding,
    resetToNewUser,
    triggerDistractionIntercept, 
    momentum, 
    appLimits 
  } = useMindSpace();

  const [activeNav, setActiveNav] = useState<string>('dashboard');

  // Interactive Calendar Selection
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [calendarMonth, setCalendarMonth] = useState('May 2024');

  // Interactive Chart Range Selector
  const [chartRange, setChartRange] = useState<'This Week' | 'Last Week' | 'This Month'>('This Week');
  const [activePointIndex, setActivePointIndex] = useState<number>(5); // Sat default

  // Modals state for Editability
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: userProfile.name,
    role: userProfile.role,
    subtitle: userProfile.subtitle,
    quote: userProfile.quote,
    avatarStyle: userProfile.avatarStyle
  });

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<{
    name: string;
    percent: number;
    color: Project['color'];
  }>({
    name: '',
    percent: 50,
    color: 'purple'
  });

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskForm, setTaskForm] = useState<{
    title: string;
    priority: Priority;
    categoryId: string;
    estimatedMinutes: number;
  }>({
    title: '',
    priority: 'P2',
    categoryId: 'cat-projects',
    estimatedMinutes: 30
  });

  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [reminderForm, setReminderForm] = useState<{
    title: string;
    timeStr: string;
    type: Reminder['type'];
  }>({
    title: '',
    timeStr: 'Today, 10:00 AM',
    type: 'clock'
  });

  const [isAffirmationModalOpen, setIsAffirmationModalOpen] = useState(false);
  const [affirmationText, setAffirmationText] = useState(userProfile.quote || "Keep up the good work and don't forget to take care of yourself 💜");

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Active Task for Focus Sanctuary
  const activeTask = tasks.find(t => t.status === 'scheduled') || tasks[0];

  // Companion Avatar Component Renderer
  const renderAvatar = (style?: UserProfile['avatarStyle'], size = 'w-32 h-32') => {
    switch (style) {
      case 'bunny': return <ClayBunnyWithHeart className={size} />;
      case 'plant': return <SmilingPlantPot className={size} />;
      case 'bear': return <BunnyProfileIcon className={size} />;
      default: return <EmilyAvatar className={size} />;
    }
  };

  // Color mapping helper for project folders
  const getProjectBarClass = (color: Project['color']) => {
    switch (color) {
      case 'purple': return 'bg-[#8B5CF6]';
      case 'pink': return 'bg-[#FB7185]';
      case 'green': return 'bg-[#4ADE80]';
      case 'yellow': return 'bg-[#FACC15]';
      case 'blue': return 'bg-[#38BDF8]';
      case 'rose': return 'bg-[#F43F5E]';
      default: return 'bg-[#8B5CF6]';
    }
  };

  // Profile Edit Handlers
  const openEditProfile = () => {
    setProfileForm({
      name: userProfile.name,
      role: userProfile.role,
      subtitle: userProfile.subtitle,
      quote: userProfile.quote,
      avatarStyle: userProfile.avatarStyle
    });
    setIsProfileModalOpen(true);
  };

  const handleSaveProfile = () => {
    updateUserProfile(profileForm);
    setIsProfileModalOpen(false);
  };

  // Project CRUD Handlers
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectForm({ name: '', percent: 50, color: 'purple' });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({
      name: proj.name,
      percent: proj.percent,
      color: proj.color
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = () => {
    if (!projectForm.name.trim()) return;
    if (editingProject) {
      updateProject(editingProject.id, projectForm);
    } else {
      addProject(projectForm);
    }
    setIsProjectModalOpen(false);
  };

  // Task CRUD Handlers
  const handleOpenAddTask = () => {
    setEditingTask(null);
    setTaskForm({
      title: '',
      priority: 'P2',
      categoryId: categories[0]?.id || 'cat-projects',
      estimatedMinutes: 30
    });
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      priority: task.priority,
      categoryId: task.categoryId,
      estimatedMinutes: task.estimatedMinutes
    });
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = () => {
    if (!taskForm.title.trim()) return;
    if (editingTask) {
      updateTask(editingTask.id, taskForm);
    } else {
      addTask({
        ...taskForm,
        status: 'scheduled',
        scheduledTime: '09:00 AM',
        scheduledDuration: taskForm.estimatedMinutes
      });
    }
    setIsTaskModalOpen(false);
  };

  const handleToggleTaskStatus = (task: Task) => {
    const isCompleted = task.status === 'completed';
    updateTask(task.id, {
      status: isCompleted ? 'scheduled' : 'completed',
      completedAt: isCompleted ? undefined : new Date().toISOString()
    });
  };

  // Reminder CRUD Handlers
  const handleOpenAddReminder = () => {
    setEditingReminder(null);
    setReminderForm({
      title: '',
      timeStr: 'Today, 10:00 AM',
      type: 'clock'
    });
    setIsReminderModalOpen(true);
  };

  const handleOpenEditReminder = (rem: Reminder) => {
    setEditingReminder(rem);
    setReminderForm({
      title: rem.title,
      timeStr: rem.timeStr,
      type: rem.type
    });
    setIsReminderModalOpen(true);
  };

  const handleSaveReminder = () => {
    if (!reminderForm.title.trim()) return;
    if (editingReminder) {
      updateReminder(editingReminder.id, reminderForm);
    } else {
      addReminder(reminderForm);
    }
    setIsReminderModalOpen(false);
  };

  // Save Motivation Affirmation
  const handleSaveAffirmation = () => {
    updateUserProfile({ quote: affirmationText });
    setIsAffirmationModalOpen(false);
  };

  // Computed metrics
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'scheduled' || t.status === 'in_progress').length;
  const tasksDoneDisplay = 24 + completedCount;
  const completedDisplay = 56 + completedCount;
  const focusTimeDisplay = `${Math.max(18, 18 + Math.floor(momentum.screenTimeSavedMinutes / 60))}h`;

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-slate-800 p-3 sm:p-5 lg:p-7 font-['Nunito',sans-serif]">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-5 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT SIDEBAR (MINDSPACE Three Pillars + Editable User Profile)            */}
        {/* ========================================================================= */}
        <aside className="w-full lg:w-[250px] shrink-0 bg-[#ECE8F8] rounded-[32px] p-4 flex flex-col justify-between gap-5 shadow-sm border border-[#E2DCF2]">
          <div className="space-y-4">
            
            {/* 1. Emily Profile Avatar Card (Click to Edit!) */}
            <div 
              onClick={openEditProfile}
              className="group relative flex flex-col items-center text-center cursor-pointer p-2 rounded-3xl hover:bg-white/40 transition-all"
              title="Click to edit your profile and avatar"
            >
              <div className="w-full bg-white rounded-[26px] p-2.5 shadow-[0_4px_16px_rgba(139,92,246,0.06)] flex items-center justify-center relative overflow-hidden">
                {renderAvatar(userProfile.avatarStyle, 'w-32 h-32')}
                <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-[26px]">
                  <span className="bg-white/95 text-purple-700 text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </span>
                </div>
              </div>

              <div className="mt-2.5">
                <div className="font-extrabold text-lg text-slate-800 flex items-center justify-center gap-1 group-hover:text-purple-700 transition-colors">
                  <span>{userProfile.name}</span>
                  <span className="text-purple-600 text-sm">💜</span>
                </div>
                <div className="text-[11px] font-bold text-purple-600/70 flex items-center justify-center gap-1">
                  <span>{userProfile.role}</span>
                  <span className="text-amber-400 text-xs">✨</span>
                </div>
              </div>
            </div>

            {/* 2. Navigation Menu Organized by 3 Pillars */}
            <nav className="space-y-3">
              {/* Pillar 0: Overview */}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveNav('dashboard')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all text-left ${
                    activeNav === 'dashboard'
                      ? 'bg-[#DDD6FE] text-[#4C1D95] shadow-xs'
                      : 'text-slate-600 hover:text-purple-800 hover:bg-white/40'
                  }`}
                >
                  <Home className="w-4 h-4 stroke-[2.4]" />
                  <span>Dashboard</span>
                </button>
              </div>

              {/* Pillar 1: SIGNATURE SANCTUARY */}
              <div className="space-y-1">
                <div className="px-3 text-[9px] font-black uppercase tracking-wider text-purple-700/60">
                  Signature Features ✨
                </div>

                <button
                  onClick={() => setActiveNav('antiscroll')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-black transition-all text-left ${
                    activeNav === 'antiscroll'
                      ? 'bg-rose-100 text-rose-800 shadow-xs'
                      : 'text-slate-600 hover:text-rose-700 hover:bg-white/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span>Anti-Scrolling</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                </button>

                <button
                  onClick={() => setActiveNav('focus')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-black transition-all text-left ${
                    activeNav === 'focus'
                      ? 'bg-purple-200 text-purple-900 shadow-xs'
                      : 'text-slate-600 hover:text-purple-800 hover:bg-white/40'
                  }`}
                >
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>Focus Mode</span>
                </button>

                <button
                  onClick={() => setActiveNav('momentum')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-black transition-all text-left ${
                    activeNav === 'momentum'
                      ? 'bg-pink-100 text-pink-800 shadow-xs'
                      : 'text-slate-600 hover:text-pink-800 hover:bg-white/40'
                  }`}
                >
                  <RotateCcw className="w-4 h-4 text-pink-500" />
                  <span>Gentle Return</span>
                </button>
              </div>

              {/* Pillar 2: PRODUCTIVITY */}
              <div className="space-y-1">
                <div className="px-3 text-[9px] font-black uppercase tracking-wider text-purple-700/60">
                  Productivity 📚
                </div>

                <button
                  onClick={() => setActiveNav('planner')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeNav === 'planner'
                      ? 'bg-indigo-100 text-indigo-900 shadow-xs'
                      : 'text-slate-600 hover:text-indigo-800 hover:bg-white/40'
                  }`}
                >
                  <CalendarIcon className="w-4 h-4 text-indigo-600" />
                  <span>Smart Planner</span>
                </button>

                <button
                  onClick={() => setActiveNav('tasks')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeNav === 'tasks'
                      ? 'bg-purple-100 text-purple-900 shadow-xs'
                      : 'text-slate-600 hover:text-purple-800 hover:bg-white/40'
                  }`}
                >
                  <CheckSquare className="w-4 h-4 text-purple-600" />
                  <span>5 Categories</span>
                </button>
              </div>

              {/* Pillar 3: DIGITAL WELLBEING */}
              <div className="space-y-1">
                <div className="px-3 text-[9px] font-black uppercase tracking-wider text-purple-700/60">
                  Digital Wellbeing 🌿
                </div>

                <button
                  onClick={() => setActiveNav('alternatives')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeNav === 'alternatives'
                      ? 'bg-amber-100 text-amber-900 shadow-xs'
                      : 'text-slate-600 hover:text-amber-800 hover:bg-white/40'
                  }`}
                >
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>Alternatives</span>
                </button>

                <button
                  onClick={() => setActiveNav('reflection')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeNav === 'reflection'
                      ? 'bg-teal-100 text-teal-900 shadow-xs'
                      : 'text-slate-600 hover:text-teal-800 hover:bg-white/40'
                  }`}
                >
                  <BarChart2 className="w-4 h-4 text-teal-600" />
                  <span>AI Reflections</span>
                </button>

                <button
                  onClick={() => setActiveNav('settings')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeNav === 'settings'
                      ? 'bg-slate-200 text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  }`}
                >
                  <SettingsIcon className="w-4 h-4 text-slate-500" />
                  <span>Settings</span>
                </button>
              </div>
            </nav>
          </div>

          {/* 3. Bottom Plant Encouragement Card (Click to Edit Quote!) */}
          <div 
            onClick={() => setIsAffirmationModalOpen(true)}
            className="group bg-white rounded-2xl p-2.5 shadow-sm border border-purple-50 flex items-center gap-2.5 cursor-pointer hover:border-purple-200 transition-colors"
            title="Click to edit daily affirmation"
          >
            <SmilingPlantPot className="w-10 h-10 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold text-slate-700 leading-tight truncate">
                {userProfile.quote || 'Small progress every day adds up to big results 🌱'}
              </p>
              <span className="text-[9px] font-black text-purple-600/70 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to edit
              </span>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* RIGHT MAIN CONTENT AREA                                                   */}
        {/* ========================================================================= */}
        <main className="flex-1 min-w-0 space-y-5">
          
          {/* Active Tab Router */}
          {activeNav === 'antiscroll' && <AntiScrollingView />}
          {activeNav === 'focus' && <FocusModeView />}
          {activeNav === 'momentum' && <GentleReturnView />}
          {activeNav === 'planner' && <SmartPlannerView />}
          {activeNav === 'tasks' && <SmartPlannerView />}
          {activeNav === 'alternatives' && <AlternativeLibrary />}
          {activeNav === 'reflection' && <WeeklyReflectionModal />}
          {activeNav === 'settings' && <SettingsView />}

          {/* MAIN REFERENCE DASHBOARD (When activeNav === 'dashboard') */}
          {activeNav === 'dashboard' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* TOP HEADER: Greeting + Personalize & First-Time Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div 
                  onClick={openEditProfile}
                  className="cursor-pointer group"
                  title="Click to edit greeting and subtitle"
                >
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight flex items-center gap-2 font-['Quicksand',sans-serif] group-hover:text-purple-800 transition-colors">
                      <span>Good morning, {userProfile.name}!</span>
                      <ClayCloud className="w-7 h-7 -mt-1 inline-block" />
                      <Edit2 className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h1>
                  </div>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">
                    {userProfile.subtitle || "Let's make today productive and amazing!"}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                  {/* First-Time Setup / Personalize Button */}
                  <button
                    onClick={openOnboarding}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black shadow-xs hover:opacity-95 transition-all active:scale-95"
                    title="Run the First-Time Onboarding Flow to set tasks and check your schedule"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>New User Setup</span>
                  </button>

                  {/* Check Schedule Button */}
                  <button
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E9E4D8] text-purple-800 text-xs font-black shadow-xs hover:bg-purple-50 transition-all active:scale-95"
                    title="Check Today's Schedule Timeline"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Check Schedule</span>
                  </button>

                  {/* Search Bar */}
                  <div className="relative hidden md:block">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-36 bg-white border border-[#E9E4D8] rounded-full pl-8 pr-3 py-1.5 text-xs font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-purple-400 shadow-xs"
                    />
                  </div>

                  {/* Notification Bell */}
                  <button 
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="relative w-8 h-8 rounded-full bg-white border border-[#E9E4D8] flex items-center justify-center text-slate-600 shadow-xs hover:bg-slate-50 transition-colors"
                  >
                    <Bell className="w-3.5 h-3.5 fill-slate-500 text-slate-500" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#F43F5E] text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-xs">
                      {reminders.length}
                    </span>
                  </button>

                  {/* Avatar Profile Button */}
                  <button 
                    onClick={openEditProfile}
                    className="w-8 h-8 rounded-full bg-white border border-[#E9E4D8] flex items-center justify-center shadow-xs hover:scale-105 transition-transform"
                    title="Edit Profile"
                  >
                    <BunnyProfileIcon className="w-7 h-7" />
                  </button>
                </div>
              </div>

              {/* SIGNATURE QUICK BAR: 1-Click Distraction Interceptor & Focus Launcher */}
              <div className="p-3 px-4 rounded-[22px] bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100 border border-purple-200/80 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
                <div className="flex items-center gap-2 font-black text-purple-900">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>MINDSPACE Shield: Active</span>
                  <span className="hidden sm:inline font-medium text-purple-700">
                    • {momentum.totalReturns} mindful returns (+{Math.round(momentum.screenTimeSavedMinutes / 60)}h screen time reclaimed)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => triggerDistractionIntercept('Instagram')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-rose-600 border border-rose-200 text-xs font-black shadow-xs hover:bg-rose-50 transition-all active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>Test Anti-Scroll Intercept 🌸</span>
                  </button>
                  <button
                    onClick={() => startFocusSession(activeTask, 25)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black shadow-xs hover:opacity-95 transition-all active:scale-95"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Focus Sanctuary (25m)</span>
                  </button>
                </div>
              </div>

              {/* ROW 1: 4 Metric Cards (Tasks Done, In Progress, Completed, Focus Time) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                
                {/* Card 1: Tasks Done */}
                <div 
                  onClick={() => setActiveNav('planner')}
                  className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="shrink-0">
                    <ClayClipboard className="w-13 h-13" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-extrabold text-slate-500">Tasks Done</div>
                    <div className="text-2xl font-black text-slate-900 leading-none">{tasksDoneDisplay}</div>
                    <div className="text-[10px] font-extrabold text-[#7C3AED]">
                      +{completedCount} today
                    </div>
                  </div>
                </div>

                {/* Card 2: In Progress */}
                <div 
                  onClick={() => setActiveNav('planner')}
                  className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="shrink-0">
                    <ClayCalendarIcon className="w-13 h-13" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-extrabold text-slate-500">In Progress</div>
                    <div className="text-2xl font-black text-slate-900 leading-none">{inProgressCount}</div>
                    <div className="text-[10px] font-extrabold text-[#F43F5E]">
                      {projects.length} projects
                    </div>
                  </div>
                </div>

                {/* Card 3: Completed */}
                <div 
                  onClick={() => setActiveNav('reflection')}
                  className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="shrink-0">
                    <ClayFlag className="w-13 h-13" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-extrabold text-slate-500">Completed</div>
                    <div className="text-2xl font-black text-slate-900 leading-none">{completedDisplay}</div>
                    <div className="text-[10px] font-extrabold text-[#10B981]">
                      This month
                    </div>
                  </div>
                </div>

                {/* Card 4: Focus Time */}
                <div 
                  onClick={() => startFocusSession(activeTask, 25)}
                  className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="shrink-0">
                    <ClayStar className="w-13 h-13" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-extrabold text-slate-500">Focus Time</div>
                    <div className="text-2xl font-black text-slate-900 leading-none">{focusTimeDisplay}</div>
                    <div className="text-[10px] font-extrabold text-[#D97706]">
                      +4h from last week
                    </div>
                  </div>
                </div>

              </div>

              {/* ROW 2: Productivity Overview Chart & Calendar Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
                
                {/* Left: Productivity Overview Line Chart (xl:col-span-8) */}
                <div className="xl:col-span-8 bg-white rounded-[28px] p-5 sm:p-6 border border-[#ECE6D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 font-['Quicksand',sans-serif]">
                      Productivity Overview
                    </h3>
                    <div className="flex items-center gap-1.5">
                      {(['This Week', 'Last Week', 'This Month'] as const).map(range => (
                        <button
                          key={range}
                          onClick={() => setChartRange(range)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                            chartRange === range
                              ? 'bg-[#DDD6FE] text-[#5B21B6]'
                              : 'bg-[#FAF7F2] border border-[#E9E4D8] text-slate-600 hover:bg-[#F3EFE7]'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Line Chart */}
                  <div className="relative pt-6 pb-2">
                    {/* Tooltip over Active node */}
                    <div 
                      className="absolute top-0 z-10 flex flex-col items-center transition-all duration-300"
                      style={{ left: `${(activePointIndex / 6) * 85 + 4}%` }}
                    >
                      <div className="bg-[#DDD6FE] text-[#5B21B6] text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                        <span>Great job!</span>
                        <span>🎉</span>
                      </div>
                      <div className="w-2 h-2 bg-[#DDD6FE] rotate-45 -mt-1" />
                    </div>

                    <div className="relative h-44 w-full">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines */}
                        <line x1="0" y1="0" x2="700" y2="0" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="0" y1="40" x2="700" y2="40" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="0" y1="80" x2="700" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="0" y1="120" x2="700" y2="120" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="0" y1="160" x2="700" y2="160" stroke="#F1F5F9" strokeWidth="1" />

                        {/* Area */}
                        <path
                          d="M 20 120 C 80 110, 110 100, 130 96 C 180 88, 220 54, 240 50 C 290 46, 320 80, 350 75 C 400 70, 440 38, 460 35 C 500 32, 530 20, 570 20 C 610 20, 650 25, 680 24 L 680 160 L 20 160 Z"
                          fill="url(#chartGradient2)"
                        />

                        {/* Line */}
                        <path
                          d="M 20 120 C 80 110, 110 100, 130 96 C 180 88, 220 54, 240 50 C 290 46, 320 80, 350 75 C 400 70, 440 38, 460 35 C 500 32, 530 20, 570 20 C 610 20, 650 25, 680 24"
                          fill="none"
                          stroke="#8B5CF6"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />

                        {/* Nodes */}
                        {[
                          { x: 20, y: 120 },
                          { x: 130, y: 96 },
                          { x: 240, y: 50 },
                          { x: 350, y: 75 },
                          { x: 460, y: 35 },
                          { x: 570, y: 20 },
                          { x: 680, y: 24 },
                        ].map((pt, i) => (
                          <circle
                            key={i}
                            cx={pt.x}
                            cy={pt.y}
                            r={activePointIndex === i ? 7 : 5.5}
                            fill={activePointIndex === i ? '#6D28D9' : '#7C3AED'}
                            stroke="#FFFFFF"
                            strokeWidth="2.5"
                            onClick={() => setActivePointIndex(i)}
                            className="shadow-sm cursor-pointer transition-transform hover:scale-125"
                          />
                        ))}
                      </svg>
                    </div>

                    <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-2 px-1">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, idx) => (
                        <span 
                          key={d} 
                          onClick={() => setActivePointIndex(idx)}
                          className={`cursor-pointer transition-colors ${activePointIndex === idx ? 'text-purple-700 font-black' : 'hover:text-slate-700'}`}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: May 2024 Interactive Calendar Card (xl:col-span-4) */}
                <div className="xl:col-span-4 bg-white rounded-[28px] p-5 border border-[#ECE6D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
                  <div className="flex items-center justify-between text-slate-800">
                    <button 
                      onClick={() => setCalendarMonth('April 2024')}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="text-xs font-black text-slate-900 font-['Quicksand',sans-serif]">
                      {calendarMonth}
                    </div>
                    <button 
                      onClick={() => setCalendarMonth('June 2024')}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 text-center text-[10px] font-extrabold text-slate-400">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span className="text-[#F43F5E]/70">Sat</span>
                    <span className="text-[#F43F5E]/70">Sun</span>
                  </div>

                  <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-bold">
                    <span className="text-slate-300 py-1">29</span>
                    <span className="text-slate-300 py-1">30</span>
                    {[...Array(31)].map((_, i) => {
                      const dayNum = i + 1;
                      const isSelected = selectedDay === dayNum;
                      const isWeekend = (dayNum + 2) % 7 === 0 || (dayNum + 1) % 7 === 0;

                      return (
                        <span 
                          key={dayNum} 
                          onClick={() => {
                            setSelectedDay(dayNum);
                            setIsScheduleModalOpen(true);
                          }}
                          className="py-1 cursor-pointer"
                        >
                          {isSelected ? (
                            <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white font-black inline-flex items-center justify-center shadow-xs">
                              {dayNum}
                            </span>
                          ) : (
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-purple-100 transition-colors ${
                              isWeekend ? 'text-[#F43F5E]' : 'text-slate-700'
                            }`}>
                              {dayNum}
                            </span>
                          )}
                        </span>
                      );
                    })}
                    <span className="text-slate-300 py-1">1</span>
                    <span className="text-slate-300 py-1">2</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-slate-500">Selected Day: May {selectedDay}</span>
                    <button
                      onClick={() => setIsScheduleModalOpen(true)}
                      className="text-purple-600 font-black hover:text-purple-800"
                    >
                      View Schedule →
                    </button>
                  </div>
                </div>

              </div>

              {/* ROW 3: My Projects (4 cols) | Top Tasks (4 cols) | Reminders & Motivation (4 cols) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5 items-start">
                
                {/* Column 1: My Projects Card (Fully Editable!) */}
                <div className="xl:col-span-4 bg-white rounded-[28px] p-5 border border-[#ECE6D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 font-['Quicksand',sans-serif]">My Projects</h3>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={handleOpenAddProject}
                        className="w-5 h-5 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center shadow-xs hover:bg-[#7C3AED] transition-colors"
                        title="Add New Project"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <button 
                        onClick={() => setActiveNav('planner')}
                        className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-[10px] font-black hover:bg-[#DDD6FE] transition-colors"
                      >
                        View all
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {projects.map(proj => (
                      <div 
                        key={proj.id} 
                        onClick={() => handleOpenEditProject(proj)}
                        className="group space-y-1 cursor-pointer p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                        title="Click to edit project name, progress, or color"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ClayFolder color={proj.color as any} className="w-5 h-5 shrink-0" />
                            <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                              {proj.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-500 font-mono">
                              {proj.percent}%
                            </span>
                            <Edit2 className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getProjectBarClass(proj.color)}`}
                            style={{ width: `${proj.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Top Tasks Card (Fully Editable!) */}
                <div className="xl:col-span-4 bg-white rounded-[28px] p-5 border border-[#ECE6D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 font-['Quicksand',sans-serif]">Top Tasks</h3>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={handleOpenAddTask}
                        className="w-5 h-5 rounded-lg bg-[#22C55E] text-white flex items-center justify-center shadow-xs hover:bg-[#16A34A] transition-colors"
                        title="Add New Task"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <button 
                        onClick={() => setActiveNav('tasks')}
                        className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-black hover:bg-[#BBF7D0] transition-colors"
                      >
                        View all
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {tasks.slice(0, 5).map(task => {
                      const isCompleted = task.status === 'completed';
                      const badgeColor = {
                        P1: 'bg-[#FEECEE] text-[#E11D48]',
                        P2: 'bg-[#FEF6E8] text-[#D97706]',
                        P3: 'bg-[#EFF6FF] text-[#2563EB]',
                        P4: 'bg-slate-100 text-slate-600'
                      }[task.priority] || 'bg-slate-100 text-slate-600';

                      const priorityLabel = {
                        P1: 'High',
                        P2: 'Medium',
                        P3: 'Low',
                        P4: 'Low'
                      }[task.priority] || 'Medium';

                      return (
                        <div
                          key={task.id}
                          className="group flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <button
                              onClick={() => handleToggleTaskStatus(task)}
                              className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                                isCompleted ? 'bg-[#22C55E]' : 'border-2 border-slate-300 bg-white hover:border-purple-400'
                              }`}
                            >
                              {isCompleted && <Check className="w-3 h-3 text-white stroke-[3]" />}
                            </button>
                            <span 
                              onClick={() => handleOpenEditTask(task)}
                              className={`text-xs font-bold truncate cursor-pointer hover:text-purple-700 transition-colors ${
                                isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
                              }`}
                              title="Click to edit task title or priority"
                            >
                              {task.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                              {priorityLabel}
                            </span>
                            <button
                              onClick={() => handleOpenEditTask(task)}
                              className="text-slate-400 hover:text-purple-700 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Column 3: Upcoming Reminders & Motivation Card Stack (Fully Editable!) */}
                <div className="xl:col-span-4 space-y-4">
                  
                  {/* Top: Upcoming Reminders Card */}
                  <div className="bg-white rounded-[28px] p-5 border border-[#ECE6D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900 font-['Quicksand',sans-serif]">Upcoming Reminders</h3>
                      <button 
                        onClick={handleOpenAddReminder}
                        className="w-5 h-5 rounded-lg bg-[#FB7185] text-white flex items-center justify-center shadow-xs hover:bg-[#F43F5E] transition-colors"
                        title="Add New Reminder"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {reminders.map(rem => {
                        return (
                          <div 
                            key={rem.id} 
                            onClick={() => handleOpenEditReminder(rem)}
                            className="group flex items-center justify-between gap-2 p-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                            title="Click to edit reminder"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                rem.type === 'clock' ? 'bg-[#FFE4E6] text-[#F43F5E]' :
                                rem.type === 'video' ? 'bg-[#E0F2FE] text-[#0284C7]' :
                                rem.type === 'flag' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-[#FEF3C7] text-[#D97706]'
                              }`}>
                                {rem.type === 'clock' && <Clock className="w-4 h-4 stroke-[2.5]" />}
                                {rem.type === 'video' && <Video className="w-4 h-4 stroke-[2.5]" />}
                                {rem.type === 'flag' && <Flag className="w-4 h-4 stroke-[2.5]" />}
                                {rem.type === 'bell' && <Bell className="w-4 h-4 fill-amber-500 text-amber-500" />}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-black text-slate-900 truncate group-hover:text-purple-700 transition-colors">
                                  {rem.title}
                                </div>
                                <div className="text-[10px] font-bold text-slate-400">{rem.timeStr}</div>
                              </div>
                            </div>

                            <Edit2 className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom: Motivation Bunny Card (Click to Edit Affirmation!) */}
                  <div 
                    onClick={() => setIsAffirmationModalOpen(true)}
                    className="group relative overflow-hidden bg-[#ECE8F8] rounded-[28px] p-5 border border-[#DDD6FE] shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
                    title="Click to edit your motivational affirmation"
                  >
                    <span className="absolute top-2 right-12 text-xs text-amber-300">⭐</span>
                    <span className="absolute bottom-3 left-28 text-xs text-amber-300">⭐</span>

                    <div className="space-y-1 max-w-[190px] relative z-10">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-black text-[#5B21B6] leading-snug">
                          You're doing amazing, {userProfile.name}!
                        </h4>
                        <Edit2 className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <p className="text-[10px] font-bold text-[#6D28D9]/80 leading-relaxed">
                        {userProfile.quote || "Keep up the good work and don't forget to take care of yourself 💜"}
                      </p>
                    </div>

                    <div className="relative z-10 -mr-2 shrink-0">
                      <ClayBunnyWithHeart className="w-18 h-18" />
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

        </main>

      </div>

      {/* ========================================================================= */}
      {/* EDIT MODAL 1: Profile Editor                                              */}
      {/* ========================================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#F7F4EE] rounded-[32px] border border-[#E9E4D8] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">Edit Your Profile</h3>
              <button 
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={e => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Title / Role</label>
                <input
                  type="text"
                  value={profileForm.role}
                  onChange={e => setProfileForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Subtitle Greeting</label>
                <input
                  type="text"
                  value={profileForm.subtitle}
                  onChange={e => setProfileForm(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Avatar Style</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'emily', label: 'Emily' },
                    { id: 'bunny', label: 'Bunny' },
                    { id: 'plant', label: 'Plant' },
                    { id: 'bear', label: 'Scholar' },
                  ].map(av => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setProfileForm(prev => ({ ...prev, avatarStyle: av.id as any }))}
                      className={`p-2 rounded-xl text-xs font-black border transition-all ${
                        profileForm.avatarStyle === av.id
                          ? 'border-purple-600 bg-purple-100 text-purple-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {av.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-black shadow-xs transition-all"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODAL 2: Project Editor (Add/Edit/Delete)                             */}
      {/* ========================================================================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#F7F4EE] rounded-[32px] border border-[#E9E4D8] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button 
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Project Name</label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={e => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Website Redesign"
                  className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-black text-slate-700">Progress ({projectForm.percent}%)</label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={projectForm.percent}
                  onChange={e => setProjectForm(prev => ({ ...prev, percent: Number(e.target.value) }))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Folder Color</label>
                <div className="flex gap-2">
                  {(['purple', 'pink', 'green', 'yellow', 'blue', 'rose'] as const).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setProjectForm(prev => ({ ...prev, color: c }))}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        c === 'purple' ? 'bg-[#8B5CF6]' :
                        c === 'pink' ? 'bg-[#FB7185]' :
                        c === 'green' ? 'bg-[#4ADE80]' :
                        c === 'yellow' ? 'bg-[#FACC15]' :
                        c === 'blue' ? 'bg-[#38BDF8]' :
                        'bg-[#F43F5E]'
                      } ${projectForm.color === c ? 'ring-3 ring-purple-400 scale-110' : 'opacity-80 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {editingProject ? (
                <button
                  onClick={() => {
                    deleteProject(editingProject.id);
                    setIsProjectModalOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-800"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-black shadow-xs transition-all"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODAL 3: Task Editor (Add/Edit/Delete)                                */}
      {/* ========================================================================= */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#F7F4EE] rounded-[32px] border border-[#E9E4D8] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">
                {editingTask ? 'Edit Task' : 'Add Top Task'}
              </h3>
              <button 
                onClick={() => setIsTaskModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Task Title</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={e => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Design landing page"
                  className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Category</label>
                <select
                  value={taskForm.categoryId}
                  onChange={e => setTaskForm(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={e => setTaskForm(prev => ({ ...prev, priority: e.target.value as Priority }))}
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="P1">High (P1)</option>
                    <option value="P2">Medium (P2)</option>
                    <option value="P3">Low (P3)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">Duration (min)</label>
                  <input
                    type="number"
                    value={taskForm.estimatedMinutes}
                    onChange={e => setTaskForm(prev => ({ ...prev, estimatedMinutes: Number(e.target.value) }))}
                    className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {editingTask ? (
                <button
                  onClick={() => {
                    deleteTask(editingTask.id);
                    setIsTaskModalOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-800"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTask}
                  className="px-5 py-2 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-xl text-xs font-black shadow-xs transition-all"
                >
                  {editingTask ? 'Save Task' : 'Add Task'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODAL 4: Reminder Editor (Add/Edit/Delete)                            */}
      {/* ========================================================================= */}
      {isReminderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#F7F4EE] rounded-[32px] border border-[#E9E4D8] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">
                {editingReminder ? 'Edit Reminder' : 'Add Reminder'}
              </h3>
              <button 
                onClick={() => setIsReminderModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Reminder Title</label>
                <input
                  type="text"
                  value={reminderForm.title}
                  onChange={e => setReminderForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Team stand-up"
                  className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Scheduled Time String</label>
                <input
                  type="text"
                  value={reminderForm.timeStr}
                  onChange={e => setReminderForm(prev => ({ ...prev, timeStr: e.target.value }))}
                  placeholder="e.g. Today, 10:00 AM"
                  className="w-full bg-white border border-[#E9E4D8] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Reminder Type Icon</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'clock', label: 'Standup', icon: <Clock className="w-4 h-4" /> },
                    { id: 'video', label: 'Call', icon: <Video className="w-4 h-4" /> },
                    { id: 'bell', label: 'Alert', icon: <Bell className="w-4 h-4" /> },
                    { id: 'flag', label: 'Goal', icon: <Flag className="w-4 h-4" /> },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setReminderForm(prev => ({ ...prev, type: item.id as any }))}
                      className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col items-center gap-1 transition-all ${
                        reminderForm.type === item.id
                          ? 'border-purple-600 bg-purple-100 text-purple-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.icon}
                      <span className="text-[10px]">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {editingReminder ? (
                <button
                  onClick={() => {
                    deleteReminder(editingReminder.id);
                    setIsReminderModalOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-800"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReminderModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveReminder}
                  className="px-5 py-2 bg-[#FB7185] hover:bg-[#F43F5E] text-white rounded-xl text-xs font-black shadow-xs transition-all"
                >
                  {editingReminder ? 'Save Reminder' : 'Add Reminder'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODAL 5: Affirmation / Motivation Editor                             */}
      {/* ========================================================================= */}
      {isAffirmationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#F7F4EE] rounded-[32px] border border-[#E9E4D8] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>Daily Affirmation</span>
              </h3>
              <button 
                onClick={() => setIsAffirmationModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">
                Personal Motivation Message
              </label>
              <textarea
                rows={3}
                value={affirmationText}
                onChange={e => setAffirmationText(e.target.value)}
                placeholder="Keep up the good work and remember to take care of yourself 💜"
                className="w-full bg-white border border-[#E9E4D8] rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAffirmationModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAffirmation}
                className="px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-black shadow-xs transition-all"
              >
                Update Affirmation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCHEDULE CHECK MODAL: Check & Review Daily Schedule Timeline              */}
      {/* ========================================================================= */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-[#F7F4EE] rounded-[34px] border border-[#E9E4D8] shadow-2xl p-6 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-black text-slate-900">
                  {userProfile.name}'s Schedule for May {selectedDay}, 2024
                </h3>
              </div>
              <button 
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Daily Schedule Timeline List */}
            <div className="space-y-3">
              {[
                { time: '09:00 AM', title: tasks[0]?.title || 'Design Landing Page UI', tag: 'Deep Focus', duration: '45m', color: 'bg-purple-100 text-purple-800 border-purple-200' },
                { time: '10:00 AM', title: reminders[0]?.title || 'Team stand-up', tag: 'Meeting', duration: '20m', color: 'bg-rose-100 text-rose-800 border-rose-200' },
                { time: '10:30 AM', title: 'Intentional Pause: 5m tea & stretch 🍵', tag: 'Break', duration: '15m', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
                { time: '11:00 AM', title: tasks[1]?.title || 'Write Project Proposal', tag: 'Focus', duration: '35m', color: 'bg-purple-100 text-purple-800 border-purple-200' },
                { time: '01:00 PM', title: 'Mindful lunch break & sunlight walk', tag: 'Rest', duration: '60m', color: 'bg-amber-100 text-amber-800 border-amber-200' },
                { time: '02:30 PM', title: reminders[1]?.title || 'Client presentation', tag: 'Call', duration: '30m', color: 'bg-blue-100 text-blue-800 border-blue-200' },
                { time: '03:30 PM', title: tasks[2]?.title || 'Research competitors', tag: 'Deep Focus', duration: '40m', color: 'bg-purple-100 text-purple-800 border-purple-200' },
              ].map((slot, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#EAE3D2] shadow-2xs">
                  <span className="text-xs font-mono font-black text-purple-700 w-20 shrink-0">
                    {slot.time}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{slot.title}</p>
                    <span className="text-[10px] text-slate-400 font-bold">{slot.duration} duration</span>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border shrink-0 ${slot.color}`}>
                    {slot.tag}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <button
                onClick={() => {
                  setIsScheduleModalOpen(false);
                  setActiveNav('planner');
                }}
                className="text-xs font-black text-purple-700 hover:text-purple-900"
              >
                Open Full Smart Planner →
              </button>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-black shadow-xs transition-all"
              >
                Done Checking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};