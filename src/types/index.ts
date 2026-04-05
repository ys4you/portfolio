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
  year: number;
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
