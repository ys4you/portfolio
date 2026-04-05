/* ============================================
   Portfolio — Shared Types
   ============================================ */

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "game" | "web";
  tags: string[];
  thumbnail: string;
  links?: {
    live?: string;
    github?: string;
    itch?: string;
  };
  featured?: boolean;
  archived?: boolean;
  year: number;
}

/** Detail page content — array of sections rendered in order */
export type ProjectSection =
  | { type: "text"; title?: string; content: string }
  | { type: "code"; title?: string; language: string; filename?: string; code: string }
  | { type: "code-remote"; title?: string; language: string; filename?: string; src: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "gallery"; images: { src: string; alt: string }[] }
  | { type: "video"; src: string; title?: string }
  | { type: "callout"; content: string; variant?: "info" | "warning" | "note" };

export interface ProjectDetail {
  slug: string;
  meta: {
    role?: string;
    team?: string[];
    duration?: string;
    tools?: string;
  };
  sections: ProjectSection[];
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: "work" | "education";
}