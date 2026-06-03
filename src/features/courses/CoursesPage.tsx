import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import { useCreateCourse, useDeleteCourse, useGetCourses, useUpdateCourse } from "./hooks/api";
import { courseSchema, type CourseFormValues } from "./schema";
import type { Course } from "@/types/api";

function CourseFormDialog({ course, trigger }: { course?: Course; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { mutate: create, isPending: creating } = useCreateCourse();
  const { mutate: update, isPending: updating } = useUpdateCourse();
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: { name: course?.name ?? "", totalSessions: course?.totalSessions ?? 1 },
  });
  const onSubmit = (values: CourseFormValues) => {
    if (course) {
      update({ id: course.id, payload: values }, { onSuccess: () => setOpen(false) });
    } else {
      create(values, { onSuccess: () => { setOpen(false); form.reset(); } });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{course ? "Edit Course" : "New Course"}</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Course Name</FormLabel><FormControl><Input placeholder="Beginner Piano" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="totalSessions" render={({ field }) => (
              <FormItem><FormLabel>Total Sessions</FormLabel><FormControl><Input type="number" min={1} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} /></FormControl><FormMessage /></FormItem>
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

export default function CoursesPage() {
  const { data: courses = [], isLoading } = useGetCourses();
  const { mutate: deleteCourse, isPending: deleting } = useDeleteCourse();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Courses</h1>
        <CourseFormDialog trigger={<Button size="sm">New Course</Button>} />
      </div>
      {isLoading ? <p className="text-sm text-gray-500">Loading...</p> : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Total Sessions</TableHead><TableHead>Created</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-gray-400">No courses found.</TableCell></TableRow>
              ) : courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.totalSessions}</TableCell>
                  <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <CourseFormDialog course={course} trigger={<Button size="sm" variant="outline">Edit</Button>} />
                      <DeleteConfirmDialog isPending={deleting} onConfirm={() => deleteCourse(course.id)} />
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
