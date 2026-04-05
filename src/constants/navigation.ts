import type { NavLink } from "@/types";

export const SITE_NAME = "Yesse";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Games", href: "/projects/games" },
      { label: "Web", href: "/projects/web" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];