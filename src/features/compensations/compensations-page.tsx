import { useState } from "react";
import type { Compensation, CompensationStatus } from "@/types/api";
import { useGetCompensationList } from "./hooks/api";
import { CompensationStatsCards } from "./components/compensation-stats-cards";
import { CompensationsTable } from "./components/compensations-table";
import { ResolveDialog } from "./components/resolve-dialog";

export default function CompensationsPage() {
  const [statusFilter, setStatusFilter] = useState<CompensationStatus | "ALL">(
    "ALL",
  );
  const [resolveTarget, setResolveTarget] = useState<Compensation | null>(null);
  const params = statusFilter !== "ALL" ? { status: statusFilter } : undefined;
  const { data, isFetching } = useGetCompensationList(params);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Compensations
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Review and resolve student compensation requests.
        </p>
      </div>

      <CompensationStatsCards
        stats={data?.statusStats ?? { pending: 0, resolve: 0, rejectCount: 0 }}
        isFetching={isFetching}
      />

      <CompensationsTable
        compensations={data?.compensations ?? []}
        isFetching={isFetching}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onResolve={setResolveTarget}
      />

      {resolveTarget && (
        <ResolveDialog
          compensation={resolveTarget}
          open={!!resolveTarget}
          onOpenChange={(v) => !v && setResolveTarget(null)}
        />
      )}
    </div>
  );
}
