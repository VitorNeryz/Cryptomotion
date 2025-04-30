
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendIndicatorProps {
  trend: "up" | "down" | "stable";
  value?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "arrow" | "trend";
}

export function TrendIndicator({ 
  trend, 
  value = 0, 
  showValue = true, 
  size = "md",
  variant = "arrow" 
}: TrendIndicatorProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const ArrowIcon = variant === "arrow" 
    ? (trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : ArrowUp) 
    : (trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : TrendingUp);
  
  const valueWithSign = value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
  
  return (
    <div className={cn("flex items-center gap-1", {
      "text-sentiment-positive": trend === "up",
      "text-sentiment-negative": trend === "down",
      "text-sentiment-neutral": trend === "stable",
    })}>
      <ArrowIcon className={sizeClasses[size]} />
      {showValue && (
        <span className="font-medium">{valueWithSign}</span>
      )}
    </div>
  );
}
