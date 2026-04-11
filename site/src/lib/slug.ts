export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function lessonSlugFromFilename(file: string): string {
  const base = file.replace(/\.md$/i, "");
  return slugify(base.replace(/_/g, "-"));
}
