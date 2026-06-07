import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetStudentList } from "./hooks/api";
import { StudentFormDialog } from "./components/student-form-dialog";
import { StudentsTable } from "./components/students-table";
import { StudentStatsCards } from "./components/student-stats-cards";

export default function StudentManagementPage() {
  const { data: students = [], isLoading } = useGetStudentList();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Students
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Oversee and manage your current student body and their academic
            records.
          </p>
        </div>
        <StudentFormDialog
          trigger={
            <Button className="gap-2 shadow-md shadow-primary/20">
              <span className="text-lg leading-none">+</span> New Student
            </Button>
          }
        />
      </div>

      <StudentStatsCards students={students} />

      <StudentsTable students={students} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative overflow-hidden bg-card rounded-xl border border-border shadow-sm p-6">
          <h4 className="text-base font-semibold text-foreground">
            Registration Insights
          </h4>
          <p className="text-sm text-muted-foreground mt-2">
            New student enrollments are up 15% this quarter compared to last
            year's academic session.
          </p>
          <button className="mt-4 text-sm font-semibold text-primary flex items-center gap-1 hover:underline underline-offset-4">
            View full report <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <div className="absolute top-0 right-0 h-full w-1/3 bg-muted/40 -skew-x-12 translate-x-1/2 pointer-events-none" />
        </div>

        <div className="rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-center p-8 gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground">
            <span className="text-xl leading-none">+</span>
          </div>
          <p className="text-sm font-semibold text-muted-foreground">
            Add Quick Widget
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-50">
            Customize your dashboard with additional real-time data widgets.
          </p>
        </div>
      </div>
    </div>
  );
}
