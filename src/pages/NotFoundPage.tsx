import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="section-gap">
      <div className="page-container flex min-h-[60dvh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-8xl font-bold text-accent md:text-[10rem]">
            404
          </h1>
          <p className="mt-2 text-lg text-text-secondary">
            This page doesn't exist - or maybe it wandered off.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-radius-pill border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}