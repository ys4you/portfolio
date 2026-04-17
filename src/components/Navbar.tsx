import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/constants/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import type { NavLink } from "@/types";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Track scroll position for navbar style
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border-subtle bg-bg/85 backdrop-blur-xl shadow-lg shadow-black/5"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="page-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight text-text transition-colors hover:text-accent"
        >
          {SITE_NAME}<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.href} link={link} currentPath={location.pathname} />
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="grid h-10 w-10 place-items-center rounded-sm text-text-secondary transition-colors hover:text-text"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border-subtle bg-bg-elevated md:hidden"
          >
            <ul className="page-container flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <MobileNavItem link={link} currentPath={location.pathname} />
                </motion.div>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---- Desktop nav item with optional dropdown ---- */

function NavItem({ link, currentPath }: { link: NavLink; currentPath: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const isActive =
    currentPath === link.href || link.children?.some((c) => currentPath === c.href);

  if (link.children) {
    return (
      <li
        ref={ref}
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Link
          to={link.href}
          className={`flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
            isActive ? "text-accent" : "text-text-secondary hover:text-text"
          }`}
        >
          {link.label}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </Link>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 mt-1 min-w-[160px] rounded-radius-card border border-border bg-bg-elevated p-1 shadow-xl"
            >
              {link.children.map((child, i) => (
                <motion.li
                  key={child.href}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                >
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
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
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
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="ml-3 overflow-hidden border-l border-border-subtle pl-3"
            >
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
            </motion.ul>
          )}
        </AnimatePresence>
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