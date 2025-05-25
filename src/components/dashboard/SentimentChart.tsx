
import { useRef, useEffect } from "react";
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { cn } from "@/lib/utils";
import { TimeFrame } from "@/components/filters/TimeFilter";

interface SentimentChartProps {
  data: Array<{
    timestamp: string;
    sentiment: number;
    volume?: number;
  }>;
  timeframe?: TimeFrame;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
}

export function SentimentChart({ 
  data, 
  timeframe = "24h",
  height = 300,
  showGrid = true,
  showTooltip = true,
}: SentimentChartProps) {
  
  const getTimeLabel = (timestamp: string): string => {
    const date = new Date(timestamp);
    switch (timeframe) {
      case "1h":
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case "24h":
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case "7d":
        return date.toLocaleDateString([], { weekday: 'short' });
      case "30d":
        return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
      case "all":
        return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
      default:
        return date.toLocaleDateString();
    }
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const sentimentValue = payload[0].value as number;
      const timestamp = payload[0].payload.timestamp as string;
      
      const getSentimentText = (value: number) => {
        if (value > 0.2) return "Positivo";
        if (value < -0.2) return "Negativo";
        return "Neutro";
      };

      const getSentimentClass = (value: number) => {
        if (value > 0.2) return "text-sentiment-positive";
        if (value < -0.2) return "text-sentiment-negative";
        return "text-sentiment-neutral";
      };

      return (
        <div className="bg-dashboard-card p-3 border border-dashboard-border rounded-md shadow-lg">
          <p className="text-xs text-muted-foreground">{new Date(timestamp).toLocaleString()}</p>
          <p className="font-medium mt-1">
            Sentimento: <span className={cn("font-semibold", getSentimentClass(sentimentValue))}>
              {getSentimentText(sentimentValue)} ({sentimentValue.toFixed(2)})
            </span>
          </p>
          {payload[0].payload.volume !== undefined && (
            <p className="text-xs mt-1">Volume: {payload[0].payload.volume.toLocaleString()}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const gradientId = useRef(`sentimentGradient-${Math.random().toString(36).substring(2, 9)}`).current;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#F87171" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              className="stroke-muted-foreground/20"
            />
          )}
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={getTimeLabel}
            className="stroke-foreground/50"
            tick={{ 
              fill: "currentColor", 
              fontSize: 12,
              className: "fill-foreground"
            }}
          />
          <YAxis 
            domain={[-1, 1]} 
            className="stroke-foreground/50"
            tick={{ 
              fill: "currentColor", 
              fontSize: 12,
              className: "fill-foreground"
            }}
          />
          {showTooltip && (
            <Tooltip content={<CustomTooltip />} />
          )}
          <Line
            type="monotone"
            dataKey="sentiment"
            stroke="#4ADE80"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={true}
            animationDuration={1000}
            fill={`url(#${gradientId})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
