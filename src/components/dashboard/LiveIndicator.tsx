
import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
  lastUpdated: string;
  className?: string;
}

export function LiveIndicator({ lastUpdated, className }: LiveIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      <div className="live-dot">
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sentiment-positive"></span>
      </div>
      <div className="text-muted-foreground">
        Atualizado: <span className="font-medium text-foreground">{lastUpdated}</span>
      </div>
    </div>
  );
}
