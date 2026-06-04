import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { generateLesson, resolveProvider } from './generateLesson';
import type { LessonContext } from '../shared/providers/types';

async function main() {
    // Customize your context here
    const ctx: LessonContext = {
        id: "000000000000000000000001",
        course: "Advanced UI Architecture",
        module: "Component Design Patterns",
        chapter: "State Management and Data Flow",
        lesson: "Mock Lesson", // slugifies to "mock-lesson"
        objectives: [
            "Understand the differences between prop drilling and state colocation.",
            "Learn how to use React composition to avoid monolithic components.",
            "Identify the performance implications of unnecessary re-renders."
        ]
    };

    // Provider can be specified via environment or overridden here
    // e.g. resolveProvider('gemini') or resolveProvider('openai')
    const provider = resolveProvider(process.env.DEFAULT_PROVIDER || 'openai');

    console.log('Generating mock lesson via LLM...');
    await generateLesson(ctx, provider);

    // generateLesson writes the output to tools/generate-lesson/output/<slug>.json
    const slug = 'mock-lesson';
    const outputPath = join(__dirname, 'output', `${slug}.json`);
    
    const generatedData = JSON.parse(readFileSync(outputPath, 'utf-8'));

    // Enforce fixture constraints
    generatedData._id = "000000000000000000000001";
    generatedData.slug = "mock-lesson";

    // Write it to the fixtures directory
    const fixturePath = join(__dirname, '../../fixtures/sample-course/lessons/lesson-mock-lesson.json');
    writeFileSync(fixturePath, JSON.stringify(generatedData, null, 2), 'utf-8');

    console.log(`\n✅ Successfully updated mock fixture at ${fixturePath}`);
    console.log(`When USE_LOCAL_FIXTURES=true is set in .env, this lesson will be loaded in the UI.`);
}

main().catch(err => {
    console.error('Failed to generate mock fixture:', err);
    process.exit(1);
});
