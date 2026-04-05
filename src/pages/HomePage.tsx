import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, Globe } from "lucide-react";
import HeroBackground from "@/components/HeroBackground";
import Typewriter from "@/components/Typewriter";
import { IMG } from "@/data/projects";

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
              <span className="h-px w-8 bg-border" />
              <span className="text-accent/60">Web</span>
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
              Building games from scratch in C++ and shipping full-stack web
              applications — from voxel engines to React dashboards.
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

          <div className="grid gap-6 md:grid-cols-2">
            <CategoryCard
              to="/projects/games"
              icon={<Gamepad2 size={28} />}
              title="Games"
              description="From C++ ray tracers and voxel engines to rhythm roguelikes — performant, handcrafted experiences."
            />
            <CategoryCard
              to="/projects/web"
              icon={<Globe size={28} />}
              title="Web"
              description="Full-stack applications, internal tooling, and automation workflows built with modern frameworks."
            />
          </div>
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