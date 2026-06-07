import { SlidersHorizontal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StudentTableHeader() {
  return (
    <div className="px-6 py-4 border-b border-border flex items-center justify-between">
      <h3 className="text-base font-semibold text-foreground">
        Student Directory
      </h3>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8 border-border/60">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 border-border/60">
          <Download className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
