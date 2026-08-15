import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CLUBS } from "../data/clubs";
import { BADGES } from "../data/badges";
import { useStore, totalXp, computeLeaderboard } from "../store/useStore";
import { levelForXp, levelProgress, levelTitle, nextLevelXp } from "../lib/xp";
import { Card } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { ProgressBar } from "../components/ui/ProgressBar";
import { cn, formatXp, timeAgo } from "../lib/utils";

const SUBJECT_META: Record<string, { label: string; icon: string }> = {
  physics: { label: "Physics", icon: "⚛️" },
  biology: { label: "Biology", icon: "🧬" },
  chemistry: { label: "Chemistry", icon: "🧪" },
  astronomy: { label: "Astronomy", icon: "🌌" },
  csci: { label: "Computer Science", icon: "💻" },
};

export default function Profile() {
  const user = useStore((s) => s.user);
  const leaderboard = useMemo(() => computeLeaderboard(user), [user]);

  const xp = totalXp(user);
  const level = levelForXp(xp);
  const progress = levelProgress(xp);
  const nextXp = nextLevelXp(xp);
  const rank = leaderboard.findIndex((r) => r.id === user.id) + 1;

  const earnedIds = new Set(user.earnedBadges.map((b) => b.badgeId));
  const avgScore =
    user.quizAttempts.length > 0
      ? Math.round(
          (user.quizAttempts.reduce((sum, a) => sum + a.score / a.total, 0) /
            user.quizAttempts.length) *
            100
        )
      : 0;

  return (
    <div className="animate-fade-in-up space-y-6">
      <Card className="relative overflow-hidden p-0">
        <div className="h-24 bg-gradient-to-r from-brand-600 via-brand-500 to-teal-glow" />
        <div className="relative px-6 pb-6">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <Avatar name={user.name} colorClass={user.avatarColor} size="xl" />
              <div className="pb-1">
                <h1 className="font-display text-2xl font-extrabold text-slate-900">{user.name}</h1>
                <p className="text-sm font-semibold text-brand-600">
                  Level {level} — {levelTitle(level)}
                </p>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <Stat label="Нийт XP" value={formatXp(xp)} />
              <Stat label="Тэргүүлэгчдийн байр" value={`#${rank}`} />
              <Stat label="Streak" value={`🔥 ${user.streak}`} />
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Level {level}</span>
              <span>
                {formatXp(xp)} / {formatXp(nextXp)} XP
              </span>
            </div>
            <ProgressBar value={progress} height="h-3" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <h2 className="font-display text-base font-bold text-slate-900">Хичээлийн түвшин</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(user.subjectXp).map(([subject, subXp]) => {
                const meta = SUBJECT_META[subject];
                const subLevel = levelForXp(subXp);
                return (
                  <div key={subject} className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                        <span>{meta.icon}</span> {meta.label}
                      </span>
                      <span className="text-xs font-bold text-brand-600">Level {subLevel}</span>
                    </div>
                    <ProgressBar value={levelProgress(subXp)} className="mt-2.5" />
                    <p className="mt-1.5 text-[11px] font-semibold text-slate-400">
                      {formatXp(subXp)} XP
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-base font-bold text-slate-900">Тестийн статистик</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <MiniStat label="Өгсөн тест" value={String(user.quizAttempts.length)} />
              <MiniStat label="Дундаж оноо" value={`${avgScore}%`} />
              <MiniStat
                label="Цуглуулсан XP"
                value={formatXp(user.quizAttempts.reduce((s, a) => s + a.xpEarned, 0))}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-base font-bold text-slate-900">Сүүлийн үйл ажиллагаа</h2>
            <div className="mt-4 space-y-3">
              {user.activity.slice(0, 8).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-700">{item.text}</p>
                    <p className="text-[11px] font-medium text-slate-400">{timeAgo(item.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-display text-base font-bold text-slate-900">
              Тэмдэг · Badges ({earnedIds.size}/{BADGES.length})
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {BADGES.map((badge) => {
                const earned = earnedIds.has(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center",
                      earned
                        ? "border-amber-200 bg-amber-50"
                        : "border-slate-100 bg-slate-50 opacity-50 grayscale"
                    )}
                    title={badge.description}
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <p className="text-[11px] font-bold leading-tight text-slate-700">
                      {badge.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-base font-bold text-slate-900">Нэгдсэн клубууд</h2>
            <div className="mt-4 space-y-2">
              {user.joinedClubs.length === 0 && (
                <p className="text-sm text-slate-400">Одоогоор клубт нэгдээгүй байна.</p>
              )}
              {user.joinedClubs.map((clubId) => {
                const club = CLUBS.find((c) => c.id === clubId);
                if (!club) return null;
                return (
                  <Link
                    key={clubId}
                    to={`/clubs/${clubId}`}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-slate-50"
                  >
                    <span className="text-lg">{club.icon}</span>
                    <span className="text-sm font-semibold text-slate-700">{club.name}</span>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3.5 py-2 text-center">
      <p className="font-display text-sm font-extrabold text-slate-900">{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 py-3 text-center">
      <p className="font-display text-lg font-extrabold text-slate-900">{value}</p>
      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
    </div>
  );
}
