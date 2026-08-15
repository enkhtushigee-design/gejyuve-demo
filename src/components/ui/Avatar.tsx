import { cn } from "../../lib/utils";

interface AvatarProps {
  name: string;
  colorClass: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const SIZES: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-2xl",
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function Avatar({ name, colorClass, size = "md" }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-display font-bold text-white shadow-sm ring-2 ring-white",
        colorClass,
        SIZES[size]
      )}
      title={name}
    >
      {initials(name)}
    </div>
  );
}
