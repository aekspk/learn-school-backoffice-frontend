import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useCreateCreditPackage } from "@/features/credit-packages/hooks/api";
import { useGetCourses } from "@/features/courses/hooks/api";
import {
  createCreditPackageSchema,
  type CreateCreditPackageFormValues,
} from "@/features/credit-packages/schema";
import { studentKeys } from "../hooks/api";
import { Plus } from "lucide-react";

interface AddCreditPackageDialogProps {
  studentId: number;
  className?: string;
}

export function AddCreditPackageDialog({
  studentId,
  className,
}: AddCreditPackageDialogProps) {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const { mutate: createPackage, isPending } = useCreateCreditPackage();
  const { data: courses = [] } = useGetCourses();

  const form = useForm<CreateCreditPackageFormValues>({
    resolver: zodResolver(createCreditPackageSchema),
    defaultValues: { studentId, totalCredits: 0, expiresAt: "" },
  });

  const onSubmit = (values: CreateCreditPackageFormValues) => {
    createPackage(
      {
        studentId,
        courseId: values.courseId || undefined,
        totalCredits: values.totalCredits,
        expiresAt: new Date(values.expiresAt).toISOString(),
      },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: studentKeys.packages(studentId) });
          toast.success("Course enrolled successfully");
          setOpen(false);
          form.reset({ studentId, totalCredits: 10, expiresAt: "" });
        },
        onError: (error) => {
          toast.error(error.message ?? "Failed to register course");
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) form.reset({ studentId, totalCredits: 10, expiresAt: "" });
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Enroll
        </Button>
      </DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>Enroll Course</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <SelectInput
                      placeholder="Select course"
                      options={courses.map((c) => ({
                        value: String(c.id),
                        label: c.name,
                      }))}
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => {
                        const id = Number(val);
                        field.onChange(id);
                        const course = courses.find((c) => c.id === id);
                        form.setValue(
                          "totalCredits",
                          course?.totalSessions ?? 0,
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalCredits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Credits</FormLabel>
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
              name="expiresAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires At</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs text-muted-foreground">
              Leave Course blank for a global package usable on any course.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Enrolling..." : "Enroll"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
