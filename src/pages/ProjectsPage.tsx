import { useState, useMemo } from "react";
import { X, Archive } from "lucide-react";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import BentoGrid from "@/components/BentoGrid";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

type CategoryFilter = "all" | "game" | "web" | "software" | "archive";

// Tag categories for grouped filtering
const TAG_GROUPS: { label: string; tags: string[] }[] = [
  {
    label: "Language",
    tags: ["C#", "C++", "JavaScript"],
  },
  {
    label: "Context",
    tags: ["School", "Work", "Internship"],
  },
  {
    label: "Technology",
    tags: [
      "Unity",
      "Canvas Engine",
      "Tmpl8",
      "Ray Tracing",
      "Voxels",
      "SIMD",
      "FSM",
      "Procedural Generation",
      "Tree-sitter",
      "VS Code",
      "DSL",
      "Game Jam",
    ],
  },
];

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

  // Get tags that exist in the current pool
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    basePool.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return tags;
  }, [basePool]);

  // Filter by tags (AND within same group, OR across groups)
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
      <SEO
        title="Projects"
        description="A selection of games, tools, and applications built by Yesse Seijnaeve."
      />
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
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", "game", "web", "software"] as const).map((f) => (
            <button
              key={f}
              onClick={() => handleCategoryChange(f)}
              className={`rounded-radius-pill px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                category === f
                  ? "bg-accent text-bg"
                  : "border border-border-subtle text-text-secondary hover:text-text"
              }`}
            >
              {f === "all"
                ? "All"
                : f === "game"
                ? "Games"
                : f === "web"
                ? "Web"
                : "Software"}
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

        {/* Grouped tag filters */}
        <div className="mb-10 space-y-3">
          {TAG_GROUPS.map((group) => {
            // Only show tags that exist in the current pool
            const visibleTags = group.tags.filter((t) => availableTags.has(t));
            if (visibleTags.length === 0) return null;

            return (
              <div key={group.label} className="flex flex-wrap items-center gap-2">
                <span className="w-20 shrink-0 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  {group.label}
                </span>
                {visibleTags.map((tag) => (
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
              </div>
            );
          })}

          {activeTags.size > 0 && (
            <div className="flex items-center gap-2 pt-1">
              <span className="w-20 shrink-0" />
              <button
                onClick={clearTags}
                className="inline-flex items-center gap-1 rounded-radius-pill px-3 py-1 text-xs font-medium text-text-muted transition-colors hover:text-accent"
              >
                <X size={12} /> Clear all filters
              </button>
            </div>
          )}
        </div>

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