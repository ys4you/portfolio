import { useState, useEffect } from "react";
import CodeBlock from "./CodeBlock";

interface RemoteCodeBlockProps {
  src: string;
  language: string;
  filename?: string;
  title?: string;
}

export default function RemoteCodeBlock({ src, language, filename, title }: RemoteCodeBlockProps) {
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState(false);

  // Derive filename from URL if not provided
  const derivedFilename = filename || src.split("/").pop() || "source";

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setCode(text);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => { cancelled = true; };
  }, [src]);

  if (error) {
    return (
      <div className="my-6 rounded-radius-card border border-border-subtle bg-bg-elevated p-4">
        {title && <h2 className="mb-3 text-2xl font-bold">{title}</h2>}
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span>Failed to load</span>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            {derivedFilename}
          </a>
        </div>
      </div>
    );
  }

  if (code === null) {
    return (
      <div className="my-6">
        {title && <h2 className="mb-3 text-2xl font-bold">{title}</h2>}
        <div className="animate-pulse rounded-radius-card border border-border-subtle bg-bg-elevated p-6">
          <div className="mb-2 h-3 w-32 rounded bg-surface" />
          <div className="mb-2 h-3 w-full rounded bg-surface" />
          <div className="mb-2 h-3 w-4/5 rounded bg-surface" />
          <div className="h-3 w-3/5 rounded bg-surface" />
        </div>
      </div>
    );
  }

  return (
    <div className="my-8">
      {title && <h2 className="mb-3 text-2xl font-bold">{title}</h2>}
      <CodeBlock code={code} language={language} filename={derivedFilename} />
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block text-xs text-text-muted transition-colors hover:text-accent"
      >
        View on GitHub →
      </a>
    </div>
  );
}
