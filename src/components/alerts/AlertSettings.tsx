
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { AlertList } from "./AlertList";
import { AlertForm } from "./AlertForm";
import { mockCryptos } from "@/services/mockData";

export interface CryptoAlert {
  id: string;
  cryptoId: string;
  cryptoName: string;
  sentimentThreshold: number;
  direction: "above" | "below";
  notificationType: "visual" | "email";
  active: boolean;
}

export function AlertSettings() {
  const [alerts, setAlerts] = useState<CryptoAlert[]>(() => {
    const saved = localStorage.getItem("cryptoAlerts");
    return saved ? JSON.parse(saved) : [];
  });
  const [isAddingAlert, setIsAddingAlert] = useState(false);
  const { toast } = useToast();

  const saveAlerts = (newAlerts: CryptoAlert[]) => {
    localStorage.setItem("cryptoAlerts", JSON.stringify(newAlerts));
    setAlerts(newAlerts);
  };

  const addAlert = (alert: Omit<CryptoAlert, "id">) => {
    const newAlert = {
      ...alert,
      id: crypto.randomUUID(),
    };
    
    const newAlerts = [...alerts, newAlert];
    saveAlerts(newAlerts);
    
    toast({
      title: "Alerta criado",
      description: `Você será notificado quando ${alert.cryptoName} ficar ${alert.direction === "above" ? "acima" : "abaixo"} de ${alert.sentimentThreshold.toFixed(2)}.`,
    });
    
    setIsAddingAlert(false);
  };

  const toggleAlert = (id: string) => {
    const newAlerts = alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    );
    saveAlerts(newAlerts);
  };

  const deleteAlert = (id: string) => {
    const newAlerts = alerts.filter(alert => alert.id !== id);
    saveAlerts(newAlerts);
    
    toast({
      title: "Alerta removido",
      description: "O alerta foi removido com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      {isAddingAlert ? (
        <AlertForm 
          cryptos={mockCryptos} 
          onSubmit={addAlert}
          onCancel={() => setIsAddingAlert(false)}
        />
      ) : (
        <div className="flex justify-end">
          <Button onClick={() => setIsAddingAlert(true)}>
            Adicionar Alerta
          </Button>
        </div>
      )}

      {alerts.length > 0 ? (
        <AlertList 
          alerts={alerts}
          onToggle={toggleAlert}
          onDelete={deleteAlert}
        />
      ) : (
        <Card className="p-4 text-center text-muted-foreground">
          Você não tem alertas configurados. Crie um alerta para ser notificado sobre mudanças de sentimento.
        </Card>
      )}
    </div>
  );
}
