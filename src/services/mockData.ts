
import { CryptoData } from "@/components/dashboard/CryptoCard";

export const generateSentimentData = (days: number, bias?: "positive" | "negative" | "neutral") => {
  const data = [];
  const now = new Date();
  
  let interval: number;
  let intervalUnit: 'minutes' | 'hours' | 'days';
  
  // Set the appropriate interval based on days
  if (days <= 1) {
    interval = 5; // 5 minute intervals for 1h or 24h
    intervalUnit = 'minutes';
  } else if (days <= 7) {
    interval = 1; // 1 hour intervals for 7d
    intervalUnit = 'hours';
  } else {
    interval = 1; // 1 day interval for 30d or more
    intervalUnit = 'days';
  }
  
  // Calculate number of data points based on interval
  let dataPoints: number;
  if (intervalUnit === 'minutes') {
    dataPoints = days === 1 ? 12 : 24 * 12; // 5 min intervals = 12 per hour
  } else if (intervalUnit === 'hours') {
    dataPoints = days * 24;
  } else {
    dataPoints = days;
  }
  
  for (let i = dataPoints; i >= 0; i--) {
    const date = new Date(now);
    
    // Adjust date based on interval unit
    if (intervalUnit === 'minutes') {
      date.setMinutes(date.getMinutes() - (i * interval));
    } else if (intervalUnit === 'hours') {
      date.setHours(date.getHours() - (i * interval));
    } else {
      date.setDate(date.getDate() - (i * interval));
    }
    
    let sentimentBase;
    switch (bias) {
      case "positive":
        sentimentBase = Math.random() * 0.5 + 0.2; // 0.2 to 0.7
        break;
      case "negative":
        sentimentBase = Math.random() * 0.5 - 0.7; // -0.7 to -0.2
        break;
      case "neutral":
        sentimentBase = Math.random() * 0.4 - 0.2; // -0.2 to 0.2
        break;
      default:
        sentimentBase = Math.random() * 1.6 - 0.8; // -0.8 to 0.8
    }
    
    // Add some variance
    const sentiment = Math.max(-1, Math.min(1, sentimentBase + Math.random() * 0.2 - 0.1));
    const volume = Math.round(Math.random() * 5000 + 1000);
    
    data.push({
      timestamp: date.toISOString(),
      sentiment,
      volume
    });
  }
  
  return data;
};

export const mockCryptos: CryptoData[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 57324.85,
    change24h: 2.35,
    sentimentScore: 0.65,
    trend: "up",
    marketCap: 1120435789234,
    volume24h: 28976543210
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3243.62,
    change24h: 1.28,
    sentimentScore: 0.43,
    trend: "up",
    marketCap: 389765432100,
    volume24h: 14567890123
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    symbol: "BNB",
    price: 587.29,
    change24h: -0.56,
    sentimentScore: -0.12,
    trend: "down",
    marketCap: 97856341200,
    volume24h: 3456789012
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 152.87,
    change24h: 4.72,
    sentimentScore: 0.81,
    trend: "up",
    marketCap: 67891234567,
    volume24h: 4567890123
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.567,
    change24h: -2.18,
    sentimentScore: -0.34,
    trend: "down",
    marketCap: 19876543210,
    volume24h: 1234567890
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    price: 0.723,
    change24h: 0.12,
    sentimentScore: 0.18,
    trend: "stable",
    marketCap: 37654321098,
    volume24h: 2345678901
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.112,
    change24h: -3.42,
    sentimentScore: -0.56,
    trend: "down",
    marketCap: 15678901234,
    volume24h: 1987654321
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: 5.87,
    change24h: 1.05,
    sentimentScore: 0.27,
    trend: "up",
    marketCap: 7123456789,
    volume24h: 987654321
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    price: 29.45,
    change24h: 3.24,
    sentimentScore: 0.54,
    trend: "up",
    marketCap: 12345678901,
    volume24h: 1765432109
  }
];

export const generateKeywords = (sentiment: number) => {
  const positiveKeywords = [
    { text: "bullish", value: 85 },
    { text: "mooning", value: 65 },
    { text: "hodl", value: 78 },
    { text: "gains", value: 56 },
    { text: "profit", value: 47 },
    { text: "uptrend", value: 42 },
    { text: "breakout", value: 38 },
    { text: "adoption", value: 35 },
    { text: "innovation", value: 32 },
    { text: "promising", value: 30 }
  ];
  
  const negativeKeywords = [
    { text: "dump", value: 75 },
    { text: "bearish", value: 68 },
    { text: "crash", value: 63 },
    { text: "sell", value: 55 },
    { text: "scam", value: 49 },
    { text: "correction", value: 44 },
    { text: "bubble", value: 39 },
    { text: "overvalued", value: 34 },
    { text: "fud", value: 30 },
    { text: "decline", value: 28 }
  ];
  
  const neutralKeywords = [
    { text: "blockchain", value: 65 },
    { text: "crypto", value: 60 },
    { text: "market", value: 58 },
    { text: "trading", value: 52 },
    { text: "volatility", value: 45 },
    { text: "regulation", value: 40 },
    { text: "volume", value: 35 },
    { text: "transaction", value: 32 },
    { text: "price", value: 30 },
    { text: "exchange", value: 28 }
  ];

  // Determine how many of each type based on sentiment
  let positiveCount = 3;
  let negativeCount = 3;
  let neutralCount = 4;
  
  if (sentiment > 0.3) {
    positiveCount = 6;
    negativeCount = 1;
    neutralCount = 3;
  } else if (sentiment < -0.3) {
    positiveCount = 1;
    negativeCount = 6;
    neutralCount = 3;
  }

  // Shuffle and pick the required number
  const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);
  
  const keywords = [
    ...shuffle(positiveKeywords).slice(0, positiveCount).map(k => ({ ...k, sentiment: "positive" as const })),
    ...shuffle(negativeKeywords).slice(0, negativeCount).map(k => ({ ...k, sentiment: "negative" as const })),
    ...shuffle(neutralKeywords).slice(0, neutralCount).map(k => ({ ...k, sentiment: "neutral" as const }))
  ];
  
  return shuffle(keywords);
};

export const generateSourceBreakdown = () => {
  // Random distribution that sums to 100%
  const twitterPct = Math.floor(Math.random() * 60) + 20; // 20-80%
  const redditPct = Math.floor(Math.random() * (95 - twitterPct)) + 5; // 5-75%
  const bitcointalkPct = 100 - twitterPct - redditPct; // Whatever remains
  
  // Generate random count based on percentages
  const totalCount = Math.floor(Math.random() * 5000) + 1000;
  const twitterCount = Math.floor(totalCount * (twitterPct / 100));
  const redditCount = Math.floor(totalCount * (redditPct / 100));
  const bitcointalkCount = totalCount - twitterCount - redditCount;
  
  return [
    { name: "Twitter", percentage: twitterPct, count: twitterCount },
    { name: "Reddit", percentage: redditPct, count: redditCount },
    { name: "Bitcointalk", percentage: bitcointalkPct, count: bitcointalkCount }
  ];
};
