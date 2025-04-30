
import { SentimentScore } from "./SentimentScore";
import { TrendIndicator } from "./TrendIndicator";

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  sentimentScore: number;
  trend: "up" | "down" | "stable";
  marketCap?: number;
  volume24h?: number;
}

interface CryptoCardProps {
  crypto: CryptoData;
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  return (
    <div className="glass-card crypto-card p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-bold">{crypto.name}</div>
          <div className="text-xs bg-dashboard-border px-2 py-0.5 rounded-full text-muted-foreground">
            {crypto.symbol}
          </div>
        </div>
        <TrendIndicator trend={crypto.trend} value={crypto.change24h} />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold">
            ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <SentimentScore score={crypto.sentimentScore} size="sm" />
    </div>
  );
}
