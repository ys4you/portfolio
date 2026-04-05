import type { ProjectSection } from "@/types";
import CodeBlock from "./CodeBlock";
import RemoteCodeBlock from "./RemoteCodeBlock";
import Callout from "./Callout";
import ImageGallery from "./ImageGallery";

interface Props {
  section: ProjectSection;
}

export default function SectionRenderer({ section }: Props) {
  switch (section.type) {
    case "text":
      return (
        <div className="my-8">
          {section.title && (
            <h2 className="mb-3 text-2xl font-bold">{section.title}</h2>
          )}
          <p className="text-text-secondary leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
        </div>
      );

    case "code":
      return (
        <div className="my-8">
          {section.title && (
            <h2 className="mb-3 text-2xl font-bold">{section.title}</h2>
          )}
          <CodeBlock
            code={section.code}
            language={section.language}
            filename={section.filename}
          />
        </div>
      );

    case "code-remote":
      return (
        <RemoteCodeBlock
          src={section.src}
          language={section.language}
          filename={section.filename}
          title={section.title}
        />
      );

    case "image":
      return (
        <div className="my-8">
          <div className="overflow-hidden rounded-radius-card border border-border-subtle bg-surface">
            <img
              src={section.src}
              alt={section.alt}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
          {section.caption && (
            <p className="mt-2 text-center text-xs text-text-muted">{section.caption}</p>
          )}
        </div>
      );

    case "gallery":
      return <ImageGallery images={section.images} />;

    case "video":
      return (
        <div className="my-8">
          {section.title && (
            <h2 className="mb-3 text-2xl font-bold">{section.title}</h2>
          )}
          <div className="aspect-video overflow-hidden rounded-radius-card border border-border-subtle bg-surface">
            <video
              src={section.src}
              controls
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      );

    case "callout":
      return <Callout content={section.content} variant={section.variant} />;

    default:
      return null;
  }
}