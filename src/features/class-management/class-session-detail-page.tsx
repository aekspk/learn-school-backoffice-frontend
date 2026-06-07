import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, BarChart2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetClassSession } from "./hooks/api";
import { SessionHeaderCard } from "./components/session-header-card";
import { AttendanceTable } from "./components/attendance-table";
import { CreateBookingDialog } from "@/features/bookings/components/create-booking-dialog";

export default function ClassSessionDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const sessionId = Number(id);

  const { data: session, isLoading } = useGetClassSession(sessionId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground p-4">Loading...</p>;
  }

  if (!session) {
    return <p className="text-sm text-destructive p-4">Session not found.</p>;
  }

  const attendedCount = session.bookings.filter(
    (b) => b.status === "ATTENDED",
  ).length;
  const attendanceRate =
    session.bookings.length > 0
      ? Math.round((attendedCount / session.bookings.length) * 100)
      : 0;
  const occupancyLabel = `${session.bookedSeats}/${session.totalSeats} Seats`;
  const popularityLabel =
    session.bookedSeats / session.totalSeats >= 0.7
      ? "Top Tier"
      : session.bookedSeats / session.totalSeats >= 0.4
        ? "Mid Tier"
        : "Low Fill";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground -ml-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <CreateBookingDialog
          classSessionId={sessionId}
          className="sm:max-w-md"
        />
      </div>

      <SessionHeaderCard session={session} />

      <AttendanceTable bookings={session.bookings} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Session Attendance
            </p>
            <p className="text-xl font-bold text-foreground">
              {attendanceRate}% Attendance
            </p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
            <BarChart2 className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Seat Occupancy
            </p>
            <p className="text-xl font-bold text-foreground">
              {occupancyLabel}
            </p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Class Popularity
            </p>
            <p className="text-xl font-bold text-foreground">
              {popularityLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
