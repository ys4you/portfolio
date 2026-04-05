import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";
import { SITE_NAME } from "@/constants/navigation";

const socials = [
  { icon: GitHubIcon, href: "https://github.com/", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="page-container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Built with intent.
        </p>

        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-full border border-border-subtle text-text-muted transition-all hover:border-accent hover:text-accent"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
