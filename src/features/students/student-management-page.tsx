import { Button } from "@/components/ui/button";
import { useGetStudents } from "./hooks/api";
import { StudentFormDialog } from "./components/student-form-dialog";
import { StudentsTable } from "./components/students-table";

export default function StudentManagementPage() {
  const { data: students = [], isLoading } = useGetStudents();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Students</h1>
        <StudentFormDialog trigger={<Button size="sm">New Student</Button>} />
      </div>
      <StudentsTable students={students} isLoading={isLoading} />
    </div>
  );
}
