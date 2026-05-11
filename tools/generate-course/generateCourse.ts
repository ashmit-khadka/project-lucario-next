import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

import type { LLMProvider } from '../shared/providers/types';
import { OpenAIProvider } from '../shared/providers/openai';
import { GeminiProvider } from '../shared/providers/gemini';

dotenv.config({ path: join(__dirname, '../../.env') });

const OUTPUT_DIR = join(__dirname, 'output');

// ── Schema example embedded in the system prompt ──
const SCHEMA_EXAMPLE = `{
  "course": "Full-Stack Web Engineering",
  "modules": [
    {
      "module": "Module Title",
      "description": "One sentence describing what this module covers and why it matters.",
      "depth": 5,
      "chapters": [
        {
          "chapter": "Chapter Title",
          "description": "One sentence describing the chapter focus.",
          "depth": 4,
          "lessons": [
            {
              "lesson": "Lesson Title",
              "objectives": [
                "Verb-first learning objective that is specific and measurable",
                "Another objective covering a distinct concept or skill"
              ],
              "status": "pending"
            }
          ]
        }
      ]
    }
  ]
}`;

// ── System prompt ──
function buildSystemPrompt(): string {
    return `You are an expert technical curriculum designer. You generate structured course manifests in JSON format.

Your output must be a single JSON object that exactly matches this schema:

${SCHEMA_EXAMPLE}

SCHEMA RULES:
- "course": the full course title as a string.
- "modules": array of module objects. Each module has:
    - "module": numbered title string, e.g. "1. Foundations"
    - "description": one clear sentence explaining what the module covers and why it belongs in the course.
    - "depth": integer 1–5 extracted from the [X/5] marker on the module heading in the outline. If no marker is present, default to 3.
    - "chapters": array of chapter objects. Each chapter has:
        - "chapter": numbered title string, e.g. "1.1 JavaScript Runtime Fundamentals"
        - "description": one clear sentence scoping the chapter focus.
        - "depth": integer 1–5 extracted from the [X/5] marker on the chapter heading in the outline. If no marker is present, default to 3.
        - "lessons": array of lesson objects. Each lesson has:
            - "lesson": numbered title string, e.g. "1.1.1 Event Loop & Scheduling"
            - "objectives": array of 2-4 learning objective strings (see OBJECTIVE RULES)
            - "status": always "pending"

DEPTH RULES:
- depth 1–2: introductory awareness — objectives use verbs like Identify, Describe, Recognise.
- depth 3: applied understanding — objectives use verbs like Explain, Apply, Compare.
- depth 4–5: expert mastery — objectives use verbs like Implement, Architect, Analyse, Evaluate, Design.
- The depth value MUST match the [X/5] number in the outline exactly. Do not infer or change it.

OBJECTIVE RULES:
- Each objective must start with a strong action verb: Explain, Describe, Identify, Apply, Implement, Compare, Distinguish, Design, Trace, Evaluate, Analyse.
- Each objective must be specific and measurable — a reader should know exactly what they will be able to do after completing the lesson.
- Objectives should be distinct — do not repeat the same concept in different words.
- 2-3 objectives per lesson is ideal. Use 4 only for complex lessons with clearly separable sub-skills.
- Do not write vague objectives like "Understand X" or "Learn about Y". Replace with what demonstrating that understanding looks like.
- Objectives should collectively cover the key concepts listed under the lesson in the outline, but they must be written as learning outcomes, not topic labels.

COVERAGE RULES:
- Every module, chapter, and lesson from the input outline must appear in the output.
- Do not add, merge, split, or remove any modules, chapters, or lessons.
- Preserve the exact numbering and titles from the input.
- Do not invent extra lessons or chapters.

TONE:
- Descriptions should be written in plain, direct technical prose.
- One sentence only per description — no padding, no lists.

Return ONLY the JSON object. No markdown fences, no commentary, no explanation.`;
}

// ── User prompt ──
function buildUserPrompt(courseTitle: string, outline: string): string {
    return `Generate a complete course manifest for the following course.

Course title: "${courseTitle}"

Course outline (modules > chapters > lessons with bullet-point topic hints):

${outline}

Use the topic hints under each lesson to inform the learning objectives. The hints describe the content territory — your job is to turn them into precise, verb-first learning objectives.

Each module and chapter heading contains a depth marker in the format [X/5]. Extract the integer X and set it as the "depth" field on that object. Calibrate the ambition of learning objectives accordingly — higher depth means expert-level mastery verbs (Implement, Architect, Evaluate); lower depth means awareness verbs (Identify, Describe, Recognise).

Return the full JSON manifest covering every module, chapter, and lesson in the outline above.`;
}

// ── Resolve provider ──
function resolveProvider(name: string): LLMProvider {
    switch (name.toLowerCase()) {
        case 'openai': {
            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) throw new Error('OPENAI_API_KEY is not set in .env');
            return new OpenAIProvider(apiKey);
        }
        case 'gemini':
        case 'google':
        default: {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) throw new Error('GEMINI_API_KEY is not set in .env');
            return new GeminiProvider(apiKey);
        }
    }
}

// ── Main ──
async function generateCourse(
    courseTitle: string,
    outlineText: string,
    provider: LLMProvider,
    outputPath: string,
): Promise<void> {
    console.log(`\n🎓 Generating course manifest`);
    console.log(`   Course:   ${courseTitle}`);
    console.log(`   Provider: ${provider.name}`);
    console.log(`   Output:   ${outputPath}\n`);

    console.log('⏳ Calling LLM...');
    const start = Date.now();
    const raw = await provider.generateLesson(buildSystemPrompt(), buildUserPrompt(courseTitle, outlineText));
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`✅ Response received in ${elapsed}s`);

    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {
        console.error('\n❌ Response was not valid JSON:\n', raw.slice(0, 500));
        throw new Error('Invalid JSON response from provider');
    }

    if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
    writeFileSync(outputPath, JSON.stringify(parsed, null, 2), 'utf-8');

    const manifest = parsed as any;
    const modules  = manifest.modules?.length ?? 0;
    const chapters = manifest.modules?.reduce((a: number, m: any) => a + (m.chapters?.length ?? 0), 0) ?? 0;
    const lessons  = manifest.modules?.reduce((a: number, m: any) =>
        a + m.chapters?.reduce((b: number, c: any) => b + (c.lessons?.length ?? 0), 0), 0) ?? 0;

    console.log(`\n📊 Summary`);
    console.log(`   Modules:  ${modules}`);
    console.log(`   Chapters: ${chapters}`);
    console.log(`   Lessons:  ${lessons}`);
    console.log(`\n📄 Written: ${outputPath}`);
}

// ── CLI ──
interface ParsedArgs { provider: string; course: string; input: string; output: string; }

function parseArgs(argv: string[]): Partial<ParsedArgs> {
    const args = argv.slice(2);
    const result: Partial<ParsedArgs> = { provider: 'gemini' };
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--provider': case '-p': result.provider = args[++i]; break;
            case '--course':   case '-c': result.course   = args[++i]; break;
            case '--input':    case '-i': result.input    = args[++i]; break;
            case '--output':   case '-o': result.output   = args[++i]; break;
        }
    }
    return result;
}

const parsed = parseArgs(process.argv);
const missing = (['course', 'input'] as (keyof ParsedArgs)[]).filter(k => !parsed[k]);

if (missing.length > 0) {
    console.error(`\n❌ Missing: ${missing.map(k => `--${k}`).join(', ')}`);
    console.error('Usage: generateCourse.ts [--provider openai|gemini] --course "<title>" --input <outline.txt> [--output <path>]');
    process.exit(1);
}

let outlineText: string;
try { outlineText = readFileSync(parsed.input!, 'utf-8'); }
catch { console.error(`\n❌ Could not read: ${parsed.input}`); process.exit(1); }

const outputPath = parsed.output ?? join(OUTPUT_DIR, 'lesson.json');

generateCourse(
    parsed.course!,
    outlineText,
    resolveProvider(parsed.provider!),
    outputPath,
).catch(err => { console.error('\n❌ Failed:', err); process.exit(1); });
