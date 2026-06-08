import { Download, ListChecks, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Compensation, CompensationStatus } from "@/types/api";
import { formatDate, formatRelativeTime } from "@/lib/utils/date-fns";
import { TYPE_LABEL, STATUS_LABEL, STATUS_BADGE } from "../constants";
import { cn } from "@/lib/utils/cn";

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

interface CompensationsTableProps {
  compensations: Compensation[];
  isFetching: boolean;
  statusFilter: CompensationStatus | "ALL";
  onStatusChange: (value: CompensationStatus | "ALL") => void;
  onResolve: (compensation: Compensation) => void;
  className?: string;
}

export function CompensationsTable({
  compensations,
  isFetching,
  statusFilter,
  onStatusChange,
  onResolve,
  className,
}: CompensationsTableProps) {
  return (
    <div className={cn("bg-card rounded-xl border border-border shadow-sm overflow-hidden", className)}>
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-base font-semibold text-foreground">Request Queue</h3>
          {!isFetching && compensations.length > 0 && (
            <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
              {compensations.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SelectInput
            options={[
              { value: "ALL", label: "All Statuses" },
              { value: "PENDING", label: "Pending" },
              { value: "RESOLVED", label: "Resolved" },
              { value: "REJECTED", label: "Rejected" },
            ]}
            value={statusFilter}
            onValueChange={(v) => onStatusChange(v as CompensationStatus | "ALL")}
            className="h-8 text-xs w-34 border-border/60"
          />
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-border/60">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Status
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Student
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Request Type
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Class Session
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Requested
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {compensations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                  No compensations found.
                </TableCell>
              </TableRow>
            ) : (
              compensations.map((c) => {
                const student = c.booking?.student;
                const session = c.booking?.classSession;
                const studentName = student?.name ?? "Unknown";
                return (
                  <TableRow
                    key={c.id}
                    className={cn(
                      "hover:bg-muted/20 transition-colors",
                      c.status === "PENDING" && "bg-amber-50/40",
                    )}
                  >
                    <TableCell>
                      <span
                        className={cn(
                          "text-xs font-semibold px-2.5 py-1 rounded-2xl",
                          STATUS_BADGE[c.status],
                        )}
                      >
                        {STATUS_LABEL[c.status]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {getInitials(studentName)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{studentName}</p>
                          {student?.email && (
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {TYPE_LABEL[c.type] ?? c.type}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {session ? formatDate(session.scheduledAt) : "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatRelativeTime(c.createdAt)}
                    </TableCell>
                    <TableCell>
                      {c.status === "PENDING" ? (
                        <Button size="sm" onClick={() => onResolve(c)}>
                          Resolve
                        </Button>
                      ) : (
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {compensations.length > 0 && (
        <div className="px-6 py-3 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground">
            Showing {compensations.length} request{compensations.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
