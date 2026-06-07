import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Booking, BookingStatus } from "@/types/api";
import { formatDate } from "@/lib/utils/date-fns";
import { useCancelBooking, useGetBookings } from "../hooks/api";
import { AttendanceDialog } from "./attendance-dialog";

interface SessionBookingsTableProps {
  classSessionId: number;
}

const statusColor: Record<BookingStatus, string> = {
  BOOKED: "bg-blue-100 text-blue-800",
  ATTENDED: "bg-green-100 text-green-800",
  SKIPPED: "bg-yellow-100 text-yellow-800",
  ABSENT: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-600",
};

export function SessionBookingsTable({ classSessionId }: SessionBookingsTableProps) {
  const { data: bookings = [], isLoading } = useGetBookings({ classSessionId });
  const { mutate: cancelBooking } = useCancelBooking();
  const [attendanceTarget, setAttendanceTarget] = useState<Booking | null>(null);

  if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>;

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Marked At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400">
                  No bookings yet.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    {booking.student?.name ?? `#${booking.studentId}`}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColor[booking.status]} variant="outline">
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {booking.markedAt ? formatDate(booking.markedAt) : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setAttendanceTarget(booking)}
                      >
                        Attendance
                      </Button>
                      {booking.status === "BOOKED" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {attendanceTarget && (
        <AttendanceDialog
          booking={attendanceTarget}
          open={!!attendanceTarget}
          onOpenChange={(v) => !v && setAttendanceTarget(null)}
        />
      )}
    </>
  );
}
