import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import type { CourseInput, ChapterItem, LessonItem, ContentItem } from '../types/course';
import type { Lesson, ContentItem as LessonContentItem } from '../types/lesson';

// Load environment variables from project root
dotenv.config({ path: join(__dirname, '../../.env') });

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Output directory
const OUTPUT_DIR = join(__dirname, 'output');

interface GeneratedCourse {
  id: string;
  name: string;
  slug: string;
  description: string;
  difficulty: string;
  icon?: string;
  author?: string;
  version: string;
  totalLessons: number;
  chapterFiles: string[];
}

interface GeneratedChapter {
  id: string;
  name: string;
  title: string;
  description: string;
  order: number;
  lessonFiles: string[];
  subChapterFiles: string[];
}

/**
 * Generate lesson content using ChatGPT
 */
async function generateLessonContent(
  lesson: LessonItem,
  courseName: string,
  chapterContext: string[]
): Promise<LessonContentItem[]> {
  const systemPrompt = `You are an expert technical content creator. Generate educational lesson content in JSON format following the exact structure shown in the example.

The lesson content should include a variety of content types:
- "section": Main section dividers with titles
- "text": Explanatory paragraphs
- "list": Bulleted or numbered lists
- "heading": Sub-headings with variants (do/dont/default)
- "code": Code examples with syntax highlighting
- "callout": Important notes with variants (info/tip/warning/danger/note)
- "image": Diagrams and illustrations (use placeholder paths)
- "table": Comparison tables with headers and rows

Each content item must have:
- Unique "id" (format: "section-1", "text-1", "code-1", etc.)
- "type" field matching one of the types above
- Type-specific fields (text, items, code, src, headers/rows, etc.)

Make content comprehensive, educational, and production-ready. Include practical examples and best practices.`;

  const userPrompt = `Generate lesson content for:

Course: ${courseName}
Chapter Path: ${chapterContext.join(' > ')}
Lesson: ${lesson.title}
Description: ${lesson.description}

Topics to cover:
${lesson.topics.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Difficulty: ${lesson.difficulty || 'intermediate'}

Generate a comprehensive lesson with multiple sections covering all topics. 

Return a JSON object with a "content" array containing lesson content items.

Required format:
{
  "content": [
    {
      "id": "section-1",
      "type": "section",
      "title": "1. Introduction"
    },
    {
      "id": "text-1",
      "type": "text",
      "text": "Explanation text here..."
    },
    {
      "id": "list-1",
      "type": "list",
      "items": ["Point 1", "Point 2", "Point 3"]
    },
    {
      "id": "code-1",
      "type": "code",
      "language": "javascript",
      "code": "const example = 'code';"
    },
    {
      "id": "callout-1",
      "type": "callout",
      "text": "Important tip or note",
      "variant": "tip"
    },
    {
      "id": "table-1",
      "type": "table",
      "caption": "Table caption",
      "headers": ["Header1", "Header2"],
      "rows": [["Value1", "Value2"]]
    }
  ]
}

Content types available:
- section: Main dividers with title
- text: Paragraphs with markdown support
- list: Array of items
- heading: Subheadings with variant (do/dont/default)
- code: Code blocks with language
- callout: Notes with variant (info/tip/warning/danger/note)
- table: Tables with headers and rows
- image: Images with src, alt, caption

Generate 10-15 content items with good variety.`;

  try {
    console.log(`  Generating content for lesson: ${lesson.title}...`);
    
    const response = await openai.chat.completions.create({
      model: 'gpt-5.2',
      messages: [
        { role: 'developer', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_completion_tokens: 4000,
      reasoning_effort: 'medium',
      verbosity: 'medium',
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }

    // Parse the response
    const parsed = JSON.parse(content);
    
    // Handle both direct array and object with content property
    const contentArray = Array.isArray(parsed) ? parsed : (parsed.content || []);
    
    return contentArray as LessonContentItem[];
  } catch (error) {
    console.error(`  Error generating lesson content: ${error}`);
    throw error;
  }
}

/**
 * Generate a lesson file
 */
async function generateLesson(
  lesson: LessonItem,
  courseName: string,
  chapterContext: string[],
  order: number
): Promise<{ filename: string; lesson: Lesson }> {
  console.log(`\n📝 Generating lesson: ${lesson.title}`);

  const content = await generateLessonContent(lesson, courseName, chapterContext);

  const lessonObj: Lesson = {
    id: lesson.name,
    slug: lesson.name,
    version: '1.0.0',
    title: lesson.title,
    description: lesson.description,
    meta: {
      difficulty: lesson.difficulty || 'intermediate',
      duration: 30, // Default duration
      prerequisites: [],
      tags: lesson.topics.slice(0, 5),
      author: 'AI Generated',
      lastUpdated: new Date().toISOString().split('T')[0]
    },
    content: content
  };

  const filename = `${lesson.name}.json`;
  return { filename, lesson: lessonObj };
}

/**
 * Find the first lesson in the content tree
 */
function findFirstLesson(items: ContentItem[]): { lesson: LessonItem; context: string[] } | null {
  for (const item of items) {
    if (item.type === 'lesson') {
      return { lesson: item, context: [item.title] };
    } else if (item.type === 'chapter') {
      const found = findFirstLesson(item.content);
      if (found) {
        return { lesson: found.lesson, context: [item.title, ...found.context] };
      }
    }
  }
  return null;
}

/**
 * Process content items (chapters and lessons) recursively
 */
async function processContent(
  items: ContentItem[],
  courseName: string,
  chapterContext: string[],
  parentPath: string,
  order: number = 0
): Promise<{ lessonFiles: string[]; chapterFiles: string[]; lessons: any[]; chapters: any[] }> {
  const lessonFiles: string[] = [];
  const chapterFiles: string[] = [];
  const lessons: any[] = [];
  const chapters: any[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const currentOrder = order + i;

    if (item.type === 'lesson') {
      // Generate lesson
      const { filename, lesson } = await generateLesson(
        item,
        courseName,
        chapterContext,
        currentOrder
      );
      
      const filepath = join(parentPath, filename);
      writeFileSync(filepath, JSON.stringify(lesson, null, 2));
      console.log(`  ✓ Saved: ${filename}`);
      
      lessonFiles.push(filename);
      lessons.push(lesson);
    } else if (item.type === 'chapter') {
      // Process chapter
      const chapterPath = join(parentPath, item.name);
      if (!existsSync(chapterPath)) {
        mkdirSync(chapterPath, { recursive: true });
      }

      const newContext = [...chapterContext, item.title];
      console.log(`\n📁 Processing chapter: ${item.title}`);

      // Recursively process chapter content
      const result = await processContent(
        item.content,
        courseName,
        newContext,
        chapterPath,
        0
      );

      // Create chapter metadata
      const chapter: GeneratedChapter = {
        id: item.name,
        name: item.name,
        title: item.title,
        description: item.description,
        order: currentOrder,
        lessonFiles: result.lessonFiles,
        subChapterFiles: result.chapterFiles
      };

      const chapterFilename = `${item.name}.json`;
      const chapterFilepath = join(parentPath, chapterFilename);
      writeFileSync(chapterFilepath, JSON.stringify(chapter, null, 2));
      console.log(`  ✓ Saved chapter metadata: ${chapterFilename}`);

      chapterFiles.push(chapterFilename);
      chapters.push(chapter);
    }
  }

  return { lessonFiles, chapterFiles, lessons, chapters };
}

/**
 * Main function to generate course
 */
async function generateCourse(inputFile: string) {
  console.log('🚀 Starting course generation (first lesson only)...\n');

  // Read input file
  const inputPath = join(__dirname, inputFile);
  if (!existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const courseInput: CourseInput = JSON.parse(readFileSync(inputPath, 'utf-8'));
  console.log(`📚 Course: ${courseInput.course.title}`);
  console.log(`📝 Description: ${courseInput.course.description}\n`);

  // Find the first lesson
  console.log('🔍 Finding first lesson...\n');
  const firstLessonData = findFirstLesson(courseInput.content);
  
  if (!firstLessonData) {
    throw new Error('No lessons found in the course content');
  }

  const { lesson: firstLesson, context: chapterContext } = firstLessonData;
  console.log(`📖 First lesson found: ${firstLesson.title}`);
  console.log(`📂 Chapter path: ${chapterContext.slice(0, -1).join(' > ')}\n`);

  // Create output directory (clean it first if it exists)
  const coursePath = join(OUTPUT_DIR, courseInput.course.name);
  if (existsSync(coursePath)) {
    console.log(`🗑️  Cleaning existing output directory...\n`);
    rmSync(coursePath, { recursive: true, force: true });
  }
  mkdirSync(coursePath, { recursive: true });

  console.log(`📂 Output directory: ${coursePath}\n`);

  // Generate only the first lesson
  const { filename, lesson } = await generateLesson(
    firstLesson,
    courseInput.course.title,
    chapterContext.slice(0, -1),
    0
  );
  
  const filepath = join(coursePath, filename);
  writeFileSync(filepath, JSON.stringify(lesson, null, 2));
  console.log(`✓ Saved: ${filename}`);

  const demoLessonPath = join(__dirname, '../../data/learning/demo_lesson.json');
  writeFileSync(demoLessonPath, JSON.stringify(lesson, null, 2));
  console.log('✓ Updated demo lesson: data/learning/demo_lesson.json');

  // Find the chapter that contains this lesson
  let chapterSlug: string | null = null;
  function findChapterForLesson(items: ContentItem[], lessonName: string): string | null {
    for (const item of items) {
      if (item.type === 'chapter') {
        // Check if lesson is directly in this chapter
        const hasLesson = item.content.some(child => 
          child.type === 'lesson' && child.name === lessonName
        );
        if (hasLesson) {
          return item.name;
        }
        // Check nested chapters
        const nested = findChapterForLesson(item.content, lessonName);
        if (nested) return nested;
      }
    }
    return null;
  }
  
  chapterSlug = findChapterForLesson(courseInput.content, firstLesson.name);

  // Create chapter metadata if we found the chapter
  const chapterFiles: string[] = [];
  if (chapterSlug) {
    // Find the chapter object
    function findChapter(items: ContentItem[], slug: string): ChapterItem | null {
      for (const item of items) {
        if (item.type === 'chapter' && item.name === slug) {
          return item;
        }
        if (item.type === 'chapter') {
          const found = findChapter(item.content, slug);
          if (found) return found;
        }
      }
      return null;
    }

    const chapterItem = findChapter(courseInput.content, chapterSlug);
    if (chapterItem) {
      const chapter: GeneratedChapter = {
        id: chapterItem.name,
        name: chapterItem.name,
        title: chapterItem.title,
        description: chapterItem.description,
        order: 0,
        lessonFiles: [filename],
        subChapterFiles: []
      };

      const chapterFilename = `${chapterItem.name}.json`;
      const chapterFilepath = join(coursePath, chapterFilename);
      writeFileSync(chapterFilepath, JSON.stringify(chapter, null, 2));
      console.log(`✓ Saved chapter metadata: ${chapterFilename}`);
      chapterFiles.push(chapterFilename);
    }
  }

  // Create minimal course metadata
  const course: GeneratedCourse = {
    id: courseInput.course.name,
    name: courseInput.course.title,
    slug: courseInput.course.name,
    description: courseInput.course.description,
    difficulty: courseInput.course.difficulty,
    icon: courseInput.course.icon,
    author: courseInput.course.author,
    version: courseInput.course.version || '1.0.0',
    totalLessons: 1,
    chapterFiles: chapterFiles
  };

  // Save course metadata
  const courseFilepath = join(coursePath, 'course.json');
  writeFileSync(courseFilepath, JSON.stringify(course, null, 2));
  console.log(`\n✓ Saved course metadata: course.json`);

  console.log('\n✨ First lesson generation complete!');
  console.log(`📄 Generated lesson: ${firstLesson.title}`);
  console.log(`📁 Output location: ${coursePath}`);
}

// Main execution
const inputFile = process.argv[2] || 'example.json';

generateCourse(inputFile)
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  });
