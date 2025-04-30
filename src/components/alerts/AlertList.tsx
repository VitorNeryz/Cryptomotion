
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CryptoAlert } from "./AlertSettings";

interface AlertListProps {
  alerts: CryptoAlert[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AlertList({ alerts, onToggle, onDelete }: AlertListProps) {
  const getSentimentLabel = (value: number) => {
    if (value > 0.7) return "muito positivo";
    if (value > 0.3) return "positivo";
    if (value > -0.3) return "neutro";
    if (value > -0.7) return "negativo";
    return "muito negativo";
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Alertas configurados ({alerts.length})</h3>
      
      {alerts.map((alert) => (
        <Card key={alert.id} className="bg-dashboard-card border-dashboard-border">
          <CardContent className="p-4 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{alert.cryptoName}</h4>
                <span className={`text-xs px-2 py-0.5 rounded ${alert.active ? 'bg-primary/20' : 'bg-muted'}`}>
                  {alert.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mt-1">
                Alerta quando sentimento estiver {alert.direction === "above" ? "acima" : "abaixo"} de {alert.sentimentThreshold.toFixed(2)} ({getSentimentLabel(alert.sentimentThreshold)})
              </p>
              
              <p className="text-xs text-muted-foreground mt-1">
                Tipo: {alert.notificationType === "visual" ? "Notificação Visual" : "Email"}
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-end sm:self-center">
              <Switch
                checked={alert.active}
                onCheckedChange={() => onToggle(alert.id)}
              />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-destructive hover:text-destructive"
                onClick={() => onDelete(alert.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
