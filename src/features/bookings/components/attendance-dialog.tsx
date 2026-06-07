import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMarkAttendance } from "../hooks/api";
import { attendanceSchema, type AttendanceFormValues } from "../schema";
import type { Booking } from "@/types/api";

interface Props {
  booking: Booking;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const TERMINAL = ["ATTENDED", "SKIPPED", "ABSENT"];

export function AttendanceDialog({ booking, open, onOpenChange }: Props) {
  const { mutate: markAttendance, isPending } = useMarkAttendance();
  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: { status: "ATTENDED" },
  });
  const isTerminal = TERMINAL.includes(booking.status);

  const onSubmit = (values: AttendanceFormValues) => {
    markAttendance({ id: booking.id, status: values.status }, { onSuccess: () => onOpenChange(false) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Mark Attendance — Booking #{booking.id}</DialogTitle></DialogHeader>
        {isTerminal ? (
          <p className="text-sm text-gray-500">This booking is already in a terminal state ({booking.status}) and cannot be changed.</p>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="ATTENDED">Attended</SelectItem>
                      <SelectItem value="SKIPPED">Skipped</SelectItem>
                      <SelectItem value="ABSENT">Absent</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Confirm"}</Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
