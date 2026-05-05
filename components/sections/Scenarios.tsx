"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCENARIOS = [
  {
    id: "decisions",
    code: "SCN_001",
    label: "TOO_MANY_DECISIONS",
    manual: {
      title: "Constant reactive input",
      prompts: ["Adjust position now or wait?", "Price dropped 3% — re-evaluate?", "New signal — act or ignore?", "Is this the right time to move?", "Should I lock in gains now?"],
      summary: "Constant input. No continuity.",
    },
    oro: {
      title: "Strategy runs autonomously",
      log: [
        { text: "STRATEGY: LOADED", color: "#00FF88", status: "OK" },
        { text: "MONITOR: SCANNING", color: "#00D4FF", status: ".." },
        { text: "THRESHOLD: NOT_MET", color: "rgba(255,255,255,0.4)", status: "--" },
        { text: "ACTION: NONE_REQUIRED", color: "rgba(255,255,255,0.3)", status: "OK" },
      ],
      summary: "ORO follows your rules. You review — not react.",
    },
  },
  {
    id: "busy",
    code: "SCN_002",
    label: "BUSY_SCHEDULE",
    manual: {
      title: "Markets move, you can't respond",
      prompts: ["Missed a 4-hour window", "Price moved — no action taken", "Opportunity passed at 2:30am", "Volatility spike during your meeting", "Late response — slippage occurred"],
      summary: "Manual execution limited by your availability.",
    },
    oro: {
      title: "Execution doesn't need you present",
      log: [
        { text: "YOU: IN_MEETING", color: "rgba(255,255,255,0.3)", status: "--" },
        { text: "ORO: MONITORING_LIVE", color: "#00FF88", status: "OK" },
        { text: "EVENT: THRESHOLD_REACHED", color: "#FF6B00", status: "!!" },
        { text: "EXEC: POSITION_ADJUSTED", color: "#00FF88", status: "OK" },
      ],
      summary: "ORO acts when conditions are met.",
    },
  },
  {
    id: "flow",
    code: "SCN_003",
    label: "IRREGULAR_FLOW",
    manual: {
      title: "No consistent system",
      prompts: ["Gut feeling — buy now?", "Not sure — check again later", "Different strategy this week", "Skipped review — got busy", "Re-evaluating everything again"],
      summary: "No structure means inconsistent results.",
    },
    oro: {
      title: "Same logic applied every time",
      log: [
        { text: "RULES: CONSISTENT", color: "#00FF88", status: "OK" },
        { text: "EMOTION: REMOVED", color: "#00D4FF", status: "OK" },
        { text: "STRATEGY: MAINTAINED", color: "#00FF88", status: "OK" },
        { text: "DRIFT: ZERO", color: "#00FF88", status: "OK" },
      ],
      summary: "ORO applies the same rules every time.",
    },
  },
];

function ManualPanel({ prompts, active }: { prompts: string[]; active: boolean }) {
  const [visible, setVisible] = useState<number[]>([]);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!active) return;
    setVisible([]);
    let i = 0;
    timer.current = setInterval(() => {
      if (i >= prompts.length) { setVisible([]); i = 0; }
      else { setVisible((v) => [...v, i]); i++; }
    }, 700);
    return () => clearInterval(timer.current);
  }, [active, prompts]);

  return (
    <div style={{ minHeight: 240, display: "flex", flexDirection: "column", gap: 8 }}>
      {prompts.map((p, i) => (
        <AnimatePresence key={p}>
          {visible.includes(i) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 14px", borderRadius: 6,
                background: "rgba(239,68,68,0.05)",
                border: "1px solid rgba(239,68,68,0.12)",
              }}
            >
              <span style={{ color: "#ef4444", fontSize: 10 }}>⚠</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{p}</span>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

function OroPanel({ log, active }: { log: { text: string; color: string; status: string }[]; active: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!active) return;
    setIdx(0);
    const t = setInterval(() => setIdx((n) => (n + 1) % log.length), 1000);
    return () => clearInterval(t);
  }, [active, log]);

  return (
    <div style={{ minHeight: 240, display: "flex", flexDirection: "column", gap: 6 }}>
      {/* terminal header */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
        color: "rgba(255,107,0,0.4)", letterSpacing: "0.15em", marginBottom: 8,
        paddingBottom: 8, borderBottom: "1px solid rgba(255,107,0,0.1)",
      }}>
        ORO/SYSTEM/LOG — {new Date().toLocaleTimeString("en-US", { hour12: false })}
      </div>
      {log.map((l, i) => (
        <motion.div
          key={l.text}
          animate={{ opacity: idx === i ? 1 : 0.3, scale: idx === i ? 1 : 0.99 }}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "9px 14px", borderRadius: 6,
            background: idx === i ? "rgba(255,107,0,0.04)" : "transparent",
            border: `1px solid ${idx === i ? "rgba(255,107,0,0.15)" : "rgba(255,255,255,0.04)"}`,
            transition: "all 0.3s",
          }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
            color: l.status === "!!" ? "#FF6B00" : l.status === "OK" ? "#00FF88" : "rgba(255,255,255,0.25)",
            width: 20,
          }}>[{l.status}]</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: l.color, letterSpacing: "0.05em" }}>{l.text}</span>
          {idx === i && <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", animation: "blink 1s infinite" }}>█</span>}
        </motion.div>
      ))}
    </div>
  );
}

export default function Scenarios() {
  const [scene, setScene] = useState(0);
  const [focus, setFocus] = useState<"manual" | "oro">("manual");
  const current = SCENARIOS[scene];

  useEffect(() => {
    const t = setInterval(() => setFocus((f) => f === "manual" ? "oro" : "manual"), 4500);
    return () => clearInterval(t);
  }, [scene]);

  return (
    <section id="scenarios" style={{
      padding: "120px clamp(16px,4vw,80px)",
      background: "rgba(7,7,11,0.8)",
      borderTop: "1px solid rgba(255,107,0,0.08)",
      borderBottom: "1px solid rgba(255,107,0,0.08)",
      position: "relative",
    }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {/* header */}
        <div className="reveal" style={{ marginBottom: 52 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>
            // REAL_SCENARIOS
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px,6vw,80px)",
            letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9, marginBottom: 14,
          }}>
            SEE IT<br />
            <span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>IN ACTION.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "rgba(232,232,240,0.4)", maxWidth: 400 }}>
            From constant decisions to structured execution.
          </p>
        </div>

        {/* scenario selector */}
        <div className="reveal" style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
          {SCENARIOS.map((s, i) => (
            <button key={s.id} onClick={() => { setScene(i); setFocus("manual"); }} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              padding: "9px 18px", borderRadius: 6, cursor: "pointer",
              border: `1px solid ${scene === i ? "rgba(255,107,0,0.4)" : "rgba(255,255,255,0.08)"}`,
              background: scene === i ? "rgba(255,107,0,0.08)" : "transparent",
              color: scene === i ? "#FF6B00" : "rgba(255,255,255,0.3)",
              transition: "all 0.25s", letterSpacing: "0.1em",
            }}>
              <span style={{ opacity: 0.4 }}>{s.code} / </span>{s.label}
            </button>
          ))}
        </div>

        {/* comparison */}
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Manual */}
          <div
            onClick={() => setFocus("manual")}
            style={{
              padding: "28px",
              background: focus === "manual" ? "rgba(12,12,18,0.95)" : "rgba(7,7,11,0.5)",
              border: `1px solid ${focus === "manual" ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.05)"}`,
              borderRadius: 12, cursor: "pointer",
              opacity: focus === "oro" ? 0.45 : 1,
              transition: "all 0.4s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                padding: "5px 12px", borderRadius: 4,
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#ef4444", letterSpacing: "0.1em",
              }}>MANUAL</div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{current.manual.title}</span>
            </div>
            <ManualPanel key={scene + "-m"} prompts={current.manual.prompts} active={focus === "manual"} />
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              color: "rgba(255,255,255,0.2)", borderTop: "1px solid rgba(255,255,255,0.05)",
              paddingTop: 14, marginTop: 8, letterSpacing: "0.05em",
            }}>
              // {current.manual.summary}
            </div>
          </div>

          {/* ORO */}
          <div
            onClick={() => setFocus("oro")}
            style={{
              padding: "28px",
              background: focus === "oro" ? "rgba(12,12,18,0.95)" : "rgba(7,7,11,0.5)",
              border: `1px solid ${focus === "oro" ? "rgba(255,107,0,0.25)" : "rgba(255,107,0,0.08)"}`,
              borderRadius: 12, cursor: "pointer",
              opacity: focus === "manual" ? 0.45 : 1,
              transition: "all 0.4s ease",
              boxShadow: focus === "oro" ? "0 0 40px rgba(255,107,0,0.05)" : "none",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                padding: "5px 12px", borderRadius: 4,
                background: "rgba(255,107,0,0.1)",
                border: "1px solid rgba(255,107,0,0.3)",
                color: "#FF6B00", letterSpacing: "0.1em",
              }}>WITH_ORO</div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{current.oro.title}</span>
            </div>
            <OroPanel key={scene + "-o"} log={current.oro.log} active={focus === "oro"} />
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              color: "rgba(255,107,0,0.4)", borderTop: "1px solid rgba(255,107,0,0.1)",
              paddingTop: 14, marginTop: 8, letterSpacing: "0.05em",
            }}>
              // {current.oro.summary}
            </div>
          </div>
        </div>

        <div className="reveal" style={{ textAlign: "center", marginTop: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.15)", letterSpacing: "0.15em" }}>
            CLICK PANEL TO FOCUS · AUTO-CYCLES EVERY 4.5s
          </span>
        </div>
      </div>
    </section>
  );
}
