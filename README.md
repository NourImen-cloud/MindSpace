# MINDSPACE — Smart, Minimal, Cross-Platform Digital Wellbeing & Attention Sanctuary

> **Regain control of your attention, reduce mindless scrolling, and manage your daily activities more effectively — without guilt, pressure, or streak-shaming.**

---

## 🌟 Overview

**MINDSPACE** is designed on the principle that attention is human life’s most finite resource. Traditional productivity apps rely on rigid streaks, notifications, and guilt when interruptions occur. In contrast, MINDSPACE introduces an intelligent **Anti-Scrolling System**, **Intentional Pauses**, **Gentle Returns**, and **Return Momentum** to make stepping away from feeds effortless and compassionate.

---

## 📋 Comprehensive Feature Map (All 30 Features Implemented)

### 1. Personal Activity Management
1. **Activity Categories:** Preloaded with 5 core categories:
   - University & Studies
   - Personal Projects
   - Research & Writing
   - Self-Learning
   - Hobbies & Personal Activities
   - Support for custom categories with custom color pickers and icons.
2. **Task Management:** Create, edit, delete, categorize, prioritize (P1 Urgent/Important, P2 High, P3 Medium, P4 Low), time estimation (minutes), energy level required (high/medium/low), and tags.
3. **Daily Planner:** Interactive timeline schedule (08:00 – 20:00) with task time blocks and circadian recovery windows.
4. **Smart Scheduling Engine:** Automatically optimizes pending tasks into realistic time slots, respecting 90-minute maximum ultradian focus blocks and inserting 5m–15m buffer breaks.

### 2. Anti-Scrolling System (Core Feature)
5. **Digital Usage Monitoring:** Live desktop companion and browser extension feed tracking active screen time and pickup counts.
6. **Scrolling Pattern Analysis:** Identifies peak vulnerability windows (e.g., 1:00 PM – 3:30 PM circadian dip and late evening doomscroll).
7. **Intentional Pause:** Serene full-screen breathing circle intervention (with customizable 5s countdown) whenever tempting applications or websites are reached for.
8. **Distraction Reason Identification:** Metacognitive prompt identifying the emotional root cause:
   - 🥱 Boredom
   - 😣 Avoiding a task
   - ☕ Needing a break
   - 🤖 Habitual muscle memory reflex
   - 🔍 Checking something specific
9. **Customizable App & Website Limits:** Interactive allowance sliders (5m to 90m) with visual percentage meters for Instagram, TikTok/Shorts, Reddit, X (Twitter), and News feeds.
10. **Distraction Blocking:** Switch between Gentle Pause (mindful prompt) and Strict Block (hard cooldown lock). Interactive **Distraction Simulator** to test intercept scenarios directly.

### 3. Focus and Attention Management
11. **Focus Mode:** Dedicated distraction-free workspace for a single anchor task.
12. **Customizable Focus Timer:** Presets (15m Micro, 25m Standard, 45m Deep, 60m Extended) or granular minute sliders.
13. **Distraction Parking Lot:** Instant quick-dump input during focus sessions to capture stray thoughts without breaking flow.
14. **Gentle Return:** 3 positive redirection paths when distracted:
   - Continue current task
   - Start 5-minute low-friction micro-focus
   - Take intentional 5-minute restorative calm break
15. **Return Momentum:** Non-punitive metric measuring the frequency and percentage of successful conscious returns to presence.
16. **Focus Session Summary:** Comprehensive post-session review showing completed minutes, Return Momentum gained (+5), perceived focus rating (1–5), and 1-click conversion of parking lot items into real tasks.

### 4. Personalized Alternatives
17. **Alternative Activity Suggestions:** Curated non-screen micro-habits categorized by duration and type (Box Breathing, Spinal Stretch, Concept Review, Brain-Dump Journaling, 20-20 Horizon Eye Palming, Mindful Walk).
18. **Personalized Recommendations:** Dynamically suggests relevant alternatives matching the user's identified distraction trigger (e.g., boredom vs fatigue).

### 5. Digital Wellbeing and Analytics
19. **Digital Wellbeing Dashboard:** High-level metrics for screen time, productive focus time, avoided pickups, and momentum score.
20. **Daily and Weekly Insights:** Visual breakdown of app usage vs budgets, and screen time ratios.
21. **Habit and Progress Tracking:** Progress trajectory showing reclaimed minutes spared from mindless feeds.
22. **Weekly Reflection:** Guided weekly review answering 4 structured reflection questions with mindfulness ratings (1–10) and archived history.

### 6. Intelligent Assistance (AI Engine)
23. **AI-Powered Daily Planning:** One-click automated daily schedule optimization.
24. **Intelligent Distraction Analysis:** Pattern recognition detecting habitual afternoon slumps and task procrastination loops with gentle actionable advice.
25. **Adaptive Recommendations:** Dynamically prioritizes alternatives based on stated emotional triggers.
26. **Personalized Weekly Reports:** Generates uplifting narrative summaries of attention resilience.

### 7. Cross-Platform and Technical Features
27. **Cross-Device Synchronization:** Unique Device Pairing Code (`MS-XXXX`) for peer-to-peer sync.
28. **Local-First Data Storage:** 100% of tasks, sessions, limits, and reflections stored locally in the browser. Zero reliance on mandatory cloud services.
29. **Optional Cloud Synchronization:** Toggleable encrypted cloud sync mode.
30. **Privacy and Permission Management:** Granular privacy controls, zero telemetry by default, full JSON database export (`mindspace-backup.json`), and instant backup restoration.

---

## 🛠️ Architecture & Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (Zen Slate & Emerald Calm Dark Palette)
- **Icons:** Lucide React
- **Audio Synthesizer:** Pure Web Audio API engine (`src/utils/audio.ts` synthesizes Solfeggio 432Hz/528Hz Tibetan singing bowl chimes, rain soundscapes, and brown noise without external audio files)
- **Data Persistence:** Local-First Storage with full import/export portability
- **Cross-Platform Preview:** Toggleable desktop view and iPhone/Android smartphone simulator frame

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview -- --port 4173
```
