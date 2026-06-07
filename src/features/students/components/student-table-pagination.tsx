import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentTablePaginationProps {
  total: number;
}

export function StudentTablePagination({ total }: StudentTablePaginationProps) {
  return (
    <div className="px-6 py-4 border-t border-border flex items-center justify-between">
      <p className="text-sm text-muted-foreground">Showing {total} students</p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="h-8 w-8" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="default" size="icon" className="h-8 w-8 text-sm">
          1
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-sm">
          2
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-sm">
          3
        </Button>
        <span className="w-8 text-center text-sm text-muted-foreground">
          ...
        </span>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-sm">
          10
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
