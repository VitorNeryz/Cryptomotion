
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun } from "lucide-react";

type Language = "pt" | "en";

export function DisplaySettings() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>("pt");
  const { toast } = useToast();

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLanguage = localStorage.getItem("language") as Language | null;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      applyTheme(savedTheme === "dark");
    }
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const applyTheme = (isDark: boolean) => {
    // Apply theme to document
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }

  // Function to toggle dark mode
  const toggleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    const newTheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    applyTheme(isDark);
    
    toast({
      title: "Tema alterado",
      description: `Modo ${isDark ? "escuro" : "claro"} ativado.`
    });
  };

  // Function to change language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    
    toast({
      title: "Idioma alterado",
      description: lang === "pt" ? "Português selecionado" : "English selected"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-dashboard-card border-dashboard-border">
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Modo Escuro</Label>
              <p className="text-sm text-muted-foreground">
                Alterne entre os modos claro e escuro
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch 
                id="dark-mode" 
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dashboard-card border-dashboard-border">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>Idioma</Label>
            <Select value={language} onValueChange={(value) => changeLanguage(value as Language)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dashboard-card border-dashboard-border">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>Limpar Dados Locais</Label>
            <p className="text-sm text-muted-foreground">
              Remover todos os dados salvos localmente, incluindo alertas e preferências
            </p>
            <Button 
              variant="destructive" 
              onClick={() => {
                localStorage.clear();
                setIsDarkMode(true);
                setLanguage("pt");
                applyTheme(true);
                toast({
                  title: "Dados limpos",
                  description: "Todos os dados locais foram removidos."
                });
              }}
            >
              Limpar Dados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
