import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import GitHubActivity from "@/components/GitHubActivity";
import DiscordPresence from "@/components/DiscordPresence";
import { IMG } from "@/data/projects";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const INTERESTS = [
  { emoji: "🎮", label: "Building game engines" },
  { emoji: "🧠", label: "Learning new tech fast" },
  { emoji: "⚙️", label: "Making tools that save time" },
  { emoji: "🌐", label: "Web apps & dashboards" },
  { emoji: "🔧", label: "Automating boring stuff" },
  { emoji: "📐", label: "Writing clean code" },
];

export default function AboutPage() {
  return (
    <section className="section-gap">
      <SEO
        title="About"
        description="Game dev student and web developer. Building games and shipping web apps."
      />
      <div className="page-container">
        <PageHeader
          title="About me"
          accent="."
          subtitle="The person behind the code."
        />

        {/* ── Bio ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mb-20 grid items-start gap-12 lg:grid-cols-5"
        >
          <motion.div
            variants={fadeUp}
            className="aspect-[4/5] w-full overflow-hidden rounded-radius-card border border-border-subtle bg-surface lg:col-span-2"
          >
            <img
              src={IMG.aboutMe}
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
                Hello there! I'm Yesse, a{" "}
                <span className="font-semibold text-text">
                  {Math.floor(
                    (Date.now() - new Date("2006-03-14").getTime()) /
                      (365.25 * 24 * 60 * 60 * 1000)
                  )}
                </span>
                -year-old developer with over{" "}
                <span className="font-semibold text-text">
                  {Math.floor(
                    (Date.now() - new Date("2022-01-01").getTime()) /
                      (365.25 * 24 * 60 * 60 * 1000)
                  )}
                </span>{" "}
                years of experience writing code. Ever since I was a kid, I was someone
                who liked to understand how things worked under the hood. That curiosity
                led me to game development, where I love to create, design, and publish
                my code and its creations.
              </p>
              <p>
                My journey started at{" "}
                <a href="https://www.glu.nl/" target="_blank" rel="noopener noreferrer" className="font-medium text-text underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent">
                  Grafisch Lyceum Utrecht
                </a>
                , where I finished my MBO 4
                in just 3 years instead of 4. Purely because I couldn't wait to get to
                the next challenge. This school also led me to my current job at{" "}
                <a href="https://jgwebmarketing.nl/" target="_blank" rel="noopener noreferrer" className="font-medium text-text underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent">
                  JG Webmarketing
                </a>
                , where I mainly create tools for the marketing side so their
                workflow becomes easier. I also build new tools for our clients and help
                out with marketing when the workload gets heavy.
              </p>
              <p>
                Now I'm studying Creative Media and Game Technologies at{" "}
                <a href="https://www.buas.nl/" target="_blank" rel="noopener noreferrer" className="font-medium text-text underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent">
                  Breda University of Applied Sciences
                </a>
                , going deeper into C++ and engine development.
              </p>
              <p>
                I like how much of a generalist I've become. One day I'm debugging a game
                for school, and the next day I'm shipping a new React app. I don't want
                to pick a lane. I want to build whatever needs building and do it well.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── What drives me ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">
            What I'm into<span className="text-accent">.</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTERESTS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-radius-card border border-border-subtle bg-bg-elevated p-4"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm text-text-secondary">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Activity ── */}
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

        {/* ── CTA to Resume ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-radius-card border border-border-subtle bg-bg-elevated p-8 text-center"
        >
          <h2 className="mb-2 text-xl font-bold">
            Want the formal version<span className="text-accent">?</span>
          </h2>
          <p className="mb-5 text-sm text-text-secondary">
            My resume has all the details - experience, education, and skills.
          </p>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 rounded-radius-pill bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
          >
            View Resume <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}