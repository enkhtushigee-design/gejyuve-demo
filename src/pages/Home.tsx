import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Trophy, Sparkles, Swords } from "lucide-react";
import { CLUBS } from "../data/clubs";
import { quizzesForClub } from "../data/quizzes";
import { useStore, totalXp, computeLeaderboard } from "../store/useStore";
import { levelForXp, levelProgress, levelTitle, nextLevelXp } from "../lib/xp";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Avatar } from "../components/ui/Avatar";
import { PostCard } from "../components/clubs/PostCard";
import { cn, formatXp } from "../lib/utils";

const SUGGESTED_TAGS = ["Асуулт", "Хэлэлцүүлэг", "Мэдээ", "Судалгаа", "Туршилт"];

export default function Home() {
  const user = useStore((s) => s.user);
  const posts = useStore((s) => s.posts);
  const createPost = useStore((s) => s.createPost);
  const leaderboard = useMemo(() => computeLeaderboard(user), [user]);

  const xp = totalXp(user);
  const level = levelForXp(xp);
  const rank = leaderboard.findIndex((r) => r.id === user.id) + 1;
  const topThree = leaderboard.slice(0, 3);

  const feed = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [posts]
  );

  const recommendedClubs = CLUBS.filter((c) => !user.joinedClubs.includes(c.id)).slice(0, 3);

  const nextQuiz = user.joinedClubs
    .map((clubId) => {
      const quizzes = quizzesForClub(clubId);
      return quizzes.find(
        (q) =>
          !user.quizAttempts.some((a) => a.quizId === q.id) &&
          (q.level === 1 || user.quizAttempts.some((a) => a.quizId === `${clubId}-l${q.level - 1}`))
      );
    })
    .filter((q): q is NonNullable<typeof q> => Boolean(q))[0];

  return (
    <div className="animate-fade-in-up grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main feed column — the first thing a visitor sees, Facebook-style. */}
      <div className="space-y-5 lg:col-span-2">
        <HomeComposer joinedClubs={user.joinedClubs} onSubmit={createPost} />

        {feed.length === 0 && (
          <Card className="p-8 text-center text-slate-400">Одоогоор нийтлэл алга байна.</Card>
        )}

        {feed.map((post) => {
          const club = CLUBS.find((c) => c.id === post.clubId);
          return (
            <PostCard
              key={post.id}
              post={post}
              club={club ? { id: club.id, name: club.name, icon: club.icon } : undefined}
            />
          );
        })}
      </div>

      {/* Sidebar — profile summary, quiz nudge, clubs, leaderboard, challenge. */}
      <div className="space-y-5">
        <Card className="overflow-hidden p-0">
          <div className="h-14 bg-gradient-to-r from-brand-600 via-brand-500 to-teal-glow" />
          <div className="px-5 pb-5">
            <div className="-mt-7 flex items-end gap-3">
              <Avatar name={user.name} colorClass={user.avatarColor} size="lg" />
              <div className="pb-1">
                <p className="font-display text-base font-bold text-slate-900">{user.name}</p>
                <p className="text-xs font-semibold text-brand-600">
                  Level {level} · {levelTitle(level)}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <ProgressBar value={levelProgress(xp)} height="h-2" />
              <p className="mt-1.5 text-right text-[11px] font-semibold text-slate-400">
                {formatXp(xp)} / {formatXp(nextLevelXp(xp))} XP
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-orange-400" /> {user.streak} өдөр
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-amber-500" /> #{rank} байр
              </span>
            </div>
          </div>
        </Card>

        {nextQuiz && (
          <Card className="p-5">
            <h2 className="font-display text-sm font-bold text-slate-900">Дараагийн тест</h2>
            <Link
              to={`/quiz/${nextQuiz.id}`}
              className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-brand-300 hover:bg-brand-50/30"
            >
              <span className="text-xl">
                {CLUBS.find((c) => c.id === nextQuiz.clubId)?.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-bold text-slate-900">
                  {nextQuiz.title}
                </p>
                <p className="text-xs text-slate-400">{nextQuiz.levelLabel}</p>
              </div>
              <Sparkles className="h-4 w-4 shrink-0 text-brand-500" />
            </Link>
          </Card>
        )}

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-slate-900">Тэргүүлэгчид</h2>
            <Link to="/leaderboard" className="text-xs font-bold text-brand-600 hover:underline">
              Бүгд
            </Link>
          </div>
          <div className="mt-3 space-y-2.5">
            {topThree.map((row, idx) => (
              <div key={row.id} className="flex items-center gap-2.5">
                <span className="text-base">{["🥇", "🥈", "🥉"][idx]}</span>
                <Avatar name={row.name} colorClass={row.avatarColor} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-800">{row.name}</p>
                </div>
                <p className="text-xs font-bold text-slate-500">{formatXp(row.xp)} XP</p>
              </div>
            ))}
          </div>
        </Card>

        {recommendedClubs.length > 0 && (
          <Card className="p-5">
            <h2 className="font-display text-sm font-bold text-slate-900">Санал болгож буй клубууд</h2>
            <div className="mt-3 space-y-1">
              {recommendedClubs.map((club) => (
                <Link
                  key={club.id}
                  to={`/clubs/${club.id}`}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-slate-50"
                >
                  <span className="text-lg">{club.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{club.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {club.memberCount.toLocaleString()} гишүүн
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        )}

        <Card className="bg-gradient-to-br from-slate-900 to-brand-900 p-5 text-white">
          <h2 className="flex items-center gap-2 font-display text-sm font-bold">
            <Swords className="h-4 w-4" /> Challenge хийх үү?
          </h2>
          <p className="mt-1.5 text-xs text-white/70">
            Найзаа сонгож, сэдвээ сонгоод шууд өрсөлдөөрэй.
          </p>
          <Link to="/challenges" className="mt-3 block">
            <Button size="sm" className="w-full !bg-white !text-slate-900 hover:!bg-white/90">
              Challenge үүсгэх
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

function HomeComposer({
  joinedClubs,
  onSubmit,
}: {
  joinedClubs: string[];
  onSubmit: (clubId: string, content: string, tag: string) => void;
}) {
  const options = CLUBS.filter((c) => joinedClubs.includes(c.id));
  const [clubId, setClubId] = useState(options[0]?.id ?? "");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState(SUGGESTED_TAGS[0]);
  const [posted, setPosted] = useState(false);

  if (options.length === 0) {
    return (
      <Card className="p-5 text-center text-sm text-slate-500">
        Нийтлэл бичихийн тулд эхлээд{" "}
        <Link to="/clubs" className="font-bold text-brand-600 hover:underline">
          клубт нэгдээрэй
        </Link>
        .
      </Card>
    );
  }

  const submit = () => {
    if (!content.trim() || !clubId) return;
    onSubmit(clubId, content, tag);
    setContent("");
    setPosted(true);
    setTimeout(() => setPosted(false), 2200);
  };

  return (
    <Card className="p-5">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Юу бодож байна? Клубтойгоо хуваалцаарай..."
        rows={3}
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
      />

      <div className="mt-3">
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
          Аль клубт нийтлэх вэ?
        </p>
        <div className="flex flex-wrap gap-1.5">
          {options.map((club) => (
            <button
              key={club.id}
              onClick={() => setClubId(club.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors",
                clubId === club.id
                  ? "border-brand-400 bg-brand-50 text-brand-700"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              )}
            >
              <span>{club.icon}</span> {club.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                tag === t ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={submit} disabled={!content.trim()}>
          <Sparkles className="h-4 w-4" /> Нийтлэх
        </Button>
      </div>
      {posted && (
        <p className="animate-fade-in-up mt-2 text-xs font-semibold text-emerald-600">
          ✓ Нийтлэл амжилттай нэмэгдлээ!
        </p>
      )}
    </Card>
  );
}
