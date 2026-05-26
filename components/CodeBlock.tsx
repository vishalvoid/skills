import { codeToHtml } from "shiki";
import CopyCodeButton from "@/components/CopyCodeButton";

type SupportedLang =
  | "typescript"
  | "tsx"
  | "jsx"
  | "javascript"
  | "css"
  | "bash"
  | "json"
  | "text";

function normalizeLang(lang?: string): SupportedLang {
  const map: Record<string, SupportedLang> = {
    tsx: "tsx",
    jsx: "jsx",
    js: "javascript",
    javascript: "javascript",
    css: "css",
    bash: "bash",
    sh: "bash",
    json: "json",
    typescript: "typescript",
    ts: "typescript",
  };
  return map[lang ?? ""] ?? "typescript";
}

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default async function CodeBlock({
  code,
  language,
  filename,
}: CodeBlockProps) {
  const lang = normalizeLang(language);

  const [lightHtml, darkHtml] = await Promise.all([
    codeToHtml(code.trim(), {
      lang,
      theme: "github-light",
      transformers: [
        {
          pre(node) {
            node.properties.style =
              "background:#f9f9f9;margin:0;padding:1rem;overflow-x:auto;font-size:0.75rem;line-height:1.7;";
          },
          code(node) {
            node.properties.style =
              "font-family:var(--font-geist-mono),ui-monospace,monospace;";
          },
        },
      ],
    }),
    codeToHtml(code.trim(), {
      lang,
      theme: "github-dark",
      transformers: [
        {
          pre(node) {
            node.properties.style =
              "background:#0d0d0d;margin:0;padding:1rem;overflow-x:auto;font-size:0.75rem;line-height:1.7;";
          },
          code(node) {
            node.properties.style =
              "font-family:var(--font-geist-mono),ui-monospace,monospace;";
          },
        },
      ],
    }),
  ]);

  return (
    <div className="rounded-md border border-black/10 dark:border-white/20 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#f4f4f4] dark:bg-[#0d0d0d] border-b border-black/8 dark:border-white/15">
        <span className="font-mono text-[10px] text-black/35 dark:text-[#444]">
          {filename ?? language ?? "code"}
        </span>
        <CopyCodeButton code={code.trim()} />
      </div>
      {/* Light mode */}
      <div
        className="block dark:hidden [&_pre]:!bg-[#f9f9f9]"
        dangerouslySetInnerHTML={{ __html: lightHtml }}
      />
      {/* Dark mode */}
      <div
        className="hidden dark:block [&_pre]:!bg-[#0d0d0d]"
        dangerouslySetInnerHTML={{ __html: darkHtml }}
      />
    </div>
  );
}
