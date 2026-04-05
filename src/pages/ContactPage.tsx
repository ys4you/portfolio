import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";
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

const INFO_ITEMS = [
  { icon: <Mail size={18} />, label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { icon: <MapPin size={18} />, label: "Location", value: "Breda, Netherlands" },
  { icon: <GitHubIcon size={18} />, label: "GitHub", value: "github.com/yesse", href: "https://github.com/" },
  { icon: <LinkedInIcon size={18} />, label: "LinkedIn", value: "linkedin.com/in/yesse", href: "https://linkedin.com/" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Wire up to a form backend (Formspree, Resend, etc.)
    console.log("Form submitted:", formData);
    setSubmitted(true);
  }

  return (
    <section className="section-gap">
      <div className="page-container">
        <PageHeader
          title="Get in touch"
          accent="."
          subtitle="Have a question, want to collaborate, or just want to say hi? I'd love to hear from you."
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
              Contact info<span className="text-accent">.</span>
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
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-secondary transition-colors hover:text-accent"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-text-secondary">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-radius-card border border-border-subtle bg-bg-elevated p-5">
              <p className="text-sm text-text-secondary leading-relaxed">
                I'm currently open to freelance work, internships, and collaboration on
                interesting game or web projects. Don't hesitate to reach out!
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
                  <h3 className="mb-2 text-xl font-bold">Message sent!</h3>
                  <p className="text-sm text-text-secondary">
                    Thanks for reaching out. I'll get back to you as soon as I can.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-radius-card border border-border-subtle bg-bg-elevated p-6 md:p-8">
                <div className="space-y-5" role="form">
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

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 rounded-radius-pill bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
                  >
                    Send message <Send size={14} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
