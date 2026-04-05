import { useState, useMemo } from "react";
import { X, Archive } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BentoGrid from "@/components/BentoGrid";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

type CategoryFilter = "all" | "game" | "web" | "archive";

export default function ProjectsPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const isArchive = category === "archive";

  // Base pool depending on category
  const basePool = useMemo(() => {
    if (isArchive) return PROJECTS.filter((p) => p.archived);
    const active = PROJECTS.filter((p) => !p.archived);
    if (category === "all") return active;
    return active.filter((p) => p.category === category);
  }, [category, isArchive]);

  // Get all unique tags from the base pool
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    basePool.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [basePool]);

  // Filter by tags
  const filtered = useMemo(() => {
    if (activeTags.size === 0) return basePool;
    return basePool.filter((p) => p.tags.some((t) => activeTags.has(t)));
  }, [basePool, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function clearTags() {
    setActiveTags(new Set());
  }

  function handleCategoryChange(cat: CategoryFilter) {
    setCategory(cat);
    setActiveTags(new Set());
  }

  return (
    <section className="section-gap">
      <div className="page-container">
        <PageHeader
          title={isArchive ? "Archive" : "Projects"}
          accent="."
          subtitle={
            isArchive
              ? "Older projects from earlier in my journey."
              : "A selection of games, tools, and applications I've built."
          }
        />

        {/* Category filter */}
        <div className="mb-4 flex flex-wrap gap-2">
          {(["all", "game", "web"] as const).map((f) => (
            <button
              key={f}
              onClick={() => handleCategoryChange(f)}
              className={`rounded-radius-pill px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                category === f
                  ? "bg-accent text-bg"
                  : "border border-border-subtle text-text-secondary hover:text-text"
              }`}
            >
              {f === "all" ? "All" : f === "game" ? "Games" : "Web"}
            </button>
          ))}

          <span className="mx-1 self-center text-border">|</span>

          <button
            onClick={() => handleCategoryChange("archive")}
            className={`inline-flex items-center gap-1.5 rounded-radius-pill px-4 py-1.5 text-sm font-medium transition-colors ${
              isArchive
                ? "bg-accent text-bg"
                : "border border-border-subtle text-text-muted hover:text-text-secondary"
            }`}
          >
            <Archive size={13} /> Archive
          </button>
        </div>

        {/* Tag filter */}
        {allTags.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-radius-pill px-3 py-1 text-xs font-medium transition-colors ${
                  activeTags.has(tag)
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "border border-border-subtle text-text-muted hover:text-text-secondary hover:border-border"
                }`}
              >
                {tag}
              </button>
            ))}

            {activeTags.size > 0 && (
              <button
                onClick={clearTags}
                className="inline-flex items-center gap-1 rounded-radius-pill px-3 py-1 text-xs font-medium text-text-muted transition-colors hover:text-accent"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {filtered.length > 0 ? (
          isArchive ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <BentoGrid projects={filtered} />
          )
        ) : (
          <div className="py-20 text-center">
            <p className="text-text-muted">No projects match these filters.</p>
            <button
              onClick={clearTags}
              className="mt-2 text-sm text-accent transition-colors hover:text-accent-hover"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}