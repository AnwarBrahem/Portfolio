"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-void/80 backdrop-blur-md border-b border-violet-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-widest hover:text-violet-glow transition-colors"
          style={{ color: "var(--plasma)" }}
        >
          <span className="text-violet-glow">AB</span>
          <span className="text-text-dim mx-1">/</span>
          <span>anwar.brahem</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`glitch font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                active === link.href
                  ? "text-violet-glow"
                  : "text-text-muted hover:text-text-primary"
              }`}
              data-text={link.label}
              onClick={() => setActive(link.href)}
            >
              <span className="text-violet-glow opacity-50 mr-1">./</span>
              {link.label}
            </a>
          ))}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-mono text-xs text-text-dim">available</span>
        </div>
      </div>
    </nav>
  );
}
