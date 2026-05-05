"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    code: "FAQ_001",
    q: "What does ORO actually do?",
    a: "ORO is an execution layer for capital. You define a strategy — your goals, risk tolerance, and position rules — and ORO applies it continuously. It monitors market conditions, adjusts positions when defined thresholds are met, and executes with precision. Every action is logged and auditable.",
  },
  {
    code: "FAQ_002",
    q: "Do I still make decisions?",
    a: "Yes — the important ones. You decide your strategy, risk parameters, and when to change course. What ORO removes is the reactive decision-making: constant checking, timing pressure, and the 'should I act now?' loop. You set the framework. ORO operates within it.",
  },
  {
    code: "FAQ_003",
    q: "Is this automated or structured execution?",
    a: "Structured execution. The distinction matters: automated can mean blind. ORO executes within the rules you've defined — it doesn't deviate. Every action is rule-based and auditable. You always know what ORO is doing and why.",
  },
  {
    code: "FAQ_004",
    q: "Who is this for?",
    a: "Anyone who wants capital to follow a consistent system over reactive decisions. This includes people who can't monitor markets constantly, those who make emotional or inconsistent decisions, and anyone applying a long-term strategy without managing it daily.",
  },
  {
    code: "FAQ_005",
    q: "What happens during high volatility?",
    a: "ORO's risk controls activate based on your pre-set parameters. It doesn't panic or override your strategy — it operates within your defined risk boundaries. You set the limits; ORO enforces them even when markets move fast.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{
      padding: "120px clamp(16px,4vw,80px)",
      background: "rgba(7,7,11,0.8)",
      borderTop: "1px solid rgba(255,107,0,0.08)",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>
            // FAQ
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px,6vw,80px)",
            letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9,
          }}>
            REAL QUESTIONS.<br />
            <span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>CLEAR ANSWERS.</span>
          </h2>
        </div>

        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: open === i ? "rgba(12,12,18,0.95)" : "rgba(7,7,11,0.6)",
              border: `1px solid ${open === i ? "rgba(255,107,0,0.2)" : "rgba(255,255,255,0.05)"}`,
              borderRadius: 10, overflow: "hidden",
              transition: "all 0.3s ease",
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "18px 22px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.35)", letterSpacing: "0.1em", flexShrink: 0 }}>{faq.code}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: open === i ? "#fff" : "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: open === i ? "#FF6B00" : "rgba(255,255,255,0.2)", fontSize: 20, flexShrink: 0 }}
                >+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div style={{ padding: "0 22px 20px 22px", paddingLeft: "calc(22px + 14px + 52px)" }}>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(232,232,240,0.5)", lineHeight: 1.8 }}>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
