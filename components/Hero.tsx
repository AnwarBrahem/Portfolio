"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TITLE_LINES = [
  "Industrial CS Student",
  "IoT Engineer",
  "Embedded Systems Dev",
  "Web Developer",
];

const SYSTEM_LINES = [
  "SYSTEM INIT...",
  "Loading kernel modules...",
  "Mounting /dev/anwar.brahem...",
  "ESP32 stack: ONLINE",
  "Raspberry Pi cluster: ONLINE",
  "Next.js runtime: ONLINE",
  "Portfolio ready.",
];

function useTypewriter(text: string, speed = 60) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
}

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine >= SYSTEM_LINES.length) return;
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, SYSTEM_LINES[currentLine]]);
      setCurrentLine((prev) => prev + 1);
    }, 300 + currentLine * 220);
    return () => clearTimeout(timer);
  }, [currentLine]);

  return (
    <div className="font-mono text-xs leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-text-dim select-none">{">"}</span>
          <span
            className={
              line.includes("ready")
                ? "text-green-400"
                : line.includes("ONLINE")
                ? "text-violet-glow"
                : "text-text-muted"
            }
          >
            {line}
          </span>
        </div>
      ))}
      {currentLine < SYSTEM_LINES.length && (
        <div className="flex items-center gap-2">
          <span className="text-text-dim">{">"}</span>
          <span className="text-text-muted">
            <span className="inline-block w-1.5 h-3 bg-violet-glow opacity-80 animate-pulse" />
          </span>
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const { displayed, done } = useTypewriter(TITLE_LINES[titleIndex], 55);

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => {
      setTitleIndex((i) => (i + 1) % TITLE_LINES.length);
    }, 2200);
    return () => clearTimeout(timer);
  }, [done]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-void opacity-60" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Scan line */}
      <div className="scan-line" />

      {/* Corner decorations */}
      <div className="absolute top-20 left-8 w-16 h-16 border-l border-t border-violet-border opacity-40" />
      <div className="absolute bottom-20 right-8 w-16 h-16 border-r border-b border-violet-border opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left column */}
        <div>
          {/* System tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mono-label mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-violet-glow opacity-60" />
            SYS://PORTFOLIO_v2.0
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono font-bold leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            <span
              className="glitch"
              data-text="ANWAR"
              style={{ color: "var(--text-primary)" }}
            >
              ANWAR
            </span>
            <br />
            <span style={{ color: "var(--violet-glow)" }}>BRAHEM</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-mono text-lg mb-2 h-8 flex items-center"
            style={{ color: "var(--plasma)" }}
          >
            <span className="text-text-dim mr-2">{">"}</span>
            {displayed}
            <span className="inline-block w-0.5 h-5 bg-plasma ml-0.5 animate-pulse" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-text-muted text-sm mb-8 max-w-md leading-relaxed"
          >
            2nd-year engineering student at ENETCOM Sfax, specialised in industrial
            computing and embedded systems. Building things that talk to the real world.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#projects" className="sci-btn">
              ./view_projects
            </a>
            <a
              href="mailto:anwarbrahem22@gmail.com"
              className="sci-btn"
              style={{ color: "var(--text-muted)" }}
            >
              ./contact_me
            </a>
            <a
              href="https://github.com/HLSnipey"
              target="_blank"
              rel="noopener noreferrer"
              className="sci-btn"
              style={{ color: "var(--text-muted)" }}
            >
              github ↗
            </a>
          </motion.div>

          {/* Location + status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-4 mt-8"
          >
            <span className="font-mono text-xs text-text-dim flex items-center gap-1.5">
              <span className="text-violet-glow">◉</span> Monastir, Tunisia
            </span>
            <span className="text-text-dim">·</span>
            <span className="font-mono text-xs text-text-dim flex items-center gap-1.5">
              <span className="text-green-400">◉</span> Open to internships
            </span>
          </motion.div>
        </div>

        {/* Right column — terminal */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glow-card corner-tl p-6"
          style={{ background: "rgba(13,13,26,0.8)" }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-violet-border">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="font-mono text-xs text-text-dim ml-3">
              anwar@enetcom:~$
            </span>
          </div>
          <Terminal />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-text-dim tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-violet-border to-transparent" />
      </motion.div>
    </section>
  );
}
