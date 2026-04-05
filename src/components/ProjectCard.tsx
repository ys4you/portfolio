import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="hover-lift group flex h-full flex-col overflow-hidden rounded-radius-card border border-border-subtle bg-bg-elevated"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-surface">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center font-mono text-xs text-text-muted">
              thumbnail
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-radius-pill bg-accent-subtle px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-accent uppercase">
              {project.category}
            </span>
            <span className="text-xs text-text-muted">{project.year}</span>
          </div>

          <h3 className="mb-1 text-lg font-bold transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mb-4 flex-1 text-sm text-text-secondary line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-radius-sm border border-border-subtle px-2 py-0.5 text-[11px] text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-border-subtle px-5 py-3">
          <ArrowUpRight
            size={16}
            className="text-text-muted transition-transform group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </Link>
    </motion.article>
  );
}
