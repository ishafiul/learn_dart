export function parseReadmeLessonOrder(readmeSource: string): string[] {
  const order: string[] = [];
  const re = /\|\s*\d+\s*\|\s*\[([^\]]+\.md)\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(readmeSource)) !== null) {
    order.push(m[1]);
  }
  return order;
}
