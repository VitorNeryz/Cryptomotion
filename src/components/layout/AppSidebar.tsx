
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

interface SidebarLink {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string | number;
}

export function AppSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const links: SidebarLink[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: TrendingUp, label: "Criptomoedas", href: "/cryptocurrencies" },
    { icon: BarChart3, label: "Análise de Mercado", href: "/market-analysis" },
    { icon: Settings, label: "Configurações", href: "/settings" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-dashboard-card text-foreground"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out",
          isMobile
            ? isOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64"
            : "translate-x-0 w-64"
        )}
      >
        <div className="h-full flex flex-col p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 mt-4">
            <div className="flex items-center">
              <div className="font-bold text-xl">CryptoPulse</div>
            </div>
            {isMobile && (
              <button onClick={closeSidebar} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={cn(
                      "sidebar-link",
                      location.pathname === link.href && "active"
                    )}
                    onClick={closeSidebar}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                    {link.badge ? (
                      <Badge variant="default" className="ml-auto">
                        {link.badge}
                      </Badge>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="pt-4 mt-auto border-t border-dashboard-border">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-white">CP</span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-sidebar rounded-full"></span>
              </div>
              <div>
                <div className="text-sm font-medium">CryptoPulse Insights</div>
                <div className="text-xs text-muted-foreground">Análise em tempo real</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content padding for the sidebar */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isMobile ? "ml-0" : "ml-64"
      )}>
      </div>
    </>
  );
}
