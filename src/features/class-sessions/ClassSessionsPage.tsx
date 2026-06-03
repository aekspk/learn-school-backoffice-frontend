import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import { useGetBranches } from "@/features/branches/hooks/api";
import { useGetCourses } from "@/features/courses/hooks/api";
import { useCreateClassSession, useDeleteClassSession, useGetClassSessions } from "./hooks/api";
import { classSessionSchema, type ClassSessionFormValues } from "./schema";
import type { ClassSession } from "@/types/api";

function ClassSessionFormDialog({ session, trigger }: { session?: ClassSession; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { mutate: create, isPending } = useCreateClassSession();
  const { data: branches = [] } = useGetBranches();
  const { data: courses = [] } = useGetCourses();
  const form = useForm<ClassSessionFormValues>({
    resolver: zodResolver(classSessionSchema),
    defaultValues: {
      branchId: session?.branchId ?? 0,
      courseId: session?.courseId ?? 0,
      scheduledAt: session?.scheduledAt ? new Date(session.scheduledAt).toISOString().slice(0, 16) : "",
      durationMin: session?.durationMin ?? 60,
      totalSeats: session?.totalSeats ?? 10,
    },
  });
  const onSubmit = (values: ClassSessionFormValues) => {
    create(
      { ...values, scheduledAt: new Date(values.scheduledAt).toISOString() },
      { onSuccess: () => { setOpen(false); form.reset(); } },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>New Class Session</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="branchId" render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger></FormControl>
                  <SelectContent>{branches.map((b) => <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="courseId" render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger></FormControl>
                  <SelectContent>{courses.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="scheduledAt" render={({ field }) => (
              <FormItem><FormLabel>Scheduled At</FormLabel><FormControl><Input type="datetime-local" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="durationMin" render={({ field }) => (
                <FormItem><FormLabel>Duration (min)</FormLabel><FormControl><Input type="number" min={1} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="totalSeats" render={({ field }) => (
                <FormItem><FormLabel>Total Seats</FormLabel><FormControl><Input type="number" min={1} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
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

export default function ClassSessionsPage() {
  const { data: sessions = [], isLoading } = useGetClassSessions();
  const { mutate: deleteSession, isPending: deleting } = useDeleteClassSession();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Class Sessions</h1>
        <ClassSessionFormDialog trigger={<Button size="sm">New Session</Button>} />
      </div>
      {isLoading ? <p className="text-sm text-gray-500">Loading...</p> : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Branch</TableHead><TableHead>Course</TableHead><TableHead>Scheduled At</TableHead><TableHead>Duration</TableHead><TableHead>Seats</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center text-gray-400">No sessions found.</TableCell></TableRow>
              ) : sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.id}</TableCell>
                  <TableCell>{session.branch?.name ?? `#${session.branchId}`}</TableCell>
                  <TableCell>{session.course?.name ?? `#${session.courseId}`}</TableCell>
                  <TableCell>{new Date(session.scheduledAt).toLocaleString()}</TableCell>
                  <TableCell>{session.durationMin} min</TableCell>
                  <TableCell>{session.bookedSeats} / {session.totalSeats}</TableCell>
                  <TableCell><DeleteConfirmDialog isPending={deleting} onConfirm={() => deleteSession(session.id)} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
