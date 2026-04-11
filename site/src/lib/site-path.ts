export function sitePath(path: string): string {
  const trimmed = path.replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL ?? "/";
  if (base === "/") {
    return `/${trimmed}`;
  }
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return prefix + trimmed;
}

export function pathnameAfterBase(pathname: string): string {
  const baseRaw = import.meta.env.BASE_URL ?? "/";
  if (baseRaw === "/") {
    return pathname || "/";
  }
  const base = baseRaw.endsWith("/") ? baseRaw.slice(0, -1) : baseRaw;
  if (!pathname || pathname === base || pathname === `${base}/`) {
    return "/";
  }
  if (pathname.startsWith(`${base}/`)) {
    return `/${pathname.slice(base.length + 1)}`;
  }
  if (pathname.startsWith(base)) {
    const tail = pathname.slice(base.length);
    return tail.startsWith("/") ? tail : `/${tail}`;
  }
  return pathname;
}
