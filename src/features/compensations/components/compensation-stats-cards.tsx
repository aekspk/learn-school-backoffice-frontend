import { ClipboardList, CheckCircle2, XCircle } from "lucide-react";
import type { CompensationStats } from "@/types/api";

interface CompensationStatsCardsProps {
  stats: CompensationStats;
  isFetching?: boolean;
}

export function CompensationStatsCards({ stats, isFetching }: CompensationStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <ClipboardList className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Pending Requests
          </p>
          <p className="text-xl font-bold text-foreground">
            {isFetching ? "—" : stats.pending}
          </p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Resolved Total
          </p>
          <p className="text-xl font-bold text-foreground">
            {isFetching ? "—" : stats.resolve}
          </p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <XCircle className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Rejected
          </p>
          <p className="text-xl font-bold text-foreground">
            {isFetching ? "—" : stats.rejectCount}
          </p>
        </div>
      </div>
    </div>
  );
}
