export type RoadmapLevel = {
  number: number;
  title: string;
  summary: string;
};

export function parseRoadmapLevels(source: string): RoadmapLevel[] {
  const levels: RoadmapLevel[] = [];
  const re = /^## (Level \d+[^#\n]+)$/gim;
  let m: RegExpExecArray | null;
  const matches: { index: number; heading: string }[] = [];
  while ((m = re.exec(source)) !== null) {
    matches.push({ index: m.index, heading: m[1].trim() });
  }
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = matches[i + 1]?.index ?? source.length;
    const block = source.slice(start, end);
    const numMatch = matches[i].heading.match(/^Level (\d+)/i);
    const number = numMatch ? Number(numMatch[1]) : i;
    const titleLine = matches[i].heading
      .replace(/^Level\s+\d+\s*/i, "")
      .replace(/^(?:—|-|–)\s*/, "")
      .trim();
    const summary = block
      .split("\n")
      .filter((l) => l.startsWith("- "))
      .slice(0, 4)
      .join(" ")
      .replace(/^-\s*/gm, "")
      .slice(0, 220);
    levels.push({
      number,
      title: titleLine || matches[i].heading,
      summary: summary || "",
    });
  }
  return levels;
}
