"use client";

import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    label: "Embedded & IoT",
    icon: "⚡",
    color: "text-orange-400",
    borderColor: "border-orange-500/20",
    skills: ["ESP32", "Arduino", "Raspberry Pi", "I2C", "MQTT", "WiFi", "KiCAD", "PCB Design"],
  },
  {
    label: "Programming",
    icon: "◈",
    color: "text-violet-glow",
    borderColor: "border-violet-border",
    skills: ["C / C++", "Python", "JavaScript", "TypeScript"],
  },
  {
    label: "Web Development",
    icon: "◻",
    color: "text-blue-400",
    borderColor: "border-blue-500/20",
    skills: ["Next.js", "React", "HTML / CSS", "Tailwind CSS", "Supabase", "AWS"],
  },
  {
    label: "Tools & Env",
    icon: "◆",
    color: "text-teal-400",
    borderColor: "border-teal-500/20",
    skills: ["Linux", "Git", "GitHub", "KiCAD", "AI / LLM APIs"],
  },
];

const LANGS = [
  { lang: "Arabic", level: "Native", pct: 100, color: "bg-violet-glow" },
  { lang: "French", level: "Intermediate", pct: 60, color: "bg-blue-500" },
  { lang: "English", level: "Intermediate", pct: 60, color: "bg-teal-500" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mono-label mb-2">02 / capabilities</p>
          <h2 className="section-heading">Technical Stack</h2>
          <div className="w-16 h-px bg-violet-glow mt-3 opacity-60" />
        </motion.div>

        {/* Skill groups */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, duration: 0.5 }}
              className={`glow-card p-5 border ${group.borderColor}`}
            >
              <div className={`font-mono text-lg mb-1 ${group.color}`}>{group.icon}</div>
              <h3 className={`font-mono text-sm font-medium mb-4 ${group.color}`}>
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      color: "var(--text-muted)",
                      background: "rgba(255,255,255,0.04)",
                      border: "0.5px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glow-card p-6 max-w-md"
        >
          <h3 className="font-mono text-sm font-medium mb-5 text-violet-glow">
            Languages
          </h3>
          <div className="flex flex-col gap-4">
            {LANGS.map((l) => (
              <div key={l.lang}>
                <div className="flex justify-between mb-1.5">
                  <span className="font-mono text-xs text-text-primary">{l.lang}</span>
                  <span className="font-mono text-xs text-text-dim">{l.level}</span>
                </div>
                <div className="h-1 bg-void-2 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${l.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${l.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
