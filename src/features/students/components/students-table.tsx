import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteStudent } from "../hooks/api";
import type { Student } from "@/types/api";
import { Spinner } from "@/components/ui/spinner";
import { StudentTableHeader } from "./student-table-header";
import { StudentTableRow } from "./student-table-row";
import { StudentTablePagination } from "./student-table-pagination";

interface StudentsTableProps {
  students: Student[];
  isLoading: boolean;
}

export function StudentsTable({ students, isLoading }: StudentsTableProps) {
  const { mutate: deleteStudent, isPending: deleting } = useDeleteStudent();

  if (isLoading)
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm p-10 flex items-center justify-center">
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    );

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <StudentTableHeader />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-semibold text-muted-foreground">NO</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Name</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Email</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Phone</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Created</TableHead>
              <TableHead className="font-semibold text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student, index) => (
                <StudentTableRow
                  key={student.id}
                  student={student}
                  index={index}
                  onDelete={() => deleteStudent(student.id)}
                  isDeleting={deleting}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <StudentTablePagination total={students.length} />
    </div>
  );
}
