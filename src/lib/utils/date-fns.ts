import { format, addMinutes, formatDistanceToNow } from "date-fns";

export function formatDate(date: string) {
  return format(new Date(date), "dd/MM/yyyy");
}

export function formatDateKey(date: string) {
  return format(new Date(date), "yyyy-MM-dd");
}

export function formatTimeRange(date: string, durationMin: number) {
  const start = new Date(date);
  const end = addMinutes(start, durationMin);
  return `${format(start, "dd/MM/yyyy HH:mm")}-${format(end, "HH:mm")}`;
}

export function formatTimeOnly(date: string, durationMin: number) {
  const start = new Date(date);
  const end = addMinutes(start, durationMin);
  return `${format(start, "HH:mm")}–${format(end, "HH:mm")}`;
}

export function formatRelativeTime(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
