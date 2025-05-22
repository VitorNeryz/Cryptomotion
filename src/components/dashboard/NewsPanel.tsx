
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { CryptoNews, NewsCard } from "./NewsCard";
import { mockCryptoNews } from "@/services/mockCryptoNews";

interface NewsPanelProps {
  newsCount?: number;
  height?: number;
}

export function NewsPanel({ newsCount = 3, height = 300 }: NewsPanelProps) {
  const [news, setNews] = useState<CryptoNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setNews(mockCryptoNews.slice(0, newsCount));
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [newsCount]);
  
  if (isLoading) {
    return (
      <Card className="glass-card h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Newspaper className="mr-2 h-5 w-5" />
            Hot News Crypto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-24 w-full rounded-md" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Newspaper className="mr-2 h-5 w-5" />
          Hot News Crypto
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
        
        <Link to="/news" className="block mt-4">
          <Button variant="outline" className="w-full text-primary flex items-center justify-center gap-2" size="sm">
            Ver todas as notícias
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
