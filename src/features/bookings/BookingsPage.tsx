import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Booking, BookingStatus } from "@/types/api";
import { useCancelBooking, useGetBookings } from "./hooks/api";
import { CreateBookingDialog } from "./components/CreateBookingDialog";
import { AttendanceDialog } from "./components/AttendanceDialog";

const statusColor: Record<BookingStatus, string> = {
  BOOKED: "bg-blue-100 text-blue-800",
  ATTENDED: "bg-green-100 text-green-800",
  SKIPPED: "bg-yellow-100 text-yellow-800",
  ABSENT: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-600",
};

export default function BookingsPage() {
  const { data: bookings = [], isLoading } = useGetBookings();
  const { mutate: cancelBooking } = useCancelBooking();
  const [attendanceTarget, setAttendanceTarget] = useState<Booking | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Bookings</h1>
        <CreateBookingDialog />
      </div>
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Marked At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-gray-400">No bookings found.</TableCell></TableRow>
              ) : bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.student?.name ?? `#${booking.studentId}`}</TableCell>
                  <TableCell>
                    {booking.classSession
                      ? `${booking.classSession.course?.name ?? ""} — ${new Date(booking.classSession.scheduledAt).toLocaleString()}`
                      : `#${booking.classSessionId}`}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColor[booking.status]} variant="outline">{booking.status}</Badge>
                  </TableCell>
                  <TableCell>{booking.markedAt ? new Date(booking.markedAt).toLocaleString() : "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setAttendanceTarget(booking)}>Attendance</Button>
                      {booking.status === "BOOKED" && (
                        <Button size="sm" variant="destructive" onClick={() => cancelBooking(booking.id)}>Cancel</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {attendanceTarget && (
        <AttendanceDialog
          booking={attendanceTarget}
          open={!!attendanceTarget}
          onOpenChange={(v) => !v && setAttendanceTarget(null)}
        />
      )}
    </div>
  );
}
