import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { PackageStatus } from "@/types/api";
import { useDeleteCreditPackage, useGetCreditPackages } from "./hooks/api";
import { CreateCreditPackageDialog } from "./components/CreateCreditPackageDialog";

const statusColor: Record<PackageStatus, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  EXPIRED: "bg-red-100 text-red-800",
  DEPLETED: "bg-gray-100 text-gray-600",
  CANCELLED: "bg-gray-100 text-gray-600",
};

export default function CreditPackagesPage() {
  const { data: packages = [], isLoading } = useGetCreditPackages();
  const { mutate: deletePackage } = useDeleteCreditPackage();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Credit Packages</h1>
        <CreateCreditPackageDialog />
      </div>
      {isLoading ? <p className="text-sm text-gray-500">Loading...</p> : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Student</TableHead><TableHead>Course</TableHead><TableHead>Credits</TableHead><TableHead>Remaining</TableHead><TableHead>Status</TableHead><TableHead>Expires</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center text-gray-400">No packages found.</TableCell></TableRow>
              ) : packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>{pkg.id}</TableCell>
                  <TableCell>{pkg.student?.name ?? `#${pkg.studentId}`}</TableCell>
                  <TableCell>{pkg.course?.name ?? <span className="text-gray-400 italic">Global</span>}</TableCell>
                  <TableCell>{pkg.totalCredits}</TableCell>
                  <TableCell>{pkg.remainingCredits}</TableCell>
                  <TableCell><Badge className={statusColor[pkg.status]} variant="outline">{pkg.status}</Badge></TableCell>
                  <TableCell>{new Date(pkg.expiresAt).toLocaleDateString()}</TableCell>
                  <TableCell><Button size="sm" variant="destructive" onClick={() => deletePackage(pkg.id)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
