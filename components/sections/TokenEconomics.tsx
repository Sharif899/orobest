"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ACTIVITIES = [
  { id: "social", label: "Social Accounts", icon: "◈", ppd: 45, color: "#00D4FF", desc: "Twitter, Instagram, LinkedIn" },
  { id: "health", label: "Health Data", icon: "◉", ppd: 80, color: "#00FF88", desc: "Wearables, fitness apps" },
  { id: "browsing", label: "Browsing Patterns", icon: "◎", ppd: 30, color: "#FF6B00", desc: "Anonymized web activity" },
  { id: "quests", label: "Daily Quests", icon: "◆", ppd: 60, color: "#FF6B00", desc: "In-app activities" },
  { id: "referral", label: "Referrals", icon: "▲", ppd: 25, color: "#00D4FF", desc: "Invite others to ORO" },
];

const TIERS = [
  { name: "EXPLORER", min: 0, max: 5000, color: "rgba(255,255,255,0.3)", perks: ["Base point rate", "Standard quests"] },
  { name: "CONTRIBUTOR", min: 5000, max: 20000, color: "#00D4FF", perks: ["1.5× multiplier", "Priority quests", "Early features"] },
  { name: "ARCHITECT", min: 20000, max: 60000, color: "#FF6B00", perks: ["2× multiplier", "Exclusive quests", "Token priority"] },
  { name: "SOVEREIGN", min: 60000, max: Infinity, color: "#00FF88", perks: ["3× multiplier", "Governance rights", "Max token allocation"] },
];

function useCountUp(target: number, active: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(e * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return v;
}

export default function TokenEconomics() {
  const [selected, setSelected] = useState<string[]>(["quests", "social"]);
  const [multiplier, setMultiplier] = useState(1.0);
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toggle = (id: string) => setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const dailyBase = ACTIVITIES.filter((a) => selected.includes(a.id)).reduce((s, a) => s + a.ppd, 0);
  const daily = Math.round(dailyBase * multiplier);
  const monthly = daily * 30;
  const currentTier = TIERS.findIndex((t) => monthly >= t.min && monthly < t.max);
  const displayMonthly = useCountUp(monthly, vis);

  return (
    <section id="token-economics" style={{
      padding: "120px clamp(16px,4vw,80px)",
      background: "rgba(7,7,11,0.9)",
      borderTop: "1px solid rgba(255,107,0,0.08)",
    }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3 }} />
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

        <div className="reveal" style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>// TOKEN_ECONOMICS</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,6vw,80px)", letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9, marginBottom: 14 }}>
            YOUR DATA.<br /><span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>YOUR POINTS.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "rgba(232,232,240,0.4)", maxWidth: 480 }}>
            Every data contribution earns ORO points. Points determine your token allocation. The more you contribute — the higher your tier.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Left: activity selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "rgba(5,5,8,0.95)", border: "1px solid rgba(255,107,0,0.12)", borderRadius: 12, padding: "24px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.5)", letterSpacing: "0.2em", marginBottom: 16 }}>SELECT_ACTIVITIES</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ACTIVITIES.map((a) => {
                  const on = selected.includes(a.id);
                  return (
                    <button key={a.id} onClick={() => toggle(a.id)} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", borderRadius: 8, cursor: "pointer",
                      background: on ? `${a.color}08` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${on ? a.color + "33" : "rgba(255,255,255,0.06)"}`,
                      transition: "all 0.25s",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 14, color: on ? a.color : "rgba(255,255,255,0.2)" }}>{a.icon}</span>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: on ? "#fff" : "rgba(255,255,255,0.4)" }}>{a.label}</div>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>{a.desc}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: on ? a.color : "rgba(255,255,255,0.15)" }}>+{a.ppd}</span>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${on ? a.color : "rgba(255,255,255,0.15)"}`, background: on ? a.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                          {on && <span style={{ color: "#000", fontSize: 10, fontWeight: 900 }}>✓</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Multiplier */}
            <div style={{ background: "rgba(5,5,8,0.95)", border: "1px solid rgba(255,107,0,0.12)", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.5)", letterSpacing: "0.2em" }}>ENGAGEMENT_MULTIPLIER</div>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#FF6B00" }}>{multiplier.toFixed(1)}×</span>
              </div>
              <input type="range" min={1} max={3} step={0.1} value={multiplier}
                onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#FF6B00", cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                {["1× BASE", "2× ACTIVE", "3× POWER"].map((l) => (
                  <span key={l} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)" }}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: output */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Monthly points */}
            <div style={{ background: "rgba(5,5,8,0.95)", border: "1px solid rgba(255,107,0,0.2)", borderRadius: 12, padding: "28px", boxShadow: "0 0 40px rgba(255,107,0,0.05)" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.5)", letterSpacing: "0.2em", marginBottom: 8 }}>MONTHLY_POINTS</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: "#FF6B00", letterSpacing: 1, lineHeight: 1, textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>
                {displayMonthly.toLocaleString()}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>ORO PTS / MONTH</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,107,0,0.08)" }}>
                {[["DAILY", daily.toLocaleString()], ["6-MONTH", (monthly * 6).toLocaleString()]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier progress */}
            <div style={{ background: "rgba(5,5,8,0.95)", border: "1px solid rgba(255,107,0,0.1)", borderRadius: 12, padding: "22px 24px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.5)", letterSpacing: "0.2em", marginBottom: 16 }}>TIER_STATUS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TIERS.map((t, i) => {
                  const isActive = i === currentTier;
                  const isPast = i < currentTier;
                  return (
                    <div key={t.name} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "10px 14px", borderRadius: 8,
                      background: isActive ? `${t.color}10` : "transparent",
                      border: `1px solid ${isActive ? t.color + "33" : "rgba(255,255,255,0.04)"}`,
                      transition: "all 0.4s",
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: isActive ? t.color : isPast ? t.color + "60" : "rgba(255,255,255,0.1)", boxShadow: isActive ? `0 0 8px ${t.color}` : "none" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: isActive ? t.color : isPast ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)", letterSpacing: 1 }}>{t.name}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>{t.perks.join(" · ")}</div>
                      </div>
                      {isActive && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.color, letterSpacing: "0.1em" }}>CURRENT</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
