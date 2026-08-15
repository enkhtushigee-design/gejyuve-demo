import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700",
        className
      )}
    >
      {children}
    </span>
  );
}

export function XpPill({ xp, className }: { xp: number | string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700",
        className
      )}
    >
      ⚡ {xp} XP
    </span>
  );
}

export function LevelPill({ level, className }: { level: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-teal-glow/10 px-2.5 py-1 text-xs font-bold text-teal-700",
        className
      )}
    >
      🎖️ Level {level}
    </span>
  );
}
