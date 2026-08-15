import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Users, Check, Plus, Lock, ChevronRight } from "lucide-react";
import { CLUBS } from "../data/clubs";
import { quizzesForClub } from "../data/quizzes";
import { useStore } from "../store/useStore";
import { levelForXp } from "../lib/xp";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { PostCard } from "../components/clubs/PostCard";
import { CreatePostForm } from "../components/clubs/CreatePostForm";
import { cn } from "../lib/utils";

export default function ClubDetail() {
  const { clubId } = useParams();
  const club = CLUBS.find((c) => c.id === clubId);
  const [tab, setTab] = useState<"feed" | "quiz">("feed");

  const allPosts = useStore((s) => s.posts);
  const posts = useMemo(() => allPosts.filter((p) => p.clubId === clubId), [allPosts, clubId]);
  const isJoined = useStore((s) => (clubId ? s.user.joinedClubs.includes(clubId) : false));
  const toggleJoinClub = useStore((s) => s.toggleJoinClub);
  const user = useStore((s) => s.user);
  const quizAttempts = user.quizAttempts;

  const quizzes = useMemo(() => (clubId ? quizzesForClub(clubId) : []), [clubId]);
  const subjectLevel = club ? levelForXp(user.subjectXp[club.subject]) : 1;

  if (!club) return <Navigate to="/clubs" replace />;

  return (
    <div className="animate-fade-in-up">
      <Card className={cn("relative overflow-hidden p-0 bg-gradient-to-br", club.color)}>
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="relative flex flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-md">
              {club.icon}
            </span>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-white">{club.name}</h1>
              <p className="mt-1 max-w-lg text-sm text-white/85">{club.description}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/90">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {(club.memberCount + (isJoined ? 1 : 0)).toLocaleString()} гишүүн
                </span>
                <span>·</span>
                <span>Таны түвшин: Level {subjectLevel}</span>
              </div>
            </div>
          </div>
          <Button
            variant={isJoined ? "secondary" : "primary"}
            onClick={() => toggleJoinClub(club.id)}
            className={isJoined ? "" : "!bg-white !text-brand-700 hover:!bg-white/90"}
          >
            {isJoined ? (
              <>
                <Check className="h-4 w-4" /> Нэгдсэн
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Клубт нэгдэх
              </>
            )}
          </Button>
        </div>
      </Card>

      <div className="mt-6 flex gap-1 rounded-xl bg-slate-100 p-1 sm:w-fit">
        {(
          [
            ["feed", "📝 Нийтлэл"],
            ["quiz", "🧠 Тест"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-bold transition-colors sm:flex-none",
              tab === key ? "bg-white text-brand-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "feed" ? (
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {isJoined ? (
              <CreatePostForm clubId={club.id} />
            ) : (
              <Card className="p-5 text-center text-sm text-slate-500">
                Нийтлэл бичихийн тулд эхлээд клубт{" "}
                <button onClick={() => toggleJoinClub(club.id)} className="font-bold text-brand-600 hover:underline">
                  нэгдээрэй
                </button>
                .
              </Card>
            )}
            {posts.length === 0 && (
              <Card className="p-8 text-center text-slate-400">Одоогоор нийтлэл алга байна.</Card>
            )}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="space-y-5">
            <Card className="p-5">
              <h3 className="font-display text-sm font-bold text-slate-900">Клубын тухай</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{club.description}</p>
            </Card>
            <Card className="p-5">
              <h3 className="font-display text-sm font-bold text-slate-900">Түвшин ахих зам</h3>
              <p className="mt-1 text-xs text-slate-400">
                Тест өгч XP цуглуулан {club.name}-ийн шинжээч болоорой.
              </p>
              <Link to="/quiz" className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-brand-600 hover:bg-slate-100">
                Бүх тестийг үзэх <ChevronRight className="h-4 w-4" />
              </Link>
            </Card>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quizzes.map((quiz) => {
            const attempts = quizAttempts.filter((a) => a.quizId === quiz.id);
            const best = attempts.reduce(
              (m, a) => Math.max(m, a.score),
              -1
            );
            const done = best >= 0;
            const locked =
              quiz.level > 1 &&
              !quizAttempts.some((a) => a.quizId === `${club.id}-l${quiz.level - 1}`);
            return (
              <Card key={quiz.id} className={cn("p-5", locked && "opacity-60")}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wide text-brand-600">
                    {quiz.levelLabel}
                  </span>
                  {done && <span className="text-xs font-bold text-emerald-600">✓ {best}/{quiz.questions.length}</span>}
                </div>
                <h3 className="mt-1.5 font-display text-lg font-bold text-slate-900">{quiz.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{quiz.description}</p>
                <p className="mt-2 text-xs font-semibold text-slate-400">
                  {quiz.questions.length} асуулт · +{quiz.xpPerQuestion} XP/асуулт
                </p>
                <Link to={`/quiz/${quiz.id}`} className="mt-4 block">
                  <Button className="w-full" variant={done ? "secondary" : "primary"} disabled={locked}>
                    {locked ? (
                      <>
                        <Lock className="h-4 w-4" /> Түгжээтэй
                      </>
                    ) : done ? (
                      "Дахин өгөх"
                    ) : (
                      "Тест эхлүүлэх"
                    )}
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
