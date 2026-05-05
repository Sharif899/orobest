"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* Animated counter */
function Counter({ to, duration = 2000 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * to));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = setTimeout(() => requestAnimationFrame(step), 600);
    return () => clearTimeout(id);
  }, [to, duration]);
  return <>{val.toLocaleString()}</>;
}

/* Scrolling data feed */
const DATA_LINES = [
  "SYS: MONITORING ACTIVE",
  "SIGNAL: ETH/USDC THRESHOLD",
  "EXEC: POSITION ADJUSTED",
  "RISK: WITHIN PARAMETERS",
  "OPT: ROUTING OPTIMIZED",
  "SYS: REBALANCE COMPLETE",
  "DATA: LIQUIDITY SCANNED",
  "EXEC: GAS OPTIMIZED",
  "SYS: STRATEGY STABLE",
  "SIGNAL: BTC HEDGE ACTIVE",
  "EXEC: SLIPPAGE 0.04%",
  "OPT: EFFICIENCY +22%",
];

function DataFeed() {
  return (
    <div style={{
      position: "absolute", right: 0, top: 0, bottom: 0,
      width: 200, overflow: "hidden",
      maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
      WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
    }}>
      <div style={{
        animation: "data-scroll 12s linear infinite",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {[...DATA_LINES, ...DATA_LINES].map((line, i) => (
          <div key={i} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: i % 3 === 0 ? "rgba(255,107,0,0.5)" : i % 3 === 1 ? "rgba(0,255,136,0.3)" : "rgba(255,255,255,0.12)",
            letterSpacing: "0.05em",
            padding: "2px 0",
          }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Animated orbit */
function OrbitRing() {
  const [r, setR] = useState(0);
  const ref = useRef<number>();
  const prev = useRef(0);

  useEffect(() => {
    const step = (ts: number) => {
      if (!prev.current) prev.current = ts;
      setR((v) => (v + (ts - prev.current) * 0.025) % 360);
      prev.current = ts;
      ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, []);

  const nodes = [
    { label: "MONITOR", icon: "◉", angle: 0, color: "#00D4FF" },
    { label: "ADAPT", icon: "◈", angle: 90, color: "#FF6B00" },
    { label: "OPTIMIZE", icon: "◎", angle: 180, color: "#00FF88" },
    { label: "EXECUTE", icon: "◆", angle: 270, color: "#FF6B00" },
  ];

  const SIZE = 340;
  const CX = SIZE / 2;
  const R1 = 130;
  const R2 = 95;

  return (
    <div style={{ position: "relative", width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} style={{ position: "absolute", inset: 0 }}>
        {/* outer ring */}
        <circle cx={CX} cy={CX} r={R1} fill="none" stroke="rgba(255,107,0,0.1)" strokeWidth="1" strokeDasharray="3 6" />
        {/* inner ring */}
        <circle cx={CX} cy={CX} r={R2} fill="none" stroke="rgba(0,212,255,0.08)" strokeWidth="1" strokeDasharray="2 8" />
        {/* crosshairs */}
        <line x1={CX - R1 - 10} y1={CX} x2={CX + R1 + 10} y2={CX} stroke="rgba(255,107,0,0.06)" strokeWidth="1" />
        <line x1={CX} y1={CX - R1 - 10} x2={CX} y2={CX + R1 + 10} stroke="rgba(255,107,0,0.06)" strokeWidth="1" />
        {/* rotating connector */}
        <g transform={`rotate(${r}, ${CX}, ${CX})`}>
          <circle cx={CX + R1} cy={CX} r={3} fill="#FF6B00" style={{ filter: "drop-shadow(0 0 4px #FF6B00)" }} />
          <circle cx={CX - R2} cy={CX} r={2} fill="#00D4FF" style={{ filter: "drop-shadow(0 0 3px #00D4FF)" }} opacity={0.7} />
        </g>
      </svg>

      {/* orbit nodes */}
      {nodes.map((n) => {
        const rad = ((n.angle - 90) * Math.PI) / 180;
        const nx = CX + R1 * Math.cos(rad);
        const ny = CX + R1 * Math.sin(rad);
        return (
          <div key={n.label} style={{ position: "absolute", left: nx - 22, top: ny - 22 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: "rgba(5,5,8,0.95)",
              border: `1px solid ${n.color}33`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
            }}>
              <span style={{ fontSize: 12, color: n.color }}>{n.icon}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, color: n.color, letterSpacing: "0.05em", opacity: 0.8 }}>{n.label}</span>
            </div>
          </div>
        );
      })}

      {/* center */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 80, height: 80, borderRadius: 16,
        background: "linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,107,0,0.05))",
        border: "1px solid rgba(255,107,0,0.4)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 40px rgba(255,107,0,0.2), inset 0 0 20px rgba(255,107,0,0.05)",
      }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#FF6B00", letterSpacing: 2, lineHeight: 1 }}>ORO</span>
        <div style={{ width: 24, height: 1, background: "rgba(255,107,0,0.4)", marginTop: 4 }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, color: "rgba(255,107,0,0.5)", letterSpacing: "0.1em", marginTop: 4 }}>CORE</span>
      </div>
    </div>
  );
}

/* Terminal typing effect */
function Terminal() {
  const lines = [
    { text: "> STRATEGY LOADED", color: "rgba(255,255,255,0.5)", delay: 0 },
    { text: "> MONITORING: ACTIVE", color: "#00FF88", delay: 400 },
    { text: "> THRESHOLD: WATCHING", color: "#00D4FF", delay: 800 },
    { text: "> EXECUTION: READY", color: "#FF6B00", delay: 1200 },
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timers = lines.map((l, i) =>
      setTimeout(() => setShown((s) => Math.max(s, i + 1)), l.delay + 500)
    );
    const reset = setTimeout(() => setShown(0), 3600);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [shown === 0]);

  return (
    <div style={{
      background: "rgba(5,5,8,0.9)",
      border: "1px solid rgba(255,107,0,0.15)",
      borderRadius: 10,
      padding: "16px 20px",
      minHeight: 100,
    }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
        ))}
      </div>
      {lines.slice(0, shown).map((l, i) => (
        <div key={i} style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, color: l.color,
          letterSpacing: "0.05em", lineHeight: 1.8,
          animation: "slide-in-right 0.3s ease",
        }}>
          {l.text}
          {i === shown - 1 && <span style={{ animation: "blink 1s infinite", marginLeft: 2 }}>█</span>}
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "80px clamp(16px,4vw,80px) 60px",
      position: "relative", overflow: "hidden",
    }}>
      {/* grid bg */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* corner brackets */}
      <div style={{ position: "absolute", top: 80, left: "clamp(16px,4vw,80px)", width: 60, height: 60 }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: 16, height: 16, borderTop: "1px solid rgba(255,107,0,0.4)", borderLeft: "1px solid rgba(255,107,0,0.4)" }} />
      </div>
      <div style={{ position: "absolute", bottom: 40, right: "clamp(16px,4vw,80px)", width: 60, height: 60 }}>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 16, height: 16, borderBottom: "1px solid rgba(255,107,0,0.4)", borderRight: "1px solid rgba(255,107,0,0.4)" }} />
      </div>

      {/* top status bar */}
      <div style={{
        position: "absolute", top: 80, left: 0, right: 0,
        padding: "8px clamp(16px,4vw,80px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid rgba(255,107,0,0.06)",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.4)", letterSpacing: "0.2em" }}>SYS:ORO/EXECUTION_LAYER/v2.4.1</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(0,255,136,0.4)", letterSpacing: "0.2em" }}>STATUS: OPERATIONAL</span>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60, paddingTop: 40 }}>
        {/* LEFT */}
        <div style={{ flex: 1, maxWidth: 620 }}>
          {/* eyebrow */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, background: "#FF6B00" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.25em" }}>
              AI-POWERED EXECUTION LAYER FOR CAPITAL
            </span>
          </motion.div>

          {/* main headline */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(72px, 10vw, 130px)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              marginBottom: 8,
            }}>
              <span style={{ color: "#fff", display: "block" }}>LESS</span>
              <span style={{ color: "#fff", display: "block" }}>DECISIONS.</span>
            </h1>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(72px, 10vw, 130px)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              marginBottom: 32,
              color: "#FF6B00",
              textShadow: "0 0 40px rgba(255,107,0,0.4)",
            }}>
              BETTER EXECUTION.
            </h1>
          </motion.div>

          {/* subtext */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16, color: "rgba(232,232,240,0.5)",
              lineHeight: 1.8, marginBottom: 40, maxWidth: 480,
            }}>
            ORO monitors, adapts, and executes strategies so your capital operates with structure — not instinct.
          </motion.p>

          {/* terminal */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
            style={{ marginBottom: 36 }}>
            <Terminal />
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            style={{ display: "flex", gap: 14 }}>
            <a href="https://app.getoro.xyz" target="_blank" rel="noreferrer" style={{
              background: "#FF6B00",
              color: "#fff",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700, fontSize: 12,
              padding: "14px 28px", borderRadius: 6,
              textDecoration: "none", letterSpacing: "0.1em",
              boxShadow: "0 0 24px rgba(255,107,0,0.4)",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(255,107,0,0.7)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(255,107,0,0.4)"; }}
            >LAUNCH APP ↗</a>
            <a href="#scenarios" style={{
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, padding: "14px 28px", borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.1)",
              textDecoration: "none", letterSpacing: "0.1em",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,0,0.4)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
            >SEE IT WORK →</a>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
          style={{ position: "relative", flexShrink: 0 }} className="hero-right">
          <OrbitRing />
          {/* data feed overlay */}
          <div style={{ position: "absolute", top: 0, right: -220, bottom: 0, width: 200, overflow: "hidden" }} className="data-feed-panel">
            <DataFeed />
          </div>
        </motion.div>
      </div>

      {/* bottom metrics strip */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          borderTop: "1px solid rgba(255,107,0,0.08)",
          padding: "16px clamp(16px,4vw,80px)",
          display: "flex", gap: 48, alignItems: "center",
          background: "rgba(5,5,8,0.6)", backdropFilter: "blur(10px)",
        }}>
        {[
          { label: "EXECUTION ACCURACY", value: "99.6", unit: "%" },
          { label: "AVG RESPONSE", value: "< 200", unit: "ms" },
          { label: "DAILY SCANS", value: "86,400", unit: "" },
          { label: "UPTIME", value: "99.98", unit: "%" },
        ].map((m) => (
          <div key={m.label} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#FF6B00", letterSpacing: 1 }}>{m.value}{m.unit}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>{m.label}</span>
          </div>
        ))}
      </motion.div>

      <style>{`
        @media(max-width:900px){ .hero-right{display:none!important} }
        @media(max-width:600px){ .data-feed-panel{display:none!important} }
      `}</style>
    </section>
  );
}
