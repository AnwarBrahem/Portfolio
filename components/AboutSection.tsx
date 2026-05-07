"use client";

import { motion } from "framer-motion";

const TIMELINE = [
  {
    year: "2024 → now",
    title: "Cycle Ingénieur — Industrial CS",
    place: "ENETCOM, Sfax",
    color: "text-violet-glow",
  },
  {
    year: "Summer 2025",
    title: "Internship — Industrial Systems",
    place: "Hutchinson Tunisie, Sousse",
    note: "Designed a SoM PCB under KiCAD (schematic, routing, fab files)",
    color: "text-teal-400",
  },
  {
    year: "2022 → 2024",
    title: "Classes Préparatoires",
    place: "IPEIM, Monastir — Physics & Chemistry",
    color: "text-text-muted",
  },
  {
    year: "2022",
    title: "Baccalauréat — Informatique",
    place: "Monastir",
    color: "text-text-dim",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 border-t border-violet-border/30">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mono-label mb-2">01 / about</p>
          <h2 className="section-heading mb-6">Who I Am</h2>
          <div className="w-16 h-px bg-violet-glow mb-8 opacity-60" />

          <p className="text-text-muted leading-relaxed mb-4">
            I'm a 2nd-year engineering student at ENETCOM Sfax, specialised in{" "}
            <span className="text-violet-glow">industrial computing</span> and{" "}
            <span className="text-violet-glow">embedded systems</span>. I build things
            that bridge hardware and software — from multi-node IoT networks to full-stack
            web applications.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            When I'm not flashing firmware onto an ESP32 or routing PCB traces in KiCAD,
            I'm building web apps with Next.js and Supabase. Currently looking for a
            summer internship where I can contribute to real technical projects.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: "4+", label: "Projects" },
              { val: "3+", label: "Languages" },
              { val: "1", label: "Internship" },
            ].map((s) => (
              <div
                key={s.label}
                className="glow-card p-4 text-center"
              >
                <div
                  className="font-mono text-2xl font-bold mb-1"
                  style={{ color: "var(--violet-glow)" }}
                >
                  {s.val}
                </div>
                <div className="font-mono text-xs text-text-dim">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="mono-label mb-6">Education & Experience</p>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 top-2 bottom-2 w-px"
              style={{ background: "var(--border)" }}
            />

            <div className="flex flex-col gap-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="pl-6 relative"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-0.5 ${
                      i === 0 ? "bg-violet-glow" : i === 1 ? "bg-teal-400" : "bg-text-dim"
                    }`}
                    style={{ border: "2px solid var(--void)" }}
                  />
                  <p className="font-mono text-xs text-text-dim mb-1">{item.year}</p>
                  <p className={`font-mono text-sm font-medium ${item.color}`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">{item.place}</p>
                  {item.note && (
                    <p className="text-xs text-text-dim mt-1 italic">{item.note}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
