import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, Users2, BrainCircuit, Trophy, Swords, UserCircle2, Menu } from "lucide-react";
import { useStore, totalXp } from "../store/useStore";
import { levelForXp, levelProgress } from "../lib/xp";
import { Avatar } from "./ui/Avatar";
import { ProgressBar } from "./ui/ProgressBar";
import { formatXp, cn } from "../lib/utils";
import { BadgeUnlockToast } from "./BadgeUnlockToast";
import { Sidebar } from "./Sidebar";
import { getStoredTheme, applyTheme, type Theme } from "../lib/theme";

const NAV_ITEMS = [
  { to: "/", label: "Нүүр", icon: Home, end: true },
  { to: "/clubs", label: "Клубууд", icon: Users2 },
  { to: "/quiz", label: "Тест", icon: BrainCircuit },
  { to: "/leaderboard", label: "Тэргүүлэгчид", icon: Trophy },
  { to: "/challenges", label: "Challenge", icon: Swords },
  { to: "/profile", label: "Профайл", icon: UserCircle2 },
];

export function Layout() {
  const user = useStore((s) => s.user);
  const xp = totalXp(user);
  const level = levelForXp(xp);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <BadgeUnlockToast />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
            aria-label="Цэс нээх"
          >
            <Menu className="h-6 w-6" />
          </button>

          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-glow text-lg text-slate-900 shadow-sm">
              🔍
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">
              gejyuve
              <span className="ml-1.5 rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-600 align-middle">
                Demo
              </span>
            </span>
          </NavLink>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  )
                }
              >
                <item.icon className="h-4 w-4" strokeWidth={2.25} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <NavLink
            to="/profile"
            className="ml-auto flex items-center gap-3 rounded-full py-1 pl-3 pr-1 hover:bg-slate-100 lg:ml-0"
          >
            <div className="hidden text-right sm:block">
              <p className="text-xs font-bold text-slate-800">{user.name}</p>
              <p className="text-[11px] font-medium text-slate-400">
                Level {level} · {formatXp(xp)} XP
              </p>
            </div>
            <Avatar name={user.name} colorClass={user.avatarColor} size="sm" />
          </NavLink>
        </div>
        {/* live XP progress sliver */}
        <ProgressBar value={levelProgress(xp)} height="h-1" className="rounded-none bg-slate-100/70" />
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
