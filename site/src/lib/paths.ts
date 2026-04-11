import * as path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "../..");

export const DART_CONTENT_ROOT = path.resolve(siteRoot, "../dart");
