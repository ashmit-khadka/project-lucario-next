import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

// ── Load environment variables from project root ──
dotenv.config({ path: join(__dirname, '../../.env') });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const OUTPUT_DIR = join(__dirname, 'output');

// ── Read the demo lesson as the canonical schema reference ──
const DEMO_LESSON_PATH = join(__dirname, '../../data/learning/demo_lesson.json');

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
function buildDeveloperPrompt(schemaJson: string): string {
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
  "content": [ ...content items... ]
}

CONTENT ITEM TYPES (use all of them liberally):

1. section  — top-level divider
   { "id": "section-N", "type": "section", "title": "N. Section Title" }

2. text  — paragraph (supports **bold**, _italic_, \`code\`, ==highlight==)
   { "id": "text-N", "type": "text", "text": "..." }

3. list  — bullet points
   { "id": "list-N", "type": "list", "items": ["...", "..."] }

4. heading  — sub-heading with optional variant
   { "id": "heading-N", "type": "heading", "text": "...", "variant": "do" | "dont" }

5. code  — code block
   { "id": "code-N", "type": "code", "language": "javascript", "code": "..." }

6. callout  — important note
   { "id": "callout-N", "type": "callout", "text": "...", "variant": "info" | "tip" | "warning" | "danger" | "note" }

7. image  — diagram/illustration (use plausible placeholder paths)
   { "id": "image-N", "type": "image", "src": "/images/lessons/...", "alt": "...", "caption": "..." }

8. table  — comparison/reference table
   { "id": "table-N", "type": "table", "headers": [...], "rows": [[...], ...] }

9. question  — interactive question block (use variant field)
   multiple-choice:
   { "id": "question-mc-N", "type": "question", "variant": "multiple-choice", "question": "...", "options": ["A","B","C","D"], "correctAnswer": "C", "explanation": "..." }

   reveal-answer:
   { "id": "question-reveal-N", "type": "question", "variant": "reveal-answer", "prompt": "...", "answer": "...", "explanation": "...", "code": "...(optional)", "codeLanguage": "javascript", "buttonLabel": "Show Answer" }

   fill-blank:
   { "id": "question-fill-N", "type": "question", "variant": "fill-blank", "question": "... ___ ...", "correctAnswer": "...", "acceptableAnswers": ["..."], "placeholder": "...", "explanation": "..." }

You are an expert technical course author. You generate structured lesson content in JSON format.

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
  "content": [ ...content items... ]
}

CONTENT ITEM TYPES (use all of them liberally):

1. section  — top-level divider
   { "id": "section-N", "type": "section", "title": "N. Section Title" }

2. text  — paragraph (supports **bold**, _italic_, \`code\`, ==highlight==)
   { "id": "text-N", "type": "text", "text": "..." }

3. list  — bullet points
   { "id": "list-N", "type": "list", "items": ["...", "..."] }

4. heading  — sub-heading with optional variant
   { "id": "heading-N", "type": "heading", "text": "...", "variant": "do" | "dont" }

5. code  — code block
   { "id": "code-N", "type": "code", "language": "javascript", "code": "..." }

6. callout  — important note
   { "id": "callout-N", "type": "callout", "text": "...", "variant": "info" | "tip" | "warning" | "danger" | "note" }

7. image  — diagram/illustration (use plausible placeholder paths)
   { "id": "image-N", "type": "image", "src": "/images/lessons/...", "alt": "...", "caption": "..." }

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
- Avoid decorative or unusual special characters in lesson copy, including arrows, smart quotes, em dashes, and other typography-heavy symbols.
- Avoid unnecessary parentheses unless they are genuinely needed for clarity.
- Prefer direct sentences over flashy phrasing.
- Where it genuinely improves understanding, add brief historical context that explains how or why a concept emerged, what earlier limitations it addressed, or which prior patterns it replaced.
- Where it genuinely improves understanding, mention near-term future scope, likely evolution, or adjacent next-step concepts so the learner understands where the topic leads.
- Use historical context and future scope selectively. They should support the main explanation, not distract from it or turn the lesson into speculation.
- Use inline formatting tastefully and sparingly:
  - Use **bold** for a few key terms or decisions.
  - Use ==highlight== only for especially important takeaways.
  - Use _italic_ only for light emphasis or first-use terminology.
  - Do not over-format sentences. Most text should remain plain.

FLOW AND STRUCTURE RULES:
- Build the lesson as a sequence of small, readable blocks that feel natural in a learning UI.
- Do not mix paragraph prose and bullet-style lists inside the same text field.
- If content contains 2 or more short parallel examples, contrasts, or definitions, use a "list" item instead of embedding them inside "text".
- Use "text" blocks for explanation, framing, transitions, and interpretation.
- Use "list" blocks for grouped examples, patterns, rules, comparisons, symptoms, or takeaways.
- When introducing a list, first use a short "text" block to explain what the learner is about to see.
- After a list, often follow with a short "text" block that explains what the list means or why it matters.
- Prefer multiple short content items over one dense content item.
- Each content block should usually do one job only: explain, list, compare, warn, or test.
- Avoid long walls of text. Split dense explanations into adjacent "text", "list", "callout", "table", or "question" blocks where appropriate.
- The lesson should feel like a clean, cohesive reading flow, not a dump of formatted fragments.
- Use lists liberally when they improve scanability, especially for examples like:
  - named attack types
  - pros and cons
  - do and don't guidance
  - step sequences
  - grouped observations
- Do not simulate bullets inside a "text" string using dash-prefixed lines or numbered lines. Use a real "list" block instead.

TEXT VS LIST RULE:
- Never place bullet-style lines inside a "text" block. Convert them into a separate "list" content item.

UI COMPOSITION RULE:
- Compose lessons for a block-based reading experience. Alternate explanation with structure: introduce an idea in "text", break examples into "list" or "table", reinforce with "callout" or "question", then move on.

- Treat each content item as a UI block, not just a writing block. Split content based on presentation as well as meaning.
- When a paragraph is followed by example items, the examples must be emitted as a separate "list" content item, not embedded in the same "text" field.
- Do not place bullet-like examples inside "text". Any grouped examples, named items, or parallel points must be output as a separate "list" block so the lesson renders cleanly in the UI.

CONTENT RULES:
- Generate 4-6 sections with 20-40 total content items.
- Use a variety of content types. Every lesson must include at least: section, text, list, code, callout, table, and at least 2 question blocks.
- Use inline formatting (**bold**, _italic_, \`code\`, ==highlight==) only when it improves clarity or emphasis. Do not use it in every block.
- Code examples should be realistic and production-quality.
- When useful, connect practical guidance to the historical reasons behind best practices and to the future-facing tradeoffs a developer may encounter next.
- Every id must be unique within the lesson.
- Return ONLY the JSON object, no markdown fences or commentary.

EMPHASIS RULES:
- Use **bold** for named concepts, vulnerability names, APIs, protocols, and key technical terms.
- Use ==highlight== liberally for essential words and short phrases that carry the meaning of the point.
- Prefer several small highlights across a block rather than one large highlighted span.
- Do not highlight whole sentences or long clauses.
- Highlight the smallest useful unit: usually a key word, short action, consequence, mechanism, or assumption.
- It is good to highlight multiple important words in the same sentence when each one adds meaning.
- Prefer highlighting words that explain how something works, what changes, what is trusted, what fails, and why it matters.
- In explanatory text, highlight the words that a learner should notice first when scanning.
- In lists, keep the item label in **bold** and use ==highlight== for the most important actions, mechanisms, consequences, and decision points.
- Do not overuse formatting on every sentence, but do use enough highlighting to make the core meaning easy to scan.
- Do not highlight and bold the same exact phrase unless it is exceptionally important.
- Prefer highlighting words that are essential to the point being made, not words that are merely descriptive.

${schemaJson ? 'Here is a reference lesson for the exact structure:\n\n' + schemaJson : ''}`;
}

// ── Main ──
async function generateLesson(topic: string): Promise<void> {
  console.log(`\n🚀 Generating lesson for: "${topic}"\n`);

  const slug = slugify(topic);
  const schemaRef = getSchemaReference();
  const developerPrompt = buildDeveloperPrompt(schemaRef);

  const userPrompt = `Generate a comprehensive lesson on the following topic:

"${topic}"

The lesson should be suitable for an intermediate-to-advanced web developer audience. Cover concepts, practical examples with code, common mistakes, and include interactive question blocks to reinforce learning.

Keep the writing clean and readable. Avoid typography-heavy characters such as arrows, curly quotes, em dashes, and other decorative symbols. Prefer plain punctuation and natural wording. Use **bold**, ==highlight==, and _italic_ only occasionally when they add real emphasis.

Where interesting or beneficial, include brief historical context and future-facing scope inside explanations so the learner understands both how the topic developed and where it may lead next. Keep those additions grounded, concise, and relevant.

Use slug "${slug}" for the id and slug fields.
Set lastUpdated to "${new Date().toISOString().split('T')[0]}".`;

  console.log('📡 Calling GPT-5.2...');

  const response = await openai.chat.completions.create({
    model: 'gpt-5.2',
    messages: [
      { role: 'developer', content: developerPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_completion_tokens: 16000,
    reasoning_effort: 'high',
    response_format: { type: 'json_object' }
  });

  const raw = response.choices[0].message.content;
  if (!raw) {
    throw new Error('No content returned from the model.');
  }

  // Parse and validate basic structure
  const lesson = JSON.parse(raw);

  if (!lesson.id || !lesson.content || !Array.isArray(lesson.content)) {
    throw new Error('Generated JSON is missing required fields (id, content[]).');
  }

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const filename = `${slug}.json`;
  const filepath = join(OUTPUT_DIR, filename);
  const demoLessonPath = join(__dirname, '../../data/learning/demo_lesson.json');
  const serializedLesson = JSON.stringify(lesson, null, 2);

  writeFileSync(filepath, serializedLesson, 'utf-8');
  writeFileSync(demoLessonPath, serializedLesson, 'utf-8');

  console.log(`\n✅ Saved: ${filepath}`);
  console.log(`✅ Updated demo lesson: ${demoLessonPath}`);
  console.log(`   Title:    ${lesson.title}`);
  console.log(`   Sections: ${lesson.content.filter((c: any) => c.type === 'section').length}`);
  console.log(`   Items:    ${lesson.content.length}`);
  console.log(`   Questions: ${lesson.content.filter((c: any) => c.type === 'question').length}`);
}

// ── CLI entry point ──
const topic = process.argv[2];
if (!topic) {
  console.error('Usage: generateLesson.ts "<lesson topic>"');
  console.error('Example: generateLesson.ts "SSRF, open redirects, request smuggling (concepts)"');
  process.exit(1);
}

generateLesson(topic).catch((err) => {
  console.error('\n❌ Generation failed:', err);
  process.exit(1);
});
