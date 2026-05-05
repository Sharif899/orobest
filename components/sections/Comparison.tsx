"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WITHOUT = [
  { icon: "✕", text: "Check charts manually every few hours", c: "#ef4444" },
  { icon: "✕", text: "Miss opportunities while you sleep", c: "#ef4444" },
  { icon: "✕", text: "Emotional decisions during volatility", c: "#ef4444" },
  { icon: "✕", text: "Positions stall when you're unavailable", c: "#ef4444" },
  { icon: "✕", text: "High slippage from delayed execution", c: "#ef4444" },
  { icon: "✕", text: "Inconsistent strategy, pure instinct", c: "#ef4444" },
];

const WITH = [
  { icon: "◆", text: "AI monitors 24/7 — no manual checking", c: "#00FF88" },
  { icon: "◆", text: "Opportunities captured automatically", c: "#00FF88" },
  { icon: "◆", text: "Rules-based decisions, zero emotion", c: "#00FF88" },
  { icon: "◆", text: "Execution continues while you're away", c: "#00FF88" },
  { icon: "◆", text: "Optimized routing, minimal slippage", c: "#00FF88" },
  { icon: "◆", text: "Consistent logic applied every time", c: "#00FF88" },
];

export default function Comparison() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ padding: "120px clamp(16px,4vw,80px)", position: "relative" }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="reveal" style={{ marginBottom: 60 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>
            // COMPARE
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px,6vw,80px)",
            letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9,
          }}>
            MANUAL VS.<br />
            <span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>STRUCTURED.</span>
          </h2>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Without */}
          <div style={{
            background: "rgba(7,7,11,0.8)",
            border: "1px solid rgba(239,68,68,0.1)",
            borderRadius: 12, padding: "32px 28px",
            opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{
                padding: "5px 14px", borderRadius: 5,
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#ef4444", letterSpacing: "0.1em",
              }}>WITHOUT_ORO</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {WITHOUT.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -14 }}
                  animate={vis ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", borderRadius: 6, background: "rgba(239,68,68,0.03)", border: "1px solid rgba(239,68,68,0.07)" }}
                >
                  <span style={{ color: "#ef4444", fontSize: 12, marginTop: 1, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* With ORO */}
          <div style={{
            background: "rgba(7,7,11,0.8)",
            border: "1px solid rgba(255,107,0,0.15)",
            borderRadius: 12, padding: "32px 28px",
            opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
            boxShadow: "0 0 40px rgba(255,107,0,0.04)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{
                padding: "5px 14px", borderRadius: 5,
                background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.1em",
              }}>WITH_ORO</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {WITH.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 14 }}
                  animate={vis ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", borderRadius: 6, background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.07)" }}
                >
                  <span style={{ color: "#00FF88", fontSize: 12, marginTop: 1, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
