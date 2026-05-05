export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,107,0,0.08)",
      padding: "52px clamp(16px,4vw,80px) 32px",
      background: "rgba(5,5,8,0.98)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 36, marginBottom: 48 }}>
          {/* brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "linear-gradient(135deg, #FF6B00, #FF4500)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 16px rgba(255,107,0,0.3)",
              }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "#fff", letterSpacing: 1 }}>ORO</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "#fff", letterSpacing: 2, lineHeight: 1 }}>ORO</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,107,0,0.5)", letterSpacing: "0.2em" }}>EXECUTION LAYER</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", maxWidth: 240, lineHeight: 1.7 }}>
              AI-powered execution layer for capital. Structured. Precise. Always on.
            </p>
          </div>

          {/* links */}
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              {
                heading: "PRODUCT",
                items: [
                  ["HOW_IT_WORKS", "#how-it-works"],
                  ["SCENARIOS", "#scenarios"],
                  ["SIMULATION", "#simulation"],
                  ["FAQ", "#faq"],
                ],
              },
              {
                heading: "COMPANY",
                items: [
                  ["WEBSITE", "https://www.getoro.xyz"],
                  ["PRIVACY", "https://www.getoro.xyz/privacy-policy"],
                  ["TERMS", "https://www.getoro.xyz/terms-of-service"],
                  ["APP", "https://app.getoro.xyz"],
                ],
              },
            ].map(({ heading, items }) => (
              <div key={heading}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,107,0,0.4)", letterSpacing: "0.25em", marginBottom: 16 }}>
                  {heading}
                </div>
                {items.map(([label, href]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.08em", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF6B00")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.25)")}
                    >{label}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,107,0,0.06)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.15)", letterSpacing: "0.05em" }}>
            © 2026 MIDCENTURY_LABS_INC · ALL_RIGHTS_RESERVED
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FF88", boxShadow: "0 0 6px #00FF88" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(0,255,136,0.4)", letterSpacing: "0.15em" }}>ALL_SYSTEMS_OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
