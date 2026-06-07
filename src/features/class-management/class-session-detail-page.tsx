import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetClassSession } from "./hooks/api";
import { CreateBookingDialog } from "@/features/bookings/components/create-booking-dialog";
import { SessionHeaderCard } from "./components/session-header-card";
import { AttendanceTable } from "./components/attendance-table";
import { ChevronLeft } from "lucide-react";

export default function ClassSessionDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const sessionId = Number(id);

  const { data: session, isLoading: sessionLoading } =
    useGetClassSession(sessionId);

  const isLoading = sessionLoading;

  if (isLoading) {
    return <div className="text-sm text-gray-400 p-4">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="p-4 space-y-2">
        <p className="text-sm text-red-500">Session not found.</p>
        <Link
          to="/attendance"
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Back to sessions
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-between">
        <ChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <CreateBookingDialog classSessionId={sessionId} />
      </div>
      <SessionHeaderCard session={session} />
      <AttendanceTable bookings={session.bookings} />
    </div>
  );
}
