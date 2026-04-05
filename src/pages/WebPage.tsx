import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { WEB_PROJECTS } from "@/data/projects";

export default function WebPage() {
  return (
    <section className="section-gap">
      <div className="page-container">
        <PageHeader
          title="Web & Software"
          accent="."
          subtitle="Full-stack applications, developer tools, and automation workflows."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WEB_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
