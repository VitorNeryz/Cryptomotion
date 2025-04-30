
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LiveIndicatorProps {
  lastUpdated: string;
  className?: string;
  showTooltip?: boolean;
}

export function LiveIndicator({ 
  lastUpdated, 
  className, 
  showTooltip = true 
}: LiveIndicatorProps) {
  const [pulse, setPulse] = useState(true);

  // Create a pulsing effect for the live dot
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  const content = (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      <div className="live-dot">
        <span 
          className={cn(
            "relative inline-flex rounded-full h-3 w-3 bg-sentiment-positive",
            pulse && "after:content-[''] after:absolute after:rounded-full after:h-3 after:w-3 after:bg-sentiment-positive after:animate-ping after:opacity-75"
          )}
        ></span>
      </div>
      <div className="text-muted-foreground whitespace-nowrap">
        Atualizado: <span className="font-medium text-foreground">{lastUpdated}</span>
      </div>
    </div>
  );
  
  if (!showTooltip) return content;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent>
          <p>Os dados são atualizados automaticamente em tempo real</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
