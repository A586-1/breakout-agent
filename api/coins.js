const SYMBOLS = [
  "BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT","XRPUSDT","ADAUSDT","AVAXUSDT",
  "DOGEUSDT","LINKUSDT","RENDERUSDT","FILUSDT","UNIUSDT","TAOUSDT","ZECUSDT",
  "HBARUSDT","XLMUSDT","ALGOUSDT","SEIUSDT","SUIUSDT","AKTUSDT","ONDOUSDT",
  "TRXUSDT","FETUSDT","XTZUSDT","ENJUSDT","ICPUSDT","NEARUSDT","ATOMUSDT",
  "RUNEUSDT","WIFUSDT","PNUTUSDT","BONKUSDT","PEPEUSDT","POPCATUSDT",
  "SUPERUSDT","INJUSDT","CAKEUSDT","OPUSDT","IMXUSDT","AIOZUSDT",
  "TURBOUSDT","BLURUSDT","RAYUSDT","TIAUSDT","DOTUSDT"
];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const symbolsParam = JSON.stringify(SYMBOLS);
    const r = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbolsParam)}`);
    const tickers = await r.json();
    const coins = tickers.map(t => ({
      symbol: t.symbol.replace("USDT",""),
      price: parseFloat(t.lastPrice),
      change24h: parseFloat(t.priceChangePercent),
      volume24h: parseFloat(t.quoteVolume),
    }));
    res.status(200).json({ coins, timestamp: Date.now() });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
