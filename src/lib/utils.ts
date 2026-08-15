export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

let counter = 0;
export function makeId(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

const MN_MONTHS = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
];

/** Returns a short relative-time string in Mongolian, e.g. "3 цагийн өмнө". */
export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "дөнгөж сая";
  if (min < 60) return `${min} мин өмнө`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} цагийн өмнө`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} өдрийн өмнө`;
  const d = new Date(iso);
  return `${d.getDate()} ${MN_MONTHS[d.getMonth()]}`;
}

export function formatXp(xp: number): string {
  return xp.toLocaleString("en-US");
}
