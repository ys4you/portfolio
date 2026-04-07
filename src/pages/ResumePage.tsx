import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Zap } from "lucide-react";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const EXPERIENCE = [
  {
    role: "Web Developer",
    company: "JG Webmarketing",
    period: "2024 — Present",
    bullets: [
      "Built a full-stack PBN Manager with React/TypeScript + ASP.NET Core 8, supporting SQLite and MySQL",
      "Developed n8n automation workflows for order processing, blog generation, and RSS email digests",
      "Created a Google Apps Script pipeline for AI-generated SEO blog posts with Groq/Llama integration",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Game Development",
    school: "Breda University of Applied Sciences (BUas)",
    period: "2023 — Present",
    description:
      "Academy for Games and Media — specializing in C++ graphics programming, engine architecture, and cross-platform development.",
  },
];

const TECH_SKILLS = [
  { category: "Languages", items: "C++, TypeScript, C#, Python, GLSL" },
  { category: "Graphics", items: "OpenGL, Ray Tracing, Voxel Systems, SIMD, Tmpl8" },
  { category: "Web", items: "React, ASP.NET Core, Node.js, Vite, Tailwind CSS" },
  { category: "Tools", items: "Git, CMake, n8n, Docker, Visual Studio, Linux" },
  { category: "Game Engines", items: "Unreal Engine 5, Custom C++ Engines" },
];

export default function ResumePage() {
  return (
    <section className="section-gap">
      <SEO
        title="Resume"
        description="Experience, education, and technical skills of Yesse Seijnaeve — game and web developer."
      />
      <div className="page-container max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <PageHeader
            title="Resume"
            accent="."
            subtitle="A summary of my experience, education, and technical skills."
          />

          <motion.a
            href="/resume.pdf"
            download
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12 inline-flex items-center gap-2 rounded-radius-pill border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent md:mb-16"
          >
            <Download size={15} /> Download PDF
          </motion.a>
        </div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-16">
          {/* ── Experience ── */}
          <motion.div variants={fadeUp}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-radius-sm bg-accent-subtle text-accent">
                <Briefcase size={18} />
              </div>
              <h2 className="text-xl font-bold">Experience</h2>
            </div>

            <div className="space-y-8">
              {EXPERIENCE.map((job, i) => (
                <div
                  key={i}
                  className="rounded-radius-card border border-border-subtle bg-bg-elevated p-6"
                >
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold">{job.role}</h3>
                    <span className="font-mono text-xs text-text-muted">{job.period}</span>
                  </div>
                  <p className="mb-3 text-sm font-medium text-accent">{job.company}</p>
                  <ul className="space-y-2">
                    {job.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-2 text-sm text-text-secondary">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Education ── */}
          <motion.div variants={fadeUp}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-radius-sm bg-accent-subtle text-accent">
                <GraduationCap size={18} />
              </div>
              <h2 className="text-xl font-bold">Education</h2>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-radius-card border border-border-subtle bg-bg-elevated p-6"
                >
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold">{edu.degree}</h3>
                    <span className="font-mono text-xs text-text-muted">{edu.period}</span>
                  </div>
                  <p className="mb-2 text-sm font-medium text-accent">{edu.school}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Technical skills ── */}
          <motion.div variants={fadeUp}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-radius-sm bg-accent-subtle text-accent">
                <Zap size={18} />
              </div>
              <h2 className="text-xl font-bold">Technical Skills</h2>
            </div>

            <div className="overflow-hidden rounded-radius-card border border-border-subtle bg-bg-elevated">
              {TECH_SKILLS.map((group, i) => (
                <div
                  key={group.category}
                  className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-4 ${
                    i < TECH_SKILLS.length - 1 ? "border-b border-border-subtle" : ""
                  }`}
                >
                  <span className="w-28 shrink-0 text-xs font-bold uppercase tracking-wider text-text-muted">
                    {group.category}
                  </span>
                  <span className="text-sm text-text-secondary">{group.items}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}