"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ── Capital Efficiency Calculator ── */
function CapitalEfficiency() {
  const [capital, setCapital] = useState(10000);
  const [months, setMonths] = useState(6);
  const inactiveMonths = Math.round(months * 0.35);
  const missedWeeks = inactiveMonths * 4.3;
  const weeklyBase = 0.004;
  const oroBoost = 0.009;
  const manualLost = Math.round(capital * missedWeeks * weeklyBase);
  const oroCapture = Math.round(capital * missedWeeks * (weeklyBase + oroBoost));
  const totalDiff = Math.round(capital * months * 4.3 * oroBoost);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.5)", letterSpacing: "0.15em", marginBottom: 8 }}>CAPITAL</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, borderBottom: "1px solid rgba(255,107,0,0.15)", paddingBottom: 8 }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#FF6B00" }}>$</span>
            <input type="number" value={capital} onChange={(e) => setCapital(Math.max(100, parseInt(e.target.value) || 100))}
              style={{ background: "transparent", border: "none", outline: "none", fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", width: "100%" }} />
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.5)", letterSpacing: "0.15em", marginBottom: 8 }}>MONTHS</div>
          <input type="range" min={1} max={24} value={months} onChange={(e) => setMonths(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: "#FF6B00", marginTop: 10 }} />
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#fff", textAlign: "center" }}>{months} MO</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "INACTIVE_PERIODS", value: `~${inactiveMonths} months`, sub: "35% of time — industry avg", color: "#ef4444" },
          { label: "MISSED_OPPORTUNITY", value: `$${manualLost.toLocaleString()}`, sub: "Lost from manual gaps", color: "#ef4444" },
          { label: "ORO_CAPTURE", value: `$${oroCapture.toLocaleString()}`, sub: "Captured by structured exec", color: "#00FF88" },
          { label: "EFFICIENCY_GAIN", value: `$${totalDiff.toLocaleString()}`, sub: `Over ${months} months`, color: "#FF6B00" },
        ].map((m) => (
          <div key={m.label} style={{ background: "rgba(5,5,8,0.9)", border: `1px solid ${m.color}18`, borderRadius: 8, padding: "14px 16px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: m.color, letterSpacing: 0.5 }}>{m.value}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{m.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Time Cost Analyzer ── */
function TimeCostAnalysis() {
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(50);
  const weeklyHours = hoursPerDay * 7;
  const monthlyHours = hoursPerDay * 30;
  const monthlyCost = Math.round(monthlyHours * hourlyRate);
  const yearCost = Math.round(monthlyCost * 12);
  const oroTime = 0.25;
  const timeSaved = Math.round((monthlyHours - oroTime * 30) * 10) / 10;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.5)", letterSpacing: "0.15em", marginBottom: 6 }}>HRS_MONITORING/DAY</div>
          <input type="range" min={0.5} max={8} step={0.5} value={hoursPerDay} onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#FF6B00" }} />
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#FF6B00", textAlign: "center" }}>{hoursPerDay}h</div>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.5)", letterSpacing: "0.15em", marginBottom: 6 }}>YOUR_HOURLY_RATE ($)</div>
          <input type="range" min={10} max={500} step={10} value={hourlyRate} onChange={(e) => setHourlyRate(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: "#FF6B00" }} />
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#FF6B00", textAlign: "center" }}>${hourlyRate}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {[
          { label: "MONTHLY_TIME_SPENT", value: `${monthlyHours}h`, color: "#ef4444" },
          { label: "MONTHLY_OPPORTUNITY_COST", value: `$${monthlyCost.toLocaleString()}`, color: "#ef4444" },
          { label: "YEARLY_COST_OF_MANUAL", value: `$${yearCost.toLocaleString()}`, color: "#ef4444" },
        ].map((m) => (
          <div key={m.label} style={{ background: "rgba(5,5,8,0.9)", border: `1px solid ${m.color}18`, borderRadius: 8, padding: "14px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 8, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#00FF88", letterSpacing: "0.1em", marginBottom: 4 }}>WITH_ORO_TIME_SAVED</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>ORO needs ~15min/week for review</div>
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#00FF88", textAlign: "right" }}>{timeSaved}h<br /><span style={{ fontSize: 14, color: "rgba(0,255,136,0.6)" }}>SAVED/MO</span></div>
      </div>
    </div>
  );
}

/* ── Risk vs Reward ── */
const STRATEGIES = [
  { name: "CONSERVATIVE", risk: 1, reward: 3, desc: "Stable yield focus, minimal volatility exposure", color: "#00D4FF" },
  { name: "BALANCED", risk: 2, reward: 6, desc: "Mixed positions, moderate risk/reward ratio", color: "#FF6B00" },
  { name: "AGGRESSIVE", risk: 4, reward: 12, desc: "Higher volatility, larger potential upside", color: "#ef4444" },
  { name: "ORO_STRUCTURED", risk: 1.5, reward: 8, desc: "Rules-based execution reduces risk, captures upside", color: "#00FF88" },
];

function RiskReward() {
  const [selected, setSelected] = useState("ORO_STRUCTURED");
  const current = STRATEGIES.find((s) => s.name === selected)!;
  const ratio = (current.reward / current.risk).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {STRATEGIES.map((s) => (
          <button key={s.name} onClick={() => setSelected(s.name)} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
            padding: "7px 14px", borderRadius: 6, cursor: "pointer",
            border: `1px solid ${selected === s.name ? s.color + "55" : "rgba(255,255,255,0.07)"}`,
            background: selected === s.name ? `${s.color}0F` : "transparent",
            color: selected === s.name ? s.color : "rgba(255,255,255,0.3)",
            transition: "all 0.2s", letterSpacing: "0.08em",
          }}>{s.name}</button>
        ))}
      </div>
      <div style={{ background: "rgba(5,5,8,0.9)", border: `1px solid ${current.color}25`, borderRadius: 10, padding: "20px" }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>{current.desc}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { label: "RISK_SCORE", value: `${current.risk}/5`, color: current.risk > 3 ? "#ef4444" : "#00FF88" },
            { label: "REWARD_POTENTIAL", value: `${current.reward}%/mo`, color: current.color },
            { label: "RISK/REWARD_RATIO", value: `1:${ratio}`, color: current.color },
          ].map((m) => (
            <div key={m.label} style={{ textAlign: "center", padding: "14px", background: "rgba(0,0,0,0.3)", borderRadius: 8 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>
        {/* risk/reward bar */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)" }}>RISK</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)" }}>REWARD</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(current.risk / 5) * 100}%`, background: "#ef4444", borderRadius: 3, transition: "width 0.5s" }} />
            <div style={{ position: "absolute", right: 0, top: 0, height: "100%", width: `${Math.min((current.reward / 15) * 100, 100)}%`, background: current.color, borderRadius: 3, transition: "width 0.5s", transformOrigin: "right" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */
const TABS = [
  { id: "capital", label: "CAPITAL_EFFICIENCY", icon: "◆" },
  { id: "time", label: "TIME_COST", icon: "◎" },
  { id: "risk", label: "RISK_VS_REWARD", icon: "◈" },
];

export default function PracticalAnalysis() {
  const [tab, setTab] = useState("capital");

  return (
    <section id="analysis" style={{
      padding: "120px clamp(16px,4vw,80px)",
      background: "rgba(7,7,11,0.9)",
      borderTop: "1px solid rgba(255,107,0,0.08)",
    }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="reveal" style={{ marginBottom: 52 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>// PRACTICAL_ANALYSIS</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,6vw,80px)", letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9, marginBottom: 14 }}>
            THE NUMBERS<br /><span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>DON'T LIE.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "rgba(232,232,240,0.4)", maxWidth: 460 }}>
            Real calculations. See exactly what manual execution costs you in time, capital, and opportunity.
          </p>
        </div>

        {/* tab selector */}
        <div className="reveal" style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              padding: "10px 20px", borderRadius: 6, cursor: "pointer",
              border: `1px solid ${tab === t.id ? "rgba(255,107,0,0.4)" : "rgba(255,255,255,0.07)"}`,
              background: tab === t.id ? "rgba(255,107,0,0.08)" : "transparent",
              color: tab === t.id ? "#FF6B00" : "rgba(255,255,255,0.3)",
              transition: "all 0.25s", letterSpacing: "0.1em",
            }}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        <div className="reveal" style={{
          background: "rgba(5,5,8,0.95)",
          border: "1px solid rgba(255,107,0,0.12)",
          borderRadius: 12, padding: "32px",
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.4)", letterSpacing: "0.2em", marginBottom: 24 }}>
            {TABS.find((t) => t.id === tab)?.label}_CALCULATOR
          </div>
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {tab === "capital" && <CapitalEfficiency />}
            {tab === "time" && <TimeCostAnalysis />}
            {tab === "risk" && <RiskReward />}
          </motion.div>
        </div>

        <div className="reveal" style={{ marginTop: 10, textAlign: "center" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.12)", letterSpacing: "0.15em" }}>
            ALL_CALCULATIONS_ILLUSTRATIVE · NOT_FINANCIAL_ADVICE
          </span>
        </div>
      </div>
    </section>
  );
}
