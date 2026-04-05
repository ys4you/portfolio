import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { GAME_PROJECTS } from "@/data/projects";

export default function GamesPage() {
  return (
    <section className="section-gap">
      <div className="page-container">
        <PageHeader
          title="Game Projects"
          accent="."
          subtitle="From C++ ray tracers and voxel engines to Unity game jam entries — built to be played."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GAME_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
