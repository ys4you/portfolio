import { useState, useMemo } from "react";
import { X, Archive } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    tags: ["C#", "C++", "JavaScript", "PHP"],
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
      "MySQL",
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
        description="Games, tools, and web apps I've built over the years."
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

        {/* Grouped tag filters - sorted shortest row first */}
        <div className="mb-10 space-y-3">
          {TAG_GROUPS
            .map((group) => ({
              ...group,
              visible: group.tags.filter((t) => availableTags.has(t)),
            }))
            .filter((g) => g.visible.length > 0)
            .sort((a, b) => a.visible.length - b.visible.length)
            .map((group) => (
              <motion.div
                key={group.label}
                layout
                className="flex flex-wrap items-center gap-2"
              >
                <span className="w-20 shrink-0 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  {group.label}
                </span>
                <AnimatePresence>
                  {group.visible.map((tag) => (
                    <motion.button
                      key={tag}
                      layout
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => toggleTag(tag)}
                      className={`rounded-radius-pill px-3 py-1 text-xs font-medium transition-colors ${
                        activeTags.has(tag)
                          ? "bg-accent/15 text-accent border border-accent/30"
                          : "border border-border-subtle text-text-muted hover:text-text-secondary hover:border-border"
                      }`}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            ))}

          <AnimatePresence>
            {activeTags.size > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 overflow-hidden pt-1"
              >
                <span className="w-20 shrink-0" />
                <button
                  onClick={clearTags}
                  className="inline-flex items-center gap-1 rounded-radius-pill px-3 py-1 text-xs font-medium text-text-muted transition-colors hover:text-accent"
                >
                  <X size={12} /> Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            isArchive ? (
              <motion.div
                key={`archive-${activeTags.size}-${category}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`grid-${activeTags.size}-${category}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <BentoGrid projects={filtered} />
              </motion.div>
            )
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="py-20 text-center"
            >
              <p className="text-text-muted">No projects match these filters.</p>
              <button
                onClick={clearTags}
                className="mt-2 text-sm text-accent transition-colors hover:text-accent-hover"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}