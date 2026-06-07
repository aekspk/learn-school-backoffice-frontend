import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { CompensationStats } from "@/types/api";

interface CompensationStatsCardsProps {
  stats: CompensationStats;
  isFetching?: boolean;
}

export function CompensationStatsCards({ stats, isFetching }: CompensationStatsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          {isFetching ? <Spinner className="size-6 text-yellow-600 mt-1" /> : <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Resolved</p>
          {isFetching ? <Spinner className="size-6 text-green-600 mt-1" /> : <p className="text-3xl font-bold text-green-600">{stats.resolve}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Rejected</p>
          {isFetching ? <Spinner className="size-6 text-red-600 mt-1" /> : <p className="text-3xl font-bold text-red-600">{stats.rejectCount}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
