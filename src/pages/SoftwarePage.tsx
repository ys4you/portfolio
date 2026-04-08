import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { SOFTWARE_PROJECTS } from "@/data/projects";

export default function SoftwarePage() {
  return (
    <section className="section-gap">
      <div className="page-container">
        <PageHeader
          title="Software"
          accent="."
          subtitle="Developer tools, language tooling, and internal systems."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOFTWARE_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}