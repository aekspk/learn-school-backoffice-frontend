import { Calendar, MoreHorizontal } from "lucide-react";
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
import { useGetStudentBookings } from "../hooks/api";
import { cn } from "@/lib/utils/cn";

interface StudentBookingsTableProps {
  studentId: number;
}

const STATUS_STYLES: Record<BookingStatus, string> = {
  ABSENT: "bg-red-100 text-red-700",
  ATTENDED: "bg-green-100 text-green-800",
  BOOKED: "bg-blue-100 text-blue-700",
  SKIPPED: "bg-gray-100 text-gray-600",
  CANCELLED: "bg-gray-100 text-gray-600",
};

export function StudentBookingsTable({ studentId }: StudentBookingsTableProps) {
  const { data: bookings = [] } = useGetStudentBookings(studentId);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="size-4 text-primary" />
          Booking Log
        </h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">NO</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Session Date</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Marked At</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-400 py-10"
                >
                  No bookings.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking: Booking, i: number) => (
                <TableRow
                  key={booking.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <TableCell className="text-gray-900">{i + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {booking.classSession
                          ? formatDate(booking.classSession.scheduledAt)
                          : "—"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold",
                        STATUS_STYLES[booking.status],
                      )}
                    >
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {booking.markedAt ? formatDate(booking.markedAt) : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    {booking.status === "ABSENT" ? (
                      <button className="text-primary text-sm font-semibold hover:underline">
                        Re-book
                      </button>
                    ) : (
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="size-4" />
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
