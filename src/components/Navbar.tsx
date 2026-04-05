import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/constants/navigation";
import type { NavLink } from "@/types";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg/80 backdrop-blur-xl">
      <nav className="page-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight text-text transition-colors hover:text-accent"
        >
          {SITE_NAME}<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.href} link={link} currentPath={location.pathname} />
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="grid h-10 w-10 place-items-center rounded-sm text-text-secondary transition-colors hover:text-text md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-border-subtle bg-bg-elevated md:hidden">
          <ul className="page-container flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <MobileNavItem key={link.href} link={link} currentPath={location.pathname} />
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---- Desktop nav item with optional dropdown ---- */

function NavItem({ link, currentPath }: { link: NavLink; currentPath: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const isActive =
    currentPath === link.href || link.children?.some((c) => currentPath === c.href);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (link.children) {
    return (
      <li ref={ref} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
            isActive ? "text-accent" : "text-text-secondary hover:text-text"
          }`}
        >
          {link.label}
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul className="absolute top-full left-0 mt-1 min-w-[160px] rounded-radius-card border border-border bg-bg-elevated p-1 shadow-xl">
            {link.children.map((child) => (
              <li key={child.href}>
                <Link
                  to={child.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-radius-sm px-3 py-2 text-sm transition-colors ${
                    currentPath === child.href
                      ? "bg-accent-subtle text-accent"
                      : "text-text-secondary hover:bg-surface hover:text-text"
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        to={link.href}
        className={`rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
          isActive ? "text-accent" : "text-text-secondary hover:text-text"
        }`}
      >
        {link.label}
      </Link>
    </li>
  );
}

/* ---- Mobile nav item ---- */

function MobileNavItem({ link, currentPath }: { link: NavLink; currentPath: string }) {
  const [expanded, setExpanded] = useState(false);
  const isActive =
    currentPath === link.href || link.children?.some((c) => currentPath === c.href);

  if (link.children) {
    return (
      <li>
        <button
          onClick={() => setExpanded((v) => !v)}
          className={`flex w-full items-center justify-between rounded-radius-sm px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive ? "text-accent" : "text-text-secondary"
          }`}
        >
          {link.label}
          <ChevronDown
            size={14}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
        {expanded && (
          <ul className="ml-3 border-l border-border-subtle pl-3">
            {link.children.map((child) => (
              <li key={child.href}>
                <Link
                  to={child.href}
                  className={`block rounded-radius-sm px-3 py-2 text-sm transition-colors ${
                    currentPath === child.href
                      ? "text-accent"
                      : "text-text-secondary hover:text-text"
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        to={link.href}
        className={`block rounded-radius-sm px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive ? "text-accent" : "text-text-secondary hover:text-text"
        }`}
      >
        {link.label}
      </Link>
    </li>
  );
}
