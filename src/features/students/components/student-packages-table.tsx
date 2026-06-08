import { GraduationCap } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CreditPackage } from "@/types/api";
import { PackageTableRow } from "./package-table-row";
import { AddCreditPackageDialog } from "./add-credit-package-dialog";

interface StudentPackagesTableProps {
  studentId: number;
  packages: CreditPackage[];
}

export function StudentPackagesTable({ studentId, packages }: StudentPackagesTableProps) {

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <GraduationCap className="size-4 text-primary" />
          Enrolled Courses
        </h3>
        <AddCreditPackageDialog studentId={studentId} className="sm:max-w-lg" />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">NO</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Credits</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Expires</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-400 py-10"
                >
                  No packages.
                </TableCell>
              </TableRow>
            ) : (
              packages.map((pkg, i) => (
                <PackageTableRow key={pkg.id} pkg={pkg} index={i} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
