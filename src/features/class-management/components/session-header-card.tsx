import type { ClassSession } from "@/types/api";

interface SessionHeaderCardProps {
  session: ClassSession;
  className?: string;
}

function formatTimeRange(scheduledAt: string, durationMin: number) {
  const start = new Date(scheduledAt);
  const end = new Date(start.getTime() + durationMin * 60 * 1000);
  const fmt = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  return `${fmt(start)} - ${fmt(end)}`;
}

export function SessionHeaderCard({
  session,
  className,
}: SessionHeaderCardProps) {
  const occupancyPct = Math.min(
    (session.bookedSeats / session.totalSeats) * 100,
    100,
  );

  return (
    <div
      className={`bg-white rounded-xl border p-5 flex items-start justify-between gap-4 ${className ?? ""}`}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
            CLASS
          </span>
          <h1 className="text-xl font-bold">
            {session.course?.name} : {session.courseLesson.topic}
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span>📍</span>
            {session.branch?.name}
          </span>
          <span className="flex items-center gap-1">
            <span>🕐</span>
            {formatTimeRange(session.scheduledAt, session.durationMin)}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0">
        <div className="bg-gray-50 border rounded-lg p-4 text-center min-w-32.5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
            Seat Occupancy
          </p>
          <p className="text-2xl font-bold">
            {session.bookedSeats}{" "}
            <span className="text-base font-normal text-gray-400">
              / {session.totalSeats} Filled
            </span>
          </p>
          <div className="mt-2 w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${occupancyPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
