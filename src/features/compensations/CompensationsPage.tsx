import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import type { Compensation, CompensationStatus } from "@/types/api";
import { useGetCompensations, useResolveCompensation } from "./hooks/api";
import { resolveCompensationSchema, type ResolveCompensationFormValues } from "./schema";

const statusColor: Record<CompensationStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  RESOLVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

function ResolveDialog({ compensation, open, onOpenChange }: { compensation: Compensation; open: boolean; onOpenChange: (v: boolean) => void }) {
  const { mutate: resolve, isPending } = useResolveCompensation();
  const form = useForm<ResolveCompensationFormValues>({
    resolver: zodResolver(resolveCompensationSchema),
    defaultValues: { status: "RESOLVED", note: "" },
  });
  const onSubmit = (values: ResolveCompensationFormValues) => {
    resolve({ id: compensation.id, payload: values }, { onSuccess: () => onOpenChange(false) });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Resolve Compensation #{compensation.id}</DialogTitle></DialogHeader>
        <div className="text-sm text-gray-500 space-y-1 mb-2">
          <p>Type: <span className="font-medium text-gray-700">{compensation.type}</span></p>
          <p>Booking ID: <span className="font-medium text-gray-700">#{compensation.bookingId}</span></p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem>
                <FormLabel>Decision</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="note" render={({ field }) => (
              <FormItem><FormLabel>Note (optional)</FormLabel><FormControl><Textarea placeholder="e.g. Makeup class scheduled for 2026-07-20" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Confirm"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function CompensationsPage() {
  const [statusFilter, setStatusFilter] = useState<CompensationStatus | "ALL">("ALL");
  const [resolveTarget, setResolveTarget] = useState<Compensation | null>(null);
  const { data: compensations = [], isLoading } = useGetCompensations(statusFilter !== "ALL" ? { status: statusFilter } : undefined);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Compensations</h1>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? <p className="text-sm text-gray-500">Loading...</p> : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Booking</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Note</TableHead><TableHead>Created</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compensations.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center text-gray-400">No compensations found.</TableCell></TableRow>
              ) : compensations.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>#{c.bookingId}</TableCell>
                  <TableCell>{c.type}</TableCell>
                  <TableCell><Badge className={statusColor[c.status]} variant="outline">{c.status}</Badge></TableCell>
                  <TableCell className="max-w-48 truncate">{c.note ?? "—"}</TableCell>
                  <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {c.status === "PENDING" && <Button size="sm" variant="outline" onClick={() => setResolveTarget(c)}>Resolve</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {resolveTarget && (
        <ResolveDialog compensation={resolveTarget} open={!!resolveTarget} onOpenChange={(v) => !v && setResolveTarget(null)} />
      )}
    </div>
  );
}
