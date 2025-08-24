/**
 * image_audit.ts
 *
 * Unified image audit tool:
 * - Missing WebP mode: find raster images (png/jpg/jpeg/gif/bmp/tif/tiff) that lack a .webp sibling in the same directory.
 * - References mode: find code references to non-WebP raster images, with built-in ignores for favicons/touch icons
 *   and support for a repo-level .image-audit-ignore regex file.
 *
 * Usage:
 *   # Run both checks
 *   npx ts-node scripts/image_audit.ts
 *
 *   # Only missing-webp scan
 *   npx ts-node scripts/image_audit.ts --missing-webp
 *
 *   # Only references scan
 *   npx ts-node scripts/image_audit.ts --references
 *
 *   # Optional: JSON output (combined results)
 *   npx ts-node scripts/image_audit.ts --json
 *
 *   # Optional: limit to a subdirectory
 *   npx ts-node scripts/image_audit.ts --dir assets/images
 *
 *   # Optional: print suggested cwebp commands for missing webp pairs
 *   npx ts-node scripts/image_audit.ts --missing-webp --suggest --quality 90
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

// Raster image extensions we care about for audits (non-WebP). We intentionally exclude svg/ico.
const RASTER_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tif', 'tiff'];

// For references: capture path-like tokens ending with one of the raster extensions, allowing query/hash suffixes
const TOKEN_REGEX = new RegExp(
  `([A-Za-z0-9_@:%+./#?&=\\-]+\\.(?:${RASTER_EXTS.join('|')}))(?:[?#][^'"\\s]*)?`,
  'gi'
);

// Built-in ignore patterns for places where PNG is desired (favicons/touch icons, PWA icons, specific markdown asset)
const BUILTIN_IGNORES: RegExp[] = [
  /(^|[\\/])favicon[^\s'"?]*\.(?:png|ico)\b/i,
  /(^|[\\/])apple-touch-icon[^\s'"?]*\.png\b/i,
  /(^|[\\/])android-chrome-\d+x\d+\.png\b/i,
  /(^|[\\/])mstile-\d+x\d+\.png\b/i,
  /(^|[\\/])icons[\\/](?:android-chrome|apple-touch-icon)[^\s'"?]*\.png\b/i,
  /(^|[\\/])suffering_dashboard_emojis\.png\b/i,
];

function parseArgs(argv: string[]) {
  const args = new Set<string>();
  let dir: string | undefined;
  let json = false;
  let suggest = false;
  let quality: number | undefined;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--missing-webp' || a === '--references') args.add(a);
    else if (a === '--json') json = true;
    else if (a === '--dir') {
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        dir = next; i++;
      }
    } else if (a === '--suggest') {
      suggest = true;
    } else if (a === '--quality') {
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        const q = Number(next);
        if (!Number.isNaN(q) && q > 0 && q <= 100) quality = Math.floor(q);
        i++;
      }
    }
  }
  return { args, dir, json, suggest, quality };
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

function walkFiles(startDir: string, fileFilter?: (entry: fs.Dirent, full: string) => boolean): string[] {
  const out: string[] = [];
  function walk(dir: string) {
    if (shouldExclude(dir)) return;
    const entries = safeReadDir(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (!fileFilter || fileFilter(entry, full)) {
        out.push(full);
      }
    }
  }
  walk(startDir);
  return out;
}

// Load repo-level user ignore regexes for references
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

// Mode 1: find images missing .webp sibling
function auditMissingWebp(startDir: string) {
  const results: Array<{ source: string; expectedWebp: string }> = [];
  const files = walkFiles(startDir, (_entry, full) => {
    const ext = path.extname(full).toLowerCase().replace(/^\./, '');
    return RASTER_EXTS.includes(ext) || ext === 'webp';
  });

  // Group by directory, check for basename.webp presence
  const byDir = new Map<string, Set<string>>(); // dir -> set of filenames
  for (const f of files) {
    const dir = path.dirname(f);
    const name = path.basename(f);
    const set = byDir.get(dir) ?? new Set<string>();
    set.add(name);
    byDir.set(dir, set);
  }

  for (const [dir, names] of byDir) {
    // Build quick lookup of .webp basenames
    const webpBases = new Set<string>();
    for (const n of names) {
      if (n.toLowerCase().endsWith('.webp')) {
        webpBases.add(path.parse(n).name);
      }
    }
    for (const n of names) {
      const ext = path.extname(n).toLowerCase();
      if (ext === '.webp') continue; // skip webp itself
      const base = path.parse(n).name;
      if (!webpBases.has(base)) {
        const full = path.join(dir, n);
        const expected = path.join(dir, `${base}.webp`);
        const rel = path.relative(ROOT, full);
        const relWebp = path.relative(ROOT, expected);
        results.push({ source: rel, expectedWebp: relWebp });
      }
    }
  }

  // Pretty print
  if (results.length === 0) {
    console.log('No missing .webp siblings found.');
  } else {
    console.log(`Images missing .webp siblings: ${results.length}`);
    // Group by directory for readability
    const byFolder = new Map<string, Array<{ source: string; expectedWebp: string }>>();
    for (const r of results) {
      const folder = path.dirname(r.source) || '.';
      const arr = byFolder.get(folder) ?? [];
      arr.push(r);
      byFolder.set(folder, arr);
    }
    const folders = Array.from(byFolder.keys()).sort((a, b) => a.localeCompare(b));
    for (const folder of folders) {
      const arr = byFolder.get(folder)!;
      console.log(`- ${folder} (${arr.length})`);
      for (const r of arr) {
        console.log(`  - ${path.basename(r.source)} -> ${r.expectedWebp}`);
      }
    }
  }

  return results;
}

// Mode 2: search for non-WebP references in code
function auditReferences(startDir: string) {
  const userIgnores = loadUserIgnores(ROOT);

  function isIgnored(token: string, fileRel: string, line: string): boolean {
    for (const rx of BUILTIN_IGNORES) if (rx.test(token) || rx.test(fileRel) || rx.test(line)) return true;
    for (const rx of userIgnores) if (rx.test(token) || rx.test(fileRel) || rx.test(line)) return true;
    return false;
  }

  const results = new Map<string, Array<{ lineNumber: number; token: string }>>();

  const files = walkFiles(startDir, (entry, full) => {
    if (!entry.isFile()) return false;
    const ext = path.extname(full).toLowerCase();
    return CODE_EXTENSIONS.has(ext);
  });

  for (const full of files) {
    const rel = path.relative(ROOT, full);
    try {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        TOKEN_REGEX.lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = TOKEN_REGEX.exec(line)) !== null) {
          const token = match[1];
          const lower = token.toLowerCase();
          if (lower.endsWith('.webp')) continue;
          if (isIgnored(token, rel, line)) continue;
          const arr = results.get(rel) ?? [];
          arr.push({ lineNumber: i + 1, token });
          results.set(rel, arr);
          break; // once per line for cleanliness
        }
      }
    } catch (e) {
      console.warn(`[WARN] Could not read ${full}: ${(e as Error).message}`);
    }
  }

  // Pretty print
  if (results.size === 0) {
    console.log('No non-WebP raster image references found (after ignores).');
  } else {
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

  return results;
}

function main() {
  const { args, dir, json, suggest, quality } = parseArgs(process.argv.slice(2));
  const startDir = path.resolve(ROOT, dir ?? '.');

  const runMissing = args.size === 0 || args.has('--missing-webp');
  const runRefs = args.size === 0 || args.has('--references');

  const out: any = {};
  if (runMissing) {
    const results = auditMissingWebp(startDir);
    if (json) out.missingWebp = results;
    if (suggest && results.length > 0) {
      const q = quality ?? 90;
      console.log('\nSuggested cwebp commands:');
      for (const r of results) {
        // Use relative paths already provided in results
        console.log(`cwebp -q ${q} "${r.source}" -o "${r.expectedWebp}"`);
      }
    }
  }
  if (runRefs) {
    const results = auditReferences(startDir);
    if (json) {
      // Convert Map to plain object
      const obj: Record<string, Array<{ lineNumber: number; token: string }>> = {};
      for (const [k, v] of results.entries()) obj[k] = v;
      out.references = obj;
    }
  }

  if (json) {
    console.log(JSON.stringify(out, null, 2));
  }
}

main();
