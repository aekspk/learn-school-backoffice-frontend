import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Compensation } from "@/types/api";
import { useResolveCompensation } from "../hooks/api";
import { resolveCompensationSchema, type ResolveCompensationFormValues } from "../schema";
import { formatDate } from "@/lib/utils/date-fns";
import { TYPE_LABEL } from "../constants";

interface ResolveDialogProps {
  compensation: Compensation;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  className?: string;
}

export function ResolveDialog({ compensation, open, onOpenChange, className }: ResolveDialogProps) {
  const { mutate: resolve, isPending } = useResolveCompensation();
  const form = useForm<ResolveCompensationFormValues>({
    resolver: zodResolver(resolveCompensationSchema),
    defaultValues: { status: "RESOLVED", type: undefined, note: "" },
  });
  const status = useWatch({ control: form.control, name: "status" });

  const onSubmit = (values: ResolveCompensationFormValues) => {
    resolve({ id: compensation.id, payload: values }, { onSuccess: () => onOpenChange(false) });
  };

  const student = compensation.booking?.student;
  const session = compensation.booking?.classSession;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>Resolve Compensation</DialogTitle>
        </DialogHeader>

        <div className="rounded-md bg-muted p-3 text-sm space-y-1.5">
          <div className="flex gap-2">
            <span className="text-muted-foreground w-20 shrink-0">Student</span>
            <span className="font-medium">{student?.name ?? "—"}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground w-20 shrink-0">Request</span>
            <span className="font-medium">{TYPE_LABEL[compensation.type] ?? compensation.type}</span>
          </div>
          {session && (
            <div className="flex gap-2">
              <span className="text-muted-foreground w-20 shrink-0">Class</span>
              <span className="font-medium">{formatDate(session.scheduledAt)}</span>
            </div>
          )}
          {compensation.note && (
            <div className="flex gap-2">
              <span className="text-muted-foreground w-20 shrink-0">Note</span>
              <span className="text-foreground">{compensation.note}</span>
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decision</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RESOLVED">Resolved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <FormLabel>Compensation Type (optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MAKEUP_CLASS">Makeup Class</SelectItem>
                        <SelectItem value="SEAT_CREDIT">Seat Credit</SelectItem>
                        <SelectItem value="EXPIRY_EXTENSION">Expiry Extension</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <FormLabel>Note (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g. Makeup class scheduled for 2026-07-20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Confirm"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
