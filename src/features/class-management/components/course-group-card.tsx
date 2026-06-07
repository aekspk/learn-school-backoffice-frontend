import type { SessionItem } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import SessionRow from "./session-row";

interface CourseGroupCardProps {
  courseName: string;
  branchName: string;
  sessions: SessionItem[];
  className?: string;
}

export default function CourseGroupCard({
  courseName,
  branchName,
  sessions,
  className,
}: CourseGroupCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="font-semibold text-gray-900">{courseName}</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {branchName}
          </span>
        </div>

        <div className="divide-y">
          {sessions.map((session) => (
            <SessionRow
              key={session.id}
              id={session.id}
              topic={session.topic}
              scheduledAt={session.scheduledAt}
              durationMin={session.durationMin}
              bookedSeats={session.bookedSeats}
              totalSeats={session.totalSeats}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
