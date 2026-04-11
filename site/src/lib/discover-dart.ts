import * as fs from "node:fs";
import * as path from "node:path";
import { DART_CONTENT_ROOT } from "./paths";
import { sitePath } from "./site-path";
import { lessonSlugFromFilename, slugify } from "./slug";
import { parseReadmeLessonOrder } from "./readme-order";

export type LessonRef = {
  filename: string;
  slug: string;
  absPath: string;
};

export type DartLevel = {
  number: number;
  folderName: string;
  levelSlug: string;
  title: string;
  lessons: LessonRef[];
};

function parseLevelFolderName(name: string): { number: number; title: string } | null {
  const levelMatch = name.match(/^Level\s+(\d+)\s*[-–—]\s*(.+)$/i);
  if (levelMatch) {
    return { number: Number(levelMatch[1]), title: levelMatch[2].trim() };
  }
  if (/^setup/i.test(name)) {
    return { number: 0, title: "Setup + how code runs" };
  }
  return null;
}

function makeLevelSlug(n: number, title: string) {
  return `${n}-${slugify(title)}`;
}

export function discoverDartLevels(): DartLevel[] {
  if (!fs.existsSync(DART_CONTENT_ROOT)) {
    return [];
  }
  const entries = fs.readdirSync(DART_CONTENT_ROOT, { withFileTypes: true });
  const levels: DartLevel[] = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const folderName = e.name;
    const parsed = parseLevelFolderName(folderName);
    if (!parsed) continue;
    const dir = path.join(DART_CONTENT_ROOT, folderName);
    const readmePath = path.join(dir, "README.md");
    let order: string[] = [];
    if (fs.existsSync(readmePath)) {
      order = parseReadmeLessonOrder(fs.readFileSync(readmePath, "utf8"));
    }
    const allMd = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    const orderedSet = new Set(order);
    const rest = allMd
      .filter((f) => f !== "README.md" && !orderedSet.has(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const finalOrder = [
      ...order.filter((f) => allMd.includes(f)),
      ...rest,
    ];
    levels.push({
      number: parsed.number,
      folderName,
      levelSlug: makeLevelSlug(parsed.number, parsed.title),
      title: parsed.title,
      lessons: finalOrder.map((filename) => ({
        filename,
        slug: lessonSlugFromFilename(filename),
        absPath: path.join(dir, filename),
      })),
    });
  }
  levels.sort((a, b) => a.number - b.number);
  return levels;
}

export function loadLessonSource(absPath: string) {
  return fs.readFileSync(absPath, "utf8");
}

export type SeqEntry = {
  levelSlug: string;
  lessonSlug: string;
  href: string;
};

export function getFlatLessonSequence(levels: DartLevel[]): SeqEntry[] {
  const seq: SeqEntry[] = [];
  for (const L of levels) {
    for (const lesson of L.lessons) {
      seq.push({
        levelSlug: L.levelSlug,
        lessonSlug: lesson.slug,
        href: sitePath(`/dart/level/${L.levelSlug}/${lesson.slug}`),
      });
    }
  }
  return seq;
}

export function findNextLesson(
  levels: DartLevel[],
  levelSlug: string,
  lessonSlug: string,
): SeqEntry | null {
  const seq = getFlatLessonSequence(levels);
  const i = seq.findIndex(
    (x) => x.levelSlug === levelSlug && x.lessonSlug === lessonSlug,
  );
  if (i < 0 || i >= seq.length - 1) return null;
  return seq[i + 1];
}

export function firstLessonHref(levels: DartLevel[]): string | null {
  const seq = getFlatLessonSequence(levels);
  return seq[0]?.href ?? null;
}
