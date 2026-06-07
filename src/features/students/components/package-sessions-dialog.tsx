import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CreditPackage } from "@/types/api";
import { formatDate } from "@/lib/utils/date-fns";

interface PackageSessionsDialogProps {
  pkg: CreditPackage;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function PackageSessionsDialog({
  pkg,
  open,
  onOpenChange,
  className,
}: PackageSessionsDialogProps) {
  const sessions = pkg.course?.classSessions ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{pkg.course?.name ?? "Sessions"}</DialogTitle>
        </DialogHeader>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">No.</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-400">
                    No sessions
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="text-gray-400">
                      {session.courseLesson?.order ?? "—"}
                    </TableCell>
                    <TableCell>{session.courseLesson?.topic ?? "—"}</TableCell>
                    <TableCell className="text-gray-500">
                      {formatDate(session.scheduledAt)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
