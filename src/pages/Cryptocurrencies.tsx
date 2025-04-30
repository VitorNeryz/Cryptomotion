
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CryptoTable } from "@/components/dashboard/CryptoTable";
import { LiveIndicator } from "@/components/dashboard/LiveIndicator";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { mockCryptos } from "@/services/mockData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Cryptocurrencies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdated] = useState(new Date().toLocaleString());
  
  const filteredCryptos = mockCryptos.filter(crypto => 
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dashboard-dark pb-16">
      <AppSidebar />
      
      <main className="p-4 sm:p-6 md:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Criptomoedas</h1>
            <p className="text-muted-foreground">Lista de criptomoedas com análise de sentimento</p>
          </div>
          
          <LiveIndicator lastUpdated={lastUpdated} />
        </div>

        <Card className="glass-card mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Lista de Criptomoedas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou símbolo..."
                className="pl-9 bg-dashboard-card border-dashboard-border text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <CryptoTable cryptos={filteredCryptos} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Cryptocurrencies;
