import type { CourseGroup } from "../types";
import CourseGroupCard from "./course-group-card";

interface DateGroupProps {
  date: string;
  courseGroups: CourseGroup[];
  className?: string;
}

export default function DateGroup({ date, courseGroups, className }: DateGroupProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
          {date}
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="space-y-3 pl-2">
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
