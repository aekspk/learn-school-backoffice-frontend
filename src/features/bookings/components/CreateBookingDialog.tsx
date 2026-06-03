import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useGetStudents } from "@/features/students/hooks/api";
import { useGetClassSessions } from "@/features/class-sessions/hooks/api";
import { useCreateBooking } from "../hooks/api";
import { createBookingSchema, type CreateBookingFormValues } from "../schema";

export function CreateBookingDialog() {
  const [open, setOpen] = useState(false);
  const { mutate: createBooking, isPending } = useCreateBooking();
  const { data: students = [] } = useGetStudents();
  const { data: sessions = [] } = useGetClassSessions();

  const form = useForm<CreateBookingFormValues>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: { studentId: 0, classSessionId: 0 },
  });

  const onSubmit = (values: CreateBookingFormValues) => {
    createBooking(
      { studentId: values.studentId, classSessionId: values.classSessionId, packageId: values.packageId || undefined },
      { onSuccess: () => { setOpen(false); form.reset(); } },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">New Booking</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Create Booking</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="studentId" render={({ field }) => (
              <FormItem>
                <FormLabel>Student</FormLabel>
                <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {students.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="classSessionId" render={({ field }) => (
              <FormItem>
                <FormLabel>Class Session</FormLabel>
                <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select session" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {sessions.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.course?.name ?? `Session #${s.id}`} — {new Date(s.scheduledAt).toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <p className="text-xs text-gray-500">Package is auto-selected by the server if not specified.</p>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending}>{isPending ? "Creating..." : "Create"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
