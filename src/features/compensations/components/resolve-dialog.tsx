import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Textarea } from "@/components/ui/textarea";
import type { Compensation } from "@/types/api";
import { useResolveCompensation } from "../hooks/api";
import {
  resolveCompensationSchema,
  type ResolveCompensationFormValues,
} from "../schema";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils/date-fns";
import { TYPE_LABEL } from "../constants";

interface ResolveDialogProps {
  compensation: Compensation;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  className?: string;
}

export function ResolveDialog({
  compensation,
  open,
  onOpenChange,
  className,
}: ResolveDialogProps) {
  const { mutate: resolve, isPending } = useResolveCompensation();
  const form = useForm<ResolveCompensationFormValues>({
    resolver: zodResolver(resolveCompensationSchema),
    defaultValues: { status: "RESOLVED", type: undefined, note: "" },
  });
  const status = useWatch({ control: form.control, name: "status" });

  const onSubmit = (values: ResolveCompensationFormValues) => {
    resolve(
      { id: compensation.id, payload: values },
      {
        onSuccess: () => {
          toast.success("Compensation resolved successfully");
          onOpenChange(false);
        },
        onError: () => toast.error("Failed to resolve compensation"),
      },
    );
  };

  const student = compensation.booking?.student;
  const session = compensation.booking?.classSession;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-lg ${className ?? ""}`}>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">
            Resolve Compensation
          </DialogTitle>
        </DialogHeader>

        <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 grid grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
              Student
            </p>
            <p className="font-semibold text-foreground">
              {student?.name ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
              Request
            </p>
            <p className="font-semibold text-foreground">
              {TYPE_LABEL[compensation.type] ?? compensation.type}
            </p>
          </div>
          {session && (
            <div className="col-span-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                Class Date
              </p>
              <p className="font-semibold text-foreground">
                {formatDate(session.scheduledAt)}
              </p>
            </div>
          )}
          {compensation.note && (
            <div className="col-span-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                Note
              </p>
              <p className="text-foreground text-sm">{compensation.note}</p>
            </div>
          )}
        </div>

        <Form {...form}>
          <form
            id="resolve-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decision</FormLabel>
                  <FormControl>
                    <SelectInput
                      options={[
                        { value: "RESOLVED", label: "Resolved" },
                        { value: "REJECTED", label: "Rejected" },
                      ]}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {status === "RESOLVED" && (
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compensation Type</FormLabel>
                    <FormControl>
                      <SelectInput
                        placeholder="Select a type..."
                        options={[
                          { value: "MAKEUP_CLASS", label: "Makeup Class" },
                          { value: "SEAT_CREDIT", label: "Seat Credit" },
                          { value: "EXPIRY_EXTENSION", label: "Expiry Extension" },
                        ]}
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Makeup class scheduled for 2026-07-20"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
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
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="resolve-form"
            disabled={isPending}
            className="shadow-md shadow-primary/20"
          >
            {isPending ? "Saving..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
