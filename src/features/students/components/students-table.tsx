import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { useDeleteStudent } from "../hooks/api";
import type { Student } from "@/types/api";
import { formatDate } from "@/lib/utils/date-fns";
import { StudentFormDialog } from "./student-form-dialog";

const columns: { header: string; render: (s: Student) => React.ReactNode }[] = [
  { header: "ID", render: (s) => s.id },
  { header: "Name", render: (s) => s.name },
  { header: "Email", render: (s) => s.email },
  { header: "Phone", render: (s) => s.phone ?? "—" },
  { header: "Created", render: (s) => formatDate(s.createdAt) },
];

export function StudentsTable({
  students,
  isLoading,
}: {
  students: Student[];
  isLoading: boolean;
}) {
  const navigate = useNavigate();
  const { mutate: deleteStudent, isPending: deleting } = useDeleteStudent();

  if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>;

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.header}>{col.header}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="text-center text-gray-400"
              >
                No students found.
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow
                key={student.id}
                className="cursor-pointer"
                onClick={() => navigate(`/student-management/${student.id}`)}
              >
                {columns.map((col) => (
                  <TableCell key={col.header}>{col.render(student)}</TableCell>
                ))}
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <StudentFormDialog
                      student={student}
                      trigger={
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      }
                    />
                    <DeleteConfirmDialog
                      isPending={deleting}
                      onConfirm={() => deleteStudent(student.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
