// XP <-> Level progression logic shared across the whole app.
// The thresholds are intentionally front-loaded (fast early levels) so the
// demo feels rewarding within a short click-through session.

export const LEVEL_THRESHOLDS = [
  0, // Level 1
  80, // Level 2
  180, // Level 3
  320, // Level 4
  520, // Level 5
  800, // Level 6
  1200, // Level 7
  1700, // Level 8
  2350, // Level 9
  3200, // Level 10
  4300, // Level 11
  5700, // Level 12
];

export function levelForXp(xp: number): number {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return level;
}

export function xpForLevel(level: number): number {
  return LEVEL_THRESHOLDS[Math.min(level - 1, LEVEL_THRESHOLDS.length - 1)] ?? 0;
}

export function nextLevelXp(xp: number): number {
  const level = levelForXp(xp);
  if (level >= LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  return LEVEL_THRESHOLDS[level];
}

/** Progress (0-1) toward the next level, based on current XP. */
export function levelProgress(xp: number): number {
  const level = levelForXp(xp);
  const floor = xpForLevel(level);
  const ceil = nextLevelXp(xp);
  if (ceil === floor) return 1;
  return Math.min(1, Math.max(0, (xp - floor) / (ceil - floor)));
}

const LEVEL_TITLES: Record<number, string> = {
  1: "Шинэхэн Судлаач",
  2: "Хайгуулч",
  3: "Сониуч Оюутан",
  4: "Эрдэм Шинжлэгч",
  5: "Туршилтч",
  6: "Шинжлэх Ухааны Аварга",
  7: "Ахисан Судлаач",
  8: "Мэргэшсэн Эрдэмтэн",
  9: "Нээлтийн Тэргүүлэгч",
  10: "Шинжлэх Ухааны Мастер",
  11: "Нээлтийн Аварга",
  12: "Гэж Юу Вэ Легенд",
};

export function levelTitle(level: number): string {
  return LEVEL_TITLES[Math.min(level, 12)] ?? "Судлаач";
}
