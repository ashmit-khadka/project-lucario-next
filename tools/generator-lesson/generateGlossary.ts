/**
 * generateGlossary.ts
 *
 * Scans all lesson JSON files in a directory, collects every unique {{term}}
 * marker and any keyTerms arrays already present, then calls the AI once to
 * produce canonical one-sentence definitions for every term.  The result is
 * written to a single glossary.json file that can be fetched once per course
 * and cached by the browser.
 *
 * Usage:
 *   node --import tsx generateGlossary.ts \
 *     --dir  "../../data/learning/javascript" \
 *     --out  "../../data/learning/javascript/glossary.json" \
 *     --course "JavaScript Fundamentals"
 *
 * Aliases: -d / -o / -c
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve, extname } from 'path';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '../../.env') });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Extract every {{term}} from a raw string ──
function extractTermsFromText(text: string): string[] {
  const regex = /\{\{([^}]+)\}\}/g;
  const terms: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    terms.push(match[1].trim());
  }
  return terms;
}

// ── Recursively collect terms from any nested JSON value ──
function collectTermsFromValue(value: unknown): string[] {
  if (typeof value === 'string') {
    return extractTermsFromText(value);
  }
  if (Array.isArray(value)) {
    return value.flatMap(collectTermsFromValue);
  }
  if (value !== null && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).flatMap(collectTermsFromValue);
  }
  return [];
}

// ── Load all lesson JSON files from a directory ──
function loadLessonFiles(dir: string): unknown[] {
  const absDir = resolve(dir);
  if (!existsSync(absDir)) {
    throw new Error(`Directory not found: ${absDir}`);
  }

  const files = readdirSync(absDir).filter(
    (f) => extname(f) === '.json' && f !== 'glossary.json'
  );

  return files.map((f) => {
    const raw = readFileSync(join(absDir, f), 'utf-8');
    return JSON.parse(raw);
  });
}

// ── Gather all unique terms from a set of lessons ──
function gatherAllTerms(lessons: unknown[]): string[] {
  const termSet = new Set<string>();

  for (const lesson of lessons) {
    // Collect from keyTerms array if present
    const kl = lesson as { keyTerms?: string[] };
    if (Array.isArray(kl.keyTerms)) {
      kl.keyTerms.forEach((t) => termSet.add(t.trim()));
    }

    // Collect from all {{term}} markers in the full JSON text (catches any
    // terms the AI tagged but didn't include in keyTerms)
    const allFromContent = collectTermsFromValue(lesson);
    allFromContent.forEach((t) => termSet.add(t));
  }

  return Array.from(termSet).sort((a, b) => a.localeCompare(b));
}

// ── Ask the AI for a canonical one-sentence definition for every term ──
async function defineTerms(
  terms: string[],
  courseName: string
): Promise<Record<string, string>> {
  if (terms.length === 0) return {};

  console.log(`\n📡 Requesting definitions for ${terms.length} terms...`);

  const systemPrompt = `You are a precise technical dictionary for software engineering courses.
For each term provided, write a single clear sentence (20-40 words) that defines it accurately and concisely.
The definition must be self-contained — a learner should understand the term without any surrounding context.
Use plain English. Avoid jargon unless it is the term itself.
The definitions will appear as tooltips inside a course called "${courseName}".

Return a JSON object where every key is the exact term string provided and every value is its definition string.
Return ONLY the JSON object, no markdown fences or commentary.`;

  const userPrompt = `Define each of the following terms:\n\n${terms.map((t) => `- ${t}`).join('\n')}`;

  const response = await openai.responses.create({
    model: 'gpt-4.1-mini',
    input: [
      { role: 'developer', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    text: { format: { type: 'json_object' } },
  });

  const raw = response.output_text;
  if (!raw) throw new Error('No content returned from the model.');

  return JSON.parse(raw) as Record<string, string>;
}

// ── Main ──
async function generateGlossary(opts: {
  dir: string;
  out: string;
  course: string;
}): Promise<void> {
  const startTime = Date.now();

  console.log(`\n📚 Generating glossary`);
  console.log(`   Course: ${opts.course}`);
  console.log(`   Source: ${resolve(opts.dir)}`);
  console.log(`   Output: ${resolve(opts.out)}`);

  const lessons = loadLessonFiles(opts.dir);
  console.log(`   Lessons found: ${lessons.length}`);

  const terms = gatherAllTerms(lessons);
  console.log(`   Unique terms:  ${terms.length}`);

  if (terms.length === 0) {
    console.log('\n⚠  No terms found — nothing to do.');
    return;
  }

  // If a glossary already exists, carry over any definitions we can reuse
  // so we only pay for new/changed terms.
  let existing: Record<string, string> = {};
  if (existsSync(resolve(opts.out))) {
    try {
      existing = JSON.parse(readFileSync(resolve(opts.out), 'utf-8'));
      console.log(`   Existing defs: ${Object.keys(existing).length}`);
    } catch {
      console.warn('⚠  Could not parse existing glossary — will regenerate all.');
    }
  }

  const newTerms = terms.filter((t) => !existing[t]);
  console.log(`   Terms to define: ${newTerms.length}`);

  const fresh = newTerms.length > 0 ? await defineTerms(newTerms, opts.course) : {};

  // Merge: existing + newly defined, keyed in sorted order
  const merged: Record<string, string> = {};
  terms.forEach((t) => {
    merged[t] = fresh[t] ?? existing[t] ?? '';
  });

  writeFileSync(resolve(opts.out), JSON.stringify(merged, null, 2), 'utf-8');

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ Glossary written: ${resolve(opts.out)}`);
  console.log(`   Total terms: ${Object.keys(merged).length}`);
  console.log(`   Duration:    ${elapsed}s`);
}

// ── CLI ──
function parseArgs(argv: string[]): Partial<{ dir: string; out: string; course: string }> {
  const args = argv.slice(2);
  const result: Partial<{ dir: string; out: string; course: string }> = {};
  const map: Record<string, 'dir' | 'out' | 'course'> = {
    '--dir': 'dir', '-d': 'dir',
    '--out': 'out', '-o': 'out',
    '--course': 'course', '-c': 'course',
  };
  for (let i = 0; i < args.length; i++) {
    const key = map[args[i]];
    if (key && args[i + 1]) {
      result[key] = args[++i];
    }
  }
  return result;
}

const opts = parseArgs(process.argv);
const missing = (['dir', 'out', 'course'] as const).filter((k) => !opts[k]);

if (missing.length > 0) {
  console.error(`\n❌ Missing required arguments: ${missing.map((k) => `--${k}`).join(', ')}`);
  console.error('\nUsage:');
  console.error(
    '  generateGlossary.ts --dir "<lessons-dir>" --out "<output-path>" --course "<course-name>"'
  );
  console.error('\nExample:');
  console.error(
    '  generateGlossary.ts --dir "../../data/learning/javascript" --out "../../data/learning/javascript/glossary.json" --course "JavaScript Fundamentals"'
  );
  process.exit(1);
}

generateGlossary(opts as { dir: string; out: string; course: string }).catch((err) => {
  console.error('\n❌ Glossary generation failed:', err);
  process.exit(1);
});
