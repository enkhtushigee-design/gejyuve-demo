import { cn } from "../../lib/utils";

interface ProgressBarProps {
  value: number; // 0-1
  className?: string;
  barClassName?: string;
  height?: string;
}

export function ProgressBar({ value, className, barClassName, height = "h-2.5" }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value * 100));
  return (
    <div className={cn("w-full overflow-hidden rounded-full bg-slate-100", height, className)}>
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-brand-500 to-teal-glow transition-[width] duration-700 ease-out",
          barClassName
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
