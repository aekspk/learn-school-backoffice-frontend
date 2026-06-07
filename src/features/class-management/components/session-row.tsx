import { Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatTimeOnly } from "@/lib/utils/date-fns";

interface SessionRowProps {
  topic: string;
  scheduledAt: string;
  durationMin: number;
  bookedSeats: number;
  totalSeats: number;
  className?: string;
  onClick: () => void;
}

export default function SessionRow({
  topic,
  scheduledAt,
  durationMin,
  bookedSeats,
  totalSeats,
  className,
  onClick,
}: SessionRowProps) {
  const isFull = bookedSeats >= totalSeats;
  const occupancyPct = Math.min((bookedSeats / totalSeats) * 100, 100);

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <p className="flex-1 min-w-0 text-sm font-medium text-foreground truncate">
        {topic}
      </p>

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
        <Clock className="w-3.5 h-3.5" />
        <span>{formatTimeOnly(scheduledAt, durationMin)}</span>
      </div>

      <div className="flex items-center gap-2 shrink-0 w-36">
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full",
              isFull ? "bg-destructive" : "bg-primary",
            )}
            style={{ width: `${occupancyPct}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {bookedSeats}/{totalSeats} seats
        </span>
      </div>
    </div>
  );
}
