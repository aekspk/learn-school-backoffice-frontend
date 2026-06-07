import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { StudentFormDialog } from "./student-form-dialog";
import { formatDate } from "@/lib/utils/date-fns";
import type { Student } from "@/types/api";

const AVATAR_COLORS = [
  "bg-primary/10 text-primary",
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

function getAvatarColor(name: string): string {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

interface StudentTableRowProps {
  student: Student;
  index: number;
  onDelete: () => void;
  isDeleting: boolean;
}

export function StudentTableRow({
  student,
  index,
  onDelete,
  isDeleting,
}: StudentTableRowProps) {
  const navigate = useNavigate();

  return (
    <TableRow
      className="cursor-pointer hover:bg-primary/3 transition-colors"
      onClick={() => navigate(`/student-management/${student.id}`)}
    >
      <TableCell className="font-semibold text-foreground">
        {index + 1}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarColor(student.name)}`}
          >
            {student.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-foreground">{student.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">{student.email}</TableCell>
      <TableCell className="text-muted-foreground">
        {student.phone ?? "—"}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(student.createdAt)}
      </TableCell>
      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end gap-2">
          <StudentFormDialog
            student={student}
            trigger={
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-3 text-xs hover:border-primary hover:text-primary"
              >
                Edit
              </Button>
            }
          />
          <DeleteConfirmDialog isPending={isDeleting} onConfirm={onDelete} />
        </div>
      </TableCell>
    </TableRow>
  );
}
