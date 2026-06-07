import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetEligibleStudents } from "@/features/class-management/hooks/api";
import { useCreateBooking } from "../hooks/api";
import { createBookingSchema, type CreateBookingFormValues } from "../schema";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface CreateBookingDialogProps {
  classSessionId?: number;
  className?: string;
}

export function CreateBookingDialog({
  classSessionId,
  className,
}: CreateBookingDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate: createBooking, isPending } = useCreateBooking();

  const form = useForm<CreateBookingFormValues>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: { studentId: 0, classSessionId: classSessionId ?? 0 },
  });

  const { data: students = [] } = useGetEligibleStudents(classSessionId);

  const onSubmit = (values: CreateBookingFormValues) => {
    createBooking(
      {
        studentId: values.studentId,
        classSessionId: values.classSessionId,
        packageId: values.packageId || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Booking created successfully");
          setOpen(false);
          form.reset();
        },
        onError: (error: Error) => {
          toast.error(error.message ?? "Failed to create booking");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          New Booking
        </Button>
      </DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>Create Booking</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((s) => (
                        <SelectItem key={s.id} value={String(s.id)}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs text-gray-500">
              Package is auto-selected by the server if not specified.
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
                {isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
