import { CalendarDays } from "lucide-react";
import type { CourseGroup } from "@/types/api";
import CourseGroupCard from "./course-group-card";

interface DateGroupProps {
  date: string;
  courseGroups: CourseGroup[];
  className?: string;
}

export default function DateGroup({ date, courseGroups, className }: DateGroupProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
          <CalendarDays className="w-3.5 h-3.5" />
          {date}
        </div>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="space-y-3">
        {courseGroups.map((group) => (
          <CourseGroupCard
            key={group.courseId}
            courseName={group.courseName}
            branchName={group.branchName}
            sessions={group.sessions}
          />
        ))}
      </div>
    </div>
  );
}
