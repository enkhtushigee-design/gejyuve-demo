import { useMemo, useState } from "react";
import type { Subject } from "../types";
import { useStore, computeLeaderboard } from "../store/useStore";
import { Card } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { cn, formatXp } from "../lib/utils";

const CATEGORIES: { key: "all" | Subject; label: string; icon: string }[] = [
  { key: "all", label: "Ерөнхий", icon: "🏆" },
  { key: "physics", label: "Physics", icon: "⚛️" },
  { key: "biology", label: "Biology", icon: "🧬" },
  { key: "chemistry", label: "Chemistry", icon: "🧪" },
  { key: "astronomy", label: "Astronomy", icon: "🌌" },
  { key: "csci", label: "CS", icon: "💻" },
];

const MEDALS = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const [category, setCategory] = useState<"all" | Subject>("all");
  const user = useStore((s) => s.user);
  const leaderboard = useMemo(() => computeLeaderboard(user), [user]);
  const userId = user.id;

  const rows = useMemo(() => {
    const list = [...leaderboard];
    if (category === "all") return list.sort((a, b) => b.xp - a.xp);
    return list.sort((a, b) => b.subjectXp[category] - a.subjectXp[category]);
  }, [leaderboard, category]);

  const myRank = rows.findIndex((r) => r.id === userId) + 1;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Тэргүүлэгчдийн Самбар
          </h1>
          <p className="mt-1.5 max-w-xl text-slate-500">
            XP цуглуулж, найзуудтайгаа өрсөлдөн шилдгүүдийн эгнээнд ор.
          </p>
        </div>
        <Card className="flex items-center gap-3 px-4 py-2.5">
          <span className="text-2xl">🎯</span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Таны байр
            </p>
            <p className="font-display text-lg font-extrabold text-brand-600">#{myRank}</p>
          </div>
        </Card>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-bold transition-colors",
              category === c.key ? "bg-white text-brand-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="divide-y divide-slate-100">
          {rows.map((row, idx) => {
            const rank = idx + 1;
            const isMe = row.id === userId;
            const xpValue = category === "all" ? row.xp : row.subjectXp[category];
            return (
              <div
                key={row.id}
                className={cn(
                  "flex items-center gap-4 px-5 py-3.5 transition-colors",
                  isMe && "bg-brand-50/70"
                )}
              >
                <div className="flex w-9 shrink-0 items-center justify-center font-display text-lg font-extrabold text-slate-400">
                  {rank <= 3 ? (
                    <span className="text-2xl">{MEDALS[rank - 1]}</span>
                  ) : (
                    `#${rank}`
                  )}
                </div>
                <Avatar name={row.name} colorClass={row.avatarColor} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className={cn("truncate font-display text-sm font-bold", isMe ? "text-brand-700" : "text-slate-900")}>
                    {row.name} {isMe && <span className="text-xs font-semibold text-brand-500">(Та)</span>}
                  </p>
                  <p className="text-xs text-slate-400">Level {row.level}</p>
                </div>
                <p className="shrink-0 font-display text-sm font-extrabold text-slate-800">
                  {formatXp(xpValue)} <span className="text-xs font-semibold text-slate-400">XP</span>
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
