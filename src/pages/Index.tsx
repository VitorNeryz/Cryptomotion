
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { CryptoCard } from "@/components/dashboard/CryptoCard";
import { CryptoTable } from "@/components/dashboard/CryptoTable";
import { LiveIndicator } from "@/components/dashboard/LiveIndicator";
import { ViewToggle } from "@/components/layout/ViewToggle";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { mockCryptos, generateSentimentData } from "@/services/mockData";

type ViewMode = "compact" | "expanded";

const Index = () => {
  const [view, setView] = useState<ViewMode>("compact");
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
  const [marketSentiment, setMarketSentiment] = useState(generateSentimentData(30));
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update last updated time
      setLastUpdated(new Date().toLocaleString());
      
      // Update the last data point in market sentiment
      setMarketSentiment(prev => {
        const newData = [...prev];
        const lastPoint = { ...newData[newData.length - 1] };
        lastPoint.sentiment = Math.max(-1, Math.min(1, lastPoint.sentiment + (Math.random() * 0.1 - 0.05)));
        newData[newData.length - 1] = lastPoint;
        return newData;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Get the latest market sentiment value
  const latestSentiment = marketSentiment.length > 0 ? 
    marketSentiment[marketSentiment.length - 1].sentiment : 0;
  
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

  return (
    <div className="min-h-screen bg-dashboard-dark pb-16">
      <AppSidebar />
      
      <main className="p-4 sm:p-6 md:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Análise de sentimento do mercado de criptomoedas</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <LiveIndicator lastUpdated={lastUpdated} />
            <ViewToggle currentView={view} onChange={setView} />
          </div>
        </div>

        {/* Market Sentiment Overview */}
        <section className="mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Sentimento do Mercado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
                <div className="bg-dashboard-card px-4 py-2 rounded-lg">
                  <p className="text-sm text-muted-foreground">Sentimento Atual</p>
                  <p className={`text-2xl font-bold ${getSentimentClass(latestSentiment)}`}>
                    {getSentimentText(latestSentiment)}
                  </p>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  O sentimento do mercado está {latestSentiment > 0 ? "positivo" : latestSentiment < 0 ? "negativo" : "neutro"} 
                  nas últimas 24 horas, com uma pontuação de sentimento de{" "}
                  <span className={`font-medium ${getSentimentClass(latestSentiment)}`}>
                    {latestSentiment.toFixed(2)}
                  </span>
                </p>
              </div>
              
              <SentimentChart data={marketSentiment} />
            </CardContent>
          </Card>
        </section>

        {/* Top Cryptocurrencies */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Principais Criptomoedas</h2>
          {view === "compact" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockCryptos.slice(0, 8).map((crypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="pt-6">
                <CryptoTable cryptos={mockCryptos} />
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
