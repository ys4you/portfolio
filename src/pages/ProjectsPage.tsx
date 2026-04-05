import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

type Filter = "all" | "game" | "web";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="section-gap">
      <div className="page-container">
        <PageHeader
          title="Projects"
          accent="."
          subtitle="A selection of games, tools, and applications I've built."
        />

        <div className="mb-10 flex gap-2">
          {(["all", "game", "web"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-radius-pill px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-accent text-bg"
                  : "border border-border-subtle text-text-secondary hover:text-text"
              }`}
            >
              {f === "all" ? "All" : f === "game" ? "Games" : "Web"}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
