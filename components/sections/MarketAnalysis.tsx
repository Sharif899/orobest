"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { label: "PUBLIC_DATA_EXHAUSTED", value: "~2026", unit: "", desc: "Estimated year AI training exhausts all public internet data", color: "#ef4444" },
  { label: "PRIVATE_DATA_VALUE", value: "$3.5", unit: "T", desc: "Estimated value of private data generated globally each year", color: "#FF6B00" },
  { label: "USER_COMPENSATION", value: "$0", unit: "", desc: "What users currently earn from their data being used by AI", color: "#ef4444" },
  { label: "AI_TRAINING_COST", value: "$100M+", unit: "", desc: "Cost of training a frontier AI model on available data", color: "#00D4FF" },
];

const TIMELINE = [
  { year: "2012–2020", label: "PUBLIC DATA ERA", desc: "AI trained on public internet: Wikipedia, books, code, news. Data was abundant. Models grew fast.", status: "past" },
  { year: "2021–2024", label: "DIMINISHING RETURNS", desc: "Quality public data ran dry. Models began training on lower-quality synthetic data. Progress slowed.", status: "past" },
  { year: "2025", label: "THE WALL", desc: "Frontier models hit the public data ceiling. Private, high-quality human data becomes the next frontier.", status: "now" },
  { year: "2026+", label: "PRIVATE DATA ECONOMY", desc: "AI companies pay for private data. Users who contribute get compensated. ORO is the infrastructure.", status: "future" },
];

function LiveMarketTicker() {
  const [prices, setPrices] = useState<{ name: string; price: number; change: number }[]>([
    { name: "ETH", price: 3420, change: 2.1 },
    { name: "BTC", price: 67800, change: -0.8 },
    { name: "SOL", price: 178, change: 4.3 },
    { name: "ARB", price: 1.24, change: -1.2 },
  ]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // attempt live fetch from CoinGecko public API
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,solana,arbitrum&vs_currencies=usd&include_24hr_change=true")
      .then((r) => r.json())
      .then((d) => {
        setPrices([
          { name: "ETH", price: Math.round(d.ethereum.usd), change: parseFloat(d.ethereum.usd_24h_change.toFixed(2)) },
          { name: "BTC", price: Math.round(d.bitcoin.usd), change: parseFloat(d.bitcoin.usd_24h_change.toFixed(2)) },
          { name: "SOL", price: parseFloat(d.solana.usd.toFixed(2)), change: parseFloat(d.solana.usd_24h_change.toFixed(2)) },
          { name: "ARB", price: parseFloat(d.arbitrum.usd?.toFixed(4) ?? "1.24"), change: parseFloat((d.arbitrum.usd_24h_change ?? -1.2).toFixed(2)) },
        ]);
        setFetched(true);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div style={{ background: "rgba(5,5,8,0.95)", border: "1px solid rgba(255,107,0,0.12)", borderRadius: 10, padding: "16px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.5)", letterSpacing: "0.2em" }}>LIVE_MARKET_DATA</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: fetched ? "#00FF88" : error ? "#ef4444" : "#FF6B00", boxShadow: fetched ? "0 0 6px #00FF88" : "none" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)" }}>{fetched ? "LIVE" : error ? "CACHED" : "LOADING"}</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {prices.map((p) => (
          <div key={p.name} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "#fff", letterSpacing: 0.5 }}>${p.price.toLocaleString()}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: p.change >= 0 ? "#00FF88" : "#ef4444" }}>
              {p.change >= 0 ? "+" : ""}{p.change}%
            </div>
          </div>
        ))}
      </div>
      {error && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.15)", marginTop: 8, textAlign: "center" }}>LIVE_FETCH_FAILED · SHOWING_CACHED_DATA</div>}
    </div>
  );
}

export default function MarketAnalysis() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="market-analysis" style={{
      padding: "120px clamp(16px,4vw,80px)",
      background: "rgba(7,7,11,0.9)",
      borderTop: "1px solid rgba(255,107,0,0.08)",
    }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3 }} />
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

        <div className="reveal" style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>// MARKET_ANALYSIS</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,6vw,80px)", letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9, marginBottom: 14 }}>
            WHY AI NEEDS<br /><span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>YOUR DATA NOW.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "rgba(232,232,240,0.4)", maxWidth: 520 }}>
            The AI industry has hit a wall. Public data is running out. Private human data is the only path forward — and for the first time, you can be compensated for it.
          </p>
        </div>

        {/* Live market ticker */}
        <div className="reveal" style={{ marginBottom: 24 }}>
          <LiveMarketTicker />
        </div>

        {/* Stats grid */}
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, marginBottom: 28 }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={vis ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "rgba(5,5,8,0.95)", border: `1px solid ${s.color}18`,
                borderRadius: 10, padding: "22px 20px",
                borderTop: `2px solid ${s.color}`,
              }}
            >
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: s.color, letterSpacing: 1, lineHeight: 1, marginBottom: 6 }}>
                {s.value}<span style={{ fontSize: 28 }}>{s.unit}</span>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="reveal" style={{
          background: "rgba(5,5,8,0.9)", border: "1px solid rgba(255,107,0,0.1)",
          borderRadius: 12, padding: "28px 28px",
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.5)", letterSpacing: "0.2em", marginBottom: 24 }}>AI_DATA_TIMELINE</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 0, position: "relative" }}>
            {/* connector line */}
            <div style={{ position: "absolute", top: 16, left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg, rgba(255,107,0,0.3), rgba(0,255,136,0.3))", display: "none" }} />
            {TIMELINE.map((t, i) => (
              <div key={t.year} style={{
                padding: "0 20px 0 0",
                borderRight: i < TIMELINE.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                paddingRight: 20, paddingLeft: i > 0 ? 20 : 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: t.status === "now" ? "#FF6B00" : t.status === "future" ? "#00FF88" : "rgba(255,255,255,0.2)",
                    boxShadow: t.status === "now" ? "0 0 10px #FF6B00" : "none",
                    flexShrink: 0,
                  }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.status === "now" ? "#FF6B00" : t.status === "future" ? "#00FF88" : "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>{t.year}</span>
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: t.status === "now" ? "#FF6B00" : t.status === "future" ? "#00FF88" : "rgba(255,255,255,0.5)", letterSpacing: 1, marginBottom: 6 }}>{t.label}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
