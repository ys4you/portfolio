import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, Globe, Code2 } from "lucide-react";
import SEO from "@/components/SEO";
import HeroBackground from "@/components/HeroBackground";
import Typewriter from "@/components/Typewriter";
import BentoGrid from "@/components/BentoGrid";
import { IMG, FEATURED_PROJECTS } from "@/data/projects";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export default function HomePage() {
  return (
    <>
      <SEO />
      {/* ── Split Hero ── */}
      <section className="relative overflow-hidden">
        <HeroBackground />

        {/* Overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-bg/60" />

        <div className="page-container relative z-10 flex min-h-[90dvh] flex-col items-center justify-center py-24 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            {/* Labels */}
            <motion.div
              variants={fadeUp}
              className="mb-8 flex items-center justify-center gap-8 font-mono text-xs tracking-widest uppercase"
            >
              <span className="text-accent/60">Games</span>
              <span className="h-px w-6 bg-border" />
              <span className="text-accent/60">Web</span>
              <span className="h-px w-6 bg-border" />
              <span className="text-accent/60">Software</span>
            </motion.div>

            {/* Profile photo */}
            <motion.div
              variants={fadeUp}
              className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-accent/30 shadow-lg shadow-accent/10"
            >
              <img
                src={IMG.profile}
                alt="Yesse Seijnaeve"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="mb-3 text-4xl font-bold md:text-6xl"
            >
              Yesse Seijnaeve
            </motion.h1>

            {/* Typewriter */}
            <motion.p
              variants={fadeUp}
              className="mb-3 text-xl font-medium md:text-2xl"
            >
              I am a <Typewriter />
            </motion.p>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mb-10 max-w-lg text-sm text-text-secondary md:text-base"
            >
              Building games and shipping web applications. If it needs
              building, I'll make it happen.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-radius-pill bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
              >
                View Projects <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-radius-pill border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Quick project categories ── */}
      <section className="section-gap border-t border-border-subtle">
        <div className="page-container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10 text-3xl font-bold md:text-4xl"
          >
            What I build<span className="text-accent">.</span>
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            <CategoryCard
              to="/projects/games"
              icon={<Gamepad2 size={28} />}
              title="Games"
              description="Games I've built during school - Unity projects, C++ engines, and game jam entries."
            />
            <CategoryCard
              to="/projects/web"
              icon={<Globe size={28} />}
              title="Web"
              description="Web apps and tools I've built at work - dashboards, APIs, and things that make people's jobs easier."
            />
            <CategoryCard
              to="/projects/software"
              icon={<Code2 size={28} />}
              title="Software"
              description="Developer tools and internal software - VS Code extensions, parsers, and things that help other devs."
            />
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="section-gap border-t border-border-subtle">
        <div className="page-container">
          <div className="mb-10 flex items-end justify-between">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold md:text-4xl"
            >
              Featured projects<span className="text-accent">.</span>
            </motion.h2>
            <Link
              to="/projects"
              className="hidden items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-accent sm:inline-flex"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <BentoGrid projects={FEATURED_PROJECTS.slice(0, 6)} />

          <Link
            to="/projects"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent sm:hidden"
          >
            View all projects <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── About Me (short) ── */}
      <section className="section-gap border-t border-border-subtle">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="grid items-center gap-10 md:grid-cols-5"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-radius-card border border-border-subtle bg-surface md:col-span-2">
              <img
                src={IMG.aboutMeHome}
                alt="Yesse Seijnaeve"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="md:col-span-3">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                A bit about me<span className="text-accent">.</span>
              </h2>
              <p className="mb-4 text-text-secondary leading-relaxed">
                I'm Yesse - a game development student at{" "}
                <a href="https://www.buas.nl/" target="_blank" rel="noopener noreferrer" className="font-medium text-text underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent">BUas</a>
                {" "}studying Creative Media and Game Technologies, and a part-time Digital Growth Engineer at{" "}
                <a href="https://jgwebmarketing.nl/" target="_blank" rel="noopener noreferrer" className="font-medium text-text underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent">JG Webmarketing</a>
                . I completed my MBO at{" "}
                <a href="https://www.glu.nl/" target="_blank" rel="noopener noreferrer" className="font-medium text-text underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent">GLU</a>
                {" "}a year early.
              </p>
              <p className="mb-6 text-text-secondary leading-relaxed">
                I like building things from scratch - whether that's a game, a
                web app, or a tool that makes someone's workflow easier.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                More about me <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function CategoryCard({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="hover-lift group relative overflow-hidden rounded-radius-card border border-border-subtle bg-bg-elevated p-8"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-radius-sm bg-accent-subtle text-accent">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-text-secondary">{description}</p>
      <ArrowRight
        size={18}
        className="mt-4 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
      />
    </Link>
  );
}