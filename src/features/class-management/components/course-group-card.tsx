import { useNavigate } from "react-router-dom";
import { Monitor, MoreHorizontal } from "lucide-react";
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
  const navigate = useNavigate();

  return (
    <Card className={`rounded-xl border-border shadow-sm ${className ?? ""}`}>
      <CardContent className="p-0">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Monitor className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">
              {courseName}
            </p>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              {branchName}
            </p>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-border">
          {sessions.map((session) => (
            <SessionRow
              key={session.id}
              topic={session.topic}
              scheduledAt={session.scheduledAt}
              durationMin={session.durationMin}
              bookedSeats={session.bookedSeats}
              totalSeats={session.totalSeats}
              onClick={() => navigate(`/class-management/${session.id}`)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
