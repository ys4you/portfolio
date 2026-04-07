import { GitHubIcon } from "@/components/icons/BrandIcons";
import { useTheme } from "@/hooks/useTheme";

interface GitHubActivityProps {
  username: string;
  accentColor?: string;
}

export default function GitHubActivity({
  username,
  accentColor = "2dd4bf",
}: GitHubActivityProps) {
  const { theme } = useTheme();
  const profileUrl = `https://github.com/${username}`;
  const chartUrl = `https://ghchart.rshah.org/${accentColor}/${username}`;

  return (
    <div className="rounded-radius-card border border-border-subtle bg-bg-elevated p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitHubIcon size={18} className="text-text-muted" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">
            GitHub Activity
          </h3>
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-text-muted transition-colors hover:text-accent"
        >
          @{username}
        </a>
      </div>

      <div className="overflow-x-auto">
        <img
          src={chartUrl}
          alt={`${username}'s GitHub contribution graph`}
          loading="lazy"
          className="w-full min-w-[680px]"
          style={
            theme === "dark"
              ? { filter: "invert(1) hue-rotate(180deg)", opacity: 0.9 }
              : undefined
          }
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const fallback = target.nextElementSibling;
            if (fallback) (fallback as HTMLElement).style.display = "block";
          }}
        />
        <div className="hidden py-6 text-center">
          <p className="text-sm text-text-muted">
            Couldn't load the contribution graph.{" "}
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}