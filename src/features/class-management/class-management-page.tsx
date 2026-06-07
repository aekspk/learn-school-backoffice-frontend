import { useGetClassSessions } from "./hooks/api";
import { groupSessions } from "./utils";
import DateGroup from "./components/date-group";

export default function ClassManagementPage() {
  const { data: sessions = [], isLoading } = useGetClassSessions();
  const grouped = groupSessions(sessions);

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">Class Management</h1>
      <p className="text-sm text-gray-500">
        Select a class session to take attendance.
      </p>

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading sessions...</p>
      ) : grouped.length === 0 ? (
        <p className="text-sm text-gray-400">No sessions found.</p>
      ) : (
        <div className="space-y-6 pt-2">
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
