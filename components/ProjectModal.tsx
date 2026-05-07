"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project, CATEGORY_COLORS } from "@/lib/types";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-void/90 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glow-card"
            style={{ background: "var(--void-1)" }}
          >
            {/* Scan line */}
            <div className="scan-line opacity-30" />

            {/* Header */}
            <div className="relative h-56 bg-void-2 overflow-hidden">
              {project.image_url ? (
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-grid-void">
                  <span className="font-mono text-6xl opacity-10 text-violet-glow">◈</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-void-1 via-transparent to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded border border-violet-border bg-void/70 backdrop-blur-sm font-mono text-sm text-text-muted hover:text-text-primary hover:border-violet-glow transition-all"
              >
                ✕
              </button>

              {/* Category */}
              <div className="absolute top-4 left-4">
                <span className={`font-mono text-xs px-2 py-0.5 rounded border backdrop-blur-sm ${CATEGORY_COLORS[project.category]}`}>
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* System path */}
              <p className="mono-label text-xs mb-2 opacity-70">
                /projects/{project.id.slice(0, 8)}
              </p>
              <h2 className="font-mono text-2xl font-medium text-text-primary mb-3">
                {project.title}
              </h2>

              <p className="text-text-muted leading-relaxed mb-6">
                {project.long_description || project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-violet-border mb-6" />

              {/* Links */}
              <div className="flex gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sci-btn flex items-center gap-2"
                  >
                    <span>github</span>
                    <span>↗</span>
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sci-btn flex items-center gap-2"
                    style={{ color: "var(--plasma)" }}
                  >
                    <span>live demo</span>
                    <span>↗</span>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="sci-btn ml-auto"
                  style={{ color: "var(--text-dim)" }}
                >
                  close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
