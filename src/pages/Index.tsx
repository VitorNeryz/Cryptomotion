import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { CryptoCard } from "@/components/dashboard/CryptoCard";
import { CryptoTable } from "@/components/dashboard/CryptoTable";
import { LiveIndicator } from "@/components/dashboard/LiveIndicator";
import { ViewToggle } from "@/components/layout/ViewToggle";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TimeFilter, TimeFrame } from "@/components/filters/TimeFilter";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { mockCryptos, generateSentimentData } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";
type ViewMode = "compact" | "expanded";
const Index = () => {
  const [view, setView] = useState<ViewMode>("compact");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("24h");
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
  const [marketSentiment, setMarketSentiment] = useState(generateSentimentData(30));
  const {
    toast
  } = useToast();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update last updated time
      setLastUpdated(new Date().toLocaleString());

      // Update the last data point in market sentiment
      setMarketSentiment(prev => {
        const newData = [...prev];
        const lastPoint = {
          ...newData[newData.length - 1]
        };
        lastPoint.sentiment = Math.max(-1, Math.min(1, lastPoint.sentiment + (Math.random() * 0.1 - 0.05)));
        newData[newData.length - 1] = lastPoint;
        return newData;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check for alerts when sentiment changes
  useEffect(() => {
    const checkAlerts = () => {
      try {
        const savedAlerts = localStorage.getItem("cryptoAlerts");
        if (!savedAlerts) return;
        const alerts = JSON.parse(savedAlerts);
        const latestSentiment = marketSentiment.length > 0 ? marketSentiment[marketSentiment.length - 1].sentiment : 0;

        // Check for market sentiment alerts
        const marketAlerts = alerts.filter(alert => alert.active && alert.cryptoId === "market" && (alert.direction === "above" && latestSentiment > alert.sentimentThreshold || alert.direction === "below" && latestSentiment < alert.sentimentThreshold));

        // Show notifications for triggered alerts
        marketAlerts.forEach(alert => {
          toast({
            title: `Alerta: Sentimento de Mercado`,
            description: `O sentimento de mercado está ${alert.direction === "above" ? "acima" : "abaixo"} de ${alert.sentimentThreshold.toFixed(2)}`
          });
        });

        // Check for specific crypto alerts
        mockCryptos.forEach(crypto => {
          const cryptoAlerts = alerts.filter(alert => alert.active && alert.cryptoId === crypto.id && (alert.direction === "above" && crypto.sentimentScore > alert.sentimentThreshold || alert.direction === "below" && crypto.sentimentScore < alert.sentimentThreshold));
          cryptoAlerts.forEach(alert => {
            toast({
              title: `Alerta: ${crypto.name}`,
              description: `O sentimento de ${crypto.name} está ${alert.direction === "above" ? "acima" : "abaixo"} de ${alert.sentimentThreshold.toFixed(2)}`
            });
          });
        });
      } catch (error) {
        console.error("Error checking alerts:", error);
      }
    };

    // Check alerts when sentiment data changes
    checkAlerts();
  }, [marketSentiment, toast]);

  // Handle time frame changes
  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame);

    // Regenerate data based on selected time frame
    let days = 30;
    switch (newTimeFrame) {
      case "1h":
        days = 1;
        break;
      case "24h":
        days = 1;
        break;
      case "7d":
        days = 7;
        break;
      case "30d":
        days = 30;
        break;
      case "all":
        days = 90;
        break;
    }
    setMarketSentiment(generateSentimentData(days));
  };

  // Get the latest market sentiment value
  const latestSentiment = marketSentiment.length > 0 ? marketSentiment[marketSentiment.length - 1].sentiment : 0;

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
  return <div className="min-h-screen bg-dashboard-dark pb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Market Sentiment Overview */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle>Sentimento do Mercado</CardTitle>
                <TimeFilter defaultValue={timeFrame} onChange={handleTimeFrameChange} className="border-none bg-transparent" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
                  <div className="px-4 py-2 rounded-lg bg-slate-200">
                    <p className="text-sm text-muted-foreground">Sentimento Atual</p>
                    <p className={`text-2xl font-bold ${getSentimentClass(latestSentiment)}`}>
                      {getSentimentText(latestSentiment)}
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">
                    O sentimento do mercado está {latestSentiment > 0 ? "positivo" : latestSentiment < 0 ? "negativo" : "neutro"} 
                    nas últimas {timeFrame === "1h" ? "horas" : timeFrame === "24h" ? "24 horas" : timeFrame === "7d" ? "7 dias" : "30 dias"}, com uma pontuação de sentimento de{" "}
                    <span className={`font-medium ${getSentimentClass(latestSentiment)}`}>
                      {latestSentiment.toFixed(2)}
                    </span>
                  </p>
                </div>
                
                <SentimentChart data={marketSentiment} timeframe={timeFrame} />
              </CardContent>
            </Card>
          </div>
          
          {/* Insights Panel */}
          <div className="lg:col-span-1">
            <InsightPanel cryptos={mockCryptos} />
          </div>
        </div>

        {/* Top Cryptocurrencies */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Principais Criptomoedas</h2>
          {view === "compact" ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockCryptos.slice(0, 8).map(crypto => <CryptoCard key={crypto.id} crypto={crypto} />)}
            </div> : <Card className="glass-card">
              <CardContent className="pt-6">
                <CryptoTable cryptos={mockCryptos} />
              </CardContent>
            </Card>}
        </section>
      </main>
    </div>;
};
export default Index;