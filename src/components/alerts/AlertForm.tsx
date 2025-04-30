
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CryptoData } from "@/components/dashboard/CryptoCard";
import { CryptoAlert } from "./AlertSettings";

interface AlertFormProps {
  cryptos: CryptoData[];
  onSubmit: (alert: Omit<CryptoAlert, "id">) => void;
  onCancel: () => void;
}

export function AlertForm({ cryptos, onSubmit, onCancel }: AlertFormProps) {
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [direction, setDirection] = useState<"above" | "below">("above");
  const [threshold, setThreshold] = useState(0.5);
  const [notificationType, setNotificationType] = useState<"visual" | "email">("visual");

  const crypto = cryptos.find(c => c.id === selectedCrypto);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCrypto || !crypto) return;
    
    onSubmit({
      cryptoId: selectedCrypto,
      cryptoName: crypto.name,
      sentimentThreshold: threshold,
      direction,
      notificationType,
      active: true
    });
  };

  return (
    <Card className="bg-dashboard-card border-dashboard-border">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Selecione a Criptomoeda</FormLabel>
              <Select 
                value={selectedCrypto} 
                onValueChange={setSelectedCrypto}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma criptomoeda" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cryptos.map((crypto) => (
                    <SelectItem key={crypto.id} value={crypto.id}>
                      {crypto.name} ({crypto.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>

            <FormItem>
              <FormLabel>Alerta quando o sentimento estiver</FormLabel>
              <Select 
                value={direction} 
                onValueChange={(value) => setDirection(value as "above" | "below")}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="above">Acima de</SelectItem>
                  <SelectItem value="below">Abaixo de</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            <FormItem>
              <FormLabel>
                Valor limite: {threshold.toFixed(2)} 
                <span className="text-xs text-muted-foreground ml-2">
                  (-1.00 a 1.00)
                </span>
              </FormLabel>
              <Slider
                min={-1}
                max={1}
                step={0.05}
                value={[threshold]}
                onValueChange={(values) => setThreshold(values[0])}
                className="py-4"
              />
            </FormItem>

            <FormItem className="flex items-center justify-between">
              <FormLabel>Notificação por Email</FormLabel>
              <Switch 
                checked={notificationType === "email"}
                onCheckedChange={(checked) => 
                  setNotificationType(checked ? "email" : "visual")
                }
              />
            </FormItem>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={!selectedCrypto}
            >
              Salvar Alerta
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
