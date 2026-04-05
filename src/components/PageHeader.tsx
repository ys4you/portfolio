import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string; // highlighted portion of the title
}

export default function PageHeader({ title, subtitle, accent }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 md:mb-16"
    >
      <h1 className="text-4xl font-bold md:text-6xl">
        {title}
        {accent && <span className="text-accent">{accent}</span>}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-text-secondary">{subtitle}</p>
      )}
    </motion.div>
  );
}
