import { marked } from "marked";
import type { Highlighter } from "shiki";
import type { Tokens } from "marked";
import { ensureLessonHighlighter, highlightCodeSync } from "./shiki-lesson";

marked.setOptions({
  gfm: true,
  breaks: false,
});

let hlForParse: Highlighter | null = null;

marked.use({
  renderer: {
    code({ text, lang }: Tokens.Code): string {
      if (!hlForParse) {
        throw new Error("Highlighter not initialized before markdown parse");
      }
      return highlightCodeSync(hlForParse, text, lang);
    },
  },
});

export type LessonSlide = {
  heading: string;
  html: string;
  markdown: string;
};

export type ParsedLesson = {
  title: string;
  slides: LessonSlide[];
};

async function parseMarkdownToHtml(md: string): Promise<string> {
  hlForParse = await ensureLessonHighlighter();
  const out = marked.parse(md) as string;
  return out;
}

export async function parseLessonMarkdown(source: string): Promise<ParsedLesson> {
  const titleMatch = source.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1]?.trim() ?? "Lesson";
  let body = source.replace(/^#\s+[^\n]+\n*/m, "").trim();

  if (!body) {
    return {
      title,
      slides: [
        {
          heading: title,
          html: await parseMarkdownToHtml(source),
          markdown: source,
        },
      ],
    };
  }

  const chunks = body
    .split(/(?=^##\s)/m)
    .map((c) => c.trim())
    .filter(Boolean);

  const slides: LessonSlide[] = await Promise.all(
    chunks.map(async (chunk) => {
      const hm = chunk.match(/^##\s+(.+?)\s*$/m);
      const heading = hm?.[1]?.trim() ?? "Slide";
      return {
        heading,
        html: await parseMarkdownToHtml(chunk),
        markdown: chunk,
      };
    }),
  );

  if (slides.length === 0) {
    return {
      title,
      slides: [
        {
          heading: title,
          html: await parseMarkdownToHtml(body),
          markdown: body,
        },
      ],
    };
  }

  return { title, slides };
}
