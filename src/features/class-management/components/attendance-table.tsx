import { useState } from "react";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMarkAttendances } from "@/features/bookings/hooks/api";
import { cn } from "@/lib/utils/cn";
import type { Booking } from "@/types/api";

type AttendanceStatus = "ATTENDED" | "SKIPPED" | "ABSENT";

type FormValues = {
  attendances: { bookingId: number; status: AttendanceStatus | "" }[];
};

interface AttendanceTableProps {
  bookings: Booking[];
  className?: string;
}

const TERMINAL_STATUSES = ["ATTENDED", "SKIPPED", "ABSENT", "CANCELLED"];

export function AttendanceTable({ bookings, className }: AttendanceTableProps) {
  const { mutate: markAttendances, isPending } = useMarkAttendances();
  const [showMark, setShowMark] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      attendances: bookings.map((booking) => ({
        bookingId: booking.id,
        status: "",
      })),
    },
  });

  useFieldArray({ control, name: "attendances" });

  const watchedAttendances = useWatch({ control, name: "attendances" });
  const pendingCount = watchedAttendances.filter((a) => a.status !== "").length;

  function onSubmit(values: FormValues) {
    const selected = values.attendances.filter((a) => a.status !== "") as {
      bookingId: number;
      status: AttendanceStatus;
    }[];
    markAttendances(selected, {
      onSuccess: () => {
        toast.success("Attendance updated");
        reset();
      },
      onError: () => toast.error("Failed to update attendance"),
    });
  }

  const columns: {
    header: string;
    render: (booking: Booking, index: number) => React.ReactNode;
  }[] = [
    {
      header: "Student",
      render: (booking) =>
        booking.student?.name ?? `Student #${booking.studentId}`,
    },
    {
      header: "Phone",
      render: (booking) => booking.student?.phone ?? "—",
    },
    {
      header: "Status",
      render: (booking) => booking.status,
    },
    {
      header: "Attendance",
      render: (booking, index) => {
        if (!showMark) return null;
        const isTerminal = TERMINAL_STATUSES.includes(booking.status);
        return (
          <Controller
            control={control}
            name={`attendances.${index}.status`}
            render={({ field }) => (
              <div className="flex rounded-md border overflow-hidden w-fit">
                {(["ATTENDED", "SKIPPED", "ABSENT"] as const).map(
                  (status, i, arr) => (
                    <button
                      key={status}
                      type="button"
                      disabled={isTerminal || isPending}
                      onClick={() => field.onChange(status)}
                      className={cn(
                        "px-3 py-1.5 text-sm transition-colors",
                        i < arr.length - 1 && "border-r",
                        field.value === status
                          ? status === "ATTENDED"
                            ? "bg-green-500 text-white"
                            : status === "SKIPPED"
                              ? "bg-orange-400 text-white"
                              : "bg-red-500 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                      )}
                    >
                      {status === "ATTENDED"
                        ? "Attend"
                        : status === "SKIPPED"
                          ? "Skip"
                          : "Absent"}
                    </button>
                  ),
                )}
              </div>
            )}
          />
        );
      },
    },
  ];

  return (
    <div className={className}>
      <div className="flex justify-end gap-2 mb-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setShowMark((v) => !v);
            reset();
          }}
        >
          {showMark ? "Hide Attendance" : "Mark Attendance"}
        </Button>
        {showMark && (
          <Button
            size="sm"
            disabled={pendingCount === 0 || isPending}
            onClick={handleSubmit(onSubmit)}
          >
            Approve ({pendingCount})
          </Button>
        )}
      </div>
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
                  className="text-center text-gray-400 text-sm py-8"
                >
                  No bookings for this session.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking, index) => (
                <TableRow key={booking.id}>
                  {columns.map((col) => (
                    <TableCell key={col.header}>
                      {col.render(booking, index)}
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
