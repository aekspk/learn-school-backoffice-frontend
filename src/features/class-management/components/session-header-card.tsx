import { MapPin, Clock, Calendar } from "lucide-react";
import type { ClassSession } from "@/types/api";
import { cn } from "@/lib/utils/cn";
import { formatTimeOnly, formatDate } from "@/lib/utils/date-fns";

interface SessionHeaderCardProps {
  session: ClassSession;
  className?: string;
}

export function SessionHeaderCard({ session, className }: SessionHeaderCardProps) {
  const occupancyPct = Math.min((session.bookedSeats / session.totalSeats) * 100, 100);
  const isFull = session.bookedSeats >= session.totalSeats;
  const remaining = session.totalSeats - session.bookedSeats;

  return (
    <div className={cn("bg-card rounded-xl border border-border shadow-sm p-6 flex items-start justify-between gap-6", className)}>
      <div className="space-y-3 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-0.5 rounded">
            CLASS
          </span>
          <span className="text-sm text-muted-foreground font-medium">• ID: #{session.id}</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground leading-tight">
          {session.course?.name} : {session.courseLesson?.topic ?? "—"}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {session.branch?.name ?? `Branch #${session.branchId}`}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {formatTimeOnly(session.scheduledAt, session.durationMin)}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(session.scheduledAt)}
          </span>
        </div>
      </div>

      <div className="shrink-0 bg-background border border-border rounded-xl p-5 min-w-44 text-center">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Seat Occupancy
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-foreground">{session.bookedSeats}</span>
          <span className="text-lg text-muted-foreground">/{session.totalSeats}</span>
          <span className="text-sm font-semibold text-muted-foreground ml-1">Filled</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className={cn("h-full rounded-full", isFull ? "bg-destructive" : "bg-primary")}
            style={{ width: `${occupancyPct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {isFull
            ? "Session is full"
            : `${remaining} spot${remaining === 1 ? "" : "s"} remaining for this session`}
        </p>
      </div>
    </div>
  );
}
