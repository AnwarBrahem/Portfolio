"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project, CATEGORY_COLORS } from "@/lib/types";

interface Props {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="glow-card cursor-pointer group h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 bg-void-2 overflow-hidden">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-void-2">
            <div className="text-center">
              <div className="font-mono text-4xl opacity-10 text-violet-glow mb-2">◈</div>
              <div className="font-mono text-xs text-text-dim tracking-widest">
                {project.category.toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* Scan effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(167,139,250,0.03) 50%, transparent 100%)",
          }}
        />

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`font-mono text-xs px-2 py-0.5 rounded border backdrop-blur-sm ${
              CATEGORY_COLORS[project.category]
            }`}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Corner decoration */}
        <div className="flex items-start justify-between mb-3">
          <h3
            className="font-mono text-base font-medium text-text-primary group-hover:text-violet-glow transition-colors"
          >
            {project.title}
          </h3>
          <span className="text-text-dim group-hover:text-violet-glow transition-colors text-lg ml-2 leading-none">
            ↗
          </span>
        </div>

        <p className="text-sm text-text-muted leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag-pill opacity-50">+{project.tags.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
