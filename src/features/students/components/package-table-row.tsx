import { useState } from "react";
import { Code2, ChevronRight } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import type { CreditPackage, PackageStatus } from "@/types/api";
import { formatDate } from "@/lib/utils/date-fns";
import { PackageSessionsDialog } from "./package-sessions-dialog";
import { cn } from "@/lib/utils/cn";

interface PackageTableRowProps {
  pkg: CreditPackage;
  index: number;
}

const STATUS_STYLES: Record<PackageStatus, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  EXPIRED: "bg-gray-100 text-gray-600",
  DEPLETED: "bg-orange-100 text-orange-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export function PackageTableRow({ pkg, index }: PackageTableRowProps) {
  const [open, setOpen] = useState(false);
  const remainingRatio =
    pkg.totalCredits > 0 ? pkg.remainingCredits / pkg.totalCredits : 0;

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-gray-50/60 group"
        onClick={() => setOpen(true)}
      >
        <TableCell className="text-gray-900">{index + 1}</TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Code2 className="size-4" />
            </div>
            <span className="font-semibold text-gray-900">
              {pkg.course?.name ?? "—"}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <Progress value={remainingRatio * 100} className="w-24 h-1.5" />
          <p className="text-xs mt-1 text-gray-500 font-medium">
            {pkg.remainingCredits} / {pkg.totalCredits} Credits
          </p>
        </TableCell>
        <TableCell className="text-gray-500">{formatDate(pkg.expiresAt)}</TableCell>
        <TableCell>
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold",
              STATUS_STYLES[pkg.status],
            )}
          >
            {pkg.status}
          </span>
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
