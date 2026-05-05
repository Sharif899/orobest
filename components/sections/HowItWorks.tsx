"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    code: "SET_STRATEGY",
    icon: "◎",
    title: "You Set the Rules",
    body: "Define your goals, risk limits, and approach once. ORO takes your parameters and applies them as the operating system for your capital.",
    tags: ["Risk tolerance", "Target logic", "One-time setup"],
    color: "#00D4FF",
  },
  {
    num: "02",
    code: "MONITOR",
    icon: "◉",
    title: "ORO Watches Everything",
    body: "Every signal. Every price movement. Every on-chain data point — scanned 24 hours a day, without pause, without fatigue.",
    tags: ["Real-time signals", "On-chain data", "24/7 uptime"],
    color: "#FF6B00",
  },
  {
    num: "03",
    code: "ADAPT",
    icon: "◈",
    title: "Strategies Adjust in Real Time",
    body: "When conditions shift, ORO rebalances within your defined boundaries — automatically. No manual input. No delay.",
    tags: ["Auto-rebalancing", "Risk controls", "No emotion"],
    color: "#00FF88",
  },
  {
    num: "04",
    code: "EXECUTE",
    icon: "◆",
    title: "Precision Execution",
    body: "Trades execute on optimized routes. Minimal slippage. Maximum efficiency. Every action logged and auditable.",
    tags: ["Best routing", "Low slippage", "Full audit log"],
    color: "#FF6B00",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="how-it-works" style={{
      padding: "120px clamp(16px,4vw,80px)",
      position: "relative",
      borderTop: "1px solid rgba(255,107,0,0.08)",
    }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {/* header */}
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>
              // HOW_IT_WORKS
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px,6vw,80px)",
              letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9,
            }}>
              FOUR STEPS.<br />
              <span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>ZERO NOISE.</span>
            </h2>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textAlign: "right",
          }}>
            SYSTEM PROCESS<br />
            <span style={{ color: "rgba(255,107,0,0.4)" }}>SEQUENTIAL_EXECUTION</span>
          </div>
        </div>

        {/* steps grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              className="reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
              whileHover={{ y: -6 }}
            >
              <div style={{
                background: active === i ? "rgba(12,12,18,0.95)" : "rgba(7,7,11,0.8)",
                border: `1px solid ${active === i ? s.color + "33" : "rgba(255,107,0,0.1)"}`,
                borderRadius: 12,
                padding: "28px 24px",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "default",
              }}>
                {/* top accent line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: active === i ? `linear-gradient(90deg, transparent, ${s.color}, transparent)` : "transparent",
                  transition: "all 0.3s",
                }} />

                {/* step number + icon */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 52,
                    color: active === i ? s.color + "30" : "rgba(255,107,0,0.08)",
                    lineHeight: 1, transition: "color 0.3s",
                  }}>{s.num}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, color: s.color, marginBottom: 2 }}>{s.icon}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>{s.code}</div>
                  </div>
                </div>

                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: 18, color: active === i ? "#fff" : "rgba(255,255,255,0.85)",
                  marginBottom: 10, letterSpacing: -0.3, transition: "color 0.3s",
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13, color: "rgba(232,232,240,0.4)",
                  lineHeight: 1.75, marginBottom: 20,
                }}>
                  {s.body}
                </p>

                {/* tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.tags.map((t) => (
                    <span key={t} style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9, padding: "4px 10px", borderRadius: 4,
                      background: "rgba(255,107,0,0.06)",
                      border: "1px solid rgba(255,107,0,0.12)",
                      color: "rgba(255,107,0,0.6)",
                      letterSpacing: "0.05em",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
