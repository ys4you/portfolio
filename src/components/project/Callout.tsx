import { Info, AlertTriangle, StickyNote } from "lucide-react";

interface CalloutProps {
  content: string;
  variant?: "info" | "warning" | "note";
}

const VARIANTS = {
  info: { icon: Info, border: "border-accent/30", bg: "bg-accent-subtle", text: "text-accent" },
  warning: { icon: AlertTriangle, border: "border-yellow-500/30", bg: "bg-yellow-500/5", text: "text-yellow-500" },
  note: { icon: StickyNote, border: "border-text-muted/30", bg: "bg-surface", text: "text-text-muted" },
} as const;

export default function Callout({ content, variant = "note" }: CalloutProps) {
  const v = VARIANTS[variant];
  const Icon = v.icon;

  return (
    <div className={`my-6 flex gap-3 rounded-radius-card border ${v.border} ${v.bg} p-4`}>
      <Icon size={18} className={`mt-0.5 shrink-0 ${v.text}`} />
      <p className="text-sm text-text-secondary leading-relaxed">{content}</p>
    </div>
  );
}
