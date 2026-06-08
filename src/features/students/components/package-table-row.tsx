import { useState } from "react";
import { Code2, ChevronRight } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import type { CreditPackage } from "@/types/api";
import { formatDate } from "@/lib/utils/date-fns";
import { PackageSessionsDialog } from "./package-sessions-dialog";

interface PackageTableRowProps {
  pkg: CreditPackage;
  index: number;
}

export function PackageTableRow({ pkg, index }: PackageTableRowProps) {
  const [open, setOpen] = useState(false);
  const remainingRatio =
    pkg.totalCredits > 0 ? pkg.remainingCredits / pkg.totalCredits : 0;

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-gray-50/60 group h-14"
        onClick={() => setOpen(true)}
      >
        <TableCell className="text-gray-900">{index + 1}</TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Code2 className="size-4" />
            </div>
            <span className="font-semibold text-gray-900">
              {pkg.course?.name ?? "—"}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Progress value={remainingRatio * 100} className="w-20 h-1.5" />
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              {pkg.remainingCredits} / {pkg.totalCredits}
            </span>
          </div>
        </TableCell>
        <TableCell className="text-gray-500">
          {formatDate(pkg.expiresAt)}
        </TableCell>
        <TableCell className="text-right">
          <ChevronRight className="size-4 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
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
