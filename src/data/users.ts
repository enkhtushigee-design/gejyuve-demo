import type { LeaderboardUser } from "../types";
import { levelForXp } from "../lib/xp";

// Mock competitors for the global + category leaderboards and the
// "challenge a friend" feature. The signed-in demo user ("Enkhtushig")
// is injected separately by the store so their live XP stays in sync.

function mkUser(
  id: string,
  name: string,
  avatarColor: string,
  xp: number,
  subjectXp: LeaderboardUser["subjectXp"]
): LeaderboardUser {
  return { id, name, avatarColor, xp, level: levelForXp(xp), subjectXp };
}

export const MOCK_USERS: LeaderboardUser[] = [
  mkUser("u-bat", "Бат", "bg-blue-500", 1810, { physics: 620, biology: 340, chemistry: 410, astronomy: 300, csci: 140 }),
  mkUser("u-anu", "Ану", "bg-rose-500", 1560, { physics: 300, biology: 610, chemistry: 210, astronomy: 280, csci: 160 }),
  mkUser("u-temuulen", "Төмөөлэн", "bg-amber-500", 1420, { physics: 410, biology: 180, chemistry: 260, astronomy: 470, csci: 100 }),
  mkUser("u-sarnai", "Сарнай", "bg-fuchsia-500", 1180, { physics: 220, biology: 340, chemistry: 380, astronomy: 140, csci: 100 }),
  mkUser("u-gantulga", "Гантулга", "bg-cyan-500", 1050, { physics: 480, biology: 90, chemistry: 120, astronomy: 260, csci: 100 }),
  mkUser("u-uranchimeg", "Уранчимэг", "bg-teal-500", 940, { physics: 140, biology: 380, chemistry: 160, astronomy: 120, csci: 140 }),
  mkUser("u-bilguun", "Билгүүн", "bg-orange-500", 860, { physics: 260, biology: 100, chemistry: 90, astronomy: 190, csci: 220 }),
  mkUser("u-ganchimeg", "Ганчимэг", "bg-emerald-500", 705, { physics: 90, biology: 220, chemistry: 160, astronomy: 95, csci: 140 }),
  mkUser("u-ochir", "Очир", "bg-indigo-500", 640, { physics: 200, biology: 60, chemistry: 80, astronomy: 200, csci: 100 }),
  mkUser("u-khulan", "Хулан", "bg-pink-500", 520, { physics: 70, biology: 200, chemistry: 90, astronomy: 60, csci: 100 }),
  mkUser("u-tuvshin", "Түвшин", "bg-violet-500", 410, { physics: 120, biology: 60, chemistry: 70, astronomy: 100, csci: 60 }),
  mkUser("u-narantuya", "Нарантуяа", "bg-lime-600", 260, { physics: 40, biology: 110, chemistry: 40, astronomy: 40, csci: 30 }),
];
