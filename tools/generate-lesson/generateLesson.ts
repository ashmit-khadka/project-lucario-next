import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';

import type { LessonContext, LLMProvider } from '../shared/providers/types';
import { OpenAIProvider } from '../shared/providers/openai';
import { GeminiProvider } from '../shared/providers/gemini';

// â”€â”€ Load environment variables from project root â”€â”€
dotenv.config({ path: join(__dirname, '../../.env') });

const OUTPUT_DIR = join(__dirname, 'output');
const PUBLIC_IMAGES_DIR = join(__dirname, '../../public/images/lessons');

// â”€â”€ Read the demo lesson as the canonical schema reference â”€â”€
// NOTE: Points to the *original* static example, never the live output file,
// so generating new lessons does not pollute the schema reference.
const DEMO_LESSON_PATH = join(__dirname, '../../data/learning/demo_lesson original.json');

function getSchemaReference(): string {
    try {
        return readFileSync(DEMO_LESSON_PATH, 'utf-8');
    } catch {
        console.warn('âš  Could not read demo_lesson.json â€” prompt will use inline schema description.');
        return '';
    }
}

// â”€â”€ Slugify a topic string into a filename-safe slug â”€â”€
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// â”€â”€ Build the system prompt â”€â”€
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

1. section  â€” top-level divider
   { "id": "section-N", "type": "section", "title": "N. Section Title" }

2. text  â€” paragraph (supports **bold**, _italic_, \`code\`, ==highlight==, {{term}})
   { "id": "text-N", "type": "text", "text": "..." }

3. list  â€” bullet points
   { "id": "list-N", "type": "list", "items": ["...", "..."] }

4. heading  â€” sub-heading with optional variant
   { "id": "heading-N", "type": "heading", "text": "...", "variant": "do" | "dont" }

5. code  â€” code block with a required explanation
   { "id": "code-N", "type": "code", "language": "javascript", "code": "...", "explanation": "One or two sentences describing what this code demonstrates and why it matters." }

6. callout  â€” important note
   { "id": "callout-N", "type": "callout", "text": "...", "variant": "info" | "tip" | "warning" | "danger" | "note" }

7. image  â€” conceptual illustration with an AI image generation prompt
   { "id": "image-N", "type": "image", "src": "/images/lessons/<lesson-slug>/<image-slug>.png", "alt": "...", "caption": "...", "prompt": "<detailed AI image generation prompt describing a metaphorical or narrative scene that captures the concept â€” NOT a diagram, flowchart, or infographic>" }

8. table  â€” comparison/reference table
   { "id": "table-N", "type": "table", "headers": [...], "rows": [[...], ...] }

9. question  â€” interactive question block (use variant field)
   multiple-choice:
   { "id": "question-mc-N", "type": "question", "variant": "multiple-choice", "question": "...", "options": ["A","B","C","D"], "correctAnswer": "C", "explanation": "..." }

   reveal-answer:
   { "id": "question-reveal-N", "type": "question", "variant": "reveal-answer", "prompt": "...", "answer": "...", "explanation": "...", "code": "...(optional)", "codeLanguage": "javascript", "buttonLabel": "Show Answer" }

   fill-blank:
   { "id": "question-fill-N", "type": "question", "variant": "fill-blank", "question": "... ___ ...", "correctAnswer": "...", "acceptableAnswers": ["..."], "placeholder": "...", "explanation": "..." }

10. visualisation  — data or process visualization block
    { "id": "vis-N", "type": "visualisation", "title": "...", "visType": "flowchart" | "bar-chart" | "line-chart" | "pie-chart" | "radar-chart" | "area-chart" | "stacked-bar" | "timeline" | "scatter-plot" | "heatmap" | "venn-diagram" | "gantt-chart" | "layer-diagram" | "code-diff" | "tree-diagram", "data": { ... } }
    For "flowchart", "data" must be: { "nodes": [{ "id": "1", "position": { "x": 0, "y": 0 }, "data": { "label": "..." } }], "edges": [{ "id": "e1-2", "source": "1", "target": "2", "animated": true }] }. Use flowchart in particular to explain processes.

WRITING STYLE RULES:
- Write sharp, plain technical prose using standard ASCII punctuation. No fluff.
- Use British English spelling and grammar throughout (e.g., 'behaviour', 'characterise', 'colour', 'optimise').
- Be imaginative but brutally efficient. Get straight to the point. Use striking analogies, vivid concrete examples, and counterintuitive framing to make concepts click instantly. Avoid dry exposition, but do not waste words.
- Cut through the noise. Every sentence must earn its place. Prefer short, punchy sentences.
- Humour is welcome if it's natural and quick â€” a dry observation or well-placed understatement. Do not force it or let it dilute the technical clarity.
- Avoid decorative or unusual special characters in lesson copy, including arrows, smart quotes, em dashes, and other typography-heavy symbols.
- Remove unnecessary parentheses. If it's important, put it in the main sentence. If not, delete it.
- Add historical context or real-world case studies ONLY if they instantly clarify the point. Name the company, the year, the consequence. Be brief and strategic.
- Connect concepts to their near-term future evolution only if it practically matters to a developer today.
- Use inline formatting with emphasis:
  - Use **bold** for short important words and phrases â€” the cause, the constraint, the failure mode, the outcome, the rule. Bold operates at the word or short-phrase level. Aim for 3-5 bold phrases per "text" block.
  - Use ==highlight== for the core point of a passage â€” the single idea that the surrounding text is building toward or explaining. This can be a full phrase, a clause, or even a sentence. Every 2-3 "text" blocks should have one ==highlight==. It marks the insight the reader must take away, not just an important word.
  - Use {{term}} generously for any term that a learner could look up in a technical glossary: named protocols, algorithms, libraries, frameworks, design patterns, specific error codes, and well-defined engineering concepts with industry-accepted meanings. Good examples: {{RAG}}, {{idempotency}}, {{circuit breaker}}, {{p95 latency}}, {{JWT}}, {{OpenTelemetry}}. Bad examples: {{production}}, {{fallback}}, {{monitoring}}, {{model version}}, {{demo}} â€” these are plain English words used descriptively, not technical terms a learner needs to look up. A useful test: would this term have its own entry in a technical dictionary or RFC? If not, do not wrap it. Aim for at least 15-20 distinct {{term}} usages spread across the lesson. Every section MUST introduce at least 3-5 wrapped terms. A content-rich lesson should feel incredibly dense with named concepts.
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
- Avoid long walls of text. Split dense explanations into adjacent "text", "list", "callout", "table", "visualisation", or "question" blocks where appropriate.
- PARAGRAPH LENGTH RULE: A single "text" block should contain 3-5 full sentences. Do not write 1-sentence blocks â€” they leave ideas underdeveloped. If an explanation needs more than 5 sentences, split it into two consecutive blocks.
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
- Use a variety of content types. Every lesson must include at least: section, text, list, callout, table, visualisation, and at least 2 question blocks.
- CODE BLOCKS: Do NOT include code blocks unless the lesson is explicitly and specifically about writing code, implementing an API, or demonstrating a concrete code pattern. Conceptual lessons, architectural topics, system design lessons, and general engineering principles should have zero code blocks. Only include code when showing actual implementation is the primary purpose of the lesson. When code is included, it must be realistic and production-quality â€” never pseudocode or toy examples. Every code block must have an "explanation" field of 1-2 sentences that appears above the code (in the rendered UI) and tells the learner what the code demonstrates and why it matters.
- VISUALISATIONS: Dynamically include 1-3 "visualisation" blocks per lesson where it can really add value to the explanation. Make use of the "flowchart" visType in particular to explain processes, architectures, or pipelines. Use other visTypes (like "bar-chart", "code-diff", "timeline") to summarize data and replace walls of text.
- IMAGES: Dynamically include 1-3 image blocks per lesson based on how much value visualization adds to understanding the concepts. Use your judgment: if a concept is highly abstract, counterintuitive, or benefits from visual metaphor, include more images (2-3). If the lesson is more straightforward or procedural, use fewer (1-2). Each image should be an engaging, metaphorical, or narrative illustration that captures the essence of a concept â€” like editorial art in a premium textbook or magazine. Do NOT describe diagrams, flowcharts, infographics, icon sequences, or labeled process arrows (use the "visualisation" block for those instead). Instead, use visual metaphors and storytelling scenes. Prefer placing the first image early in the lesson to anchor the reader. For each image, write a detailed "prompt" field describing the scene, the mood, the objects, and the metaphor â€” as if directing an illustrator. Only include images where they genuinely enhance comprehension, not as decoration.
- Use inline formatting (**bold**, _italic_, \`code\`, ==highlight==, {{term}}) actively. Every "text" block should have highlighted phrases. Do not leave text blocks bare.
- When useful, connect practical guidance to the historical reasons behind best practices and to the future-facing tradeoffs a developer may encounter next.
- Every id must be unique within the lesson.
- Return ONLY the JSON object, no markdown fences or commentary.

EMPHASIS RULES:
- Use **bold** for short key words and phrases within a sentence â€” the constraint, the outcome, the failure mode, the mechanism, the decision. Aim for 3-5 bold phrases per "text" block.
- Use ==highlight== for the core point of a passage. This is a full phrase, clause, or sentence that captures the central idea the surrounding text is building toward. It is not a single bolded word â€” it is the takeaway. Use it every 2-3 "text" blocks. Do not overuse it on minor points.
- Use {{term}} generously for terms that have a precise, lookup-worthy technical meaning: named protocols ({{HTTP/2}}), algorithms ({{exponential backoff}}), libraries/frameworks ({{OpenTelemetry}}), well-defined engineering patterns ({{circuit breaker}}, {{idempotency key}}), specific identifiers ({{429}}, {{JWT}}), and established industry concepts ({{RAG}}, {{SLO}}, {{p95 latency}}). Aim for at least 15-20 distinct terms across the lesson. Every section MUST introduce at least 3-5 wrapped terms â€” a well-written section should feel dense with named, lookup-worthy concepts.
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
- There should be at least 15-20 entries. If you find fewer than 15, revisit the content and add more {{term}} usages.
- Each entry must be the bare term name exactly as written inside the markers, e.g. "RAG", "circuit breaker", "idempotency".
- Deduplicate: each term should appear only once regardless of how many times it is used in the lesson.
- Do not include formatting characters, braces, or whitespace padding â€” just the plain term string.

${schemaJson ? 'Here is a reference lesson for the exact structure:\n\n' + schemaJson : ''}`;
}

// â”€â”€ Build the user turn prompt â”€â”€
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

DEPTH REQUIREMENT: This lesson must be substantial but highly efficient. Every section must contain sequential "text" blocks that build on each other logically. Aim for 25-40 content items total with text blocks making up at least half. Every "text" block must be 3-5 sentences of sharp, high-signal explanation. Write like a senior engineer giving a quick, insightful teardown to a peer: cut the fluff, provide full reasoning, and make it memorable.

The lesson should be for an intermediate-to-advanced developer audience. Address common misconceptions head-on and explain the "why" with ruthless clarity.

Keep the writing punchy, imaginative, and strictly to the point. Use British English spelling. Use **bold** on 3-5 short key phrases per text block. Use ==highlight== for the core point of a passage â€” a full phrase or sentence that captures the central idea, used every 2-3 text blocks. Use {{term}} heavily on every named technical term (aim for 15-20 distinct terms total). Do not conflate bold and highlight â€” bold marks important words, highlight marks the insight.

Where interesting, include brief historical context and future-facing scope. Keep those additions fiercely grounded, concise, and highly relevant to immediate understanding.

Append a "quiz" array of 5-10 MCQ items to the root of the JSON (see the schema in the system prompt).

Use slug "${slug}" for the id and slug fields.
Set lastUpdated to "${new Date().toISOString().split('T')[0]}".`;
}

// â”€â”€ Generate images for all image content items in the lesson â”€â”€
async function generateLessonImages(provider: LLMProvider, lesson: any, lessonSlug: string): Promise<void> {
    const imageItems = lesson.content.filter((item: any) => item.type === 'image' && item.prompt);

    if (imageItems.length === 0) {
        console.log('   No image blocks found â€” skipping image generation.');
        return;
    }

    console.log(`\nðŸŽ¨ Generating ${imageItems.length} image(s) via ${provider.name}...`);

    const lessonImageDir = join(PUBLIC_IMAGES_DIR, lessonSlug);
    if (!existsSync(lessonImageDir)) {
        mkdirSync(lessonImageDir, { recursive: true });
    }

    for (const item of imageItems) {
        const filename = `${slugify(item.alt || item.id)}.png`;
        const localPath = join(lessonImageDir, filename);
        const publicPath = `/images/lessons/${lessonSlug}/${filename}`;

        console.log(`   ðŸ–¼  Generating: ${item.id} â†’ ${filename}`);

        try {
            const result = await provider.generateImage(item.prompt, localPath);
            if (result) {
                item.src = publicPath;
                console.log(`   âœ… Saved: ${publicPath}`);
            } else {
                console.warn(`   âš   Provider returned null for ${item.id} â€” skipping.`);
            }
        } catch (err: any) {
            console.error(`   âŒ Failed to generate image for ${item.id}:`, err?.message || err);
        }
    }
}

// â”€â”€ Resolve which provider to use based on --provider flag â”€â”€
export function resolveProvider(providerName: string): LLMProvider {
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

// â”€â”€ Main orchestrator â€” provider is injected, never hard-coded â”€â”€
export async function generateLesson(ctx: LessonContext, provider: LLMProvider): Promise<void> {
    const startTime = Date.now();
    console.log(`\nðŸš€ Generating lesson`);
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

    console.log(`ðŸ“¡ Calling ${provider.name}...`);

    const raw = await provider.generateLesson(systemPrompt, userPrompt);

    // Parse and validate basic structure
    const lesson = JSON.parse(raw);

    if (!lesson.id || !lesson.content || !Array.isArray(lesson.content)) {
        throw new Error('Generated JSON is missing required fields (id, content[]).');
    }

    if (!lesson.quiz || !Array.isArray(lesson.quiz) || lesson.quiz.length === 0) {
        console.warn('âš  No quiz array found in generated JSON â€” the lesson will have no quiz.');
    }

    // Uncomment to enable image generation:
    // await generateLessonImages(provider, lesson, slug);

    // Strip image prompts from the data copy â€” prompts are only for image generation
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
    const setupDbLessonPath = join(__dirname, '../setup-db/data/courses/sample/lessons/lesson-1.json');

    // Use the context ID if provided, otherwise fallback to the fixed demo ID
    const lessonId = ctx.id || '507f1f77bcf86cd799439003';
    const isDemo = lessonId === '507f1f77bcf86cd799439003';

    const lessonWithFixedId = {
        _id: lessonId,
        ...lessonForData
    };

    // Raw output keeps prompt fields intact
    writeFileSync(filepath, JSON.stringify(lesson, null, 2), 'utf-8');
    
    if (isDemo) {
        // Only update static demo files if it is the demo lesson
        if (!existsSync(dirname(demoLessonPath))) mkdirSync(dirname(demoLessonPath), { recursive: true });
        writeFileSync(demoLessonPath, JSON.stringify(lessonForData, null, 2), 'utf-8');
        
        if (!existsSync(dirname(setupDbLessonPath))) mkdirSync(dirname(setupDbLessonPath), { recursive: true });
        writeFileSync(setupDbLessonPath, JSON.stringify(lessonWithFixedId, null, 2), 'utf-8');
    }

    // Update database directly
    const CONNECTION_STRING = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
    const DB_NAME = process.env.MONGODB_DB ?? (process.env.NODE_ENV === 'development' ? 'lucario-dev' : 'lucario');
    const client = new MongoClient(CONNECTION_STRING);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const objectId = new ObjectId(lessonId);
        
        await db.collection('lessons').updateOne(
            { _id: objectId },
            { $set: { ...lessonForData, status: 'completed' } },
            { upsert: true }
        );
        console.log(`\n✅ Saved to database (${DB_NAME}.lessons)`);
    } catch (err) {
        console.error('\n❌ Failed to update database:', err);
    } finally {
        await client.close();
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✅ Saved raw output: ${filepath}`);
    console.log(`✅ Updated demo lesson: ${demoLessonPath}`);
    console.log(`✅ Updated setup-db file: ${setupDbLessonPath}`);
    console.log(`   Title:     ${lesson.title}`);
    console.log(`   Sections:  ${lesson.content.filter((c: any) => c.type === 'section').length}`);
    console.log(`   Items:     ${lesson.content.length}`);
    console.log(`   Key Terms: ${lesson.keyTerms ? lesson.keyTerms.length : 0}`);
    console.log(`   Images:    ${lesson.content.filter((c: any) => c.type === 'image').length}`);
    console.log(`   Questions: ${lesson.content.filter((c: any) => c.type === 'question').length}`);
    console.log(`   Quiz MCQs: ${lesson.quiz ? lesson.quiz.length : 0}`);
    console.log(`   Duration:  ${elapsed}s`);
}

// â”€â”€ CLI argument parsing â”€â”€
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

const isCLI = process.argv[1] && process.argv[1].includes('generateLesson.ts');
if (isCLI) {
    const parsed = parseArgs(process.argv);
    const missing = (['course', 'module', 'chapter', 'lesson'] as (keyof LessonContext)[]).filter(k => !parsed[k]);

if (missing.length > 0) {
    console.error(`\nâŒ Missing required arguments: ${missing.map(k => `--${k}`).join(', ')}`);
    console.error('\nUsage:');
    console.error('  generateLesson.ts [--provider openai|gemini] --course "<name>" --module "<name>" --chapter "<name>" --lesson "<name>" [--objectives "obj 1" ...]');
    process.exit(1);
}

const provider = resolveProvider(parsed.provider);

generateLesson(parsed as LessonContext, provider).catch((err) => {
    console.error('\nâŒ Generation failed:', err);
    process.exit(1);
});

}
