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
  profile: "/images/profile.webp",
} as const;

export const PROJECTS: Project[] = [
  // ── Games ──────────────────────────────────────────────
  {
    id: "tmpl8-raytracer",
    title: "Tmpl8 Ray Tracer",
    slug: "tmpl8-raytracer",
    description:
      "A CPU-based voxel ray tracer built on the Tmpl8 framework featuring instanced rendering, 3D Conway's Game of Life simulation, MagicaVoxel integration, and screen-space post-processing.",
    category: "game",
    tags: ["C++", "Ray Tracing", "Voxels", "SIMD", "Tmpl8"],
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
      "A lightning-fast micro game where you dodge incoming objects and survive for as long as you can in an adrenaline-pumping 20-second challenge.",
    category: "game",
    tags: ["C#", "Canvas Engine", "Solo"],
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
      "A cosmic fishing adventure - explore alien planets, cast your line into cosmic waters, fish for rare exotic species, and upgrade your equipment along the way.",
    category: "game",
    tags: ["Unity", "C#", "Team", "FSM"],
    thumbnail: IMG.spaceFishing,
    year: 2023,
    links: {
      itch: "https://kyrilldev.itch.io/space-fishing-exploring-game",
    },
  },
  {
    id: "landmass-generator",
    title: "Landmass Generator",
    slug: "landmass-generator",
    description:
      "Procedural terrain generator using Perlin noise to create natural-looking landscapes with smooth elevation maps, built for game development and world-building.",
    category: "game",
    tags: ["Unity", "C#", "Procedural", "Solo"],
    thumbnail: IMG.landmass,
    year: 2023,
  },

  // ── Software ─────────────────────────────────────────
  {
    id: "syntax-highlighting",
    title: "Tree-sitter Parser & Syntax Highlighting",
    slug: "syntax-highlighting",
    description:
      "VS Code extension providing syntax highlighting, code folding, and IntelliSense for MARIN's Extensible Modeling Framework (XMF) domain-specific language, built with Tree-sitter.",
    category: "software",
    tags: ["Tree-sitter", "JavaScript", "VS Code", "DSL", "Internship"],
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
      "A cute 2.5D tower defense game with a twist - two mirrored grids await your strategic prowess. Defend your kingdom in perfect symmetry.",
    category: "game",
    tags: ["Unity", "C#", "Game Jam", "Team"],
    thumbnail: IMG.goopy,
    year: 2023,
    archived: true,
  },
  {
    id: "2d-platformer",
    title: "2D Platformer",
    slug: "2d-platformer",
    description:
      "A classic 2D Unity platformer with agile movement and precision jumps across three intense levels of obstacles.",
    category: "game",
    tags: ["Unity", "C#", "Solo"],
    thumbnail: IMG.platformer,
    year: 2023,
    archived: true,
  },
  {
    id: "rollover",
    title: "Rollover: Marble Mayhem",
    slug: "rollover",
    description:
      "Guide multiple marbles simultaneously to solve levels and discover secrets in this solo-teamwork puzzle adventure.",
    category: "game",
    tags: ["Unity", "C#", "Solo"],
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