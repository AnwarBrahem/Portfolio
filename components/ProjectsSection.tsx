"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Project, ProjectCategory } from "@/lib/types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const FILTERS: Array<ProjectCategory | "All"> = [
  "All", "IoT", "Embedded", "Web", "AI", "Other",
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setProjects(data as Project[]);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = filter === "All"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 border-t border-violet-border/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="mono-label mb-2">03 / projects</p>
          <h2 className="section-heading">Selected Work</h2>
          <div className="w-16 h-px bg-violet-glow mt-3 opacity-60" />
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
                filter === f
                  ? "border-violet-glow text-violet-glow bg-violet-muted"
                  : "border-violet-border text-text-dim hover:border-violet-border hover:text-text-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="glow-card h-64 animate-pulse"
                style={{ background: "var(--void-2)" }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-mono text-text-dim text-sm">
              <span className="text-violet-glow">{">"}</span> No projects found.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
