import { Button } from "@/components/ui/button";
import { useGetClassSessionList } from "./hooks/api";
import { groupSessions } from "./utils";
import DateGroup from "./components/date-group";
import ClassSessionFormDialog from "./components/class-session-form-dialog";

export default function ClassManagementPage() {
  const { data: sessions = [], isFetching } = useGetClassSessionList();
  const grouped = groupSessions(sessions);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Class Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Select a class session to take attendance and manage student
            occupancy.
          </p>
        </div>
        <ClassSessionFormDialog
          trigger={
            <Button className="gap-2 shadow-md shadow-primary/20">
              <span className="text-lg leading-none">+</span> Create Session
            </Button>
          }
        />
      </div>

      {isFetching ? (
        <p className="text-sm text-muted-foreground">Loading sessions...</p>
      ) : grouped.length === 0 ? (
        <p className="text-sm text-muted-foreground">No sessions found.</p>
      ) : (
        <div className="space-y-6">
          {grouped.map((group) => (
            <DateGroup
              key={group.key}
              date={group.date}
              courseGroups={group.courseGroups}
            />
          ))}
        </div>
      )}
    </div>
  );
}
