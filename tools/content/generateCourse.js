import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { courseConfig } from './courseConfig.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
const envPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate a unique ID for content items
 */
function generateId(prefix, index) {
    return `${prefix}-${index}`;
}

/**
 * Generate a lesson object using OpenAI
 */
async function generateLesson(courseName, chapterTitle, chapterIndex, difficulty = 'beginner') {
    console.log(`\n🤖 Generating lesson ${chapterIndex + 1}: ${chapterTitle}...`);

    const prompt = `You are an expert technical educator creating educational content for a computer science learning platform.

Create a comprehensive lesson for the following:
- Course: ${courseName}
- Chapter: ${chapterTitle}
- Difficulty: ${difficulty}

Generate a detailed lesson with the following structure (return ONLY valid JSON):

{
  "id": "lesson-${chapterIndex + 1}",
  "slug": "lesson-slug",
  "version": "1.0.0",
  "title": "Chapter title with emoji",
  "description": "Brief description of what students will learn",
  "meta": {
    "difficulty": "${difficulty}",
    "duration": 25,
    "prerequisites": [],
    "tags": ["relevant", "tags"],
    "author": "AI Generated",
    "lastUpdated": "${new Date().toISOString().split('T')[0]}"
  },
  "content": [
    // Array of content items with types: section, text, heading, list, code, callout, table, image
    // Each item must have: id, type, and relevant fields
    // Include at least 3-4 sections with varied content types
    // Use callouts for tips, warnings, and important notes
    // Include code examples with proper syntax
    // Add tables for comparisons when relevant
    // For list items, include "listType": "ordered" or "unordered" (default: "unordered")
  ],
  "quiz": null
}

Content Item Examples:
- Text: { "id": "text-1", "type": "text", "content": "..." }
- List: { "id": "list-1", "type": "list", "items": ["...", "..."], "listType": "unordered" }
- Ordered List: { "id": "list-2", "type": "list", "items": ["...", "..."], "listType": "ordered" }
- Code: { "id": "code-1", "type": "code", "content": "...", "language": "javascript" }
- Callout: { "id": "callout-1", "type": "callout", "content": "...", "variant": "tip" }
- Table: { "id": "table-1", "type": "table", "headers": ["..."], "rows": [[...]] }

Requirements:
1. Use emojis in section titles for visual appeal
2. Include practical code examples in JavaScript/TypeScript
3. Add callouts (tip, warning, info, note) for important points
4. Use tables for comparisons or data presentation
5. Each content item needs a unique id like "text-1", "code-1", "callout-1"
6. For lists, specify "listType": "ordered" for numbered lists or "unordered" for bullet points
7. Make content engaging and educational
8. Include real-world examples and best practices
9. Keep explanations clear and concise

Return ONLY the JSON object, no markdown formatting or additional text.`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-5.2',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert technical educator. Return only valid JSON without markdown code blocks.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 4000
        });

        const content = response.choices[0].message.content.trim();
        
        // Remove markdown code blocks if present
        const jsonContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        const lesson = JSON.parse(jsonContent);
        
        console.log(`✅ Generated lesson: ${lesson.title}`);
        return lesson;
    } catch (error) {
        console.error(`❌ Error generating lesson ${chapterIndex + 1}:`, error.message);
        throw error;
    }
}

/**
 * Generate a complete course with all lessons
 */
async function generateCourse(courseConfig) {
    const { name, description, difficulty, contents } = courseConfig;

    console.log(`\n🚀 Starting course generation: ${name}`);
    console.log(`📚 Total chapters: ${contents.length}\n`);

    const lessons = [];

    // Generate each lesson
    for (let i = 0; i < contents.length; i++) {
        const chapterTitle = contents[i];
        
        try {
            const lesson = await generateLesson(name, chapterTitle, i, difficulty);
            lessons.push(lesson);
            
            // Add delay to avoid rate limiting
            if (i < contents.length - 1) {
                console.log('⏳ Waiting 2 seconds before next generation...');
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } catch (error) {
            console.error(`Failed to generate lesson ${i + 1}. Stopping.`);
            break;
        }
    }

    // Create course object
    const course = {
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name: name,
        link: `/learn/${name.toLowerCase().replace(/\s+/g, '-')}`,
        icon: `/assets/icons/${name}.svg`,
        description: description || `Master ${name} concepts and techniques`,
        totalLessons: lessons.length,
        lessons: lessons
    };

    console.log(`\n✨ Course generation complete!`);
    console.log(`📊 Generated ${lessons.length} lessons`);

    return course;
}

/**
 * Save course to file
 */
function saveCourse(course, outputPath) {
    const courseDir = path.join(__dirname, course.id);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(courseDir)) {
        fs.mkdirSync(courseDir, { recursive: true });
    }

    // Save individual lesson files
    course.lessons.forEach((lesson, index) => {
        const lessonFileName = `${course.id}_${index + 1}.js`;
        const lessonPath = path.join(courseDir, lessonFileName);
        
        const lessonContent = `const Lesson${index + 1} = ${JSON.stringify(lesson, null, 4)};\n\nexport default Lesson${index + 1};\n`;
        
        fs.writeFileSync(lessonPath, lessonContent);
        console.log(`💾 Saved: ${lessonFileName}`);
    });

    // Save course index file
    const indexPath = path.join(courseDir, 'index.js');
    const imports = course.lessons.map((_, i) => 
        `import Lesson${i + 1} from './${course.id}_${i + 1}.js';`
    ).join('\n');
    
    const courseExport = `${imports}

const ${course.name.replace(/\s+/g, '')}Course = {
    id: '${course.id}',
    name: '${course.name}',
    link: '${course.link}',
    icon: '${course.icon}',
    description: '${course.description}',
    totalLessons: ${course.lessons.length},
    lessons: [
        ${course.lessons.map((_, i) => `Lesson${i + 1}`).join(',\n        ')}
    ]
};

export default ${course.name.replace(/\s+/g, '')}Course;
`;

    fs.writeFileSync(indexPath, courseExport);
    console.log(`💾 Saved: index.js`);
    
    console.log(`\n📁 Course saved to: ${courseDir}`);
}

/**
 * Main execution
 */
async function main() {
    console.log(`📚 Generating course: ${courseConfig.name}`);

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
        console.error('❌ Error: OPENAI_API_KEY environment variable is not set');
        console.log('Please set your OpenAI API key:');
        console.log('export OPENAI_API_KEY="your-api-key-here"');
        process.exit(1);
    }

    try {
        const course = await generateCourse(courseConfig);
        saveCourse(course, './data/learning');
        
        console.log('\n✅ Course generation completed successfully!');
        console.log(`\n📖 Next steps:`);
        console.log(`1. Review generated lessons in: tools/content/${course.id}/`);
        console.log(`2. Add course to data/learning/courses.js`);
        console.log(`3. Test the course at: http://localhost:6969/learn/${course.id}`);
    } catch (error) {
        console.error('\n❌ Course generation failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { generateCourse, generateLesson, saveCourse };
