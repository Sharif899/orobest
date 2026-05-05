"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const links = [
    { label: "HOW IT WORKS", href: "#how-it-works" },
    { label: "SCENARIOS", href: "#scenarios" },
    { label: "SIMULATION", href: "#simulation" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        background: scrolled ? "rgba(5,5,8,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,107,0,0.1)" : "1px solid transparent",
        transition: "all 0.5s ease",
        display: "flex", alignItems: "center",
        padding: "0 clamp(16px,4vw,48px)",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <a href="#home" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: "linear-gradient(135deg, #FF6B00, #FF4500)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 20px rgba(255,107,0,0.4)",
        }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#fff", letterSpacing: 1 }}>ORO</span>
        </div>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "#fff", letterSpacing: 2, lineHeight: 1 }}>ORO</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,107,0,0.6)", letterSpacing: "0.2em" }}>EXECUTION LAYER</div>
        </div>
      </a>

      {/* Center nav */}
      <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-desktop">
        {links.map((l) => (
          <a key={l.label} href={l.href} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10, fontWeight: 500,
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            letterSpacing: "0.15em",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF6B00")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
          >{l.label}</a>
        ))}
      </nav>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* live clock */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,107,0,0.5)", letterSpacing: "0.1em" }} className="nav-desktop">
          {time}
        </div>
        {/* status dot */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }} className="nav-desktop">
          <div style={{ position: "relative", width: 8, height: 8 }}>
            <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1px solid rgba(0,255,136,0.4)", animation: "pulse-ring 2s infinite" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FF88" }} />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(0,255,136,0.6)", letterSpacing: "0.15em" }}>LIVE</span>
        </div>
        <a href="https://app.getoro.xyz" target="_blank" rel="noreferrer" style={{
          background: "#FF6B00",
          color: "#fff",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700, fontSize: 11,
          padding: "9px 20px", borderRadius: 6,
          textDecoration: "none",
          letterSpacing: "0.1em",
          transition: "all 0.3s",
          boxShadow: "0 0 20px rgba(255,107,0,0.3)",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(255,107,0,0.6)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,107,0,0.3)"; }}
        >LAUNCH APP</a>
      </div>

      <style>{`
        @media(max-width:768px) { .nav-desktop { display: none !important; } }
      `}</style>
    </motion.header>
  );
}
