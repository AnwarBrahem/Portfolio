"use client";

import { motion } from "framer-motion";

const LINKS = [
  { label: "email", value: "anwarbrahem22@gmail.com", href: "mailto:anwarbrahem22@gmail.com" },
  { label: "github", value: "github.com/AnwarBrahem", href: "https://github.com/AnwarBrahem" },
  { label: "linkedin", value: "linkedin.com/in/anwar-brahem", href: "https://linkedin.com/in/anwar-brahem" },
  { label: "location", value: "Monastir, Tunisia", href: null },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 border-t border-violet-border/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="mono-label mb-2">04 / contact</p>
          <h2 className="section-heading">Get In Touch</h2>
          <div className="w-16 h-px bg-violet-glow mt-3 opacity-60" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-text-muted leading-relaxed mb-8">
              I'm currently looking for a{" "}
              <span className="text-violet-glow">summer internship</span> in
              embedded systems, IoT, or web development. Whether you have an
              opportunity, a question, or just want to say hi — my inbox is open.
            </p>

            <div className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <div key={link.label} className="flex items-center gap-4">
                  <span className="font-mono text-xs w-20 text-text-dim">{link.label}</span>
                  <span className="w-px h-4 bg-violet-border" />
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-violet-glow hover:text-plasma transition-colors"
                    >
                      {link.value}
                    </a>
                  ) : (
                    <span className="font-mono text-sm text-text-muted">{link.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Status box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glow-card p-6"
          >
            <p className="mono-label mb-4">System Status</p>
            <div className="flex flex-col gap-3">
              {[
                { key: "availability", val: "OPEN — Summer 2026", ok: true },
                { key: "internship_type", val: "Embedded / IoT / Web", ok: true },
                { key: "location", val: "Tunisia + Remote", ok: true },
                { key: "response_time", val: "< 24 hours", ok: true },
              ].map((row) => (
                <div key={row.key} className="flex items-center gap-3">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${row.ok ? "bg-green-400" : "bg-red-400"}`}
                  />
                  <span className="font-mono text-xs text-text-dim w-36">{row.key}</span>
                  <span className="font-mono text-xs text-text-primary">{row.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 mt-24 pt-6 border-t border-violet-border/20 flex items-center justify-between">
        <p className="font-mono text-xs text-text-dim">
          © {new Date().getFullYear()} Anwar Brahem
        </p>
        <p className="font-mono text-xs text-text-dim">
          Built with Next.js · Supabase · Vercel
        </p>
      </div>
    </section>
  );
}
