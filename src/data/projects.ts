import type { Project } from "@/types";

// Google Sites CDN - these load externally from your old portfolio.
// For production, download to /public/images/projects/ and update paths.
export const IMG = {
  panic20: "/images/panic20/thumbnail.png",
  spaceFishing: "/images/space-fishing/thumbnail.png",
  landmass: "/images/landmass-generator/thumbnail.png",
  syntaxHighlighting: "/images/syntax-highlighting/thumbnail.png",
  goopy: "/images/goopy/thumbnail.png",
  platformer: "/images/2d-platformer/thumbnail.png",
  rollover: "/images/rollover/thumbnail.png",
  profile: "/images/headshot.webp",
  aboutMe: "/images/aboutme.jpeg",
  aboutMeHome: "/images/abitaboutme.jpg",
} as const;

export const PROJECTS: Project[] = [
  // ── Games ──────────────────────────────────────────────
  {
    id: "tmpl8-raytracer",
    title: "CPU Ray Tracer",
    slug: "tmpl8-raytracer",
    description:
      "A voxel ray tracer I built from scratch in C++ for school. Features instanced rendering, a 3D Game of Life simulation, and MagicaVoxel scene support.",
    category: "game",
    tags: ["C++", "School", "Ray Tracing", "Voxels", "SIMD", "Tmpl8"],
    thumbnail: "/images/tmpl8-raytracer/thumbnail.png",
    year: 2025,
    featured: true,
    links: {
      github: "https://github.com/ys4you/raytracking",
    },
  },
  {
    id: "panic20",
    title: "Panic 20",
    slug: "panic20",
    description:
      "My first ever school project - a simple dodge game where you try to survive 20 seconds. Built with only 3 weeks of C# knowledge.",
    category: "game",
    tags: ["C#", "School", "Canvas Engine"],
    thumbnail: IMG.panic20,
    year: 2023,
    featured: true,
    links: {
      itch: "https://ys4you.itch.io/panic20",
    },
  },
  {
    id: "space-fishing",
    title: "Space Fishing",
    slug: "space-fishing",
    description:
      "A fishing game set in space. Explore alien planets, catch weird fish, and upgrade your gear. Built with a team of 6 as our first published game.",
    category: "game",
    tags: ["C#", "School", "Unity", "FSM"],
    thumbnail: IMG.spaceFishing,
    year: 2023,
    links: {
      itch: "https://kyrilldev.itch.io/space-fishing-exploring-game",
      github: "https://github.com/ys4you/space-fishing",
    },
  },
  {
    id: "landmass-generator",
    title: "Landmass Generator",
    slug: "landmass-generator",
    description:
      "A terrain generator that uses Perlin noise to create infinite landscapes. Built in Unity as an exam project to push my skills further.",
    category: "game",
    tags: ["C#", "School", "Unity", "Procedural Generation"],
    thumbnail: IMG.landmass,
    year: 2023,
  },

  // ── Software ─────────────────────────────────────────
  {
    id: "database-tool",
    title: "Blog Database & API",
    slug: "database-tool",
    description:
      "A blog management tool I built during my internship. PHP backend with a single API endpoint, MySQL database, token auth, and activity logging.",
    category: "web",
    tags: ["PHP", "Internship", "MySQL", "JavaScript"],
    thumbnail: "/images/database-tool/thumbnail.png",
    year: 2024,
  },
  {
    id: "syntax-highlighting",
    title: "Tree-sitter Parser & Syntax Highlighting",
    slug: "syntax-highlighting",
    description:
      "A VS Code extension I built during my internship at MARIN. Adds syntax highlighting, code folding, and IntelliSense for their in-house programming language.",
    category: "software",
    tags: ["JavaScript", "Internship", "Tree-sitter", "VS Code", "DSL"],
    thumbnail: IMG.syntaxHighlighting,
    year: 2024,
    featured: true,
  },

  // ── Archived ───────────────────────────────────────────
  {
    id: "goopy",
    title: "Goopy",
    slug: "goopy",
    description:
      "A 2.5D tower defense game we made in a 72-hour game jam. I was the only developer - two mirrored grids, Plants vs Zombies style.",
    category: "game",
    tags: ["C#", "School", "Unity", "Game Jam"],
    thumbnail: IMG.goopy,
    year: 2023,
    archived: true,
  },
  {
    id: "2d-platformer",
    title: "2D Platformer",
    slug: "2d-platformer",
    description:
      "A 2D platformer I built in two weeks. Three levels, wall jumps, double jumps, and a lot of precision required to finish.",
    category: "game",
    tags: ["C#", "School", "Unity"],
    thumbnail: IMG.platformer,
    year: 2023,
    archived: true,
  },
  {
    id: "rollover",
    title: "Rollover: Marble Mayhem",
    slug: "rollover",
    description:
      "A puzzle game where you control multiple marbles one at a time. Get them all to the right spots to complete each level.",
    category: "game",
    tags: ["C#", "School", "Unity"],
    thumbnail: IMG.rollover,
    year: 2023,
    archived: true,
  },
];

export const GAME_PROJECTS = PROJECTS.filter((p) => p.category === "game" && !p.archived);
export const WEB_PROJECTS = PROJECTS.filter((p) => p.category === "web" && !p.archived);
export const SOFTWARE_PROJECTS = PROJECTS.filter((p) => p.category === "software" && !p.archived);
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured && !p.archived);
export const ARCHIVED_PROJECTS = PROJECTS.filter((p) => p.archived);