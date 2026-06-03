import { useNavigate } from "react-router-dom";
import { useGetClassSessions } from "./hooks/api";
import { cn } from "@/lib/utils";

function formatScheduledAt(scheduledAt: string) {
  return new Date(scheduledAt).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function AttendanceListPage() {
  const navigate = useNavigate();
  const { data: sessions = [], isLoading } = useGetClassSessions();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Attendance</h1>
      <p className="text-sm text-gray-500">Select a class session to take attendance.</p>

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-sm text-gray-400">No sessions found.</p>
      ) : (
        <div className="grid gap-3">
          {sessions.map((session) => {
            const occupancyPct = Math.min((session.bookedSeats / session.totalSeats) * 100, 100);
            const isFull = session.bookedSeats >= session.totalSeats;

            return (
              <button
                key={session.id}
                onClick={() => navigate(`/attendance/${session.id}`)}
                className="bg-white border rounded-xl p-4 text-left hover:border-indigo-400 hover:shadow-sm transition-all w-full"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded">CLASS</span>
                      <span className="font-semibold">{session.course?.name ?? `Course #${session.courseId}`}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                      <span>📍 {session.branch?.name ?? `Branch #${session.branchId}`}</span>
                      <span>🕐 {formatScheduledAt(session.scheduledAt)}</span>
                      <span>⏱ {session.durationMin} min</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className={cn("text-sm font-medium", isFull ? "text-red-500" : "text-indigo-600")}>
                      {session.bookedSeats} / {session.totalSeats}
                    </p>
                    <p className="text-xs text-gray-400">seats</p>
                    <div className="mt-1.5 w-24 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", isFull ? "bg-red-400" : "bg-indigo-500")}
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
