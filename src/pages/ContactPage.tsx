import { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileText } from "lucide-react";
import { GitHubIcon, LinkedInIcon, ItchIcon } from "@/components/icons/BrandIcons";
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

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "24664c4d-8c11-44c6-9c97-d4dc93bc58ca";

// Email is split to prevent scraping from built JS
function getEmail() {
  const parts = ["yesse", "seijn", "gmail", "com"];
  return `${parts[0]}.${parts[1]}@${parts[2]}.${parts[3]}`;
}

const INFO_ITEMS = [
  {
    icon: <GitHubIcon size={18} />,
    label: "GitHub",
    value: "ys4you",
    href: "https://github.com/ys4you/",
  },
  {
    icon: <LinkedInIcon size={18} />,
    label: "LinkedIn",
    value: "Yesse Seijnaeve",
    href: "https://www.linkedin.com/in/yesse-seijnaeve/",
  },
  {
    icon: <ItchIcon size={18} />,
    label: "itch.io",
    value: "ysproductions",
    href: "https://ysproductions.itch.io/",
  },
  {
    icon: <FileText size={18} />,
    label: "Email & Location",
    value: "Available on my resume",
    href: "/resume",
    internal: true,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    const { name, email, message } = formData;
    if (!name || !email || !message) return;

    setSubmitting(true);
    setError("");

    try {
      if (WEB3FORMS_KEY) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name,
            email,
            message,
            subject: `Portfolio Contact from ${name}`,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setSubmitted(true);
          return;
        }
        setError("Something went wrong. Please try reaching out via LinkedIn.");
        return;
      }

      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${getEmail()}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } catch {
      setError("Network error. Please try reaching out via LinkedIn.");
    } finally {
      setSubmitting(false);
    }
  }

  const hasFormService = !!WEB3FORMS_KEY;

  return (
    <section className="section-gap">
      <SEO
        title="Contact"
        description="Want to work together or just say hi? Reach out here."
      />
      <div className="page-container">
        <PageHeader
          title="Get in touch"
          accent="."
          subtitle="Got a question or want to work on something together? Let me know."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid gap-12 lg:grid-cols-5"
        >
          {/* ── Contact info ── */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <h2 className="mb-6 text-xl font-bold">
              Find me here<span className="text-accent">.</span>
            </h2>

            <div className="space-y-5">
              {INFO_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-radius-sm bg-accent-subtle text-accent">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                      {item.label}
                    </p>
                    {item.internal ? (
                      <a
                        href={item.href}
                        className="text-sm text-text-secondary transition-colors hover:text-accent"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-secondary transition-colors hover:text-accent"
                      >
                        {item.value}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-radius-card border border-border-subtle bg-bg-elevated p-5">
              <p className="text-sm text-text-secondary leading-relaxed">
                I'm always down to work on cool projects. Whether it's a game, a web app,
                or something completely different - just hit me up!
              </p>
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            {submitted ? (
              <div className="flex h-full items-center justify-center rounded-radius-card border border-accent/20 bg-accent-subtle p-12 text-center">
                <div>
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-accent/20 text-accent">
                    <Send size={24} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">
                    {hasFormService ? "Message sent!" : "Email client opened!"}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {hasFormService
                      ? "Thanks for reaching out. I'll get back to you as soon as I can."
                      : "Please send the pre-filled email to complete your message. You can also reach me on LinkedIn."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-radius-card border border-border-subtle bg-bg-elevated p-6 md:p-8">
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full rounded-radius-sm border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none transition-colors focus:border-accent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-radius-sm border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none transition-colors focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project or idea..."
                      className="w-full resize-none rounded-radius-sm border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none transition-colors focus:border-accent"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-radius-pill bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:bg-accent-hover hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50"
                  >
                    {submitting ? "Sending..." : "Send message"} <Send size={14} />
                  </button>

                  {!hasFormService && (
                    <p className="text-xs text-text-muted">
                      This will open your email client with a pre-filled message.
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}