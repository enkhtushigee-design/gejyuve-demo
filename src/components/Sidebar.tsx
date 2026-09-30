import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  X,
  Search,
  Home,
  Users2,
  BrainCircuit,
  Trophy,
  Swords,
  UserCircle2,
  Moon,
  Sun,
} from "lucide-react";
import { CLUBS } from "../data/clubs";
import type { Theme } from "../lib/theme";
import { cn } from "../lib/utils";

const MENU_ITEMS = [
  { to: "/", label: "Нүүр", icon: Home, end: true },
  { to: "/clubs", label: "Клубууд", icon: Users2 },
  { to: "/quiz", label: "Тест", icon: BrainCircuit },
  { to: "/leaderboard", label: "Тэргүүлэгчид", icon: Trophy },
  { to: "/challenges", label: "Challenge", icon: Swords },
  { to: "/profile", label: "Профайл", icon: UserCircle2 },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Sidebar({ open, onClose, theme, onToggleTheme }: SidebarProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CLUBS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)
    );
  }, [query]);

  const goToClub = (clubId: string) => {
    navigate(`/clubs/${clubId}`);
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-xs flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Үндсэн цэс"
      >
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-glow text-lg shadow-sm">
              🔬
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">
              Гэж Юу Вэ
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Хаах"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 pt-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Хайх"
              className="w-full rounded-full bg-slate-100 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          {results.length > 0 && (
            <div className="mt-2 space-y-1 rounded-xl border border-slate-100 bg-white p-1.5 shadow-sm">
              {results.map((club) => (
                <button
                  key={club.id}
                  onClick={() => goToClub(club.id)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-slate-50"
                >
                  <span className="text-lg">{club.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-800">
                      {club.name}
                    </span>
                    <span className="block truncate text-xs text-slate-400">{club.tagline}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
          {query.trim() && results.length === 0 && (
            <p className="mt-2 px-1 text-xs text-slate-400">"{query}" олдсонгүй.</p>
          )}
        </div>

        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3.5 rounded-xl px-3 py-3 text-[15px] font-semibold transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )
              }
            >
              <item.icon className="h-5 w-5" strokeWidth={2} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 px-5 py-4">
          <button
            onClick={onToggleTheme}
            className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3"
          >
            <span className="flex items-center gap-2.5 text-sm font-semibold text-slate-600">
              {theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              {theme === "dark" ? "Харанхуй горим" : "Гэрэлт горим"}
            </span>
            <span
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                theme === "dark" ? "bg-brand-500" : "bg-slate-300"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                  theme === "dark" ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
