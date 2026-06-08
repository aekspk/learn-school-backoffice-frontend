import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectInput } from "@/components/ui/select";
import { useGetCourses } from "@/features/courses/hooks/api";
import { useCreateClassSession } from "../hooks/api";
import { classSessionSchema, type ClassSessionFormValues } from "../schema";

interface ClassSessionFormDialogProps {
  trigger: React.ReactNode;
  className?: string;
}

export default function ClassSessionFormDialog({
  trigger,
  className,
}: ClassSessionFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate: create, isPending } = useCreateClassSession();
  const { data: courses = [] } = useGetCourses();

  const form = useForm<ClassSessionFormValues>({
    resolver: zodResolver(classSessionSchema),
    defaultValues: {
      courseId: 0,
      courseLessonId: 0,
      scheduledAt: "",
      durationMin: 60,
      totalSeats: 10,
    },
  });

  const selectedCourseId = useWatch({ control: form.control, name: "courseId" });
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const lessons = selectedCourse?.courseLessons ?? [];

  const onSubmit = (values: ClassSessionFormValues) => {
    create(
      { ...values, scheduledAt: new Date(values.scheduledAt).toISOString() },
      {
        onSuccess: () => {
          toast.success("Class session created successfully");
          setOpen(false);
          form.reset();
        },
        onError: () => toast.error("Failed to create class session"),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) form.reset(); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`sm:max-w-lg ${className ?? ""}`}>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">
            New Class Session
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="class-session-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <SelectInput
                      placeholder="Select course"
                      options={courses.map((c) => ({ value: String(c.id), label: c.name }))}
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => {
                        field.onChange(Number(val));
                        form.setValue("courseLessonId", 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseLessonId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Lesson</FormLabel>
                  <FormControl>
                    <SelectInput
                      placeholder="Select lesson"
                      options={lessons.map((l) => ({
                        value: String(l.id),
                        label: `${l.order}. ${l.topic}`,
                      }))}
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                      disabled={!selectedCourseId}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scheduledAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled At</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="durationMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (min)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalSeats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Seats</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="class-session-form"
            disabled={isPending}
            className="shadow-md shadow-primary/20"
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
