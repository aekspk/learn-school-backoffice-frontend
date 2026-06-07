import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useGetStudent } from "./hooks/api";
import { StudentFormDialog } from "./components/student-form-dialog";
import { StudentInfoCard } from "./components/student-info-card";
import { StudentPackagesTable } from "./components/student-packages-table";
import { StudentBookingsTable } from "./components/student-bookings-table";

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const studentId = Number(id);
  const navigate = useNavigate();

  const { data: student, isLoading } = useGetStudent(studentId);

  if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (!student)
    return <p className="text-sm text-red-500">Student not found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/student-management")}
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <h1 className="text-xl font-semibold">{student.name}</h1>
        <StudentFormDialog
          student={student}
          trigger={
            <Button size="sm" variant="outline">
              Edit
            </Button>
          }
        />
      </div>

      <StudentInfoCard student={student} />
      <StudentPackagesTable studentId={studentId} />
      <StudentBookingsTable studentId={studentId} />
    </div>
  );
}
