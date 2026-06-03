import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useMarkAttendance } from "@/features/bookings/hooks/api";
import { cn } from "@/lib/utils";
import type { Booking } from "@/types/api";

const AVATAR_COLORS = [
  "bg-indigo-500",
  "bg-teal-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-cyan-500",
];

const TERMINAL_STATUSES = ["ATTENDED", "SKIPPED", "ABSENT", "CANCELLED"];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getDaysUntilExpiry(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function StatusImpact({ booking }: { booking: Booking }) {
  switch (booking.status) {
    case "ATTENDED":
      return <span className="flex items-center gap-1 text-green-600 text-sm">✓ Credit deducted (-1)</span>;
    case "SKIPPED":
      return (
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-orange-500 text-sm">⚠ Credit preserved</span>
          <Badge variant="outline" className="text-orange-500 border-orange-300 w-fit text-xs">Compensation Pending</Badge>
        </div>
      );
    case "ABSENT":
      return <span className="flex items-center gap-1 text-red-500 text-sm">✗ No show - Follow up req.</span>;
    case "CANCELLED":
      return <span className="text-gray-400 text-sm">Cancelled</span>;
    default:
      return <span className="text-gray-400 text-sm italic">Pending entry...</span>;
  }
}

interface Props {
  booking: Booking;
  index: number;
}

export function StudentAttendanceRow({ booking, index }: Props) {
  const { mutate: markAttendance, isPending } = useMarkAttendance();
  const student = booking.student;
  const pkg = booking.package;
  const isTrial = !booking.packageId;
  const isTerminal = TERMINAL_STATUSES.includes(booking.status);
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];

  const daysUntilExpiry = pkg ? getDaysUntilExpiry(pkg.expiresAt) : null;
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 7;

  function handleMark(status: "ATTENDED" | "SKIPPED" | "ABSENT") {
    if (isTerminal || isPending) return;
    markAttendance({ id: booking.id, status });
  }

  return (
    <TableRow>
      {/* Student */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0", avatarColor)}>
            {student ? getInitials(student.name) : "?"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{student?.name ?? `Student #${booking.studentId}`}</span>
              <Badge
                variant="outline"
                className={cn("text-xs", isTrial ? "text-purple-600 border-purple-300" : "text-green-600 border-green-300")}
              >
                {isTrial ? "TRIAL" : "REGULAR"}
              </Badge>
            </div>
            <div className="text-xs text-gray-400">ID: #{booking.studentId}</div>
          </div>
        </div>
      </TableCell>

      {/* Credits */}
      <TableCell>
        {isTrial ? (
          <span className="text-sm text-gray-400 italic">N/A (Trial)</span>
        ) : pkg ? (
          <div className="space-y-1">
            <span className="text-sm font-medium">{pkg.remainingCredits} Left</span>
            <div className="w-24 h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={cn("h-full rounded-full", isExpiringSoon ? "bg-red-400" : "bg-indigo-500")}
                style={{ width: `${Math.min((pkg.remainingCredits / pkg.totalCredits) * 100, 100)}%` }}
              />
            </div>
            {isExpiringSoon && (
              <div className="flex items-center gap-1 text-red-500 text-xs">
                <span>⚠</span>
                <span>Expiring in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
        ) : (
          <span className="text-sm text-gray-400">—</span>
        )}
      </TableCell>

      {/* Attendance */}
      <TableCell>
        <div className="flex rounded-md border overflow-hidden w-fit">
          <button
            disabled={isTerminal || isPending}
            onClick={() => handleMark("ATTENDED")}
            className={cn(
              "px-3 py-1.5 text-sm border-r transition-colors",
              booking.status === "ATTENDED"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            Attend
          </button>
          <button
            disabled={isTerminal || isPending}
            onClick={() => handleMark("SKIPPED")}
            className={cn(
              "px-3 py-1.5 text-sm border-r transition-colors",
              booking.status === "SKIPPED"
                ? "bg-orange-400 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            Skip
          </button>
          <button
            disabled={isTerminal || isPending}
            onClick={() => handleMark("ABSENT")}
            className={cn(
              "px-3 py-1.5 text-sm transition-colors",
              booking.status === "ABSENT"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            Absent
          </button>
        </div>
      </TableCell>

      {/* Status / Impact */}
      <TableCell>
        <StatusImpact booking={booking} />
      </TableCell>
    </TableRow>
  );
}
