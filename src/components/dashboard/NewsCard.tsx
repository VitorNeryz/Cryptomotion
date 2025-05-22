
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export interface CryptoNews {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  sentiment: "positive" | "negative" | "neutral";
}

interface NewsCardProps {
  news: CryptoNews;
}

export function NewsCard({ news }: NewsCardProps) {
  const getSentimentClass = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "border-l-sentiment-positive";
      case "negative":
        return "border-l-sentiment-negative";
      default:
        return "border-l-sentiment-neutral";
    }
  };

  return (
    <Card className={`crypto-card hover:shadow-md transition-all p-4 border-l-4 ${getSentimentClass(news.sentiment)}`}>
      <CardContent className="p-0">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground flex items-center justify-between">
            <span>{news.source}</span>
            <span>{news.date}</span>
          </div>
          <h3 className="font-bold text-base">{news.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{news.summary}</p>
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary flex items-center gap-1 text-sm mt-1 hover:underline"
          >
            Ler mais <ExternalLink size={14} />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
