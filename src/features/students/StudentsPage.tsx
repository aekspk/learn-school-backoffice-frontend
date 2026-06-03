import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import { useCreateStudent, useDeleteStudent, useGetStudents, useUpdateStudent } from "./hooks/api";
import { studentSchema, type StudentFormValues } from "./schema";
import type { Student } from "@/types/api";

function StudentFormDialog({ student, trigger }: { student?: Student; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { mutate: create, isPending: creating } = useCreateStudent();
  const { mutate: update, isPending: updating } = useUpdateStudent();
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: { name: student?.name ?? "", email: student?.email ?? "", phone: student?.phone ?? "" },
  });
  const onSubmit = (values: StudentFormValues) => {
    if (student) {
      update({ id: student.id, payload: values }, { onSuccess: () => setOpen(false) });
    } else {
      create(values, { onSuccess: () => { setOpen(false); form.reset(); } });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{student ? "Edit Student" : "New Student"}</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Somchai Jaidee" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="somchai@example.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>Phone (optional)</FormLabel><FormControl><Input placeholder="0812345678" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={creating || updating}>{creating || updating ? "Saving..." : "Save"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function StudentsPage() {
  const { data: students = [], isLoading } = useGetStudents();
  const { mutate: deleteStudent, isPending: deleting } = useDeleteStudent();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Students</h1>
        <StudentFormDialog trigger={<Button size="sm">New Student</Button>} />
      </div>
      {isLoading ? <p className="text-sm text-gray-500">Loading...</p> : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Created</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-gray-400">No students found.</TableCell></TableRow>
              ) : students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone ?? "—"}</TableCell>
                  <TableCell>{new Date(student.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <StudentFormDialog student={student} trigger={<Button size="sm" variant="outline">Edit</Button>} />
                      <DeleteConfirmDialog isPending={deleting} onConfirm={() => deleteStudent(student.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
