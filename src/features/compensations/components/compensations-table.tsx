import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Compensation } from "@/types/api";
import { formatDate, formatRelativeTime } from "@/lib/utils/date-fns";
import { TYPE_LABEL, STATUS_LABEL, STATUS_BADGE } from "../constants";

interface CompensationsTableProps {
  compensations: Compensation[];
  onResolve: (compensation: Compensation) => void;
}

export function CompensationsTable({ compensations, onResolve }: CompensationsTableProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Request Type</TableHead>
            <TableHead>Class Session</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Requested</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {compensations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                No compensations found.
              </TableCell>
            </TableRow>
          ) : (
            compensations.map((c) => {
              const student = c.booking?.student;
              const session = c.booking?.classSession;
              return (
                <TableRow key={c.id} className={c.status === "PENDING" ? "bg-yellow-50/40" : undefined}>
                  <TableCell>
                    <Badge className={STATUS_BADGE[c.status]} variant="outline">
                      {STATUS_LABEL[c.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{student?.name ?? "—"}</p>
                    {student?.email && (
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    )}
                  </TableCell>
                  <TableCell>{TYPE_LABEL[c.type] ?? c.type}</TableCell>
                  <TableCell>
                    {session ? (
                      <span className="text-sm">{formatDate(session.scheduledAt)}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-56">
                    {c.note ? (
                      <p className="text-sm line-clamp-2" title={c.note}>
                        {c.note}
                      </p>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatRelativeTime(c.createdAt)}
                  </TableCell>
                  <TableCell>
                    {c.status === "PENDING" && (
                      <Button size="sm" variant="outline" onClick={() => onResolve(c)}>
                        Resolve
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
  );
}
