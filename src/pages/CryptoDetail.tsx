
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { LiveIndicator } from "@/components/dashboard/LiveIndicator";
import { TrendIndicator } from "@/components/dashboard/TrendIndicator";
import { SentimentScore } from "@/components/dashboard/SentimentScore";
import { KeywordCloud } from "@/components/dashboard/KeywordCloud";
import { SourceBreakdown } from "@/components/dashboard/SourceBreakdown";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { mockCryptos, generateSentimentData, generateKeywords, generateSourceBreakdown } from "@/services/mockData";

const timeframeOptions = [
  { value: "1h", label: "1H" },
  { value: "24h", label: "24H" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
] as const;

type Timeframe = typeof timeframeOptions[number]["value"];

const CryptoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [crypto, setCrypto] = useState(mockCryptos.find(c => c.id === id));
  const [timeframe, setTimeframe] = useState<Timeframe>("24h");
  const [sentimentData, setSentimentData] = useState(generateSentimentData(30, crypto?.sentimentScore && crypto.sentimentScore > 0.3 ? "positive" : crypto?.sentimentScore && crypto.sentimentScore < -0.3 ? "negative" : undefined));
  const [keywords, setKeywords] = useState(generateKeywords(crypto?.sentimentScore || 0));
  const [sources, setSources] = useState(generateSourceBreakdown());
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

  // If the crypto doesn't exist, we should redirect or show an error
  useEffect(() => {
    if (!crypto) {
      console.error(`Crypto with id ${id} not found`);
    }
  }, [crypto, id]);

  // Fetch data based on timeframe
  useEffect(() => {
    // Simulate data fetching based on timeframe
    let dataPoints: number;
    switch (timeframe) {
      case "1h":
        dataPoints = 60; // One data point per minute
        break;
      case "24h":
        dataPoints = 24; // One data point per hour
        break;
      case "7d":
        dataPoints = 7; // One data point per day
        break;
      case "30d":
        dataPoints = 30; // One data point per day
        break;
      default:
        dataPoints = 24;
    }

    setSentimentData(generateSentimentData(
      dataPoints, 
      crypto?.sentimentScore && crypto.sentimentScore > 0.3 ? "positive" : 
      crypto?.sentimentScore && crypto.sentimentScore < -0.3 ? "negative" : 
      undefined
    ));
  }, [timeframe, crypto]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleString());
      
      // Slightly modify the latest sentiment data
      setSentimentData(prev => {
        const newData = [...prev];
        if (newData.length > 0) {
          const lastPoint = { ...newData[newData.length - 1] };
          lastPoint.sentiment = Math.max(-1, Math.min(1, lastPoint.sentiment + (Math.random() * 0.1 - 0.05)));
          newData[newData.length - 1] = lastPoint;
        }
        return newData;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (!crypto) {
    return (
      <div className="min-h-screen bg-dashboard-dark">
        <AppSidebar />
        <main className="p-4 sm:p-6 md:p-8 ml-0 md:ml-64">
          <Link to="/" className="flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Dashboard
          </Link>
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-xl">Criptomoeda não encontrada.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-dark pb-16">
      <AppSidebar />
      
      <main className="p-4 sm:p-6 md:p-8 ml-0 md:ml-64">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Link to="/" className="flex items-center text-primary hover:text-primary/80 mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              {crypto.name}
              <span className="text-sm bg-dashboard-border px-2 py-0.5 rounded-full text-muted-foreground">
                {crypto.symbol}
              </span>
            </h1>
          </div>
          
          <LiveIndicator lastUpdated={lastUpdated} />
        </div>

        {/* Crypto Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Preço e Sentimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Preço Atual</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">
                        ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <TrendIndicator trend={crypto.trend} value={crypto.change24h} size="md" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sentimento</p>
                    <SentimentScore score={crypto.sentimentScore} size="md" />
                  </div>
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
                    data={sentimentData} 
                    timeframe={timeframe} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle>Informações de Mercado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="text-lg font-semibold">
                      ${crypto.marketCap?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Volume (24h)</p>
                    <p className="text-lg font-semibold">
                      ${crypto.volume24h?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Variação (24h)</p>
                    <TrendIndicator trend={crypto.trend} value={crypto.change24h} size="md" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Previsão de Tendência</p>
                    <div className="flex items-center gap-2 mt-1">
                      <TrendIndicator 
                        trend={crypto.trend} 
                        showValue={false} 
                        size="md" 
                        variant="trend" 
                      />
                      <span className="font-medium">
                        {crypto.trend === "up" ? "Em Alta" : crypto.trend === "down" ? "Em Baixa" : "Estável"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sentiment Analysis */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle>Palavras-Chave Mencionadas</CardTitle>
              </CardHeader>
              <CardContent>
                <KeywordCloud keywords={keywords} />
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle>Origem das Menções</CardTitle>
              </CardHeader>
              <CardContent>
                <SourceBreakdown sources={sources} />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CryptoDetail;
