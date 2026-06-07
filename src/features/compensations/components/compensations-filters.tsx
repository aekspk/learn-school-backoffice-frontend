import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CompensationStatus } from "@/types/api";

interface CompensationsFiltersProps {
  statusFilter: CompensationStatus | "ALL";
  onStatusChange: (value: CompensationStatus | "ALL") => void;
}

export function CompensationsFilters({ statusFilter, onStatusChange }: CompensationsFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as CompensationStatus | "ALL")}>
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="RESOLVED">Resolved</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
