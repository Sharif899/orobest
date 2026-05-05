"use client";
import { useEffect, useRef, useState } from "react";

const NODES = [
  { id: "monitor", label: "MONITOR", icon: "◉", x: 50, y: 10, color: "#00D4FF" },
  { id: "analyze", label: "ANALYZE", icon: "◎", x: 90, y: 50, color: "#FF6B00" },
  { id: "decide", label: "DECIDE", icon: "◈", x: 50, y: 90, color: "#00FF88" },
  { id: "execute", label: "EXECUTE", icon: "◆", x: 10, y: 50, color: "#FF6B00" },
];
const EDGES = [
  { from: "monitor", to: "analyze" },
  { from: "analyze", to: "decide" },
  { from: "decide", to: "execute" },
  { from: "execute", to: "monitor" },
];

export default function ExecutionLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState(0);
  const [vis, setVis] = useState(false);
  const secRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (secRef.current) obs.observe(secRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!vis) return;
    const t = setInterval(() => setActiveNode((n) => (n + 1) % NODES.length), 1100);
    return () => clearInterval(t);
  }, [vis]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !vis) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    let t = 0, frame: number;

    const getPos = (node: typeof NODES[0]) => ({
      x: (node.x / 100) * W,
      y: (node.y / 100) * H,
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      EDGES.forEach(({ from, to }, ei) => {
        const a = NODES.find((n) => n.id === from)!;
        const b = NODES.find((n) => n.id === to)!;
        const pa = getPos(a), pb = getPos(b);

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = "rgba(255,107,0,0.1)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // packet
        const prog = ((t * 0.35 + ei * 0.25) % 1);
        const px = pa.x + (pb.x - pa.x) * prog;
        const py = pa.y + (pb.y - pa.y) * prog;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,107,0,0.8)";
        ctx.fill();
      });

      t += 0.007;
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [vis]);

  const metrics = [
    { k: "RESPONSE_TIME", v: "< 200ms" },
    { k: "DAILY_SCANS", v: "86,400" },
    { k: "ACCURACY", v: "99.6%" },
    { k: "UPTIME", v: "99.98%" },
  ];

  return (
    <section ref={secRef} style={{
      padding: "120px clamp(16px,4vw,80px)",
      background: "rgba(7,7,11,0.8)",
      borderTop: "1px solid rgba(255,107,0,0.08)",
      borderBottom: "1px solid rgba(255,107,0,0.08)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 60 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FF6B00", letterSpacing: "0.3em", marginBottom: 16 }}>
            // EXECUTION_LAYER
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px,6vw,80px)",
            letterSpacing: "0.02em", color: "#fff", lineHeight: 0.9,
          }}>
            THE MACHINE<br />
            <span style={{ color: "#FF6B00", textShadow: "0 0 30px rgba(255,107,0,0.3)" }}>NEVER SLEEPS.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
          {/* Canvas diagram */}
          <div className="reveal" style={{
            position: "relative", height: 360,
            background: "rgba(5,5,8,0.95)",
            border: "1px solid rgba(255,107,0,0.1)",
            borderRadius: 12, overflow: "hidden",
          }}>
            <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
            <canvas ref={canvasRef} width={480} height={360}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: vis ? 1 : 0, transition: "opacity 1s" }}
            />
            {NODES.map((node, i) => {
              const isActive = activeNode === i;
              return (
                <div key={node.id} style={{
                  position: "absolute",
                  left: `${node.x}%`, top: `${node.y}%`,
                  transform: "translate(-50%,-50%)",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                  zIndex: 2,
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: isActive ? `${node.color}18` : "rgba(5,5,8,0.95)",
                    border: `1px solid ${isActive ? node.color + "55" : "rgba(255,255,255,0.07)"}`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                    transition: "all 0.4s",
                    boxShadow: isActive ? `0 0 20px ${node.color}33` : "none",
                  }}>
                    <span style={{ fontSize: 14, color: isActive ? node.color : "rgba(255,255,255,0.2)", transition: "color 0.4s" }}>{node.icon}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, color: isActive ? node.color : "rgba(255,255,255,0.2)", letterSpacing: "0.05em", transition: "color 0.4s" }}>{node.label}</span>
                  </div>
                </div>
              );
            })}
            {/* center ORO */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: 56, height: 56, borderRadius: 12,
              background: "rgba(255,107,0,0.08)",
              border: "1px solid rgba(255,107,0,0.3)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 30px rgba(255,107,0,0.15)",
            }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#FF6B00", letterSpacing: 1 }}>ORO</span>
            </div>
          </div>

          {/* Metrics */}
          <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* active node callout */}
            <div style={{
              background: "rgba(5,5,8,0.95)",
              border: "1px solid rgba(255,107,0,0.2)",
              borderRadius: 10, padding: "20px 22px",
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", marginBottom: 10 }}>ACTIVE_PROCESS</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24, color: NODES[activeNode].color }}>{NODES[activeNode].icon}</span>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#FF6B00", letterSpacing: 1 }}>{NODES[activeNode].label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
                    {["Real-time market scanning", "Risk & opportunity scoring", "AI-driven strategy update", "Precision trade execution"][activeNode]}
                  </div>
                </div>
              </div>
            </div>

            {/* metrics grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {metrics.map((m) => (
                <div key={m.k} style={{
                  background: "rgba(5,5,8,0.9)",
                  border: "1px solid rgba(255,107,0,0.08)",
                  borderRadius: 10, padding: "18px 18px",
                }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", letterSpacing: 0.5, marginBottom: 4 }}>{m.v}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.4)", letterSpacing: "0.1em" }}>{m.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
