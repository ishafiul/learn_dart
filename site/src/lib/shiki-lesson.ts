import { getSingletonHighlighter, type Highlighter } from "shiki";

const THEME = "vitesse-dark" as const;

const LANGS = [
  "dart",
  "javascript",
  "typescript",
  "json",
  "jsonc",
  "yaml",
  "bash",
  "shellscript",
  "shellsession",
  "markdown",
  "html",
  "css",
  "scss",
  "diff",
  "xml",
  "sql",
  "kotlin",
  "java",
  "swift",
  "regex",
] as const;

let highlighterPromise: Promise<Highlighter> | null = null;

export async function ensureLessonHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= getSingletonHighlighter({
    themes: [THEME],
    langs: [...LANGS],
  });
  return highlighterPromise;
}

function normalizeLang(lang: string | undefined): string {
  if (!lang?.trim()) return "markdown";
  const l = lang.trim().toLowerCase();
  const map: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    yml: "yaml",
    sh: "bash",
    zsh: "bash",
    console: "shellsession",
    terminal: "shellsession",
    txt: "markdown",
  };
  return map[l] ?? l;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function highlightCodeSync(hl: Highlighter, code: string, lang: string | undefined): string {
  const normalized = normalizeLang(lang);
  const body = code.replace(/\n$/, "");
  try {
    return hl.codeToHtml(body, { lang: normalized, theme: THEME });
  } catch {
    try {
      return hl.codeToHtml(body, { lang: "markdown", theme: THEME });
    } catch {
      return `<pre class="shiki-fallback" tabindex="0"><code>${escapeHtml(body)}</code></pre>`;
    }
  }
}
