import type { ClassSession } from "@/types/api";
import { formatDate, formatDateKey } from "@/lib/utils/date-fns";
import type { CourseGroup, DateGroupData, SessionItem } from "./types";

function toSessionItem(session: ClassSession): SessionItem {
  return {
    id: session.id,
    topic: session.courseLesson?.topic ?? "—",
    scheduledAt: session.scheduledAt,
    durationMin: session.durationMin,
    bookedSeats: session.bookedSeats,
    totalSeats: session.totalSeats,
  };
}

function toCourseGroup(session: ClassSession): CourseGroup {
  return {
    courseId: session.courseId,
    courseName: session.course?.name ?? `Course #${session.courseId}`,
    branchName: session.branch?.name ?? `Branch #${session.branchId}`,
    sessions: [],
  };
}

export function groupSessions(sessions: ClassSession[]): DateGroupData[] {
  const byDate = new Map<string, Map<number, CourseGroup>>();

  for (const session of sessions) {
    const dateKey = formatDateKey(session.scheduledAt);

    if (!byDate.has(dateKey)) byDate.set(dateKey, new Map());
    const byCourse = byDate.get(dateKey)!;

    if (!byCourse.has(session.courseId)) {
      byCourse.set(session.courseId, toCourseGroup(session));
    }
    byCourse.get(session.courseId)!.sessions.push(toSessionItem(session));
  }

  return [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, byCourse]) => ({
      key,
      date: formatDate(key),
      courseGroups: [...byCourse.values()],
    }));
}
