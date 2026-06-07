import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils/cn";
import { formatTimeOnly } from "@/lib/utils/date-fns";

interface SessionRowProps {
  id: number;
  topic: string;
  scheduledAt: string;
  durationMin: number;
  bookedSeats: number;
  totalSeats: number;
  className?: string;
}

export default function SessionRow({
  id,
  topic,
  scheduledAt,
  durationMin,
  bookedSeats,
  totalSeats,
  className,
}: SessionRowProps) {
  const navigate = useNavigate();
  const isFull = bookedSeats >= totalSeats;

  return (
    <button
      onClick={() => navigate(`/class-management/${id}`)}
      className={cn(
        "w-full flex items-center justify-between px-4 py-2.5 rounded-lg",
        "text-left hover:bg-indigo-50 transition-colors group",
        className,
      )}
    >
      <span className="text-sm font-medium text-gray-800 group-hover:text-indigo-700 truncate">
        {topic}
      </span>

      <div className="flex items-center gap-3 shrink-0 ml-4">
        <span className="text-xs text-gray-500">
          {formatTimeOnly(scheduledAt, durationMin)}
        </span>
        <span
          className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            isFull
              ? "bg-red-100 text-red-600"
              : "bg-indigo-100 text-indigo-700",
          )}
        >
          {bookedSeats}/{totalSeats} seats
        </span>
      </div>
    </button>
  );
}
