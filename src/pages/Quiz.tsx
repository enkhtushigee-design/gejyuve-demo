import { Link } from "react-router-dom";
import { Lock, Sparkles } from "lucide-react";
import { CLUBS } from "../data/clubs";
import { quizzesForClub } from "../data/quizzes";
import { useStore } from "../store/useStore";
import { levelForXp } from "../lib/xp";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

export default function Quiz() {
  const user = useStore((s) => s.user);

  return (
    <div className="animate-fade-in-up">
      <div className="mb-7">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Тест ба Түвшингийн Систем
        </h1>
        <p className="mt-1.5 max-w-2xl text-slate-500">
          Клуб бүрд 3 түвшний тест бий: Beginner → Intermediate → Advanced. Зөв хариулт бүрт XP
          цуглуулж, дараагийн түвшинд гарна.
        </p>
      </div>

      <div className="space-y-8">
        {CLUBS.map((club) => {
          const quizzes = quizzesForClub(club.id);
          const subjectLevel = levelForXp(user.subjectXp[club.subject]);
          return (
            <section key={club.id}>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="text-xl">{club.icon}</span>
                <h2 className="font-display text-lg font-bold text-slate-900">{club.name}</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">
                  Level {subjectLevel}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {quizzes.map((quiz) => {
                  const attempts = user.quizAttempts.filter((a) => a.quizId === quiz.id);
                  const best = attempts.reduce((m, a) => Math.max(m, a.score), -1);
                  const done = best >= 0;
                  const locked =
                    quiz.level > 1 &&
                    !user.quizAttempts.some((a) => a.quizId === `${club.id}-l${quiz.level - 1}`);
                  return (
                    <Card key={quiz.id} className={cn("p-4", locked && "opacity-60")}>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
                          {quiz.levelLabel}
                        </span>
                        {done && (
                          <span className="text-[11px] font-bold text-emerald-600">
                            ✓ {best}/{quiz.questions.length}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1 font-display text-base font-bold text-slate-900">
                        {quiz.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {quiz.questions.length} асуулт · +{quiz.xpPerQuestion} XP/асуулт
                      </p>
                      <Link to={`/quiz/${quiz.id}`} className="mt-3 block">
                        <Button size="sm" className="w-full" variant={done ? "secondary" : "primary"} disabled={locked}>
                          {locked ? (
                            <>
                              <Lock className="h-3.5 w-3.5" /> Түгжээтэй
                            </>
                          ) : done ? (
                            "Дахин өгөх"
                          ) : (
                            <>
                              <Sparkles className="h-3.5 w-3.5" /> Эхлүүлэх
                            </>
                          )}
                        </Button>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
