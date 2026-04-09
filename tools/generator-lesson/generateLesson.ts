import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

import type { LessonContext, LLMProvider } from './types';
import { OpenAIProvider } from './providers/openai';
import { GeminiProvider } from './providers/gemini';

// ── Load environment variables from project root ──
dotenv.config({ path: join(__dirname, '../../.env') });

const OUTPUT_DIR = join(__dirname, 'output');
const PUBLIC_IMAGES_DIR = join(__dirname, '../../public/images/lessons');

// ── Read the demo lesson as the canonical schema reference ──
// NOTE: Points to the *original* static example, never the live output file,
// so generating new lessons does not pollute the schema reference.
const DEMO_LESSON_PATH = join(__dirname, '../../data/learning/demo_lesson original.json');

function getSchemaReference(): string {
    try {
        return readFileSync(DEMO_LESSON_PATH, 'utf-8');
    } catch {
        console.warn('⚠ Could not read demo_lesson.json — prompt will use inline schema description.');
        return '';
    }
}

// ── Slugify a topic string into a filename-safe slug ──
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// ── Build the system prompt ──
function buildSystemPrompt(schemaJson: string): string {
    return `You are an expert technical course author. You generate structured lesson content in JSON format.

Your output must be a single JSON object that matches this exact schema:

{
  "id": "<slug>",
  "slug": "<slug>",
  "version": "1.0.0",
  "title": "<Lesson title>",
  "description": "<One-sentence summary>",
  "meta": {
    "difficulty": "beginner" | "intermediate" | "advanced",
    "duration": <number in minutes>,
    "prerequisites": [],
    "tags": ["tag1", "tag2"],
    "author": "AI Generated",
    "lastUpdated": "<YYYY-MM-DD>"
  },
  "keyTerms": ["term1", "term2"],
  "content": [ ...content items... ]
}

CONTENT ITEM TYPES (use all of them liberally):

1. section  — top-level divider
   { "id": "section-N", "type": "section", "title": "N. Section Title" }

2. text  — paragraph (supports **bold**, _italic_, \`code\`, ==highlight==, {{term}})
   { "id": "text-N", "type": "text", "text": "..." }

3. list  — bullet points
   { "id": "list-N", "type": "list", "items": ["...", "..."] }

4. heading  — sub-heading with optional variant
   { "id": "heading-N", "type": "heading", "text": "...", "variant": "do" | "dont" }

5. code  — code block with a required explanation
   { "id": "code-N", "type": "code", "language": "javascript", "code": "...", "explanation": "One or two sentences describing what this code demonstrates and why it matters." }

6. callout  — important note
   { "id": "callout-N", "type": "callout", "text": "...", "variant": "info" | "tip" | "warning" | "danger" | "note" }

7. image  — conceptual illustration with an AI image generation prompt
   { "id": "image-N", "type": "image", "src": "/images/lessons/<lesson-slug>/<image-slug>.png", "alt": "...", "caption": "...", "prompt": "<detailed AI image generation prompt describing a metaphorical or narrative scene that captures the concept — NOT a diagram, flowchart, or infographic>" }

8. table  — comparison/reference table
   { "id": "table-N", "type": "table", "headers": [...], "rows": [[...], ...] }

9. question  — interactive question block (use variant field)
   multiple-choice:
   { "id": "question-mc-N", "type": "question", "variant": "multiple-choice", "question": "...", "options": ["A","B","C","D"], "correctAnswer": "C", "explanation": "..." }

   reveal-answer:
   { "id": "question-reveal-N", "type": "question", "variant": "reveal-answer", "prompt": "...", "answer": "...", "explanation": "...", "code": "...(optional)", "codeLanguage": "javascript", "buttonLabel": "Show Answer" }

   fill-blank:
   { "id": "question-fill-N", "type": "question", "variant": "fill-blank", "question": "... ___ ...", "correctAnswer": "...", "acceptableAnswers": ["..."], "placeholder": "...", "explanation": "..." }

WRITING STYLE RULES:
- Write clean, plain technical prose using standard ASCII punctuation.
- Language must be clean and easy to read, but it should also aim to capture the imagination. A well-chosen analogy, a vivid concrete example, or a sentence that makes a concept feel surprising or inevitable is always better than dry exposition. Write as if you want the reader to find this genuinely interesting.
- Humour is welcome where it is tasteful and natural — a dry observation, a knowing aside, or a well-placed understatement can make a lesson memorable without undermining its authority. Never force it; one good line is worth more than three laboured jokes. Never use humour to trivialise a serious point.
- Keep writing imaginative: reach for the unexpected angle, the counterintuitive framing, or the analogy that makes an abstract idea suddenly click. A lesson should feel like it was written by someone who genuinely finds the subject fascinating.
- Avoid decorative or unusual special characters in lesson copy, including arrows, smart quotes, em dashes, and other typography-heavy symbols.
- Avoid unnecessary parentheses unless they are genuinely needed for clarity.
- Prefer direct sentences over flashy phrasing.
- Add historical context, real-world case studies, or concrete examples ONLY when they are interesting, significant, and genuinely add value to understanding the point. Use them sparingly and strategically: cite a famous incident (e.g., a major outage, security breach, or industry shift) when it perfectly illustrates a failure mode or lesson learned. Mention how a concept emerged or what earlier limitations it addressed only if that history clarifies why the current approach matters. Do not force historical trivia into every section. When you do include it, make it concrete and memorable — name the company, the year, the consequence. A well-chosen case study is worth more than vague historical references.
- Where it genuinely improves understanding, mention near-term future scope, likely evolution, or adjacent next-step concepts so the learner understands where the topic leads.
- Use historical context, case studies, and future scope selectively. They should support the main explanation, not distract from it or turn the lesson into a history lecture or speculation exercise.
- Use inline formatting with emphasis:
  - Use **bold** for short important words and phrases — the cause, the constraint, the failure mode, the outcome, the rule. Bold operates at the word or short-phrase level. Aim for 3-5 bold phrases per "text" block.
  - Use ==highlight== for the core point of a passage — the single idea that the surrounding text is building toward or explaining. This can be a full phrase, a clause, or even a sentence. Every 2-3 "text" blocks should have one ==highlight==. It marks the insight the reader must take away, not just an important word.
  - Use {{term}} sparingly and only for terms that a learner could look up in a technical glossary: named protocols, algorithms, libraries, frameworks, design patterns, specific error codes, and well-defined engineering concepts with industry-accepted meanings. Good examples: {{RAG}}, {{idempotency}}, {{circuit breaker}}, {{p95 latency}}, {{JWT}}, {{OpenTelemetry}}. Bad examples: {{production}}, {{fallback}}, {{monitoring}}, {{model version}}, {{demo}} — these are plain English words used descriptively, not technical terms a learner needs to look up. A useful test: would this term have its own entry in a technical dictionary or RFC? If not, do not wrap it.
  - Combine {{term}} with bold when the term is also the key word in a sentence: **{{term}}**.
  - Use _italic_ only for light first-use terminology or gentle emphasis.
  - Do NOT leave "text" blocks entirely plain. Every block must have bold phrases, and a ==highlight== should appear at least every 2-3 blocks.

FLOW AND STRUCTURE RULES:
- Build the lesson as a sequence of small, readable blocks that feel natural in a learning UI.
- Do not mix paragraph prose and bullet-style lists inside the same text field.
- If content contains 2 or more short parallel examples, contrasts, or definitions, use a "list" item instead of embedding them inside "text".
- Use "text" blocks for explanation, framing, transitions, and interpretation.
- Use "list" blocks for grouped examples, patterns, rules, comparisons, symptoms, or takeaways.
- When introducing a list, first use a short "text" block to explain what the learner is about to see.
- After a list, always follow with a short "text" block that interprets what the list means, why it matters, or what the learner should take away from it.
- Prefer multiple short content items over one dense content item.
- Each content block should usually do one job only: explain, list, compare, warn, or test.
- Avoid long walls of text. Split dense explanations into adjacent "text", "list", "callout", "table", or "question" blocks where appropriate.
- PARAGRAPH LENGTH RULE: A single "text" block should contain 3-5 full sentences. Do not write 1-sentence blocks — they leave ideas underdeveloped. If an explanation needs more than 5 sentences, split it into two consecutive blocks.
- DEPTH RULE: Each concept deserves 2-3 sequential "text" blocks that build on each other. The pattern: (1) introduce the idea, (2) explain the mechanism or how it works, (3) describe a consequence or why it matters in practice. Short 1-sentence blocks are a sign of shallow writing.
- MINIMUM TEXT BLOCKS PER SECTION: Every section must contain at least 3 "text" blocks before any list or table. A section that jumps straight from a heading into a list is too shallow.
- The lesson should feel like a knowledgeable colleague explaining something in depth, not a slide deck of headlines. Prose carries the depth; lists and tables carry the structure.
- Use lists liberally when they improve scanability, especially for examples like named attack types, pros and cons, do and don't guidance, step sequences, grouped observations.
- Do not simulate bullets inside a "text" string using dash-prefixed lines or numbered lines. Use a real "list" block instead.

TEXT VS LIST RULE:
- Never place bullet-style lines inside a "text" block. Convert them into a separate "list" content item.

UI COMPOSITION RULE:
- Compose lessons for a block-based reading experience. Alternate explanation with structure: introduce an idea in "text", break examples into "list" or "table", reinforce with "callout" or "question", then move on.
- Treat each content item as a UI block, not just a writing block. Split content based on presentation as well as meaning.
- When a paragraph is followed by example items, the examples must be emitted as a separate "list" content item, not embedded in the same "text" field.
- Do not place bullet-like examples inside "text". Any grouped examples, named items, or parallel points must be output as a separate "list" block so the lesson renders cleanly in the UI.

CONTENT RULES:
- Generate 4-6 sections with 25-40 total content items. A lesson with fewer than 25 items is too thin; more than 40 is too verbose.
- COUNT CHECK: Before finalising the output, count the total content items. If the count is below 25, add more "text" blocks to the thinnest sections.
- TEXT BLOCK RATIO: At least 50% of all content items must be "text" type.
- Use a variety of content types. Every lesson must include at least: section, text, list, callout, table, and at least 2 question blocks.
- CODE BLOCKS: Do NOT include code blocks unless the lesson is explicitly and specifically about writing code, implementing an API, or demonstrating a concrete code pattern. Conceptual lessons, architectural topics, system design lessons, and general engineering principles should have zero code blocks. Only include code when showing actual implementation is the primary purpose of the lesson. When code is included, it must be realistic and production-quality — never pseudocode or toy examples. Every code block must have an "explanation" field of 1-2 sentences that appears above the code (in the rendered UI) and tells the learner what the code demonstrates and why it matters.
- IMAGES: Dynamically include 1-3 image blocks per lesson based on how much value visualization adds to understanding the concepts. Use your judgment: if a concept is highly abstract, counterintuitive, or benefits from visual metaphor, include more images (2-3). If the lesson is more straightforward or procedural, use fewer (1-2). Each image should be an engaging, metaphorical, or narrative illustration that captures the essence of a concept — like editorial art in a premium textbook or magazine. Do NOT describe diagrams, flowcharts, infographics, icon sequences, or labeled process arrows. Instead, use visual metaphors and storytelling scenes. Prefer placing the first image early in the lesson to anchor the reader. For each image, write a detailed "prompt" field describing the scene, the mood, the objects, and the metaphor — as if directing an illustrator. Only include images where they genuinely enhance comprehension, not as decoration.
- Use inline formatting (**bold**, _italic_, \`code\`, ==highlight==, {{term}}) actively. Every "text" block should have highlighted phrases. Do not leave text blocks bare.
- When useful, connect practical guidance to the historical reasons behind best practices and to the future-facing tradeoffs a developer may encounter next.
- Every id must be unique within the lesson.
- Return ONLY the JSON object, no markdown fences or commentary.

EMPHASIS RULES:
- Use **bold** for short key words and phrases within a sentence — the constraint, the outcome, the failure mode, the mechanism, the decision. Aim for 3-5 bold phrases per "text" block.
- Use ==highlight== for the core point of a passage. This is a full phrase, clause, or sentence that captures the central idea the surrounding text is building toward. It is not a single bolded word — it is the takeaway. Use it every 2-3 "text" blocks. Do not overuse it on minor points.
- Use {{term}} only for terms that have a precise, lookup-worthy technical meaning: named protocols ({{HTTP/2}}), algorithms ({{exponential backoff}}), libraries/frameworks ({{OpenTelemetry}}), well-defined engineering patterns ({{circuit breaker}}, {{idempotency key}}), specific identifiers ({{429}}, {{JWT}}), and established industry concepts ({{RAG}}, {{SLO}}, {{p95 latency}}).
- Do NOT wrap plain English words in {{term}} even if they are used in a technical context.
- Bold and {{term}} can be combined: **{{term}}** when a named term is also the key word in its sentence.
- ==highlight== and {{term}} can be combined: =={{circuit breaker}}== when a named term is the core point of the passage.

QUIZ RULES:
- In addition to the "content" array, the output JSON must include a top-level "quiz" array.
- The quiz should contain 5-10 multiple-choice questions that test the key concepts taught in the lesson.
- Each quiz item must use this exact shape:
  { "id": "quiz-N", "question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "B", "explanation": "..." }
- "options" must always have exactly 4 choices.
- "correctAnswer" must be one of the strings in "options".
- "explanation" should be a concise sentence explaining why the correct answer is right.
- Questions should range from recall to applied understanding.
- Do not repeat questions that already appear as inline question blocks in the content.

KEY TERMS RULES:
- The output JSON must include a top-level "keyTerms" array of strings.
- Populate it with every unique term name that appears inside {{term}} markers anywhere in the "content" array.
- Each entry must be the bare term name exactly as written inside the markers, e.g. "RAG", "circuit breaker", "idempotency".
- Deduplicate: each term should appear only once regardless of how many times it is used in the lesson.
- Do not include formatting characters, braces, or whitespace padding — just the plain term string.

${schemaJson ? 'Here is a reference lesson for the exact structure:\n\n' + schemaJson : ''}`;
}

// ── Build the user turn prompt ──
function buildUserPrompt(ctx: LessonContext, slug: string): string {
    return `Generate a comprehensive, in-depth lesson with the following context:

Course:  "${ctx.course}"
Module:  "${ctx.module}"
Chapter: "${ctx.chapter}"
Lesson:  "${ctx.lesson}"

Learning objectives for this lesson:
${ctx.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

Use the course, module, and chapter names to calibrate scope, assumed prior knowledge, and tone. The lesson sits inside the chapter listed above, so do not re-teach concepts from earlier chapters and do not preview topics that come after this one. Focus tightly on the lesson topic.

Each learning objective above must be clearly addressed somewhere in the lesson content. Structure sections so that a learner who completes the lesson can demonstrate each objective. Do not list the objectives verbatim as bullets; teach them through explanations, examples, and questions.

DEPTH REQUIREMENT: This lesson must be substantial. Every section must contain sequential "text" blocks that build on each other before any list or table appears. Aim for 25-40 content items total with text blocks making up at least half. Every "text" block must be 3-5 sentences. Write the way a senior engineer explaining something to a junior would: with full reasoning, not just the conclusion.

The lesson should be suitable for an intermediate-to-advanced web developer audience. Cover concepts thoroughly, address common misconceptions, explain why things work the way they do, and include interactive question blocks to reinforce learning.

Keep the writing clean and readable. Use **bold** on 3-5 short key phrases per text block. Use ==highlight== for the core point of a passage — a full phrase or sentence that captures the central idea, used every 2-3 text blocks. Use {{term}} on every named technical term. Do not conflate bold and highlight — bold marks important words, highlight marks the insight.

Where interesting or beneficial, include brief historical context and future-facing scope inside explanations so the learner understands both how the topic developed and where it may lead next. Keep those additions grounded, concise, and relevant.

Append a "quiz" array of 5-10 MCQ items to the root of the JSON (see the schema in the system prompt).

Use slug "${slug}" for the id and slug fields.
Set lastUpdated to "${new Date().toISOString().split('T')[0]}".`;
}

// ── Generate images for all image content items in the lesson ──
async function generateLessonImages(provider: LLMProvider, lesson: any, lessonSlug: string): Promise<void> {
    const imageItems = lesson.content.filter((item: any) => item.type === 'image' && item.prompt);

    if (imageItems.length === 0) {
        console.log('   No image blocks found — skipping image generation.');
        return;
    }

    console.log(`\n🎨 Generating ${imageItems.length} image(s) via ${provider.name}...`);

    const lessonImageDir = join(PUBLIC_IMAGES_DIR, lessonSlug);
    if (!existsSync(lessonImageDir)) {
        mkdirSync(lessonImageDir, { recursive: true });
    }

    for (const item of imageItems) {
        const filename = `${slugify(item.alt || item.id)}.png`;
        const localPath = join(lessonImageDir, filename);
        const publicPath = `/images/lessons/${lessonSlug}/${filename}`;

        console.log(`   🖼  Generating: ${item.id} → ${filename}`);

        try {
            const result = await provider.generateImage(item.prompt, localPath);
            if (result) {
                item.src = publicPath;
                console.log(`   ✅ Saved: ${publicPath}`);
            } else {
                console.warn(`   ⚠  Provider returned null for ${item.id} — skipping.`);
            }
        } catch (err: any) {
            console.error(`   ❌ Failed to generate image for ${item.id}:`, err?.message || err);
        }
    }
}

// ── Resolve which provider to use based on --provider flag ──
function resolveProvider(providerName: string): LLMProvider {
    switch (providerName.toLowerCase()) {
        case 'gemini':
        case 'google': {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) throw new Error('GEMINI_API_KEY is not set in .env');
            return new GeminiProvider(apiKey);
        }
        case 'openai':
        default: {
            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) throw new Error('OPENAI_API_KEY is not set in .env');
            return new OpenAIProvider(apiKey);
        }
    }
}

// ── Main orchestrator — provider is injected, never hard-coded ──
async function generateLesson(ctx: LessonContext, provider: LLMProvider): Promise<void> {
    const startTime = Date.now();
    console.log(`\n🚀 Generating lesson`);
    console.log(`   Provider:   ${provider.name}`);
    console.log(`   Started:    ${new Date().toLocaleString()}`);
    console.log(`   Course:     ${ctx.course}`);
    console.log(`   Module:     ${ctx.module}`);
    console.log(`   Chapter:    ${ctx.chapter}`);
    console.log(`   Lesson:     ${ctx.lesson}`);
    console.log(`   Objectives: ${ctx.objectives.length}\n`);

    const slug = slugify(ctx.lesson);
    const schemaRef = getSchemaReference();
    const systemPrompt = buildSystemPrompt(schemaRef);
    const userPrompt = buildUserPrompt(ctx, slug);

    console.log(`📡 Calling ${provider.name}...`);

    const raw = await provider.generateLesson(systemPrompt, userPrompt);

    // Parse and validate basic structure
    const lesson = JSON.parse(raw);

    if (!lesson.id || !lesson.content || !Array.isArray(lesson.content)) {
        throw new Error('Generated JSON is missing required fields (id, content[]).');
    }

    if (!lesson.quiz || !Array.isArray(lesson.quiz) || lesson.quiz.length === 0) {
        console.warn('⚠ No quiz array found in generated JSON — the lesson will have no quiz.');
    }

    // Uncomment to enable image generation:
    // await generateLessonImages(provider, lesson, slug);

    // Strip image prompts from the data copy — prompts are only for image generation
    // and must not reach the browser.
    const lessonForData = {
        ...lesson,
        content: lesson.content.map((item: any) => {
            if (item.type !== 'image') return item;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { prompt: _prompt, ...rest } = item;
            return rest;
        }),
    };

    // Ensure output directory exists
    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const filename = `${slug}.json`;
    const filepath = join(OUTPUT_DIR, filename);
    const demoLessonPath = join(__dirname, '../../data/learning/demo_lesson.json');

    // Raw output keeps prompt fields intact (useful for later image generation)
    writeFileSync(filepath, JSON.stringify(lesson, null, 2), 'utf-8');
    // Data copy has prompts stripped
    writeFileSync(demoLessonPath, JSON.stringify(lessonForData, null, 2), 'utf-8');

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n✅ Saved: ${filepath}`);
    console.log(`✅ Updated demo lesson: ${demoLessonPath}`);
    console.log(`   Title:     ${lesson.title}`);
    console.log(`   Sections:  ${lesson.content.filter((c: any) => c.type === 'section').length}`);
    console.log(`   Items:     ${lesson.content.length}`);
    console.log(`   Key Terms: ${lesson.keyTerms ? lesson.keyTerms.length : 0}`);
    console.log(`   Images:    ${lesson.content.filter((c: any) => c.type === 'image').length}`);
    console.log(`   Questions: ${lesson.content.filter((c: any) => c.type === 'question').length}`);
    console.log(`   Quiz MCQs: ${lesson.quiz ? lesson.quiz.length : 0}`);
    console.log(`   Duration:  ${elapsed}s`);
}

// ── CLI argument parsing ──
// Usage:
//   generateLesson.ts [--provider openai|gemini] --course "..." --module "..." --chapter "..." --lesson "..." [--objectives "..."]
//
// Short aliases: -p / -c / -m / -ch / -l / -o

interface ParsedArgs extends Partial<LessonContext> {
    provider: string;
    objectives: string[];
}

function parseArgs(argv: string[]): ParsedArgs {
    const args = argv.slice(2);
    const result: ParsedArgs = { provider: 'openai', objectives: [] };
    const map: Record<string, keyof Omit<LessonContext, 'objectives'>> = {
        '--course': 'course', '-c': 'course',
        '--module': 'module', '-m': 'module',
        '--chapter': 'chapter', '-ch': 'chapter',
        '--lesson': 'lesson', '-l': 'lesson',
    };
    for (let i = 0; i < args.length; i++) {
        if ((args[i] === '--objectives' || args[i] === '-o') && args[i + 1]) {
            result.objectives.push(args[++i]);
        } else if ((args[i] === '--provider' || args[i] === '-p') && args[i + 1]) {
            result.provider = args[++i];
        } else {
            const key = map[args[i]];
            if (key && args[i + 1]) {
                result[key] = args[++i];
            }
        }
    }
    return result;
}

const parsed = parseArgs(process.argv);
const missing = (['course', 'module', 'chapter', 'lesson'] as (keyof LessonContext)[]).filter(k => !parsed[k]);

if (missing.length > 0) {
    console.error(`\n❌ Missing required arguments: ${missing.map(k => `--${k}`).join(', ')}`);
    console.error('\nUsage:');
    console.error('  generateLesson.ts [--provider openai|gemini] --course "<name>" --module "<name>" --chapter "<name>" --lesson "<name>" [--objectives "obj 1" ...]');
    process.exit(1);
}

const provider = resolveProvider(parsed.provider);

generateLesson(parsed as LessonContext, provider).catch((err) => {
    console.error('\n❌ Generation failed:', err);
    process.exit(1);
});