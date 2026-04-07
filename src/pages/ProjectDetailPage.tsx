import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Download, Users } from "lucide-react";
import SEO from "@/components/SEO";
import { PROJECTS } from "@/data/projects";
import { getProjectDetail } from "@/data/project-content";
import SectionRenderer from "@/components/project/SectionRenderer";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);
  const detail = slug ? getProjectDetail(slug) : undefined;

  // Find prev/next non-archived projects
  const activeProjects = PROJECTS.filter((p) => !p.archived);
  const currentIdx = activeProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIdx > 0 ? activeProjects[currentIdx - 1] : null;
  const nextProject = currentIdx < activeProjects.length - 1 ? activeProjects[currentIdx + 1] : null;

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <article className="section-gap">
      <SEO
        title={project.title}
        description={project.description}
        image={project.thumbnail || undefined}
        url={`https://yesseseijn.com/projects/${project.slug}`}
        type="article"
      />
      <div className="page-container max-w-4xl">
        {/* Back link */}
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} /> Back to projects
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* Cover image */}
          {project.thumbnail && (
            <div className="mb-8 aspect-video overflow-hidden rounded-radius-card border border-border-subtle bg-surface">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Title & meta */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-radius-pill bg-accent-subtle px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-accent uppercase">
              {project.category}
            </span>
            <span className="text-xs text-text-muted">{project.year}</span>
          </div>

          <h1 className="mb-3 text-3xl font-bold md:text-5xl">{project.title}</h1>
          <p className="mb-6 text-lg text-text-secondary">{project.description}</p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-radius-pill border border-border-subtle px-3 py-1 text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          {project.links && (
            <div className="mb-8 flex flex-wrap gap-3">
              {project.links.itch && (
                <a
                  href={project.links.itch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-radius-pill bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
                >
                  <Download size={14} /> Play on itch.io
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-radius-pill border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
                >
                  <ExternalLink size={14} /> View project
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-radius-pill border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
                >
                  Source code
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* Meta sidebar-style info */}
        {detail?.meta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4, ease: EASE }}
            className="mb-10 grid gap-4 rounded-radius-card border border-border-subtle bg-bg-elevated p-5 sm:grid-cols-3"
          >
            {detail.meta.role && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Role
                </p>
                <p className="text-sm text-text">{detail.meta.role}</p>
              </div>
            )}
            {detail.meta.duration && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Duration
                </p>
                <p className="text-sm text-text">{detail.meta.duration}</p>
              </div>
            )}
            {detail.meta.tools && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Tools
                </p>
                <p className="text-sm text-text">{detail.meta.tools}</p>
              </div>
            )}
            {detail.meta.team && (
              <div className="sm:col-span-3">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  <Users size={12} className="mr-1 inline" /> Team
                </p>
                <p className="text-sm text-text-secondary">
                  {detail.meta.team.join("  ·  ")}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Content sections */}
        {detail?.sections && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
            className="border-t border-border-subtle pt-8"
          >
            {detail.sections.map((section, i) => (
              <SectionRenderer key={i} section={section} />
            ))}
          </motion.div>
        )}

        {/* Bottom nav */}
        <div className="mt-16 border-t border-border-subtle pt-8">
          <div className="flex items-center justify-between">
            <div>
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.slug}`}
                  className="group flex items-center gap-2"
                >
                  <ArrowLeft
                    size={14}
                    className="text-text-muted transition-transform group-hover:-translate-x-1 group-hover:text-accent"
                  />
                  <div>
                    <p className="text-xs text-text-muted">Previous</p>
                    <p className="text-sm font-medium text-text-secondary transition-colors group-hover:text-accent">
                      {prevProject.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-accent"
                >
                  <ArrowLeft size={14} /> All projects
                </Link>
              )}
            </div>

            <div className="text-right">
              {nextProject && (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="group flex items-center gap-2"
                >
                  <div>
                    <p className="text-xs text-text-muted">Next</p>
                    <p className="text-sm font-medium text-text-secondary transition-colors group-hover:text-accent">
                      {nextProject.title}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}