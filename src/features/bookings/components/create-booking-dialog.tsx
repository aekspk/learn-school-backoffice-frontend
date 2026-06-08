import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
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
import { SelectInput } from "@/components/ui/select";
import { useGetEligibleStudents } from "@/features/class-management/hooks/api";
import { useCreateBooking } from "../hooks/api";
import { createBookingSchema, type CreateBookingFormValues } from "../schema";

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
      <DialogContent className={`sm:max-w-lg ${className ?? ""}`}>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">
            Create Booking
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="create-booking-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <FormControl>
                    <SelectInput
                      placeholder="Select student"
                      options={students.map((s) => ({ value: String(s.id), label: s.name }))}
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs text-muted-foreground">
              Package is auto-selected by the server if not specified.
            </p>
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
            form="create-booking-form"
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
