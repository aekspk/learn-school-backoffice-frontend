import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetClassSession } from "./hooks/api";
import { useGetBookings, useMarkAttendance } from "@/features/bookings/hooks/api";
import { StudentAttendanceRow } from "./components/StudentAttendanceRow";

function formatTimeRange(scheduledAt: string, durationMin: number) {
  const start = new Date(scheduledAt);
  const end = new Date(start.getTime() + durationMin * 60 * 1000);
  const fmt = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${fmt(start)} - ${fmt(end)}`;
}

export default function ClassSessionRosterPage() {
  const { id } = useParams<{ id: string }>();
  const sessionId = Number(id);

  const { data: session, isLoading: sessionLoading } = useGetClassSession(sessionId);
  const { data: bookings = [], isLoading: bookingsLoading } = useGetBookings({ classSessionId: sessionId });
  const { mutate: markAttendance, isPending: bulkPending } = useMarkAttendance();

  const [search, setSearch] = useState("");

  const isLoading = sessionLoading || bookingsLoading;

  const filtered = bookings.filter((b) => {
    if (!search) return true;
    const name = b.student?.name ?? "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const bookedOnly = bookings.filter((b) => b.status === "BOOKED");

  function handleBulkMarkPresent() {
    bookedOnly.forEach((b) => markAttendance({ id: b.id, status: "ATTENDED" }));
  }

  const occupancyPct = session
    ? Math.min((session.bookedSeats / session.totalSeats) * 100, 100)
    : 0;

  if (isLoading) {
    return <div className="text-sm text-gray-400 p-4">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="p-4 space-y-2">
        <p className="text-sm text-red-500">Session not found.</p>
        <Link to="/attendance" className="text-sm text-indigo-600 hover:underline">← Back to sessions</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="bg-white rounded-xl border p-5 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded">CLASS</span>
            <h1 className="text-xl font-bold">{session.course?.name ?? `Course #${session.courseId}`}</h1>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span>📍</span>
              {session.branch?.name ?? `Branch #${session.branchId}`}
            </span>
            <span className="flex items-center gap-1">
              <span>🕐</span>
              {formatTimeRange(session.scheduledAt, session.durationMin)}
            </span>
          </div>
        </div>

        {/* Seat occupancy */}
        <div className="bg-gray-50 border rounded-lg p-4 text-center min-w-[130px] shrink-0">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Seat Occupancy</p>
          <p className="text-2xl font-bold">
            {session.bookedSeats}{" "}
            <span className="text-base font-normal text-gray-400">/ {session.totalSeats} Filled</span>
          </p>
          <div className="mt-2 w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${occupancyPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <Input
          placeholder="Find student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56 bg-white"
        />
        <div className="flex-1" />
        <Button
          variant="outline"
          size="sm"
          onClick={handleBulkMarkPresent}
          disabled={bulkPending || bookedOnly.length === 0}
        >
          Bulk Mark Present
        </Button>
        <Button size="sm" disabled className="bg-indigo-600 hover:bg-indigo-700 text-white opacity-60 cursor-not-allowed">
          Finalize Roster
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-64">Student</TableHead>
              <TableHead className="w-40">Credits</TableHead>
              <TableHead className="w-52">Attendance</TableHead>
              <TableHead>Status / Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <td colSpan={4} className="text-center text-gray-400 text-sm py-8">
                  {search ? "No students match your search." : "No bookings for this session."}
                </td>
              </TableRow>
            ) : (
              filtered.map((booking, i) => (
                <StudentAttendanceRow key={booking.id} booking={booking} index={i} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
