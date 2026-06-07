import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { formatTimeRange } from "@/lib/utils/date-fns";
import type { ClassSession } from "@/types/api";

interface Props {
  session: ClassSession;
}

export default function ClassSessionListItem({ session }: Props) {
  const navigate = useNavigate();
  const occupancyPct = Math.min(
    (session.bookedSeats / session.totalSeats) * 100,
    100,
  );
  const isFull = session.bookedSeats >= session.totalSeats;

  return (
    <Card
      className="cursor-pointer hover:border-indigo-400 hover:shadow-sm transition-all"
      onClick={() => navigate(`/class-management/${session.id}`)}
    >
      <CardContent className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
              CLASS
            </span>
            <span className="font-semibold">{session.courseLesson.topic}</span>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span>
              📍 {session.branch?.name ?? `Branch #${session.branchId}`}
            </span>
            <span>
              🕐 {formatTimeRange(session.scheduledAt, session.durationMin)}
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <p
            className={cn(
              "text-sm font-medium",
              isFull ? "text-red-500" : "text-indigo-600",
            )}
          >
            {session.bookedSeats} / {session.totalSeats}
          </p>
          <p className="text-xs text-gray-400">seats</p>
          <div className="mt-1.5 w-24 h-1.5 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full",
                isFull ? "bg-red-400" : "bg-indigo-500",
              )}
              style={{ width: `${occupancyPct}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
