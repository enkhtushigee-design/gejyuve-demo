import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Check, X, ArrowRight, Trophy, RotateCcw, Home } from "lucide-react";
import { getQuiz } from "../data/quizzes";
import { CLUBS } from "../data/clubs";
import { badgeById, useStore } from "../store/useStore";
import { levelTitle } from "../lib/xp";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { cn } from "../lib/utils";

export default function QuizPlay() {
  const { quizId } = useParams();
  const quiz = quizId ? getQuiz(quizId) : undefined;
  const club = quiz ? CLUBS.find((c) => c.id === quiz.clubId) : undefined;
  const submitQuiz = useStore((s) => s.submitQuiz);

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof submitQuiz> | null>(null);

  if (!quiz || !club) return <Navigate to="/quiz" replace />;

  const question = quiz.questions[step];
  const isLast = step === quiz.questions.length - 1;

  const choose = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === question.correctIndex) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (!isLast) {
      setStep((s) => s + 1);
      setSelected(null);
      setRevealed(false);
      return;
    }
    const finalCorrect = correctCount;
    const res = submitQuiz(quiz, finalCorrect);
    setResult(res);
    setFinished(true);
  };

  const restart = () => {
    setStep(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setFinished(false);
    setResult(null);
  };

  if (finished && result) {
    const pct = Math.round((result.score / result.total) * 100);
    return (
      <div className="mx-auto max-w-xl animate-fade-in-up">
        <Card className="overflow-hidden p-0 text-center">
          <div className={cn("bg-gradient-to-br px-6 py-10", club.color)}>
            <div className="animate-pop-in mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-lg">
              {pct >= 80 ? "🏆" : pct >= 50 ? "🎉" : "💪"}
            </div>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-white">
              {pct >= 80 ? "Гайхалтай!" : pct >= 50 ? "Сайн байна!" : "Дараагийн оролдлого!"}
            </h1>
            <p className="mt-1 text-sm text-white/85">
              {quiz.title} · {quiz.levelLabel}
            </p>
          </div>

          <div className="px-6 py-7">
            <p className="font-display text-4xl font-extrabold text-slate-900">
              {result.score} / {result.total}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-400">{pct}% зөв хариулт</p>

            <div className="mx-auto mt-5 max-w-xs">
              <ProgressBar value={result.score / result.total} height="h-3" />
            </div>

            <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-3">
              <span className="animate-pop-in inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-sm font-extrabold text-amber-700">
                ⚡ +{result.xpEarned} XP
              </span>
            </div>

            {result.leveledUp && (
              <div className="animate-pop-in mt-4 rounded-xl bg-gradient-to-r from-brand-500 to-teal-glow p-4 text-white">
                <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                  Түвшин ахилаа!
                </p>
                <p className="font-display text-lg font-extrabold">
                  Level {result.previousLevel} → Level {result.newLevel}
                </p>
                <p className="text-xs text-white/80">{levelTitle(result.newLevel)}</p>
              </div>
            )}

            {result.newBadges.length > 0 && (
              <div className="mt-4 space-y-2">
                {result.newBadges.map((id) => {
                  const badge = badgeById(id);
                  if (!badge) return null;
                  return (
                    <div
                      key={id}
                      className="animate-pop-in flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-left"
                    >
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-amber-600">
                          Шинэ тэмдэг
                        </p>
                        <p className="font-display text-sm font-bold text-slate-900">
                          {badge.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Button variant="secondary" className="flex-1" onClick={restart}>
                <RotateCcw className="h-4 w-4" /> Дахин өгөх
              </Button>
              <Link to={`/clubs/${club.id}`} className="flex-1">
                <Button variant="secondary" className="w-full">
                  <Trophy className="h-4 w-4" /> {club.name}
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button className="w-full">
                  <Home className="h-4 w-4" /> Нүүр
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl animate-fade-in-up">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-600">
            {club.icon} {quiz.title} · {quiz.levelLabel}
          </p>
          <p className="mt-0.5 text-sm text-slate-400">
            Асуулт {step + 1} / {quiz.questions.length}
          </p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-extrabold text-amber-700">
          ⚡ {correctCount * quiz.xpPerQuestion} XP
        </span>
      </div>

      <ProgressBar value={step / quiz.questions.length} className="mb-6" />

      <Card className="p-6 sm:p-7">
        <h2 className="font-display text-lg font-bold leading-snug text-slate-900 sm:text-xl">
          {question.text}
        </h2>

        <div className="mt-5 space-y-2.5">
          {question.options.map((opt, idx) => {
            const isCorrect = idx === question.correctIndex;
            const isSelected = idx === selected;
            let style =
              "border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/40";
            if (revealed) {
              if (isCorrect) style = "border-emerald-400 bg-emerald-50";
              else if (isSelected) style = "border-rose-400 bg-rose-50";
              else style = "border-slate-200 bg-white opacity-60";
            }
            return (
              <button
                key={idx}
                onClick={() => choose(idx)}
                disabled={revealed}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left text-[15px] font-medium text-slate-700 transition-all",
                  style
                )}
              >
                <span>{opt}</span>
                {revealed && isCorrect && <Check className="h-5 w-5 shrink-0 text-emerald-500" />}
                {revealed && isSelected && !isCorrect && (
                  <X className="h-5 w-5 shrink-0 text-rose-500" />
                )}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div
            className={cn(
              "animate-fade-in-up mt-4 rounded-xl p-4 text-sm leading-relaxed",
              selected === question.correctIndex
                ? "bg-emerald-50 text-emerald-800"
                : "bg-rose-50 text-rose-800"
            )}
          >
            <p className="mb-1 font-bold">
              {selected === question.correctIndex ? "✓ Зөв хариулт!" : "✕ Дараагийн удаад амжилт хүсье!"}
            </p>
            {question.explanation}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={next} disabled={!revealed}>
            {isLast ? "Дуусгах" : "Дараах"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
