
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { LiveIndicator } from "@/components/dashboard/LiveIndicator";
import { KeywordCloud } from "@/components/dashboard/KeywordCloud";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { generateSentimentData, generateKeywords, mockCryptos } from "@/services/mockData";

const timeframeOptions = [
  { value: "24h", label: "24H" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
] as const;

type Timeframe = typeof timeframeOptions[number]["value"];

const MarketAnalysis = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>("24h");
  const [lastUpdated] = useState(new Date().toLocaleString());
  
  // Generate market sentiment data
  const marketSentiment = generateSentimentData(
    timeframe === "24h" ? 24 : timeframe === "7d" ? 7 : 30
  );
  
  // Calculate average sentiment
  const avgSentiment = marketSentiment.reduce((acc, curr) => acc + curr.sentiment, 0) / marketSentiment.length;
  
  // Generate overall keywords
  const marketKeywords = generateKeywords(avgSentiment);
  
  // Get sentiment class for text color
  const getSentimentClass = (value: number) => {
    if (value > 0.2) return "text-sentiment-positive";
    if (value < -0.2) return "text-sentiment-negative";
    return "text-sentiment-neutral";
  };
  
  // Get sentiment text
  const getSentimentText = (value: number) => {
    if (value > 0.5) return "Muito Positivo";
    if (value > 0.2) return "Positivo";
    if (value > -0.2) return "Neutro";
    if (value > -0.5) return "Negativo";
    return "Muito Negativo";
  };
  
  // Get top movers data
  const getTopMovers = () => {
    const sortedByChange = [...mockCryptos].sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h));
    return sortedByChange.slice(0, 5);
  };
  
  // Get top sentiment data
  const getTopSentiment = () => {
    const sortedBySentiment = [...mockCryptos].sort((a, b) => Math.abs(b.sentimentScore) - Math.abs(a.sentimentScore));
    return sortedBySentiment.slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-dashboard-dark pb-16">
      <AppSidebar />
      
      <main className="p-4 sm:p-6 md:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Análise de Mercado</h1>
            <p className="text-muted-foreground">Visão geral do sentimento do mercado</p>
          </div>
          
          <LiveIndicator lastUpdated={lastUpdated} />
        </div>

        {/* Market Overview */}
        <section className="mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Visão Geral do Mercado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
                <div className="bg-dashboard-card px-4 py-2 rounded-lg">
                  <p className="text-sm text-muted-foreground">Sentimento Médio</p>
                  <p className={`text-2xl font-bold ${getSentimentClass(avgSentiment)}`}>
                    {getSentimentText(avgSentiment)}
                  </p>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  O sentimento médio do mercado está {avgSentiment > 0 ? "positivo" : avgSentiment < 0 ? "negativo" : "neutro"} 
                  no período selecionado, com uma pontuação média de sentimento de{" "}
                  <span className={`font-medium ${getSentimentClass(avgSentiment)}`}>
                    {avgSentiment.toFixed(2)}
                  </span>
                </p>
              </div>
              
              <div className="mb-4">
                <div className="flex gap-2 mb-4">
                  {timeframeOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`px-3 py-1 text-sm rounded-md ${
                        timeframe === option.value
                          ? "bg-primary text-white"
                          : "bg-dashboard-card text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setTimeframe(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                
                <SentimentChart 
                  data={marketSentiment} 
                  timeframe={timeframe}
                  height={250} 
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Market Insights */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle>Palavras-Chave do Mercado</CardTitle>
              </CardHeader>
              <CardContent>
                <KeywordCloud keywords={marketKeywords} />
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle>Maiores Movimentações (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getTopMovers().map((crypto) => (
                    <div key={crypto.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-xs bg-dashboard-border px-2 py-0.5 rounded-full text-muted-foreground">
                          {crypto.symbol}
                        </div>
                      </div>
                      <div className={`font-medium ${crypto.change24h > 0 ? 'text-sentiment-positive' : 'text-sentiment-negative'}`}>
                        {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Top Sentiment */}
        <section>
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Sentimentos Extremos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getTopSentiment().map((crypto) => (
                  <div key={crypto.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs bg-dashboard-border px-2 py-0.5 rounded-full text-muted-foreground">
                        {crypto.symbol}
                      </div>
                    </div>
                    <div className={`font-medium ${getSentimentClass(crypto.sentimentScore)}`}>
                      {getSentimentText(crypto.sentimentScore)} ({crypto.sentimentScore.toFixed(2)})
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default MarketAnalysis;
