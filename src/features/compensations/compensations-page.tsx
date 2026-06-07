import { useState } from "react";
import type { Compensation, CompensationStatus } from "@/types/api";
import { useGetCompensations } from "./hooks/api";
import { CompensationStatsCards } from "./components/compensation-stats-cards";
import { CompensationsFilters } from "./components/compensations-filters";
import { CompensationsTable } from "./components/compensations-table";
import { ResolveDialog } from "./components/resolve-dialog";
import { Spinner } from "@/components/ui/spinner";

export default function CompensationsPage() {
  const [statusFilter, setStatusFilter] = useState<CompensationStatus | "ALL">(
    "ALL",
  );
  const [resolveTarget, setResolveTarget] = useState<Compensation | null>(null);
  const params = statusFilter !== "ALL" ? { status: statusFilter } : undefined;
  const { data, isFetching } = useGetCompensations(params);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Compensations</h1>

      {/* {!isLoading && data.statusStats && (
        <CompensationStatsCards
          stats={data.statusStats}
          isFetching={isFetching}
        />
      )} */}

      <CompensationStatsCards
        stats={data?.statusStats}
        isFetching={isFetching}
      />

      <CompensationsFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {isFetching ? (
        <div className="flex justify-center py-8">
          <Spinner className="size-6" />
        </div>
      ) : (
        <CompensationsTable
          compensations={data.compensations}
          onResolve={setResolveTarget}
        />
      )}

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
