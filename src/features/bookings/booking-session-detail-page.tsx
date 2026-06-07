import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetClassSession } from "@/features/class-management/hooks/api";
import { formatDate } from "@/lib/utils/date-fns";
import { CreateBookingDialog } from "./components/create-booking-dialog";
import { SessionBookingsTable } from "./components/session-bookings-table";

export default function BookingSessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sessionId = Number(id);
  const navigate = useNavigate();
  const { data: session, isLoading } = useGetClassSession(sessionId);

  if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (!session)
    return <p className="text-sm text-gray-500">Session not found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">
            {session.course?.name ?? `Session #${session.id}`}
          </h1>
        </div>
        <CreateBookingDialog classSessionId={sessionId} className="sm:max-w-md" />
      </div>

      <div className="rounded-md border bg-white p-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <p className="text-gray-400">Branch</p>
          <p className="font-medium">
            {session.branch?.name ?? `#${session.branchId}`}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Date</p>
          <p className="font-medium">{formatDate(session.scheduledAt)}</p>
        </div>
        <div>
          <p className="text-gray-400">Duration</p>
          <p className="font-medium">{session.durationMin} min</p>
        </div>
        <div>
          <p className="text-gray-400">Seats</p>
          <p className="font-medium">
            {session.bookedSeats} / {session.totalSeats}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-medium">Bookings</h2>
        <SessionBookingsTable classSessionId={sessionId} />
      </div>
    </div>
  );
}
