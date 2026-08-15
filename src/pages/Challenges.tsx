import { useState } from "react";
import { Swords, Loader2 } from "lucide-react";
import type { Challenge, QuizLevel, Subject } from "../types";
import { MOCK_USERS } from "../data/users";
import { useStore } from "../store/useStore";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/Avatar";
import { cn, timeAgo } from "../lib/utils";

const SUBJECTS: { key: Subject; label: string; icon: string }[] = [
  { key: "physics", label: "Physics", icon: "⚛️" },
  { key: "biology", label: "Biology", icon: "🧬" },
  { key: "chemistry", label: "Chemistry", icon: "🧪" },
  { key: "astronomy", label: "Astronomy", icon: "🌌" },
  { key: "csci", label: "Computer Science", icon: "💻" },
];

const LEVELS: { key: QuizLevel; label: string }[] = [
  { key: 1, label: "Level 1 — Beginner" },
  { key: 2, label: "Level 2 — Intermediate" },
  { key: 3, label: "Level 3 — Advanced" },
];

export default function Challenges() {
  const user = useStore((s) => s.user);
  const challenges = useStore((s) => s.challenges);
  const runChallenge = useStore((s) => s.runChallenge);

  const [opponentId, setOpponentId] = useState(MOCK_USERS[0].id);
  const [subject, setSubject] = useState<Subject>("physics");
  const [level, setLevel] = useState<QuizLevel>(1);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<Challenge | null>(null);

  const opponent = MOCK_USERS.find((u) => u.id === opponentId)!;

  const start = () => {
    setRolling(true);
    setResult(null);
    setTimeout(() => {
      const res = runChallenge(opponentId, subject, level);
      setResult(res);
      setRolling(false);
    }, 1100);
  };

  return (
    <div className="animate-fade-in-up">
      <div className="mb-7">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Найзаа Challenge хий
        </h1>
        <p className="mt-1.5 max-w-2xl text-slate-500">
          Сэдэв, түвшнөө сонгоод найзтайгаа мэдлэгээрээ өрсөлдөж XP авах боломжтой.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-3">
          <h2 className="font-display text-sm font-bold text-slate-900">1. Өрсөлдөгчөө сонго</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {MOCK_USERS.map((u) => (
              <button
                key={u.id}
                onClick={() => setOpponentId(u.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left transition-colors",
                  opponentId === u.id
                    ? "border-brand-400 bg-brand-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <Avatar name={u.name} colorClass={u.avatarColor} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800">{u.name}</p>
                  <p className="text-[11px] text-slate-400">Level {u.level}</p>
                </div>
              </button>
            ))}
          </div>

          <h2 className="mt-6 font-display text-sm font-bold text-slate-900">2. Сэдэв сонго</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s.key}
                onClick={() => setSubject(s.key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-sm font-bold transition-colors",
                  subject === s.key
                    ? "border-brand-400 bg-brand-50 text-brand-700"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                )}
              >
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>

          <h2 className="mt-6 font-display text-sm font-bold text-slate-900">3. Түвшин сонго</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <button
                key={l.key}
                onClick={() => setLevel(l.key)}
                className={cn(
                  "rounded-full border-2 px-3.5 py-2 text-sm font-bold transition-colors",
                  level === l.key
                    ? "border-brand-400 bg-brand-50 text-brand-700"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          <Button onClick={start} disabled={rolling} className="mt-7 w-full" size="lg">
            {rolling ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Тооцоолж байна...
              </>
            ) : (
              <>
                <Swords className="h-4 w-4" /> Challenge эхлүүлэх
              </>
            )}
          </Button>
        </Card>

        <div className="space-y-5 lg:col-span-2">
          <Card className="overflow-hidden p-6">
            <h2 className="font-display text-sm font-bold text-slate-900">Тулаан</h2>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-col items-center gap-2">
                <Avatar name={user.name} colorClass={user.avatarColor} size="lg" />
                <p className="text-xs font-bold text-slate-700">Та</p>
              </div>
              <span className="font-display text-lg font-extrabold text-slate-300">VS</span>
              <div className="flex flex-col items-center gap-2">
                <Avatar name={opponent.name} colorClass={opponent.avatarColor} size="lg" />
                <p className="text-xs font-bold text-slate-700">{opponent.name}</p>
              </div>
            </div>

            {rolling && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" /> Асуултуудыг бодож байна...
              </div>
            )}

            {result && !rolling && (
              <div className="animate-pop-in mt-6">
                <div
                  className={cn(
                    "rounded-xl px-4 py-3 text-center font-display text-lg font-extrabold",
                    result.result === "win" && "bg-emerald-50 text-emerald-600",
                    result.result === "lose" && "bg-rose-50 text-rose-600",
                    result.result === "draw" && "bg-slate-100 text-slate-600"
                  )}
                >
                  {result.result === "win" && "🏆 Та ялалаа!"}
                  {result.result === "lose" && "😔 Та хожигдлоо"}
                  {result.result === "draw" && "🤝 Тэнцлээ"}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-700">
                    Та: {result.myScore}/6
                  </span>
                  <span className="font-bold text-slate-700">
                    {opponent.name}: {result.opponentScore}/6
                  </span>
                </div>
                <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-brand-500 transition-all duration-700"
                    style={{
                      width: `${(result.myScore / (result.myScore + result.opponentScore || 1)) * 100}%`,
                    }}
                  />
                  <div className="h-full flex-1 bg-slate-300" />
                </div>
                <p className="mt-4 text-center text-sm font-extrabold text-amber-600">
                  ⚡ +{result.myXp} XP
                </p>
              </div>
            )}

            {!result && !rolling && (
              <p className="mt-6 text-center text-sm text-slate-400">
                Тохиргоогоо сонгоод Challenge эхлүүлээрэй.
              </p>
            )}
          </Card>

          {challenges.length > 0 && (
            <Card className="p-5">
              <h3 className="font-display text-sm font-bold text-slate-900">Сүүлийн Challenge-үүд</h3>
              <div className="mt-3 space-y-2.5">
                {challenges.slice(0, 5).map((c) => (
                  <div key={c.id} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">
                      vs {c.opponentName} ·{" "}
                      {SUBJECTS.find((s) => s.key === c.subject)?.icon}{" "}
                      {SUBJECTS.find((s) => s.key === c.subject)?.label}
                    </span>
                    <span
                      className={cn(
                        "font-bold",
                        c.result === "win" && "text-emerald-600",
                        c.result === "lose" && "text-rose-500",
                        c.result === "draw" && "text-slate-500"
                      )}
                    >
                      {c.myScore}-{c.opponentScore} · {timeAgo(c.date)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
