import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import GitHubActivity from "@/components/GitHubActivity";
import DiscordPresence from "@/components/DiscordPresence";
import { IMG } from "@/data/projects";
import { Code2, Cpu, Globe, Wrench } from "lucide-react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const SKILL_GROUPS = [
  {
    icon: <Code2 size={22} />,
    title: "Languages",
    skills: ["C++", "TypeScript", "C#", "Python", "GLSL"],
  },
  {
    icon: <Cpu size={22} />,
    title: "Engine & Graphics",
    skills: ["OpenGL", "Ray Tracing", "Voxel Systems", "SIMD", "Unreal Engine 5"],
  },
  {
    icon: <Globe size={22} />,
    title: "Web & Backend",
    skills: ["React", "ASP.NET Core", "Node.js", "Vite", "Tailwind CSS"],
  },
  {
    icon: <Wrench size={22} />,
    title: "Tools & Workflow",
    skills: ["Git", "CMake", "n8n", "Docker", "Visual Studio", "Linux"],
  },
];

const TIMELINE = [
  {
    period: "2023 — Present",
    title: "Game Development Student",
    org: "Breda University of Applied Sciences",
    description:
      "Academy for Games and Media — focusing on C++ graphics programming, engine architecture, and cross-platform development.",
    type: "education" as const,
  },
  {
    period: "2024 — Present",
    title: "Web Developer",
    org: "JG Webmarketing",
    description:
      "Building internal tools (PBN Manager, RSS digest system), automation workflows with n8n, and full-stack applications.",
    type: "work" as const,
  },
];

export default function AboutPage() {
  return (
    <section className="section-gap">
      <SEO
        title="About"
        description="Game development student at BUas and web developer at JG Webmarketing. Building ray tracers, voxel engines, and full-stack tools."
      />
      <div className="page-container">
        <PageHeader
          title="About me"
          accent="."
          subtitle="Developer, builder, and student — driven by curiosity for how things work under the hood."
        />

        {/* ── Bio ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mb-20 grid items-start gap-12 lg:grid-cols-5"
        >
          {/* Photo placeholder */}
          <motion.div
            variants={fadeUp}
            className="aspect-[4/5] w-full overflow-hidden rounded-radius-card border border-border-subtle bg-surface lg:col-span-2"
          >
            <img
              src={IMG.profile}
              alt="Yesse Seijnaeve"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-3">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Hey, I'm <span className="text-accent">Yesse</span>
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                I'm a game development student at BUas in Breda, specializing in C++ and
                graphics programming. I love going deep — whether that's implementing a
                ray tracer from scratch, building voxel engines with chunk streaming, or
                optimizing SIMD-heavy render loops.
              </p>
              <p>
                Outside of game tech, I build full-stack web applications and internal
                tooling for JG Webmarketing, working across React, TypeScript, C#, and
                Python. I enjoy the entire spectrum from low-level performance work to
                polished UI.
              </p>
              <p>
                When I'm not coding, you'll find me exploring game design concepts,
                experimenting with neurofeedback software, or tinkering with automation
                workflows.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Skills ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">
            Skills &amp; tools<span className="text-accent">.</span>
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.title}
                className="rounded-radius-card border border-border-subtle bg-bg-elevated p-6"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-radius-sm bg-accent-subtle text-accent">
                  {group.icon}
                </div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">
                  {group.title}
                </h3>
                <ul className="space-y-1.5">
                  {group.skills.map((skill) => (
                    <li key={skill} className="text-sm text-text-secondary">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── GitHub Activity ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">
            Activity<span className="text-accent">.</span>
          </h2>
          <div className="space-y-6">
            <GitHubActivity username="ys4you" />
            <DiscordPresence />
          </div>
        </motion.div>

        {/* ── Timeline ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">
            Experience &amp; education<span className="text-accent">.</span>
          </h2>

          <div className="relative border-l-2 border-border-subtle pl-8">
            {TIMELINE.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative mb-10 last:mb-0"
              >
                {/* Dot */}
                <div
                  className={`absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full border-2 ${
                    entry.type === "work"
                      ? "border-accent bg-accent/30"
                      : "border-text-muted bg-text-muted/30"
                  }`}
                />

                <span className="mb-1 block font-mono text-xs tracking-wider text-text-muted uppercase">
                  {entry.period}
                </span>
                <h3 className="text-lg font-bold">{entry.title}</h3>
                <p className="text-sm font-medium text-accent">{entry.org}</p>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {entry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}