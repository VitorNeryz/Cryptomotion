
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TimeFrame = "1h" | "24h" | "7d" | "30d" | "all";

interface TimeFilterProps {
  defaultValue?: TimeFrame;
  onChange?: (value: TimeFrame) => void;
  className?: string;
}

export function TimeFilter({ 
  defaultValue = "24h", 
  onChange,
  className 
}: TimeFilterProps) {
  const [selected, setSelected] = useState<TimeFrame>(defaultValue);

  const handleChange = (value: string) => {
    const timeFrame = value as TimeFrame;
    setSelected(timeFrame);
    onChange?.(timeFrame);
  };

  return (
    <Card className={className}>
      <Tabs 
        value={selected} 
        onValueChange={handleChange} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 h-9">
          <TabsTrigger value="1h" className="text-xs">1H</TabsTrigger>
          <TabsTrigger value="24h" className="text-xs">24H</TabsTrigger>
          <TabsTrigger value="7d" className="text-xs">7D</TabsTrigger>
          <TabsTrigger value="30d" className="text-xs">30D</TabsTrigger>
          <TabsTrigger value="all" className="text-xs">Tudo</TabsTrigger>
        </TabsList>
      </Tabs>
    </Card>
  );
}
