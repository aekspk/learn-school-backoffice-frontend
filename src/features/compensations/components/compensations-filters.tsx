import { SelectInput } from "@/components/ui/select";
import type { CompensationStatus } from "@/types/api";

interface CompensationsFiltersProps {
  statusFilter: CompensationStatus | "ALL";
  onStatusChange: (value: CompensationStatus | "ALL") => void;
}

const STATUS_OPTIONS = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "REJECTED", label: "Rejected" },
];

export function CompensationsFilters({ statusFilter, onStatusChange }: CompensationsFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <SelectInput
        options={STATUS_OPTIONS}
        value={statusFilter}
        onValueChange={(v) => onStatusChange(v as CompensationStatus | "ALL")}
        className="w-36"
      />
    </div>
  );
}
