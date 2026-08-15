import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Trophy, Sparkles } from "lucide-react";
import { CLUBS } from "../data/clubs";
import { quizzesForClub } from "../data/quizzes";
import { useStore, totalXp, computeLeaderboard } from "../store/useStore";
import { levelForXp, levelProgress, levelTitle, nextLevelXp } from "../lib/xp";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Avatar } from "../components/ui/Avatar";
import { formatXp, timeAgo } from "../lib/utils";

export default function Home() {
  const user = useStore((s) => s.user);
  const leaderboard = useMemo(() => computeLeaderboard(user), [user]);

  const xp = totalXp(user);
  const level = levelForXp(xp);
  const rank = leaderboard.findIndex((r) => r.id === user.id) + 1;
  const topThree = leaderboard.slice(0, 3);

  const recommendedClubs = CLUBS.filter((c) => !user.joinedClubs.includes(c.id)).slice(0, 3);

  const nextQuizzes = user.joinedClubs
    .map((clubId) => {
      const quizzes = quizzesForClub(clubId);
      const next = quizzes.find(
        (q) =>
          !user.quizAttempts.some((a) => a.quizId === q.id) &&
          (q.level === 1 || user.quizAttempts.some((a) => a.quizId === `${clubId}-l${q.level - 1}`))
      );
      return next;
    })
    .filter((q): q is NonNullable<typeof q> => Boolean(q))
    .slice(0, 3);

  return (
    <div className="animate-fade-in-up space-y-6">
      <Card className="relative overflow-hidden p-0">
        <div className="bg-grid absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-teal-glow opacity-95" />
        <div className="relative flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-sm font-semibold text-white/80">Сайн байна уу,</p>
            <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              {user.name}! 👋
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/85">
              Өнөөдөр шинэ зүйл сурч, XP цуглуулаад тэргүүлэгчдийн эгнээнд ойртоорой.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link to="/quiz">
                <Button className="!bg-white !text-brand-700 hover:!bg-white/90">
                  <Sparkles className="h-4 w-4" /> Тест өгөх
                </Button>
              </Link>
              <Link to="/clubs">
                <Button variant="secondary" className="!bg-white/15 !text-white hover:!bg-white/25">
                  Клуб үзэх <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full max-w-xs shrink-0 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-white">
              <span className="font-display text-2xl font-extrabold">Level {level}</span>
              <span className="text-xs font-semibold text-white/80">{levelTitle(level)}</span>
            </div>
            <div className="mt-3">
              <ProgressBar
                value={levelProgress(xp)}
                height="h-2.5"
                className="bg-white/20"
                barClassName="bg-white"
              />
              <p className="mt-1.5 text-right text-xs font-semibold text-white/80">
                {formatXp(xp)} / {formatXp(nextLevelXp(xp))} XP
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-white">
              <span className="flex items-center gap-1.5 text-xs font-bold">
                <Flame className="h-3.5 w-3.5 text-orange-300" /> {user.streak} өдрийн streak
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold">
                <Trophy className="h-3.5 w-3.5 text-amber-200" /> #{rank} байр
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-slate-900">
                Үргэлжлүүлэн суралцах
              </h2>
              <Link to="/quiz" className="text-xs font-bold text-brand-600 hover:underline">
                Бүгдийг үзэх
              </Link>
            </div>
            {nextQuizzes.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">
                Клубт нэгдээд эхний тестээ өгье! <Link to="/clubs" className="font-bold text-brand-600 hover:underline">Клубууд →</Link>
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {nextQuizzes.map((quiz) => {
                  const club = CLUBS.find((c) => c.id === quiz.clubId)!;
                  return (
                    <Link
                      key={quiz.id}
                      to={`/quiz/${quiz.id}`}
                      className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/30"
                    >
                      <span className="text-xl">{club.icon}</span>
                      <p className="mt-2 font-display text-sm font-bold text-slate-900">
                        {quiz.title}
                      </p>
                      <p className="text-xs text-slate-400">{quiz.levelLabel}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-base font-bold text-slate-900">Санал болгож буй клубууд</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {recommendedClubs.length === 0 && (
                <p className="text-sm text-slate-400">Та бүх клубт нэгдчихсэн байна! 🎉</p>
              )}
              {recommendedClubs.map((club) => (
                <Link
                  key={club.id}
                  to={`/clubs/${club.id}`}
                  className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/30"
                >
                  <span className="text-xl">{club.icon}</span>
                  <p className="mt-2 font-display text-sm font-bold text-slate-900">{club.name}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {club.memberCount.toLocaleString()} гишүүн
                  </p>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-base font-bold text-slate-900">Сүүлийн үйл ажиллагаа</h2>
            <div className="mt-4 space-y-3">
              {user.activity.slice(0, 5).map((item) => (
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
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-slate-900">Тэргүүлэгчид</h2>
              <Link to="/leaderboard" className="text-xs font-bold text-brand-600 hover:underline">
                Бүгд
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {topThree.map((row, idx) => (
                <div key={row.id} className="flex items-center gap-3">
                  <span className="text-lg">{["🥇", "🥈", "🥉"][idx]}</span>
                  <Avatar name={row.name} colorClass={row.avatarColor} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">{row.name}</p>
                    <p className="text-[11px] text-slate-400">Level {row.level}</p>
                  </div>
                  <p className="text-xs font-bold text-slate-600">{formatXp(row.xp)} XP</p>
                </div>
              ))}
              <div className="mt-2 rounded-lg bg-brand-50 px-3 py-2 text-center text-xs font-bold text-brand-700">
                Таны байр: #{rank}
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 to-brand-900 p-6 text-white">
            <h2 className="font-display text-base font-bold">Challenge хийх үү?</h2>
            <p className="mt-1.5 text-sm text-white/70">
              Найзаа сонгож, сэдвээ сонгоод шууд өрсөлдөөрэй.
            </p>
            <Link to="/challenges" className="mt-4 block">
              <Button className="w-full !bg-white !text-slate-900 hover:!bg-white/90">
                ⚔️ Challenge үүсгэх
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
