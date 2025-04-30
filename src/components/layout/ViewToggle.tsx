
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  currentView: "compact" | "expanded";
  onChange: (view: "compact" | "expanded") => void;
}

export function ViewToggle({ currentView, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-dashboard-card border border-dashboard-border rounded-lg overflow-hidden">
      <button
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm",
          currentView === "compact"
            ? "bg-primary text-white"
            : "bg-transparent text-muted-foreground hover:text-foreground"
        )}
        onClick={() => onChange("compact")}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Compacto</span>
      </button>
      <button
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm",
          currentView === "expanded"
            ? "bg-primary text-white"
            : "bg-transparent text-muted-foreground hover:text-foreground"
        )}
        onClick={() => onChange("expanded")}
      >
        <List className="w-4 h-4" />
        <span>Expandido</span>
      </button>
    </div>
  );
}
