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
  CheckCircle2, 
  Sparkles,
  Play
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
  ClayFolder 
} from './ClayIcons';
import { useMindSpace } from '../../store/MindSpaceContext';

export const EmilyDashboard: React.FC = () => {
  const { startFocusSession, tasks } = useMindSpace();
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [activeNav, setActiveNav] = useState<string>('dashboard');
  const [taskState, setTaskState] = useState([
    { id: 1, title: 'Design landing page', priority: 'High', checked: true },
    { id: 2, title: 'Write project proposal', priority: 'Medium', checked: true },
    { id: 3, title: 'Research competitors', priority: 'Low', checked: false },
    { id: 4, title: 'Update style guide', priority: 'Low', checked: false },
    { id: 5, title: 'Review analytics', priority: 'Medium', checked: false },
  ]);

  const toggleTask = (id: number) => {
    setTaskState(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-slate-800 p-3 sm:p-5 lg:p-7 font-['Nunito',sans-serif]">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-5 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT SIDEBAR (Lavender #ECE8F8 with rounded 32px corners)                  */}
        {/* ========================================================================= */}
        <aside className="w-full lg:w-[245px] shrink-0 bg-[#ECE8F8] rounded-[32px] p-4 flex flex-col justify-between gap-6 shadow-sm border border-[#E2DCF2]">
          <div className="space-y-5">
            {/* 1. Emily Profile Avatar Card */}
            <div className="flex flex-col items-center text-center">
              <div className="w-full bg-white rounded-[26px] p-2.5 shadow-[0_4px_16px_rgba(139,92,246,0.06)] flex items-center justify-center">
                <EmilyAvatar className="w-32 h-32" />
              </div>
              <div className="mt-3">
                <div className="font-extrabold text-lg text-slate-800 flex items-center justify-center gap-1">
                  <span>Emily</span>
                  <span className="text-purple-600 text-sm">💜</span>
                </div>
                <div className="text-[11px] font-bold text-purple-600/70 flex items-center justify-center gap-1">
                  <span>Productivity Explorer</span>
                  <span className="text-amber-400 text-xs">✨</span>
                </div>
              </div>
            </div>

            {/* 2. Navigation Menu List */}
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Home, active: true },
                { id: 'tasks', label: 'Tasks', icon: CheckSquare, active: false },
                { id: 'projects', label: 'Projects', icon: FolderKanban, active: false },
                { id: 'calendar', label: 'Calendar', icon: CalendarIcon, active: false },
                { id: 'analytics', label: 'Analytics', icon: BarChart2, active: false },
                { id: 'messages', label: 'Messages', icon: MessageSquare, active: false },
                { id: 'team', label: 'Team', icon: Users, active: false },
                { id: 'settings', label: 'Settings', icon: SettingsIcon, active: false },
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all text-left ${
                      isActive
                        ? 'bg-[#DDD6FE] text-[#4C1D95] shadow-xs'
                        : 'text-slate-600 hover:text-purple-800 hover:bg-white/40'
                    }`}
                  >
                    <div className={`w-5 h-5 flex items-center justify-center ${
                      isActive ? 'text-[#6D28D9]' : 'text-slate-500'
                    }`}>
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 3. Bottom Plant Encouragement Card */}
          <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-purple-50 flex items-center gap-2.5">
            <SmilingPlantPot className="w-10 h-10 shrink-0" />
            <p className="text-[10px] font-extrabold text-slate-700 leading-tight">
              Small progress every day adds up to big results <span className="text-emerald-500">🌱</span>
            </p>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* RIGHT MAIN CONTENT AREA                                                   */}
        {/* ========================================================================= */}
        <main className="flex-1 min-w-0 space-y-5">
          
          {/* TOP HEADER: Greeting + Search & Notification Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Good morning, Emily!</span>
                  <ClayCloud className="w-7 h-7 -mt-1 inline-block" />
                </h1>
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                Let's make today productive and amazing!
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-center">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-44 sm:w-56 bg-white border border-[#E9E4D8] rounded-full pl-9 pr-4 py-2 text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-purple-400 shadow-xs"
                />
              </div>

              {/* Notification Bell Button with Badge (3) */}
              <button className="relative w-9 h-9 rounded-full bg-white border border-[#E9E4D8] flex items-center justify-center text-slate-600 shadow-xs hover:bg-slate-50 transition-colors">
                <Bell className="w-4 h-4 fill-slate-500 text-slate-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F43F5E] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                  3
                </span>
              </button>

              {/* Bunny Profile Icon Button */}
              <button 
                onClick={() => startFocusSession(tasks[0], 25)}
                className="w-9 h-9 rounded-full bg-white border border-[#E9E4D8] flex items-center justify-center shadow-xs hover:scale-105 transition-transform"
                title="Start Focus Mode"
              >
                <BunnyProfileIcon className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* ROW 1: 4 Metric Cards (Tasks Done, In Progress, Completed, Focus Time) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            
            {/* Card 1: Tasks Done */}
            <div className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="shrink-0">
                <ClayClipboard className="w-13 h-13" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-extrabold text-slate-500">Tasks Done</div>
                <div className="text-2xl font-black text-slate-900 leading-none">24</div>
                <div className="text-[10px] font-extrabold text-[#7C3AED]">
                  +12% from yesterday
                </div>
              </div>
            </div>

            {/* Card 2: In Progress */}
            <div className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="shrink-0">
                <ClayCalendarIcon className="w-13 h-13" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-extrabold text-slate-500">In Progress</div>
                <div className="text-2xl font-black text-slate-900 leading-none">7</div>
                <div className="text-[10px] font-extrabold text-[#F43F5E]">
                  2 projects
                </div>
              </div>
            </div>

            {/* Card 3: Completed */}
            <div className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="shrink-0">
                <ClayFlag className="w-13 h-13" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-extrabold text-slate-500">Completed</div>
                <div className="text-2xl font-black text-slate-900 leading-none">56</div>
                <div className="text-[10px] font-extrabold text-[#10B981]">
                  This month
                </div>
              </div>
            </div>

            {/* Card 4: Focus Time */}
            <div className="bg-white rounded-[26px] p-4 border border-[#ECE6D8] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="shrink-0">
                <ClayStar className="w-13 h-13" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-extrabold text-slate-500">Focus Time</div>
                <div className="text-2xl font-black text-slate-900 leading-none">18h</div>
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
                <h3 className="text-sm font-black text-slate-900">
                  Productivity Overview
                </h3>
                <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E9E4D8] text-[11px] font-bold text-slate-700 hover:bg-[#F3EFE7] transition-colors">
                  <span>This Week</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Line Chart Component */}
              <div className="relative pt-6 pb-2">
                {/* Speech Bubble Tooltip over Sat node */}
                <div className="absolute right-[19%] top-0 z-10 flex flex-col items-center">
                  <div className="bg-[#DDD6FE] text-[#5B21B6] text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <span>Great job!</span>
                    <span>🎉</span>
                  </div>
                  <div className="w-2 h-2 bg-[#DDD6FE] rotate-45 -mt-1" />
                </div>

                {/* SVG Line with Smooth Curve and Nodes */}
                <div className="relative h-44 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Reference Grid Lines (0, 25, 50, 75, 100) */}
                    <line x1="0" y1="0" x2="700" y2="0" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="0" y1="40" x2="700" y2="40" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="0" y1="80" x2="700" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="0" y1="120" x2="700" y2="120" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="0" y1="160" x2="700" y2="160" stroke="#F1F5F9" strokeWidth="1" />

                    {/* Area under line */}
                    <path
                      d="M 20 120 C 80 110, 110 100, 130 96 C 180 88, 220 54, 240 50 C 290 46, 320 80, 350 75 C 400 70, 440 38, 460 35 C 500 32, 530 20, 570 20 C 610 20, 650 25, 680 24 L 680 160 L 20 160 Z"
                      fill="url(#chartGradient)"
                    />

                    {/* Purple Line Path */}
                    <path
                      d="M 20 120 C 80 110, 110 100, 130 96 C 180 88, 220 54, 240 50 C 290 46, 320 80, 350 75 C 400 70, 440 38, 460 35 C 500 32, 530 20, 570 20 C 610 20, 650 25, 680 24"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Circular Data Nodes */}
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
                        r="5.5"
                        fill="#7C3AED"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        className="shadow-sm transition-transform hover:scale-125"
                      />
                    ))}
                  </svg>
                </div>

                {/* X-Axis Day Labels */}
                <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-2 px-1">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            {/* Right: May 2024 Calendar Card (xl:col-span-4) */}
            <div className="xl:col-span-4 bg-white rounded-[28px] p-5 border border-[#ECE6D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
              {/* Month Navigation */}
              <div className="flex items-center justify-between text-slate-800">
                <button className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-xs font-black text-slate-900">
                  May 2024
                </div>
                <button className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-extrabold text-slate-400">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span className="text-[#F43F5E]/70">Sat</span>
                <span className="text-[#F43F5E]/70">Sun</span>
              </div>

              {/* Calendar Grid Numbers */}
              <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-bold">
                {/* Row 1 */}
                <span className="text-slate-300 py-1">29</span>
                <span className="text-slate-300 py-1">30</span>
                <span className="text-slate-700 py-1">1</span>
                <span className="text-slate-700 py-1">2</span>
                <span className="text-slate-700 py-1">3</span>
                <span className="text-[#F43F5E] py-1">4</span>
                <span className="text-[#F43F5E] py-1">5</span>

                {/* Row 2 */}
                <span className="text-slate-700 py-1">6</span>
                <span className="text-slate-700 py-1">7</span>
                <span className="text-slate-700 py-1">8</span>
                <span className="text-slate-700 py-1">9</span>
                <span className="text-slate-700 py-1">10</span>
                <span className="text-[#F43F5E] py-1">11</span>
                <span className="text-[#F43F5E] py-1">12</span>

                {/* Row 3 with Active 15 */}
                <span className="text-slate-700 py-1">13</span>
                <span className="text-slate-700 py-1">14</span>
                <span className="py-1">
                  <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white font-black inline-flex items-center justify-center shadow-xs">
                    15
                  </span>
                </span>
                <span className="text-slate-700 py-1">16</span>
                <span className="text-slate-700 py-1">17</span>
                <span className="text-[#F43F5E] py-1">18</span>
                <span className="text-[#F43F5E] py-1">19</span>

                {/* Row 4 */}
                <span className="text-slate-700 py-1">20</span>
                <span className="text-slate-700 py-1">21</span>
                <span className="text-slate-700 py-1">22</span>
                <span className="text-slate-700 py-1">23</span>
                <span className="text-slate-700 py-1">24</span>
                <span className="text-[#F43F5E] py-1">25</span>
                <span className="text-[#F43F5E] py-1">26</span>

                {/* Row 5 */}
                <span className="text-slate-700 py-1">27</span>
                <span className="text-slate-700 py-1">28</span>
                <span className="text-slate-700 py-1">29</span>
                <span className="text-slate-700 py-1">30</span>
                <span className="text-slate-700 py-1">31</span>
                <span className="text-slate-300 py-1">1</span>
                <span className="text-slate-300 py-1">2</span>
              </div>
            </div>

          </div>

          {/* ROW 3: My Projects (4 cols) | Top Tasks (4 cols) | Reminders & Motivation (4 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5 items-start">
            
            {/* Column 1: My Projects Card (xl:col-span-4) */}
            <div className="xl:col-span-4 bg-white rounded-[28px] p-5 border border-[#ECE6D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900">My Projects</h3>
                <button className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-[10px] font-black hover:bg-[#DDD6FE] transition-colors">
                  View all
                </button>
              </div>

              <div className="space-y-3.5">
                {[
                  { name: 'Website Redesign', percent: 75, color: 'purple', bar: 'bg-[#8B5CF6]' },
                  { name: 'Marketing Campaign', percent: 60, color: 'pink', bar: 'bg-[#FB7185]' },
                  { name: 'Mobile App', percent: 40, color: 'green', bar: 'bg-[#4ADE80]' },
                  { name: 'User Research', percent: 90, color: 'yellow', bar: 'bg-[#FACC15]' },
                ].map(proj => (
                  <div key={proj.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ClayFolder color={proj.color as 'purple' | 'pink' | 'green' | 'yellow'} className="w-5 h-5 shrink-0" />
                        <span className="text-xs font-bold text-slate-800">{proj.name}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 font-mono">
                        {proj.percent}%
                      </span>
                    </div>
                    {/* Progress track & bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${proj.bar}`}
                        style={{ width: `${proj.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Top Tasks Card (xl:col-span-4) */}
            <div className="xl:col-span-4 bg-white rounded-[28px] p-5 border border-[#ECE6D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900">Top Tasks</h3>
                <button className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-black hover:bg-[#BBF7D0] transition-colors">
                  View all
                </button>
              </div>

              <div className="space-y-2.5">
                {taskState.map(task => {
                  const badgeColor = {
                    High: 'bg-[#FEECEE] text-[#E11D48]',
                    Medium: 'bg-[#FEF6E8] text-[#D97706]',
                    Low: 'bg-[#EFF6FF] text-[#2563EB]',
                  }[task.priority];

                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Rounded checkbox (green square with white check or empty) */}
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                          task.checked ? 'bg-[#22C55E]' : 'border-2 border-slate-300 bg-white'
                        }`}>
                          {task.checked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span className={`text-xs font-bold text-slate-800 truncate ${task.checked ? 'line-through text-slate-400' : ''}`}>
                          {task.title}
                        </span>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${badgeColor}`}>
                        {task.priority}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Upcoming Reminders & Motivation Card Stack (xl:col-span-4) */}
            <div className="xl:col-span-4 space-y-4">
              
              {/* Top: Upcoming Reminders Card */}
              <div className="bg-white rounded-[28px] p-5 border border-[#ECE6D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900">Upcoming Reminders</h3>
                  <button className="w-5 h-5 rounded-lg bg-[#FB7185] text-white flex items-center justify-center shadow-xs hover:bg-[#F43F5E] transition-colors">
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Reminder 1: Clock */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFE4E6] text-[#F43F5E] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">Team stand-up</div>
                      <div className="text-[10px] font-bold text-slate-400">Today, 10:00 AM</div>
                    </div>
                  </div>

                  {/* Reminder 2: Video Camera */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                      <Video className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">Client presentation</div>
                      <div className="text-[10px] font-bold text-slate-400">Tomorrow, 2:30 PM</div>
                    </div>
                  </div>

                  {/* Reminder 3: Bell */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4 fill-amber-500 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">Submit report</div>
                      <div className="text-[10px] font-bold text-slate-400">May 17, 11:59 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Motivation Bunny Card */}
              <div className="relative overflow-hidden bg-[#ECE8F8] rounded-[28px] p-5 border border-[#DDD6FE] shadow-sm flex items-center justify-between">
                {/* Background stars */}
                <span className="absolute top-2 right-12 text-xs text-amber-300">⭐</span>
                <span className="absolute bottom-3 left-28 text-xs text-amber-300">⭐</span>

                <div className="space-y-1 max-w-[190px] relative z-10">
                  <h4 className="text-xs font-black text-[#5B21B6] leading-snug">
                    You're doing amazing, Emily!
                  </h4>
                  <p className="text-[10px] font-bold text-[#6D28D9]/80 leading-relaxed">
                    Keep up the good work and don't forget to take care of yourself <span className="text-purple-600">💜</span>
                  </p>
                </div>

                <div className="relative z-10 -mr-2 shrink-0">
                  <ClayBunnyWithHeart className="w-18 h-18" />
                </div>
              </div>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
};
