/**
 * find_image_references_with_webp.ts
 *
 * Audit code for any non-WebP raster image references (png, jpg, jpeg, gif, bmp, tif, tiff).
 * Ignores known-good PNG usage like favicons/touch icons by default, and supports a
 * repo-level ignore file `.image-audit-ignore` with one JavaScript RegExp per line.
 *
 * Usage:
 *   # Direct
 *   npx ts-node scripts/find_image_references_with_webp.ts
 *   # Or via npm script
 *   npm run audit:image-refs
 *
 * Optional ignore file:
 *   - Place `.image-audit-ignore` at the repo root. Lines are RegExp patterns, e.g.:
 *       ^_includes/seo-head\.html$
 *       (?:^|/)icons/(?:android-chrome|apple-touch-icon)-\d+\.png$
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');
const CODE_EXTENSIONS = new Set([
  '.md',
  '.html',
  '.js',
  '.ts',
  '.py',
  '.yml',
  '.yaml',
  '.json',
  '.scss',
  '.css'
]);
const EXCLUDE_DIRS = new Set(['_site', 'node_modules', '.git', '_unpublished', '.venv', '__pycache__']);

// Raster image extensions to flag (non-WebP). Exclude svg/ico by default.
const RASTER_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tif', 'tiff'];
const TOKEN_REGEX = new RegExp(
  // capture path-like tokens ending with one of the raster extensions, allowing query/hash suffixes
  `([A-Za-z0-9_@:%+./#?&=\\-]+\\.(?:${RASTER_EXTS.join('|')}))(?:[?#][^'"\s]*)?`,
  'gi'
);

// Built-in ignore patterns for places where PNG is desired (favicons/touch icons, PWA icons)
const BUILTIN_IGNORES: RegExp[] = [
  /(^|[\\/])favicon[^\s'"?]*\.(?:png|ico)\b/i,
  /(^|[\\/])apple-touch-icon[^\s'"?]*\.png\b/i,
  /(^|[\\/])android-chrome-\d+x\d+\.png\b/i,
  /(^|[\\/])mstile-\d+x\d+\.png\b/i,
  /(^|[\\/])icons[\\/](?:android-chrome|apple-touch-icon)[^\s'"?]*\.png\b/i,
  /(^|[\\/])suffering_dashboard_emojis\.png\b/i,
];

function loadUserIgnores(rootDir: string): RegExp[] {
  const patterns: RegExp[] = [];
  const ignorePath = path.join(rootDir, '.image-audit-ignore');
  try {
    if (fs.existsSync(ignorePath)) {
      const lines = fs.readFileSync(ignorePath, 'utf8').split(/\r?\n/);
      for (const raw of lines) {
        const line = raw.trim();
        if (!line || line.startsWith('#')) continue;
        try {
          patterns.push(new RegExp(line));
        } catch (e) {
          console.warn(`[WARN] Invalid regex in .image-audit-ignore: ${line} -> ${(e as Error).message}`);
        }
      }
    }
  } catch (e) {
    console.warn(`[WARN] Could not read .image-audit-ignore: ${(e as Error).message}`);
  }
  return patterns;
}

function shouldExclude(p: string): boolean {
  const parts = new Set(path.normalize(p).split(path.sep).filter(Boolean));
  for (const ex of EXCLUDE_DIRS) {
    if (parts.has(ex)) return true;
  }
  return false;
}

function safeReadDir(dir: string): fs.Dirent[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function searchNonWebpReferences(rootDir: string) {
  const userIgnores = loadUserIgnores(rootDir);

  function isIgnored(token: string, fileRel: string, line: string): boolean {
    for (const rx of BUILTIN_IGNORES) if (rx.test(token) || rx.test(fileRel) || rx.test(line)) return true;
    for (const rx of userIgnores) if (rx.test(token) || rx.test(fileRel) || rx.test(line)) return true;
    return false;
  }

  // file -> array of { lineNumber, token }
  const results = new Map<string, Array<{ lineNumber: number; token: string }>>();

  function record(rel: string, lineNumber: number, token: string) {
    const arr = results.get(rel) ?? [];
    arr.push({ lineNumber, token });
    results.set(rel, arr);
  }

  function walk(dir: string) {
    if (shouldExclude(dir)) return;
    const entries = safeReadDir(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (!CODE_EXTENSIONS.has(ext)) continue;
      try {
        const content = fs.readFileSync(full, 'utf8');
        const lines = content.split(/\r?\n/);
        const rel = path.relative(ROOT, full);
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          TOKEN_REGEX.lastIndex = 0; // reset global regex
          let match: RegExpExecArray | null;
          while ((match = TOKEN_REGEX.exec(line)) !== null) {
            const token = match[1];
            const lower = token.toLowerCase();
            if (lower.endsWith('.webp')) continue; // skip explicit webp
            if (isIgnored(token, rel, line)) continue;
            record(rel, i + 1, token);
            break; // once per line for cleanliness
          }
        }
      } catch (e) {
        console.warn(`[WARN] Could not read ${full}: ${(e as Error).message}`);
      }
    }
  }

  walk(rootDir);

  if (results.size === 0) {
    console.log('No non-WebP raster image references found (after ignores).');
    return;
  }

  // Print grouped, sorted output
  let totalRefs = 0;
  const files = Array.from(results.keys()).sort((a, b) => a.localeCompare(b));
  for (const f of files) totalRefs += results.get(f)!.length;

  console.log(`References to non-WebP raster images (png/jpg/jpeg/gif/bmp/tif/tiff): ${totalRefs} refs in ${files.length} files`);
  for (const rel of files) {
    const entries = results.get(rel)!;
    entries.sort((a, b) => a.lineNumber - b.lineNumber);
    console.log(`- ${rel} (${entries.length})`);
    for (const r of entries) {
      console.log(`  - L${r.lineNumber}: ${r.token}`);
    }
  }
}

function main() {
  searchNonWebpReferences(ROOT);
}

main();
