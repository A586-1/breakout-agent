export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ error: "symbol required" });
  try {
    const r = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=52`);
    const klines = await r.json();
    const prices = klines.map(k => parseFloat(k[4]));
    const volumes = klines.map(k => parseFloat(k[5]));
    res.status(200).json({ prices, volumes });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
