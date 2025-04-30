
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveIndicator } from "@/components/dashboard/LiveIndicator";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AlertSettings } from "@/components/alerts/AlertSettings";
import { DisplaySettings } from "@/components/settings/DisplaySettings";

const Settings = () => {
  const [lastUpdated] = useState(new Date().toLocaleString());

  return (
    <div className="min-h-screen bg-dashboard-dark pb-16">
      <AppSidebar />
      
      <main className="p-4 sm:p-6 md:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Configurações</h1>
            <p className="text-muted-foreground">Personalize sua experiência e configure alertas</p>
          </div>
          
          <LiveIndicator lastUpdated={lastUpdated} />
        </div>

        <Card className="glass-card mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Preferências do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="alertas" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="alertas">Alertas</TabsTrigger>
                <TabsTrigger value="exibicao">Exibição</TabsTrigger>
                <TabsTrigger value="dados">Dados</TabsTrigger>
              </TabsList>
              <TabsContent value="alertas">
                <AlertSettings />
              </TabsContent>
              <TabsContent value="exibicao">
                <DisplaySettings />
              </TabsContent>
              <TabsContent value="dados">
                <div className="p-4 rounded-md bg-dashboard-card">
                  <p>Configurações de dados serão implementadas em breve.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
