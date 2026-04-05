import { useState, useEffect } from "react";
import { Highlight, Prism, themes } from "prism-react-renderer";
import { Copy, Check } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

// Register additional languages not included by default
(typeof globalThis !== "undefined" ? globalThis : window).Prism = Prism;

async function loadLanguages() {
  // @ts-expect-error — dynamic import of Prism language grammars
  await import("prismjs/components/prism-csharp");
  // @ts-expect-error
  await import("prismjs/components/prism-cpp");
  // @ts-expect-error
  await import("prismjs/components/prism-python");
  // @ts-expect-error
  await import("prismjs/components/prism-glsl");
  // @ts-expect-error
  await import("prismjs/components/prism-bash");
  // @ts-expect-error
  await import("prismjs/components/prism-sql");
  // @ts-expect-error
  await import("prismjs/components/prism-json");
  // PHP requires markup-templating which requires markup — load in order
  // @ts-expect-error
  await import("prismjs/components/prism-markup-templating");
  // @ts-expect-error
  await import("prismjs/components/prism-php");
}

const langReady = loadLanguages();

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  title?: string;
}

const LANG_MAP: Record<string, string> = {
  csharp: "csharp",
  "c#": "csharp",
  cs: "csharp",
  cpp: "cpp",
  "c++": "cpp",
  c: "cpp",
  ts: "typescript",
  tsx: "tsx",
  js: "javascript",
  jsx: "jsx",
  py: "python",
  python: "python",
  glsl: "glsl",
  hlsl: "glsl",
  json: "json",
  xml: "markup",
  html: "markup",
  css: "css",
  bash: "bash",
  sh: "bash",
  sql: "sql",
  php: "php",
};

export default function CodeBlock({ code, language, filename, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const { theme: siteTheme } = useTheme();

  const isDark = siteTheme === "dark";
  const codeTheme = isDark ? themes.nightOwl : themes.github;
  const bgColor = isDark ? "#011627" : "#ffffff";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const mutedColor = isDark ? "rgba(209,213,218,0.5)" : "rgba(100,100,100,0.6)";
  const lineNumColor = isDark ? "rgba(209,213,218,0.25)" : "rgba(0,0,0,0.2)";
  const plainTextColor = isDark ? "#d6deeb" : "#24292e";

  useEffect(() => {
    langReady.then(() => setReady(true));
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const prismLang = LANG_MAP[language.toLowerCase()] || language.toLowerCase();
  const trimmedCode = code.trim();

  return (
    <div className="my-6 overflow-hidden rounded-radius-card border" style={{ background: bgColor, borderColor }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: `1px solid ${borderColor}` }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-xs" style={{ color: mutedColor }}>
            {filename || title || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-radius-sm px-2 py-1 text-xs transition-colors hover:text-accent"
          style={{ color: mutedColor }}
          aria-label="Copy code"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Highlighted code */}
      {ready ? (
        <Highlight
          theme={codeTheme}
          code={trimmedCode}
          language={prismLang}
          prism={Prism}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <div className="overflow-x-auto p-4" style={{ background: bgColor }}>
              <pre className="font-mono text-sm leading-relaxed" style={{ background: "transparent" }}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })} className="flex">
                    <span className="mr-4 inline-block w-8 select-none text-right" style={{ color: lineNumColor }}>
                      {i + 1}
                    </span>
                    <span>
                      {line.map((token, j) => (
                        <span key={j} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          )}
        </Highlight>
      ) : (
        <div className="overflow-x-auto p-4" style={{ background: bgColor }}>
          <pre className="font-mono text-sm leading-relaxed" style={{ color: plainTextColor }}>
            <code>{trimmedCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}