import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useCreateStudent, useUpdateStudent } from "../hooks/api";
import { studentSchema, type StudentFormValues } from "../schema";
import type { Student } from "@/types/api";

interface StudentFormDialogProps {
  student?: Student;
  trigger: React.ReactNode;
}

export function StudentFormDialog({
  student,
  trigger,
}: StudentFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate: create, isPending: creating } = useCreateStudent();
  const { mutate: update, isPending: updating } = useUpdateStudent();
  const isPending = creating || updating;

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: student?.name ?? "",
      email: student?.email ?? "",
      phone: student?.phone ?? "",
    },
  });

  const onSubmit = (values: StudentFormValues) => {
    if (student) {
      update(
        { id: student.id, payload: values },
        {
          onSuccess: () => {
            toast.success("Student updated successfully");
            setOpen(false);
          },
          onError: () => toast.error("Failed to update student"),
        },
      );
    } else {
      create(values, {
        onSuccess: () => {
          toast.success("Student created successfully");
          setOpen(false);
          form.reset();
        },
        onError: () => toast.error("Failed to create student"),
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v)
          form.reset({
            name: student?.name ?? "",
            email: student?.email ?? "",
            phone: student?.phone ?? "",
          });
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">
            {student ? "Edit Student" : "New Student"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="student-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Somchai Jaidee" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="somchai@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0812345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            form="student-form"
            disabled={isPending}
            className="shadow-md shadow-primary/20"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
