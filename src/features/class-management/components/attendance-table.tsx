import { useState, useEffect } from "react";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMarkAttendances } from "@/features/bookings/hooks/api";
import { cn } from "@/lib/utils/cn";
import { formatRelativeTime } from "@/lib/utils/date-fns";
import type { Booking, BookingStatus } from "@/types/api";

type AttendanceStatus = "ATTENDED" | "SKIPPED" | "ABSENT";

type FormValues = {
  attendances: { bookingId: number; status: AttendanceStatus | "" }[];
};

interface AttendanceTableProps {
  bookings: Booking[];
  className?: string;
}

const TERMINAL_STATUSES = ["ATTENDED", "SKIPPED", "ABSENT", "CANCELLED"];

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

const STATUS_STYLES: Record<BookingStatus, string> = {
  ATTENDED: "bg-green-100 text-green-700",
  ABSENT: "bg-red-100 text-red-600",
  SKIPPED: "bg-yellow-100 text-yellow-700",
  BOOKED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-gray-100 text-gray-500",
};

export function AttendanceTable({ bookings, className }: AttendanceTableProps) {
  const { mutate: markAttendances, isPending } = useMarkAttendances();
  const [markEnabled, setMarkEnabled] = useState(false);

  const { control, handleSubmit, reset, getValues } = useForm<FormValues>({
    defaultValues: {
      attendances: bookings.map((booking) => ({
        bookingId: booking.id,
        status: "",
      })),
    },
  });

  useFieldArray({ control, name: "attendances" });

  useEffect(() => {
    const current = getValues("attendances");
    const statusMap = new Map(current.map((a) => [a.bookingId, a.status]));
    reset({
      attendances: bookings.map((b) => ({
        bookingId: b.id,
        status: statusMap.get(b.id) ?? "",
      })),
    });
  }, [bookings, getValues, reset]);

  const watchedAttendances = useWatch({ control, name: "attendances" });
  const pendingCount = watchedAttendances.filter((a) => a.status !== "").length;

  function onSubmit(values: FormValues) {
    const selected = values.attendances.filter((a) => a.status !== "") as {
      bookingId: number;
      status: AttendanceStatus;
    }[];
    console.log(selected);
    markAttendances(selected, {
      onSuccess: () => {
        toast.success("Attendance updated");
        reset();
      },
      onError: () => toast.error("Failed to update attendance"),
    });
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-foreground">
            Student Roll Call
          </h3>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {bookings.length} Students
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setMarkEnabled((v) => !v);
              reset();
            }}
          >
            {markEnabled ? "Cancel" : "Enable Attendance"}
          </Button>
          {markEnabled && (
            <Button
              size="sm"
              disabled={pendingCount === 0 || isPending}
              onClick={handleSubmit(onSubmit)}
            >
              <Check className="w-3.5 h-3.5" />
              Approve All ({pendingCount})
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-4 py-3">
                Student Name
              </th>
              <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-4 py-3">
                Phone
              </th>
              <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-4 py-3">
                Current Status
              </th>
              <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-4 py-3">
                Attendance Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-muted-foreground text-sm py-10"
                >
                  No bookings for this session.
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => {
                const studentName =
                  booking.student?.name ?? `Student #${booking.studentId}`;
                const isTerminal = TERMINAL_STATUSES.includes(booking.status);
                return (
                  <tr
                    key={booking.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {getInitials(studentName)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {studentName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Enrolled {formatRelativeTime(booking.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {booking.student?.phone ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "text-xs font-semibold px-2.5 py-1 rounded-2xl",
                          STATUS_STYLES[booking.status] ??
                            "bg-gray-100 text-gray-600",
                        )}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Controller
                        control={control}
                        name={`attendances.${index}.status`}
                        render={({ field }) => (
                          <div className="flex rounded-md border border-border overflow-hidden w-fit">
                            {(["ATTENDED", "SKIPPED", "ABSENT"] as const).map(
                              (status, i, arr) => (
                                <button
                                  key={status}
                                  type="button"
                                  disabled={
                                    !markEnabled || isTerminal || isPending
                                  }
                                  onClick={() =>
                                    field.onChange(
                                      field.value === status ? "" : status,
                                    )
                                  }
                                  className={cn(
                                    "px-3 py-1.5 text-xs font-medium transition-colors",
                                    i < arr.length - 1 &&
                                      "border-r border-border",
                                    field.value === status
                                      ? status === "ATTENDED"
                                        ? "bg-green-500 text-white"
                                        : status === "SKIPPED"
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-destructive text-destructive-foreground"
                                      : "bg-card text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed",
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
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {bookings.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground">
              Showing {bookings.length} of {bookings.length} entries
            </p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
