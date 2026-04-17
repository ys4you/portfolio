import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";

interface BentoGridProps {
  projects: Project[];
}

/**
 * Bento-style grid:
 *  - First 2 projects render as large (full-width, side-by-side image+text)
 *  - Remaining render as standard cards in a 3-column grid
 *
 * Layout:
 *  ┌────────────────────────────────┐
 *  │        Large card #1           │
 *  ├─────────┬──────────┬───────────┤
 *  │         │          │           │
 *  │  Small  │  Small   │   Small   │
 *  ├─────────┴──────────┴───────────┤
 *  │        Large card #2           │
 *  ├─────────┬──────────┬───────────┤
 *  │  Small  │  Small   │   Small   │
 *  └─────────┴──────────┴───────────┘
 */
export default function BentoGrid({ projects }: BentoGridProps) {
  if (projects.length === 0) return null;

  // Split into featured (first 2 with thumbnails or flagged) and rest
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  // Interleave: featured large card, then up to 3 small cards, repeat
  const rows: { large?: Project; small: Project[] }[] = [];
  let restIdx = 0;

  for (const feat of featured) {
    const small = rest.slice(restIdx, restIdx + 3);
    rows.push({ large: feat, small });
    restIdx += 3;
  }

  // Any remaining small cards
  if (restIdx < rest.length) {
    rows.push({ small: rest.slice(restIdx) });
  }

  // If no featured at all, just grid everything
  if (featured.length === 0) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rows.map((row, rowIdx) => {
        let rowIndex = 0;
        return (
          <div key={rowIdx} className="space-y-6">
            {/* Large featured card */}
            {row.large && (
              <ProjectCard
                project={row.large}
                index={0}
                size="large"
              />
            )}

            {/* Small cards row */}
            {row.small.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {row.small.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={rowIndex++}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}