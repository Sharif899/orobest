import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORO — Structured Capital Execution",
  description: "ORO monitors, adapts, and executes so your capital follows a structured system. 24/7.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
