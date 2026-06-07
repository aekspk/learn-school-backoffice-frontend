import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Booking } from "@/types/api";
import { formatDate } from "@/lib/utils/date-fns";
import { useGetStudentBookings } from "../hooks/api";

const columns: {
  header: string;
  render: (b: Booking, index: number) => React.ReactNode;
}[] = [
  { header: "NO", render: (_, i) => i + 1 },
  {
    header: "Session",
    render: (b) =>
      b.classSession ? formatDate(b.classSession.scheduledAt) : "—",
  },
  {
    header: "Status",
    render: (b) => <Badge variant="outline">{b.status}</Badge>,
  },
  {
    header: "Marked At",
    render: (b) => (b.markedAt ? formatDate(b.markedAt) : "—"),
  },
];

export function StudentBookingsTable({ studentId }: { studentId: number }) {
  const { data: bookings = [] } = useGetStudentBookings(studentId);

  return (
    <div className="space-y-2">
      <h2 className="font-medium">Booking Log</h2>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.header}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-gray-400"
                >
                  No bookings.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking, i) => (
                <TableRow key={booking.id}>
                  {columns.map((col) => (
                    <TableCell key={col.header}>
                      {col.render(booking, i)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
