import { cn } from "@/lib/utils/cn";

interface ProgressProps {
  value?: number;
  className?: string;
}

function Progress({ value = 0, className }: ProgressProps) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
    >
      <div
        className="h-full bg-primary transition-all rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export { Progress };
