import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Student } from "@/types/api";
import { formatDate } from "@/lib/utils/date-fns";

export function StudentInfoCard({ student }: { student: Student }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Info</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="text-muted-foreground">Email</span><p>{student.email}</p></div>
        <div><span className="text-muted-foreground">Phone</span><p>{student.phone ?? "—"}</p></div>
        <div><span className="text-muted-foreground">Joined</span><p>{formatDate(student.createdAt)}</p></div>
      </CardContent>
    </Card>
  );
}
