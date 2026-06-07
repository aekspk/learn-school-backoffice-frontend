import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { CreditPackage } from "@/types/api";
import { formatDate } from "@/lib/utils/date-fns";
import { PackageSessionsDialog } from "./package-sessions-dialog";

interface PackageTableRowProps {
  pkg: CreditPackage;
  index: number;
}

export function PackageTableRow({ pkg, index }: PackageTableRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-gray-50"
        onClick={() => setOpen(true)}
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell>{pkg.course?.name ?? "—"}</TableCell>
        <TableCell>{`${pkg.remainingCredits} / ${pkg.totalCredits}`}</TableCell>
        <TableCell>{formatDate(pkg.expiresAt)}</TableCell>
        <TableCell>
          <Badge variant="outline">{pkg.status}</Badge>
        </TableCell>
        <TableCell className="text-right">
          <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
        </TableCell>
      </TableRow>
      <PackageSessionsDialog
        pkg={pkg}
        open={open}
        onOpenChange={setOpen}
        className="sm:max-w-lg"
      />
    </>
  );
}
