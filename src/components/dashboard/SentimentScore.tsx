
import { cn } from "@/lib/utils";

interface SentimentScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function SentimentScore({ score, size = "md", showLabel = true }: SentimentScoreProps) {
  // Score from -1 (negative) to 1 (positive), 0 is neutral
  const getSentimentColor = (score: number) => {
    if (score > 0.2) return "bg-sentiment-positive";
    if (score < -0.2) return "bg-sentiment-negative";
    return "bg-sentiment-neutral";
  };

  const getSentimentLabel = (score: number) => {
    if (score > 0.2) return "Positivo";
    if (score < -0.2) return "Negativo";
    return "Neutro";
  };

  const sizeClasses = {
    sm: "w-20 h-1",
    md: "w-28 h-1.5",
    lg: "w-36 h-2"
  };

  // Normalize score between 0-100 for the progress bar
  const normalizedScore = ((score + 1) / 2) * 100;

  return (
    <div className="flex flex-col gap-1">
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Negativo</span>
          <span>Neutro</span>
          <span>Positivo</span>
        </div>
      )}
      <div className={cn("bg-dashboard-border rounded-full", sizeClasses[size])}>
        <div
          className={cn("h-full rounded-full", getSentimentColor(score))}
          style={{ width: `${normalizedScore}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-xs font-medium mt-1">
          Sentimento: <span className={cn("font-semibold", {
            "text-sentiment-positive": score > 0.2,
            "text-sentiment-negative": score < -0.2,
            "text-sentiment-neutral": score >= -0.2 && score <= 0.2,
          })}>
            {getSentimentLabel(score)}
          </span>
        </div>
      )}
    </div>
  );
}
