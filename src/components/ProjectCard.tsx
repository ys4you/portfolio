import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  size?: "default" | "large";
}

export default function ProjectCard({ project, index, size = "default" }: ProjectCardProps) {
  const isLarge = size === "large";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <Link
        to={`/projects/${project.slug}`}
        className={`hover-lift group flex h-full overflow-hidden rounded-radius-card border border-border-subtle bg-bg-elevated ${
          isLarge ? "flex-col md:flex-row" : "flex-col"
        }`}
      >
        {/* Thumbnail */}
        <div
          className={`relative overflow-hidden bg-surface ${
            isLarge
              ? "aspect-video w-full md:aspect-auto md:w-1/2"
              : "aspect-video w-full"
          }`}
        >
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

        {/* Content */}
        <div className={`flex flex-1 flex-col ${isLarge ? "p-6 md:p-8" : "p-5"}`}>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-radius-pill bg-accent-subtle px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-accent uppercase">
              {project.category}
            </span>
            <span className="text-xs text-text-muted">{project.year}</span>
          </div>

          <h3
            className={`mb-2 font-bold transition-colors group-hover:text-accent ${
              isLarge ? "text-2xl md:text-3xl" : "text-lg"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`mb-4 flex-1 text-text-secondary ${
              isLarge ? "text-base line-clamp-4" : "text-sm line-clamp-2"
            }`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, isLarge ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-radius-sm border border-border-subtle px-2 py-0.5 text-[11px] text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-end pt-4">
            <ArrowUpRight
              size={isLarge ? 20 : 16}
              className="text-text-muted transition-transform group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}