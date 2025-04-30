
interface Keyword {
  text: string;
  value: number;
  sentiment: "positive" | "negative" | "neutral";
}

interface KeywordCloudProps {
  keywords: Keyword[];
}

export function KeywordCloud({ keywords }: KeywordCloudProps) {
  // Sort keywords by value (frequency)
  const sortedKeywords = [...keywords].sort((a, b) => b.value - a.value);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-sentiment-positive/20 text-sentiment-positive";
      case "negative":
        return "bg-sentiment-negative/20 text-sentiment-negative";
      case "neutral":
        return "bg-sentiment-neutral/20 text-sentiment-neutral";
      default:
        return "bg-dashboard-border text-muted-foreground";
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {sortedKeywords.map((keyword, index) => (
        <div
          key={index}
          className={`px-3 py-1 rounded-full text-sm ${getSentimentColor(keyword.sentiment)}`}
          style={{
            fontSize: `${Math.max(0.8, Math.min(1.4, 0.8 + keyword.value / 50))}rem`
          }}
        >
          {keyword.text}
        </div>
      ))}
    </div>
  );
}
