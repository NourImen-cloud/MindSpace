import { Task, DistractionEvent, WeeklyReflection, AlternativeActivity, DistractionReason } from '../types';

export interface SmartScheduleResult {
  scheduledTasks: Array<{
    task: Task;
    suggestedStartTime: string;
    suggestedEndTime: string;
    reasoning: string;
    breakAfterMinutes: number;
  }>;
  totalFocusPlannedMinutes: number;
  unassignedTasks: Task[];
  advice: string;
}

export interface DistractionPatternInsight {
  id: string;
  type: 'peak_window' | 'trigger_category' | 'app_streak' | 'momentum_win';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  actionableTip: string;
}

export class MindSpaceAIEngine {
  /**
   * AI-Powered Daily Planning (Features 4 & 23)
   * Intelligently arranges pending tasks into realistic time slots,
   * respecting human ultradian rhythms (90m max focus blocks) and cognitive load.
   */
  static generateSmartSchedule(
    tasks: Task[], 
    startHour = 9, 
    endHour = 18
  ): SmartScheduleResult {
    // Filter active / pending tasks
    const pendingTasks = tasks.filter(t => t.status !== 'completed');

    // Priority sorting: P1 first, then energy level 'high' early in the day
    const priorityWeight: Record<string, number> = { P1: 4, P2: 3, P3: 2, P4: 1 };
    const sorted = [...pendingTasks].sort((a, b) => {
      const pDiff = (priorityWeight[b.priority] || 1) - (priorityWeight[a.priority] || 1);
      if (pDiff !== 0) return pDiff;
      return (b.estimatedMinutes || 30) - (a.estimatedMinutes || 30);
    });

    const scheduledTasks: SmartScheduleResult['scheduledTasks'] = [];
    const unassignedTasks: Task[] = [];
    let currentMinutes = startHour * 60; // start at 09:00
    const endMinutes = endHour * 60; // end at 18:00
    let totalFocus = 0;

    for (const task of sorted) {
      const duration = Math.min(task.estimatedMinutes || 30, 90); // Cap at 90 min blocks
      
      // Calculate break needed: longer break after heavy P1 or 60m+ tasks
      const breakMinutes = duration >= 60 || task.priority === 'P1' ? 15 : 5;

      if (currentMinutes + duration <= endMinutes) {
        const startH = Math.floor(currentMinutes / 60);
        const startM = currentMinutes % 60;
        const endTotalM = currentMinutes + duration;
        const endH = Math.floor(endTotalM / 60);
        const endM = endTotalM % 60;

        const startTimeStr = `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
        const endTimeStr = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;

        let reasoning = 'High priority task scheduled during prime mental acuity.';
        if (startH >= 14 && task.energyLevel === 'low') {
          reasoning = 'Light administrative task placed during the natural afternoon recovery dip.';
        } else if (task.priority === 'P1') {
          reasoning = 'Critical priority task anchored with an intentional 15-minute buffer.';
        }

        scheduledTasks.push({
          task: { ...task, scheduledTime: startTimeStr, scheduledDuration: duration },
          suggestedStartTime: startTimeStr,
          suggestedEndTime: endTimeStr,
          reasoning,
          breakAfterMinutes: breakMinutes,
        });

        totalFocus += duration;
        currentMinutes += duration + breakMinutes;
      } else {
        unassignedTasks.push(task);
      }
    }

    const advice = totalFocus > 300 
      ? "Your day is nicely packed. Remember that research shows 4 to 5 hours of deep focus is peak human capacity."
      : "You have a balanced, realistic schedule with generous breathing room between focus blocks.";

    return {
      scheduledTasks,
      totalFocusPlannedMinutes: totalFocus,
      unassignedTasks,
      advice
    };
  }

  /**
   * Intelligent Distraction Analysis (Features 6 & 24)
   * Detects habitual patterns such as afternoon slumps or task-avoidance triggers.
   */
  static analyzeDistractionPatterns(events: DistractionEvent[]): DistractionPatternInsight[] {
    const insights: DistractionPatternInsight[] = [];
    if (!events || events.length === 0) {
      return [{
        id: 'clean_slate',
        type: 'momentum_win',
        title: 'Calm Digital Canvas',
        description: 'No significant mindless scrolling events detected today.',
        severity: 'low',
        actionableTip: 'Keep taking intentional breaks before fatigue triggers habitual opening.'
      }];
    }

    // 1. Analyze reasons
    const reasonCounts: Record<string, number> = {};
    events.forEach(e => {
      const r = e.reason || 'habitual';
      reasonCounts[r] = (reasonCounts[r] || 0) + 1;
    });

    if ((reasonCounts['boredom'] || 0) >= 3) {
      insights.push({
        id: 'boredom_cluster',
        type: 'trigger_category',
        title: 'Boredom-Triggered Scrolling Detected',
        description: `${reasonCounts['boredom']} app openings were labeled as boredom. Scrolling provides cheap dopamine when stimulation drops.`,
        severity: 'medium',
        actionableTip: 'Keep a physical book, puzzle, or walking shoes near your desk as an effortless replacement.'
      });
    }

    if ((reasonCounts['avoiding_task'] || 0) >= 2) {
      insights.push({
        id: 'task_avoidance_cluster',
        type: 'trigger_category',
        title: 'Task Procrastination Loop',
        description: 'You reached for distracting apps when approaching demanding tasks.',
        severity: 'high',
        actionableTip: 'Try the 5-Minute Micro Focus rule: commit to working on the task for just 300 seconds without pressure.'
      });
    }

    // 2. Analyze time windows (hourly)
    const hourCounts: Record<number, number> = {};
    events.forEach(e => {
      const h = new Date(e.timestamp).getHours();
      hourCounts[h] = (hourCounts[h] || 0) + 1;
    });

    // Check afternoon slump (13h-16h)
    const afternoonCount = (hourCounts[13] || 0) + (hourCounts[14] || 0) + (hourCounts[15] || 0);
    if (afternoonCount >= 3) {
      insights.push({
        id: 'afternoon_dip',
        type: 'peak_window',
        title: 'Vulnerability Window: 1:00 PM – 3:30 PM',
        description: `Circadian dip detected with ${afternoonCount} attempted app openings during early afternoon.`,
        severity: 'medium',
        actionableTip: 'Schedule non-screen movement, hydration, or a 10-minute walk outside rather than resisting willpower alone.'
      });
    }

    // 3. Gentle Return Momentum Win
    const interceptedCount = events.filter(e => e.intercepted && e.gentleReturnChoice).length;
    if (interceptedCount > 0) {
      insights.push({
        id: 'momentum_celebration',
        type: 'momentum_win',
        title: `Positive Momentum: ${interceptedCount} Mindful Redirections`,
        description: `You paused and gently stepped back ${interceptedCount} times instead of slipping into infinite feeds.`,
        severity: 'low',
        actionableTip: 'Every gentle return builds neural pathways for metacognitive awareness.'
      });
    }

    return insights;
  }

  /**
   * Adaptive Recommendations (Features 17, 18 & 25)
   * Tailors suggestions according to trigger reasons and time availability.
   */
  static getAdaptiveAlternatives(
    alternatives: AlternativeActivity[], 
    reason?: DistractionReason, 
    maxMinutes = 15
  ): AlternativeActivity[] {
    return alternatives
      .filter(alt => {
        const matchesDuration = alt.durationMinutes <= maxMinutes;
        const matchesReason = reason ? alt.suitableReasons.includes(reason) : true;
        return matchesDuration && matchesReason;
      })
      .slice(0, 3);
  }

  /**
   * Personalized Weekly Reports (Feature 26)
   * Generates a compassionate, non-punitive, and actionable weekly attention report.
   */
  static generateWeeklyReport(
    reflections: WeeklyReflection[],
    totalReturns: number,
    screenTimeSavedMinutes: number,
    completedTasksCount: number
  ): string {
    const savedHours = (screenTimeSavedMinutes / 60).toFixed(1);
    const returnPraise = totalReturns >= 10
      ? `Phenomenal awareness this week: you navigated ${totalReturns} moments of digital temptation with intentionality.`
      : `You practiced ${totalReturns} mindful gentle returns this week. Each return strengthens your attention muscle.`;

    return `
### MindSpace Weekly Attention Digest

${returnPraise}

**Key Achievements:**
- **Reclaimed Time:** ~${savedHours} hours spared from mindless scrolling loops.
- **Tasks Brought to Completion:** ${completedTasksCount} meaningful milestones accomplished.
- **Attention Resiliency:** Zero streaks broken, because MindSpace measures redirection, not rigid perfection.

**Mindful Recommendation for Next Week:**
Notice the very first 3 seconds of impulse when your finger reaches for an app. Take one deep diaphragmatic breath before touching the screen.
    `.trim();
  }
}
