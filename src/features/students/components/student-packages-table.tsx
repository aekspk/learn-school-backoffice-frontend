import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetStudentPackages } from "../hooks/api";
import { AddCreditPackageDialog } from "./add-credit-package-dialog";
import { PackageTableRow } from "./package-table-row";

const COLUMNS = ["NO", "Course", "Credits", "Expires", "Status", ""];

export function StudentPackagesTable({ studentId }: { studentId: number }) {
  const { data: packages = [] } = useGetStudentPackages(studentId);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Courses</h2>
        <AddCreditPackageDialog studentId={studentId} className="sm:max-w-lg" />
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableHead key={col}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length}
                  className="text-center text-gray-400"
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
