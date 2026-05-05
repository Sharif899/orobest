"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const USERS = [
  {
    id: "trader",
    code: "PROFILE_001",
    role: "ACTIVE_TRADER",
    icon: "◆",
    color: "#FF6B00",
    name: "The Active Trader",
    pain: "Spends 3–5 hours daily monitoring positions. Makes reactive decisions under pressure. Misses overnight moves.",
    withOro: "Sets strategy once. ORO monitors all positions and executes rebalancing automatically — including overnight. Reviews logs instead of watching charts.",
    before: ["5h/day chart monitoring", "Reactive decisions", "Missed overnight moves", "Emotional exits during dips"],
    after: ["Strategy runs 24/7", "Reviews logs in 10 minutes", "Overnight execution covered", "Rules-based — no emotion"],
    metrics: [
      { label: "TIME_SAVED", value: "4.5h/day" },
      { label: "OVERNIGHT_COVERAGE", value: "100%" },
      { label: "EMOTIONAL_TRADES", value: "0" },
    ],
  },
  {
    id: "investor",
    code: "PROFILE_002",
    role: "LONG_TERM_INVESTOR",
    icon: "◉",
    color: "#00D4FF",
    name: "The Long-Term Investor",
    pain: "Has a strategy but can't maintain discipline during volatility. Re-evaluates constantly. Gets shaken out by noise.",
    withOro: "Strategy is defined and locked. ORO ignores noise and executes only when meaningful thresholds are met. Investor stops second-guessing.",
    before: ["Strategy exists but drifts", "Shaken by short-term noise", "Constant re-evaluation", "Inconsistent entries/exits"],
    after: ["Strategy enforced by rules", "Noise filtered by system", "Defined thresholds only", "Consistent execution logic"],
    metrics: [
      { label: "STRATEGY_DRIFT", value: "0%" },
      { label: "NOISE_FILTERED", value: "94%" },
      { label: "CONSISTENCY", value: "ENFORCED" },
    ],
  },
  {
    id: "professional",
    code: "PROFILE_003",
    role: "BUSY_PROFESSIONAL",
    icon: "◎",
    color: "#00FF88",
    name: "The Busy Professional",
    pain: "Has capital but no time. Checks portfolio sporadically. Misses windows. Doesn't trust automation but can't self-manage.",
    withOro: "Sets risk limits and strategy. ORO operates within those limits continuously. Reviews weekly performance summary. Capital works while they work.",
    before: ["Sporadic portfolio checks", "Missed execution windows", "Capital sitting idle", "No system, no consistency"],
    after: ["Automatic continuous execution", "No windows missed", "Capital always working", "Weekly review — 15 min"],
    metrics: [
      { label: "WEEKLY_REVIEW_TIME", value: "15 min" },
      { label: "MISSED_WINDOWS", value: "0" },
      { label: "CAPITAL_EFFICIENCY", value: "+38%" },
    ],
  },
];

export default function UseCases() {
  const [active, setActive] = useState("trader");
  const current = USERS.find((u) => u.id === active)!;

  return (
    <section id="use-cases" style={{
      padding: "120px clamp(16px,4vw,80px)",
      borderTop: "1px solid rgba(255,107,0,0.08)",
      position: "relative",
    }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.35 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="reveal" style={{ marginBottom: 52 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>// USE_CASES</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,6vw,80px)", letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9, marginBottom: 14 }}>
            REAL PEOPLE.<br /><span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>REAL SITUATIONS.</span>
          </h2>
        </div>

        {/* Profile selector */}
        <div className="reveal" style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {USERS.map((u) => (
            <button key={u.id} onClick={() => setActive(u.id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 20px", borderRadius: 8, cursor: "pointer",
              border: `1px solid ${active === u.id ? u.color + "44" : "rgba(255,255,255,0.07)"}`,
              background: active === u.id ? `${u.color}0C` : "transparent",
              transition: "all 0.25s",
            }}>
              <span style={{ fontSize: 16, color: active === u.id ? u.color : "rgba(255,255,255,0.2)" }}>{u.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: active === u.id ? u.color : "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>{u.code}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: active === u.id ? "#fff" : "rgba(255,255,255,0.4)" }}>{u.name}</div>
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="reveal"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {/* Left: before/after */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* pain point */}
              <div style={{ background: "rgba(5,5,8,0.95)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 10, padding: "22px" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#ef4444", letterSpacing: "0.15em", marginBottom: 12 }}>WITHOUT_ORO // PAIN_POINT</div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 16 }}>{current.pain}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {current.before.map((b) => (
                    <div key={b} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ color: "#ef4444", fontSize: 10, flexShrink: 0 }}>✕</span>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* with ORO */}
              <div style={{ background: "rgba(5,5,8,0.95)", border: `1px solid ${current.color}20`, borderRadius: 10, padding: "22px", flex: 1 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: current.color, letterSpacing: "0.15em", marginBottom: 12 }}>WITH_ORO // SOLUTION</div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 16 }}>{current.withOro}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {current.after.map((a) => (
                    <div key={a} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ color: "#00FF88", fontSize: 10, flexShrink: 0 }}>◆</span>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: metrics + role card */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* role header */}
              <div style={{
                background: `${current.color}0A`,
                border: `1px solid ${current.color}25`,
                borderRadius: 10, padding: "24px",
                display: "flex", alignItems: "center", gap: 16,
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `${current.color}15`, border: `1px solid ${current.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: current.color }}>
                  {current.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: current.color, letterSpacing: "0.15em", marginBottom: 4 }}>{current.role}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", letterSpacing: 0.5 }}>{current.name}</div>
                </div>
              </div>

              {/* metrics */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {current.metrics.map((m) => (
                  <div key={m.label} style={{
                    background: "rgba(5,5,8,0.95)",
                    border: "1px solid rgba(255,107,0,0.08)",
                    borderRadius: 10, padding: "18px 20px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>{m.label}</span>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: current.color, letterSpacing: 0.5 }}>{m.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a href="https://app.getoro.xyz" target="_blank" rel="noreferrer" style={{
                display: "block", textAlign: "center",
                background: "#FF6B00", color: "#fff",
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 12,
                padding: "16px", borderRadius: 8,
                textDecoration: "none", letterSpacing: "0.1em",
                boxShadow: "0 0 24px rgba(255,107,0,0.3)",
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(255,107,0,0.55)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(255,107,0,0.3)"; }}
              >
                START USING ORO ↗
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
