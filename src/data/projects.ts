import type { Project } from "@/types";

// Google Sites CDN — these load externally from your old portfolio.
// For production, download to /public/images/projects/ and update paths.
export const IMG = {
  panic20:
    "https://lh3.googleusercontent.com/sitesv/APaQ0SRcuxTOl5QRwzHZ7z2CtmI647cKFt2Wjj1wviR6_X3-YKFE48DluMf0O73_Pk3An1dcyxaY3v4V_o8myz5LeyEEexR2CsNk8IKesnDz0j2xhB5CxmXbYSYRqKH-PNUeGuh4VDVyj3-vUYZRilctqi2LLpfDqj5-PHl1c2Q314sFZagbFr31FNuYFlVt1j1iGavkctGV7nLNs51-khn0QcO-S4V1HAKN9LrD=w1280",
  spaceFishing:
    "https://lh3.googleusercontent.com/sitesv/APaQ0SREyXeSMPy4JK-fh43M1cMk0hvubqJZ48lU9jmOhyRKal_LhptVXIwjdtTFwhUTGVA1fqXhAgC41Nn11Pxysb8OT34tUjiQN_ySxDgmGZT2f_U_GpKFyfVoZwU3WAHWnDcR_6SnH0aoHBy6I_EvDVVp5VnfYoYn5xs6KnqGoJRXf-G4cqPJ19XNxC_-hjhHPp1MCKXnbp5st_sggEMn-ohgrldIPGQJTfkC=w1280",
  goopy:
    "https://lh3.googleusercontent.com/sitesv/APaQ0STlXA86_4Zl9vsSrvkh-RDTqRufwiiDiXTUNYZo2WeqMtnPMC8NOEony3oMtF4d3EWUqN_mMMBGsJBJ6DoFGUtdGbuHPipcc_HFb7opALm9b51lEDGpw5zrHG95TRoU2ZxHyYXBqtLn8vbUYVbAuacDQLYWpuXNdmLvMw7Q3NeGoeiX4XK7u9-JDu8nPdUlAA8nu8xK_l7kkW2QiYQVQAPw3EfyhcQj0xJ7=w1280",
  landmass:
    "https://lh3.googleusercontent.com/sitesv/APaQ0SSAiHXLTKlp5IkoD-7lU1gaYFdKBuHiC-3uLmSarkuChvk3Txqtjp6y9Ubq4XvedA2wEcUvSBi082fDop30DvoRNWxfBIcDFWsoOO2wJSogFCcWgEwU44myQnosuSkpBjydL-PW9wvY1r0zsLANSY46nVQZOhng3oMYEVYVfII1br9DHZtrgWtRlhtT6C4meLbqEHJz3hHoYjnARXyhZmDnb0b4J4SncO4p=w1280",
  platformer:
    "https://lh3.googleusercontent.com/sitesv/APaQ0STh3E64A884EwOLS5cNRRToFIe_MXGRkTjQVblKPUl9JmxZQYh3dUfI-K4_-YLOzMcr9DOFZMskIgQF1u0z1LjWkcTWFar5x_e0YVNd10L_DCtbvSnzIkqKpyZGhc7NkcK9WqoC7peFJsr1HJl9JsoEvPhW_F2_7zcDwGamjipPOl4lFl9llcFryze-P2TodXNeg9gIdGv5bzJ5QG-d1KebrRKmNFxQRTm-=w1280",
  rollover:
    "https://lh3.googleusercontent.com/sitesv/APaQ0SRR92rfzrQM12KfSbzgfv9kMe7rZc-yS1Ak86J5l9Z3HYjlHe9ZpbOyuFG76Itg2oE7sdB4u_OYmeccVzg5VA5kLkVM0IHf-vhwtwDXEasGKO_WG8JofLp52f4DDcaMJa2yaEd2LaP6QDZj6GaHMLwBU54S2dt3rhqTP9I01UmRfCI9yXAWV4UGYr30Bh-bUNeI-sWz1hw0eEIRmOaWzHRlERVU0PCvxZANSdk=w1280",
  database:
    "https://lh3.googleusercontent.com/sitesv/APaQ0STsDMXgurHwPznKGNKDszK2zMHbYFNvKGJ32X15JSv_7b_pjdsRv6I0ZfZ8f-tR3dCscMCEs_60rtNtlcCLSl7XrFxkGqL2bvxbt5y4zzkbRcg3GarNfzbp_WXIHlepXAcY9yKS0fGmH8SBB0P1vkzgruIuI4lcMzLl8ZnVFVxdCgSszrIdi2IWbkBFRbv_BDOlIRhJJaLRbK6FWpCuYfUjqcmitZPxJg=w1280",
  syntaxHighlighting:
    "https://lh3.googleusercontent.com/sitesv/APaQ0SRIDgsmvSGP8V_tjYhjjxA7zzIVFmWzPByVAQx1qhjpK6lXrioyoneN76HmnjgbT8F_VOJZSS5D8nbbqKCKm6Lacq9a6LcDFvxo-Dji5wXWmN84IDWe_PeGqWvgAAJzXXSlLXQzvonDgRkwwjRpVdDasuAUP_rMwMcEv-MRV3ZIkGgZP9wTzRCKBZfaOhL5FkbKKJZx06RORO13fTm8STcw-UEEJ0mv453X1dg=w1280",
  profile:
    "https://lh3.googleusercontent.com/sitesv/APaQ0ST1GW2_Q06iQVatPzikll9aLmcWH4pqVA5WWTYm5dqEXnUf9SF04onVW4oyyknO-zuoPmaJjCcRLTKa2eba_mallqIpXM7Sw0ATYZevQ4koUJfMTcN5cLAwCKn368bHo3HznOvuKEG4UO6qxgIam0WvCoon-R5rvWBIZQCwWRhyqxIqVYDCsRXWmVjFZ3og7A7AC2ScWR8qiFPWJA3p27383--lLT76og=w1280",
} as const;

export const PROJECTS: Project[] = [
  // ── Games ──────────────────────────────────────────────
  {
    id: "tmpl8-raytracer",
    title: "Tmpl8 Ray Tracer",
    slug: "tmpl8-raytracer",
    description:
      "High-performance C++ ray tracer with instanced voxel rendering, 3D Conway's Game of Life simulation, TAA with neighborhood clamping, and screen-space outline post-processing.",
    category: "game",
    tags: ["C++", "Ray Tracing", "Voxels", "SIMD"],
    thumbnail: "",
    year: 2025,
    featured: true,
  },
  {
    id: "voxel-engine",
    title: "Voxel Engine",
    slug: "voxel-engine",
    description:
      "Cross-platform Minecraft-style voxel engine targeting Windows and Raspberry Pi 4 with chunk streaming, async mesh generation, face culling, texture arrays, and a weather system.",
    category: "game",
    tags: ["C++", "OpenGL", "Cross-Platform", "CMake"],
    thumbnail: "",
    year: 2024,
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
      live: "https://www.yesseseijn.com/games/panic20",
      itch: "https://ys4you.itch.io/panic20",
    },
  },
  {
    id: "space-fishing",
    title: "Space Fishing",
    slug: "space-fishing",
    description:
      "A cosmic fishing adventure — explore alien planets, cast your line into cosmic waters, fish for rare exotic species, and upgrade your equipment along the way.",
    category: "game",
    tags: ["Unity", "C#", "Team", "FSM"],
    thumbnail: IMG.spaceFishing,
    year: 2023,
    featured: true,
    links: {
      itch: "https://kyrilldev.itch.io/space-fishing-exploring-game",
      live: "https://www.yesseseijn.com/games/space-fishing",
    },
  },
  {
    id: "goopy",
    title: "Goopy",
    slug: "goopy",
    description:
      "A cute 2.5D tower defense game with a twist — two mirrored grids await your strategic prowess. Defend your kingdom in perfect symmetry.",
    category: "game",
    tags: ["Unity", "C#", "Game Jam", "Team"],
    thumbnail: IMG.goopy,
    year: 2023,
    links: {
      live: "https://www.yesseseijn.com/games/goopy",
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
    links: {
      live: "https://www.yesseseijn.com/games/landmass-generator",
    },
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
    links: {
      live: "https://www.yesseseijn.com/games/2d-platformer",
    },
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
    links: {
      live: "https://www.yesseseijn.com/games/rollover",
    },
  },

  // ── Web / Software ─────────────────────────────────────
  {
    id: "pbn-manager",
    title: "PBN Manager",
    slug: "pbn-manager",
    description:
      "Full-stack internal tool for managing private blog networks. React/TypeScript frontend with ASP.NET Core 8 backend, SQLite/MySQL support, and Laravel AES-256-CBC credential decryption.",
    category: "web",
    tags: ["React", "TypeScript", "C#", "ASP.NET Core"],
    thumbnail: "",
    year: 2025,
    featured: true,
  },
  {
    id: "sustain-the-brain",
    title: "Sustain The Brain",
    slug: "sustain-the-brain",
    description:
      "Neurofeedback application with EEG integration, Netflix/YouTube playback with Widevine DRM, dynamic overlay system, and real-time signal processing.",
    category: "web",
    tags: ["Python", "PyQt6", "EEG", "DRM"],
    thumbnail: "",
    year: 2025,
  },
  {
    id: "syntax-highlighting",
    title: "Tree-sitter Parser & Syntax Highlighting",
    slug: "syntax-highlighting",
    description:
      "VS Code extension providing syntax highlighting, code folding, and IntelliSense for MARIN's Extensible Modeling Framework (XMF) domain-specific language, built with Tree-sitter.",
    category: "web",
    tags: ["Tree-sitter", "JavaScript", "VS Code", "Internship"],
    thumbnail: IMG.syntaxHighlighting,
    year: 2024,
    featured: true,
    links: {
      live: "https://www.yesseseijn.com/software/syntax-highlighting",
    },
  },
  {
    id: "jg-database",
    title: "JG Webmarketing Database",
    slug: "jg-database",
    description:
      "Internal database system built during internship at JG Webmarketing to streamline website maintenance workflows, making routine tasks faster and more efficient.",
    category: "web",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "C#"],
    thumbnail: IMG.database,
    year: 2023,
    links: {
      live: "https://www.yesseseijn.com/software/database",
    },
  },
  {
    id: "n8n-automations",
    title: "n8n Workflow Automations",
    slug: "n8n-automations",
    description:
      "Automated order processing, blog generation, RSS email digests with Groq/Llama-based Dutch translation, and SEO tooling via Google Apps Script.",
    category: "web",
    tags: ["n8n", "Automation", "AI", "SEO"],
    thumbnail: "",
    year: 2024,
  },
];

export const GAME_PROJECTS = PROJECTS.filter((p) => p.category === "game");
export const WEB_PROJECTS = PROJECTS.filter((p) => p.category === "web");
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
