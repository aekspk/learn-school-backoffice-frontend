import { Info, UserCircle } from "lucide-react";
import type { Student } from "@/types/api";
import { formatDate } from "@/lib/utils/date-fns";

interface StudentInfoCardProps {
  student: Student;
}

export function StudentInfoCard({ student }: StudentInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
      <div className="absolute top-6 right-6 text-primary opacity-15 pointer-events-none">
        <UserCircle className="size-24" strokeWidth={0.75} />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Info className="size-4 text-primary" />
        Personal Info
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Email Address
          </p>
          <p className="text-base text-gray-900">{student.email}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Phone Number
          </p>
          <p className="text-base text-gray-900">{student.phone ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Joined Date
          </p>
          <p className="text-base text-gray-900">
            {formatDate(student.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
