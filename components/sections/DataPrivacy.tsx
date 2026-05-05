"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LAYERS = [
  {
    id: "zktls",
    code: "LAYER_01",
    label: "zkTLS",
    title: "Zero-Knowledge TLS",
    color: "#00D4FF",
    icon: "🔑",
    tagline: "Prove data exists. Never reveal it.",
    body: "When your browser makes a secure HTTPS request, ORO's zkTLS layer intercepts the session cryptographically. It generates a mathematical proof that your data has certain properties — without ever extracting or copying the raw data itself. The proof is verifiable. The data is invisible.",
    steps: [
      { label: "BROWSER_REQUEST", desc: "You visit a site normally over HTTPS", status: "green" },
      { label: "ZK_PROOF_GENERATED", desc: "Cryptographic proof created from session", status: "orange" },
      { label: "DATA_STAYS_LOCAL", desc: "Raw data never leaves your device", status: "green" },
      { label: "PROOF_SUBMITTED", desc: "Only the proof is sent to ORO", status: "green" },
    ],
  },
  {
    id: "tee",
    code: "LAYER_02",
    label: "TEEs",
    title: "Trusted Execution Environments",
    color: "#00FF88",
    icon: "🛡",
    tagline: "Hardware-isolated secure compute.",
    body: "TEEs are physically isolated processors inside the server hardware. When your data is processed, it enters an encrypted enclave — a space that even ORO's own engineers cannot access. AI models train inside the enclave. Only improved model weights exit. Your personal data never does.",
    steps: [
      { label: "DATA_ENTERS_ENCLAVE", desc: "Encrypted before hitting server memory", status: "green" },
      { label: "ISOLATION_ENFORCED", desc: "Hardware walls — no external access", status: "green" },
      { label: "MODEL_TRAINS_INSIDE", desc: "AI learns inside the sealed environment", status: "orange" },
      { label: "WEIGHTS_EXIT_ONLY", desc: "Only improved model exits the enclave", status: "green" },
    ],
  },
  {
    id: "onchain",
    code: "LAYER_03",
    label: "On-Chain",
    title: "On-Chain Validation",
    color: "#FF6B00",
    icon: "⛓",
    tagline: "Transparent, trustless contribution tracking.",
    body: "Every data contribution and reward distribution is validated on-chain. There's no trust required — the blockchain enforces the rules. Your contribution is recorded, your points are allocated, and your token rewards are distributed according to immutable smart contract logic.",
    steps: [
      { label: "CONTRIBUTION_LOGGED", desc: "Your data activity is hashed and recorded", status: "green" },
      { label: "SMART_CONTRACT_TRIGGERS", desc: "Point allocation executed automatically", status: "orange" },
      { label: "REWARD_DISTRIBUTED", desc: "Tokens sent per contract rules", status: "green" },
      { label: "AUDIT_TRAIL_IMMUTABLE", desc: "Full history, publicly verifiable", status: "green" },
    ],
  },
];

const STATUS_COLOR: Record<string, string> = { green: "#00FF88", orange: "#FF6B00" };

export default function DataPrivacy() {
  const [active, setActive] = useState("zktls");
  const current = LAYERS.find((l) => l.id === active)!;

  return (
    <section id="privacy" style={{
      padding: "120px clamp(16px,4vw,80px)",
      borderTop: "1px solid rgba(255,107,0,0.08)",
      position: "relative",
    }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.35 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>// PRIVACY_ARCHITECTURE</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,6vw,80px)", letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9, marginBottom: 14 }}>
            PRIVACY<br /><span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>BY DESIGN.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "rgba(232,232,240,0.4)", maxWidth: 480 }}>
            Three technical layers ensure your data is never exposed — at any point in the process.
          </p>
        </div>

        {/* layer tabs */}
        <div className="reveal" style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {LAYERS.map((l) => (
            <button key={l.id} onClick={() => setActive(l.id)} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              padding: "10px 20px", borderRadius: 6, cursor: "pointer",
              border: `1px solid ${active === l.id ? l.color + "55" : "rgba(255,255,255,0.07)"}`,
              background: active === l.id ? `${l.color}10` : "transparent",
              color: active === l.id ? l.color : "rgba(255,255,255,0.3)",
              transition: "all 0.25s", letterSpacing: "0.12em",
            }}>
              <span style={{ opacity: 0.5 }}>{l.code} / </span>{l.label}
            </button>
          ))}
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Info panel */}
          <AnimatePresence mode="wait">
            <motion.div key={current.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              style={{
                background: "rgba(5,5,8,0.95)",
                border: `1px solid ${current.color}22`,
                borderRadius: 12, padding: "32px",
                boxShadow: `0 0 40px ${current.color}08`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: `${current.color}12`,
                  border: `1px solid ${current.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                }}>
                  {current.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: current.color, letterSpacing: 1 }}>{current.title}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{current.tagline}</div>
                </div>
              </div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(232,232,240,0.5)", lineHeight: 1.8 }}>
                {current.body}
              </p>
              <div style={{ marginTop: 20, padding: "14px 18px", borderRadius: 8, background: `${current.color}06`, border: `1px solid ${current.color}18` }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: current.color, letterSpacing: "0.15em", marginBottom: 6 }}>KEY_GUARANTEE</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                  {current.id === "zktls" && "Your raw data is mathematically impossible to extract from the proof."}
                  {current.id === "tee" && "Not even ORO engineers can access what's processed inside the enclave."}
                  {current.id === "onchain" && "Reward distribution is enforced by code, not by trust."}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step flow */}
          <AnimatePresence mode="wait">
            <motion.div key={current.id + "-steps"}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", marginBottom: 6 }}>PROCESS_FLOW</div>
              {current.steps.map((step, i) => (
                <motion.div key={step.label}
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 14,
                    padding: "14px 18px", borderRadius: 8,
                    background: "rgba(5,5,8,0.9)",
                    border: `1px solid ${STATUS_COLOR[step.status]}18`,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_COLOR[step.status], boxShadow: `0 0 6px ${STATUS_COLOR[step.status]}` }} />
                    {i < current.steps.length - 1 && <div style={{ width: 1, height: 20, background: `${STATUS_COLOR[step.status]}30` }} />}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: STATUS_COLOR[step.status], letterSpacing: "0.1em", marginBottom: 3 }}>{step.label}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{step.desc}</div>
                  </div>
                  <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: STATUS_COLOR[step.status], opacity: 0.7 }}>[OK]</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
