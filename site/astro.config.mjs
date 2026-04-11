import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

function normalizeBase(raw) {
  const v = (raw ?? "/learn-dart-flutter/").trim();
  if (!v || v === "/") return "/";
  let s = v.startsWith("/") ? v : `/${v}`;
  if (!s.endsWith("/")) s += "/";
  return s;
}

const site = process.env.PUBLIC_SITE_URL ?? "https://shafi.dev/learn-dart-flutter";
const base = normalizeBase(process.env.BASE_PATH ?? process.env.PUBLIC_BASE_PATH);

export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
});
