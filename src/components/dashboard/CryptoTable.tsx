
import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { TrendIndicator } from "./TrendIndicator";
import { SentimentScore } from "./SentimentScore";
import type { CryptoData } from "./CryptoCard";

interface CryptoTableProps {
  cryptos: CryptoData[];
}

type SortField = "name" | "price" | "change24h" | "sentimentScore";
type SortDirection = "asc" | "desc";

export function CryptoTable({ cryptos }: CryptoTableProps) {
  const [sortField, setSortField] = useState<SortField>("sentimentScore");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedCryptos = [...cryptos].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "change24h":
        comparison = a.change24h - b.change24h;
        break;
      case "sentimentScore":
        comparison = a.sentimentScore - b.sentimentScore;
        break;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const getSentimentLabel = (score: number) => {
    if (score > 0.2) return "Positivo";
    if (score < -0.2) return "Negativo";
    return "Neutro";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dashboard-border">
            <th 
              className="py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center gap-1">
                Criptomoeda
                {sortField === "name" && (
                  sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                )}
              </div>
            </th>
            <th 
              className="py-3 text-right text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => handleSort("price")}
            >
              <div className="flex items-center justify-end gap-1">
                Preço
                {sortField === "price" && (
                  sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                )}
              </div>
            </th>
            <th 
              className="py-3 text-right text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => handleSort("change24h")}
            >
              <div className="flex items-center justify-end gap-1">
                24h %
                {sortField === "change24h" && (
                  sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                )}
              </div>
            </th>
            <th 
              className="py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => handleSort("sentimentScore")}
            >
              <div className="flex items-center gap-1">
                Sentimento
                {sortField === "sentimentScore" && (
                  sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                )}
              </div>
            </th>
            <th className="py-3 text-right text-sm font-medium text-muted-foreground">
              Tendência
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dashboard-border">
          {sortedCryptos.map((crypto) => (
            <tr key={crypto.id} className="hover:bg-dashboard-card/50">
              <td className="py-4 text-sm font-medium">
                <Link to={`/crypto/${crypto.id}`} className="hover:text-primary flex items-center gap-2">
                  <span>{crypto.name}</span>
                  <span className="text-xs bg-dashboard-border px-2 py-0.5 rounded-full text-muted-foreground">
                    {crypto.symbol}
                  </span>
                </Link>
              </td>
              <td className="py-4 text-sm text-right font-medium">
                ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="py-4 text-sm text-right">
                <TrendIndicator trend={crypto.trend} value={crypto.change24h} />
              </td>
              <td className="py-4 text-sm">
                <SentimentScore score={crypto.sentimentScore} size="sm" showLabel={false} />
              </td>
              <td className="py-4 text-sm text-right">
                <TrendIndicator trend={crypto.trend} showValue={false} variant="trend" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
