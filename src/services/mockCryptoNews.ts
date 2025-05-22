
import { CryptoNews } from "@/components/dashboard/NewsCard";

export const mockCryptoNews: CryptoNews[] = [
  {
    id: "news-1",
    title: "Bitcoin Atinge Novo Recorde Após Aprovação de ETF",
    source: "CryptoJornal",
    date: "10 Maio 2025",
    summary: "Bitcoin atingiu um novo recorde histórico após a aprovação de ETFs por reguladores, superando US$100,000 pela primeira vez.",
    url: "#",
    sentiment: "positive"
  },
  {
    id: "news-2",
    title: "Ethereum Completa Atualização Prometida de Escalabilidade",
    source: "BlockNews",
    date: "08 Maio 2025",
    summary: "A rede Ethereum completou com sucesso uma atualização que promete aumentar a velocidade das transações em até 100x.",
    url: "#",
    sentiment: "positive"
  },
  {
    id: "news-3",
    title: "Reguladores Discutem Novas Restrições para Exchanges",
    source: "CryptoDaily",
    date: "07 Maio 2025",
    summary: "Órgãos reguladores de diversos países iniciaram discussões sobre novas medidas restritivas para exchanges de criptomoedas.",
    url: "#",
    sentiment: "negative"
  },
  {
    id: "news-4",
    title: "Solana Ganha Força com Nova Parceria no Setor de Jogos",
    source: "CoinReport",
    date: "05 Maio 2025",
    summary: "Solana estabeleceu parceria com grandes desenvolvedores de jogos para criar um ecossistema de jogos baseado em blockchain.",
    url: "#",
    sentiment: "positive"
  },
  {
    id: "news-5",
    title: "Cardano Implementa Nova Solução de Privacidade",
    source: "CryptoTech",
    date: "03 Maio 2025",
    summary: "A blockchain Cardano lançou uma nova solução de privacidade que permite transações anônimas mantendo a conformidade regulatória.",
    url: "#",
    sentiment: "positive"
  },
  {
    id: "news-6",
    title: "Mercado Reage Negativamente à Proposta de Imposto",
    source: "EconomyCrypto",
    date: "01 Maio 2025",
    summary: "O mercado de criptomoedas reagiu com quedas após anúncio de proposta de tributação específica para ativos digitais.",
    url: "#",
    sentiment: "negative"
  }
];

export const getLatestNews = () => {
  return [...mockCryptoNews].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
