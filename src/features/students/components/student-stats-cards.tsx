import { Users, TrendingUp } from "lucide-react";
import type { Student } from "@/types/api";

interface StudentStatsCardsProps {
  students: Student[];
}

export function StudentStatsCards({ students }: StudentStatsCardsProps) {
  const now = new Date();
  const activeThisMonth = students.filter((s) => {
    const created = new Date(s.createdAt);
    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Total Students
          </p>
          <p className="text-xl font-bold text-foreground">
            {students.length.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
          <TrendingUp className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Active This Month
          </p>
          <p className="text-xl font-bold text-foreground">
            +{activeThisMonth}
          </p>
        </div>
      </div>

      <div className="md:col-span-2 relative overflow-hidden bg-primary opacity-90 rounded-xl p-6 flex flex-col justify-center text-primary-foreground shadow-sm">
        <div className="relative z-10">
          <p className="text-lg font-bold">Performance Report</p>
          <p className="text-sm opacity-90 mt-1">
            Average school-wide student engagement has increased by 12%.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10">
          <TrendingUp className="w-36 h-36" />
        </div>
      </div>
    </div>
  );
}
