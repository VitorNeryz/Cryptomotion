
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, BarChart2, ArrowRight } from "lucide-react";
import { CryptoData } from "./CryptoCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface InsightData {
  trendingCrypto?: CryptoData;
  highestVolume?: CryptoData;
  mostPolarized?: CryptoData;
  recentShift?: {
    crypto: CryptoData;
    changePercent: number;
  };
  isLoading: boolean;
}

export function InsightPanel({ cryptos }: { cryptos: CryptoData[] }) {
  const [insights, setInsights] = useState<InsightData>({ isLoading: true });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (!cryptos.length) {
        setInsights({ isLoading: false });
        return;
      }

      // Find trending crypto (highest positive sentiment)
      const trendingCrypto = [...cryptos].sort((a, b) => b.sentimentScore - a.sentimentScore)[0];
      
      // Find crypto with highest trading volume
      const highestVolume = [...cryptos].sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0))[0];
      
      // Find most polarized (furthest from 0 sentiment, positive or negative)
      const mostPolarized = [...cryptos].sort((a, b) => 
        Math.abs(b.sentimentScore) - Math.abs(a.sentimentScore)
      )[0];
      
      // Simulate a recent shift for demo purposes
      const recentShift = {
        crypto: cryptos[Math.floor(Math.random() * cryptos.length)],
        changePercent: Math.round((Math.random() * 30) + 5)
      };
      
      setInsights({
        trendingCrypto,
        highestVolume,
        mostPolarized,
        recentShift,
        isLoading: false
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [cryptos]);
  
  if (insights.isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Insights de Mercado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-3 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Insights de Mercado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.trendingCrypto && (
            <div className="flex items-center">
              <div className="bg-sentiment-positive/20 p-2 rounded-full mr-3">
                <TrendingUp className="h-5 w-5 text-sentiment-positive" />
              </div>
              <div>
                <p className="font-medium">{insights.trendingCrypto.name} em alta</p>
                <p className="text-sm text-muted-foreground">
                  Sentimento mais positivo: {insights.trendingCrypto.sentimentScore.toFixed(2)}
                </p>
              </div>
            </div>
          )}
          
          {insights.mostPolarized && (
            <div className="flex items-center">
              <div className="bg-yellow-500/20 p-2 rounded-full mr-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="font-medium">Opinião polarizada sobre {insights.mostPolarized.name}</p>
                <p className="text-sm text-muted-foreground">
                  Índice de polarização: {Math.abs(insights.mostPolarized.sentimentScore).toFixed(2)}
                </p>
              </div>
            </div>
          )}
          
          {insights.highestVolume && (
            <div className="flex items-center">
              <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                <BarChart2 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{insights.highestVolume.name} com maior volume</p>
                <p className="text-sm text-muted-foreground">
                  {(insights.highestVolume.volume24h || 0).toLocaleString()} transações em 24h
                </p>
              </div>
            </div>
          )}
          
          {insights.recentShift && (
            <div className="flex items-center">
              <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                  <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-medium">Mudança em {insights.recentShift.crypto.name}</p>
                <p className="text-sm text-muted-foreground">
                  Aumento de {insights.recentShift.changePercent}% em menções nas últimas 2h
                </p>
              </div>
            </div>
          )}
          
          <Link to="/market-analysis">
            <Button variant="ghost" className="w-full mt-2 text-primary" size="sm">
              Ver análise completa <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
