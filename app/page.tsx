"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Scenarios from "@/components/sections/Scenarios";
import Simulation from "@/components/sections/Simulation";
import ExecutionLayer from "@/components/sections/ExecutionLayer";
import Comparison from "@/components/sections/Comparison";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.07 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Scenarios />
        <Simulation />
        <ExecutionLayer />
        <Comparison />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
