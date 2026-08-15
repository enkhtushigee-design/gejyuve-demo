import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { CLUBS } from "../data/clubs";
import { useStore } from "../store/useStore";
import { Card } from "../components/ui/Card";
import { cn } from "../lib/utils";

export default function Clubs() {
  const joinedClubs = useStore((s) => s.user.joinedClubs);

  return (
    <div className="animate-fade-in-up">
      <div className="mb-7">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Шинжлэх Ухааны Клубууд
        </h1>
        <p className="mt-1.5 max-w-2xl text-slate-500">
          Сонирхлын дагуу клубт нэгдэж, бусад сониуч хүмүүстэй мэдлэгээ хуваалц, тест өгч
          дадлагажаарай.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {CLUBS.map((club) => {
          const joined = joinedClubs.includes(club.id);
          return (
            <Link key={club.id} to={`/clubs/${club.id}`}>
              <Card className="group h-full overflow-hidden p-0 transition-shadow hover:shadow-lg hover:shadow-slate-900/5">
                <div className={cn("relative h-24 bg-gradient-to-br", club.color)}>
                  <div className="bg-grid absolute inset-0 opacity-40" />
                  <span className="absolute -bottom-6 left-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-md ring-4 ring-white">
                    {club.icon}
                  </span>
                  {joined && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-emerald-600 shadow-sm">
                      ✓ Нэгдсэн
                    </span>
                  )}
                </div>
                <div className="px-5 pb-5 pt-9">
                  <h3 className="font-display text-lg font-bold text-slate-900">{club.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{club.tagline}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                      <Users className="h-3.5 w-3.5" />
                      {club.memberCount.toLocaleString()} гишүүн
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                      Нэвтрэх <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
