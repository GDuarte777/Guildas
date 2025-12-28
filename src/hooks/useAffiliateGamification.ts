import { useMemo } from "react";
import { useStatusConfig } from "@/store/statusConfig";

type LegacyWindow = {
  __calendarStatuses?: Record<string, string>;
  __awardedAchievements?: Record<string, Record<string, boolean>>;
};

const w = window as unknown as LegacyWindow;

export function useAffiliateGamification(affiliateId: string | null) {
  const { classes, levels, achievements } = useStatusConfig();

  const result = useMemo(() => {
    if (!affiliateId) {
      return {
        totalXP: 0,
        currentLevel: null,
        nextLevel: null,
        progressPercent: 0,
        xpForNextLevel: 0,
        xpInCurrentLevel: 0,
      };
    }

    // 1. Calculate XP from Calendar Statuses
    let statusXP = 0;
    const calendarEntries = w.__calendarStatuses || {};
    const prefix = `${affiliateId}:`;
    
    // Iterate over all calendar entries for this affiliate
    Object.entries(calendarEntries).forEach(([key, statusKey]) => {
      if (key.startsWith(prefix)) {
        const statusClass = classes.find((c) => c.key === statusKey);
        if (statusClass) {
          statusXP += statusClass.points;
        }
      }
    });

    // 2. Calculate XP from Achievements
    let achievementXP = 0;
    const awarded = w.__awardedAchievements?.[affiliateId] || {};
    
    // We iterate through configured achievements to see if they are awarded
    achievements.forEach((ach) => {
      // Check if this achievement is awarded (keys might be "achId" or "achId@YYYY-MM")
      // Simplification: Iterate awarded keys and check if they start with ach.id
      Object.keys(awarded).forEach((awardedKey) => {
        // awardedKey could be "my_achievement" or "my_achievement@2023-10"
        if (awardedKey === ach.id || awardedKey.startsWith(`${ach.id}@`)) {
          achievementXP += ach.xp;
        }
      });
    });

    const totalXP = statusXP + achievementXP;

    // 3. Determine Level
    // Sort levels by minXP desc to find the highest matching one
    const sortedLevels = [...levels].sort((a, b) => b.minXP - a.minXP);
    const currentLevel = sortedLevels.find((l) => totalXP >= l.minXP) || sortedLevels[sortedLevels.length - 1] || null;
    
    // Find next level
    // Sort levels by minXP asc to find the first one > totalXP
    const sortedLevelsAsc = [...levels].sort((a, b) => a.minXP - b.minXP);
    const nextLevel = sortedLevelsAsc.find((l) => l.minXP > totalXP) || null;

    // 4. Calculate Progress
    let progressPercent = 0;
    let xpForNextLevel = 0;
    let xpInCurrentLevel = 0;

    if (currentLevel && nextLevel) {
      const xpGap = nextLevel.minXP - currentLevel.minXP;
      const xpProgress = totalXP - currentLevel.minXP;
      progressPercent = Math.min(100, Math.max(0, (xpProgress / xpGap) * 100));
      xpForNextLevel = nextLevel.minXP - totalXP;
      xpInCurrentLevel = xpProgress;
    } else if (currentLevel && !nextLevel) {
      // Max level reached
      progressPercent = 100;
      xpForNextLevel = 0;
      xpInCurrentLevel = totalXP - currentLevel.minXP;
    } else if (!currentLevel && nextLevel) {
      // No level yet (below first level?)
      const xpGap = nextLevel.minXP;
      progressPercent = Math.min(100, Math.max(0, (totalXP / xpGap) * 100));
      xpForNextLevel = nextLevel.minXP - totalXP;
      xpInCurrentLevel = totalXP;
    }

    return {
      totalXP,
      statusXP,
      achievementXP,
      currentLevel,
      nextLevel,
      progressPercent,
      xpForNextLevel,
      xpInCurrentLevel,
    };
  }, [affiliateId, classes, levels, achievements, w.__calendarStatuses, w.__awardedAchievements]);

  return result;
}
