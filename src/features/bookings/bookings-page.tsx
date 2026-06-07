import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetClassSessionList } from "@/features/class-management/hooks/api";
import { formatDate } from "@/lib/utils/date-fns";

export default function BookingsPage() {
  const { data: sessions = [], isLoading } = useGetClassSessionList();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Bookings</h1>
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400">
                    No sessions found.
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((session) => (
                  <TableRow
                    key={session.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/bookings/${session.id}`)}
                  >
                    <TableCell className="font-medium">
                      {session.course?.name ?? `#${session.courseId}`}
                    </TableCell>
                    <TableCell>
                      {session.branch?.name ?? `#${session.branchId}`}
                    </TableCell>
                    <TableCell>{formatDate(session.scheduledAt)}</TableCell>
                    <TableCell>{session.durationMin} min</TableCell>
                    <TableCell>
                      {session.bookedSeats} / {session.totalSeats}
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
