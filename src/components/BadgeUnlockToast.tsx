import { useEffect } from "react";
import { useStore, badgeById } from "../store/useStore";

export function BadgeUnlockToast() {
  const pendingBadgePopup = useStore((s) => s.pendingBadgePopup);
  const clearBadgePopup = useStore((s) => s.clearBadgePopup);

  useEffect(() => {
    if (!pendingBadgePopup) return;
    const t = setTimeout(() => clearBadgePopup(), 4200);
    return () => clearTimeout(t);
  }, [pendingBadgePopup, clearBadgePopup]);

  if (!pendingBadgePopup) return null;
  const badge = badgeById(pendingBadgePopup);
  if (!badge) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4 sm:top-6">
      <div className="animate-pop-in pointer-events-auto flex items-center gap-3 rounded-2xl border border-amber-200 bg-white/95 px-5 py-3.5 shadow-xl shadow-amber-500/10 backdrop-blur">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-2xl shadow-inner">
          {badge.icon}
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-amber-600">
            Шинэ тэмдэг нээгдлээ!
          </p>
          <p className="font-display text-sm font-bold text-slate-900">{badge.title}</p>
        </div>
        <button
          onClick={clearBadgePopup}
          className="ml-2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Хаах"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
