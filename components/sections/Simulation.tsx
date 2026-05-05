"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function simulate(principal: number) {
  const weeks = 12;
  let manual = principal;
  let oro = principal;
  const data: { w: number; manual: number; oro: number }[] = [{ w: 0, manual: principal, oro: principal }];
  for (let w = 1; w <= weeks; w++) {
    manual *= 1 + 0.004 * (0.6 + Math.random() * 0.8);
    oro *= 1 + 0.004 * (0.7 + Math.random() * 0.6) + 0.009 * (0.8 + Math.random() * 0.4);
    data.push({ w, manual: Math.round(manual), oro: Math.round(oro) });
  }
  return data;
}

function Chart({ data, principal }: { data: ReturnType<typeof simulate>; principal: number }) {
  const W = 100, H = 60;
  const min = principal * 0.98;
  const max = Math.max(...data.map((d) => d.oro));
  const range = max - min;
  const x = (i: number) => (i / (data.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / range) * (H - 4) - 2;

  const oroPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.oro)}`).join(" ");
  const manPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.manual)}`).join(" ");
  const area = `${oroPath} L ${x(data.length - 1)} ${H} L 0 ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* grid lines */}
      {[0.25, 0.5, 0.75].map((p) => (
        <line key={p} x1={0} y1={H * p} x2={W} y2={H * p} stroke="rgba(255,107,0,0.06)" strokeWidth="0.5" />
      ))}
      <path d={area} fill="url(#chartFill)" />
      <path d={manPath} stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none" strokeDasharray="2 3" />
      <path d={oroPath} stroke="#FF6B00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1].oro)} r="2" fill="#FF6B00" />
    </svg>
  );
}

function AnimNum({ val }: { val: number }) {
  const [disp, setDisp] = useState(val);
  const prev = useRef(val);
  useEffect(() => {
    const from = prev.current, to = val;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 600, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisp(Math.round(from + (to - from) * e));
      if (p < 1) requestAnimationFrame(step);
      else prev.current = to;
    };
    requestAnimationFrame(step);
  }, [val]);
  return <>${disp.toLocaleString()}</>;
}

export default function Simulation() {
  const [amount, setAmount] = useState(1000);
  const [raw, setRaw] = useState("1000");
  const [data, setData] = useState(() => simulate(1000));

  useEffect(() => { setData(simulate(amount)); }, [amount]);

  const final = data[data.length - 1];
  const oroGrowth = (((final.oro - amount) / amount) * 100).toFixed(1);
  const manGrowth = (((final.manual - amount) / amount) * 100).toFixed(1);
  const diff = final.oro - final.manual;

  return (
    <section id="simulation" style={{ padding: "120px clamp(16px,4vw,80px)", position: "relative" }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>
            // SIMULATION_ENGINE
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px,6vw,80px)",
            letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9, marginBottom: 14,
          }}>
            WATCH YOUR CAPITAL<br />
            <span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>WORK WITH STRUCTURE.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(232,232,240,0.4)", maxWidth: 480 }}>
            Enter a starting amount. See a simulated 12-week outcome: manual vs ORO structured execution.{" "}
            <span style={{ color: "rgba(255,255,255,0.2)" }}>Illustrative — not financial advice.</span>
          </p>
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20, alignItems: "start" }}>
          {/* Input */}
          <div style={{
            background: "rgba(7,7,11,0.9)",
            border: "1px solid rgba(255,107,0,0.15)",
            borderRadius: 12, padding: "28px",
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,107,0,0.5)", letterSpacing: "0.2em", marginBottom: 16 }}>
              INPUT_CAPITAL
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              borderBottom: "1px solid rgba(255,107,0,0.15)", paddingBottom: 16, marginBottom: 20,
            }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#FF6B00" }}>$</span>
              <input
                type="text" value={raw}
                onChange={(e) => { setRaw(e.target.value); const n = parseFloat(e.target.value); if (!isNaN(n) && n >= 50) setAmount(n); }}
                style={{
                  background: "transparent", border: "none", outline: "none",
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 44,
                  color: "#fff", width: "100%", letterSpacing: 1,
                }}
              />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {[500, 1000, 5000, 10000].map((v) => (
                <button key={v} onClick={() => { setAmount(v); setRaw(v.toString()); }} style={{
                  padding: "7px 14px", borderRadius: 6, cursor: "pointer",
                  background: amount === v ? "rgba(255,107,0,0.12)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${amount === v ? "rgba(255,107,0,0.4)" : "rgba(255,255,255,0.06)"}`,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: amount === v ? "#FF6B00" : "rgba(255,255,255,0.3)",
                  transition: "all 0.2s", letterSpacing: "0.05em",
                }}>
                  ${v >= 1000 ? `${v / 1000}K` : v}
                </button>
              ))}
            </div>

            <input type="range" min={100} max={50000} step={100} value={amount}
              onChange={(e) => { const v = parseInt(e.target.value); setAmount(v); setRaw(v.toString()); }}
              style={{ width: "100%", accentColor: "#FF6B00", cursor: "pointer", marginBottom: 24 }}
            />

            <div style={{ borderTop: "1px solid rgba(255,107,0,0.08)", paddingTop: 20 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", marginBottom: 12 }}>
                SIM_PARAMETERS
              </div>
              {[
                ["BASE_RETURN", "~0.4%/wk"],
                ["ORO_EFFICIENCY", "+~0.9%/wk"],
                ["TIMEFRAME", "12 WEEKS"],
                ["REBALANCES", "AUTOMATIC"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>{k}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,107,0,0.6)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Output */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* result cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { label: "WITH_ORO", val: final.oro, sub: `+${oroGrowth}%`, highlight: true },
                { label: "MANUAL", val: final.manual, sub: `+${manGrowth}%`, highlight: false },
                { label: "ORO_ADVANTAGE", val: diff, sub: "over 12 weeks", highlight: false, prefix: "+$" },
              ].map((c) => (
                <div key={c.label} style={{
                  background: c.highlight ? "rgba(12,12,18,0.95)" : "rgba(7,7,11,0.8)",
                  border: `1px solid ${c.highlight ? "rgba(255,107,0,0.3)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 10, padding: "20px 18px",
                  boxShadow: c.highlight ? "0 0 30px rgba(255,107,0,0.06)" : "none",
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 10 }}>{c.label}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: c.highlight ? "#FF6B00" : "#fff", letterSpacing: 0.5, marginBottom: 4 }}>
                    <AnimNum val={c.val} />
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.highlight ? "#00FF88" : "rgba(255,255,255,0.3)" }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* chart */}
            <div style={{
              background: "rgba(7,7,11,0.8)",
              border: "1px solid rgba(255,107,0,0.1)",
              borderRadius: 10, padding: "20px 22px",
              height: 200,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em" }}>
                  12_WEEK_PROJECTION
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  {[{ color: "#FF6B00", label: "WITH_ORO" }, { color: "rgba(255,255,255,0.2)", label: "MANUAL" }].map((l) => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 14, height: 1, background: l.color }} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: 120 }}><Chart data={data} principal={amount} /></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                {["W0", "W2", "W4", "W6", "W8", "W10", "W12"].map((w) => (
                  <span key={w} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.15)" }}>{w}</span>
                ))}
              </div>
            </div>

            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.15)", textAlign: "center", letterSpacing: "0.1em" }}>
              SIMULATED_OUTPUT · NOT_FINANCIAL_ADVICE · RESULTS_VARY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
