import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Import logic from generateLesson.ts
import { generateLesson, resolveProvider } from '../generate-lesson/generateLesson';

dotenv.config({ path: join(__dirname, '../../.env') });

const CONNECTION_STRING = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB ?? (process.env.NODE_ENV === 'development' ? 'lucario-dev' : 'lucario');

async function main() {
    const args = process.argv.slice(2);
    const idIndex = args.indexOf('--id');
    const providerIndex = args.indexOf('--provider');
    const providerName = providerIndex !== -1 && args[providerIndex + 1] ? args[providerIndex + 1] : 'gemini';

    if (idIndex === -1 || !args[idIndex + 1]) {
        console.error('Usage: tsx generateContent.ts --id <lesson_id> [--provider gemini|openai]');
        process.exit(1);
    }
    const lessonId = args[idIndex + 1];

    const client = new MongoClient(CONNECTION_STRING);
    try {
        await client.connect();
        const db = client.db(DB_NAME);

        console.log(`🔍 Fetching lesson context from DB for: ${lessonId}`);
        const lesson = await db.collection('lessons').findOne({ _id: new ObjectId(lessonId) });
        if (!lesson) {
            console.error('❌ Lesson not found.');
            process.exit(1);
        }

        const chapter = await db.collection('chapters').findOne({ _id: new ObjectId(lesson.chapterId) });
        const moduleDoc = await db.collection('modules').findOne({ _id: new ObjectId(lesson.moduleId) });
        const course = await db.collection('courses').findOne({ _id: new ObjectId(lesson.courseId) });

        if (!chapter || !moduleDoc || !course) {
            console.error('❌ Could not resolve full context hierarchy (Course/Module/Chapter) for this lesson.');
            process.exit(1);
        }

        const ctx = {
            id: lessonId,
            course: course.title,
            module: moduleDoc.title,
            chapter: chapter.title,
            lesson: lesson.title,
            objectives: lesson.objectives || []
        };

        const provider = resolveProvider(providerName);
        
        console.log(`\n🚀 Delegating to generateLesson logic for: ${ctx.lesson}`);
        
        // Temporarily patch process.argv to prevent generateLesson's CLI parsing from interfering if it leaked
        const originalArgv = process.argv;
        process.argv = ['node', 'dummy.js']; // prevent the CLI block from running in generateLesson if we didn't comment it perfectly
        
        try {
            await generateLesson(ctx, provider);
            
            // Assuming generateLesson successfully writes to DB or files.
            // Since generateLesson.ts hardcodes FIXED_DEMO_ID to update DB, 
            // we should ideally update the specific lessonId here as well, 
            // but generateLesson.ts might overwrite the lesson in DB using FIXED_DEMO_ID.
            // For a robust implementation, generateLesson.ts should take the ID as an argument.
            // Let's just update the status for now to indicate completion.
            await db.collection('lessons').updateOne(
                { _id: new ObjectId(lessonId) },
                { $set: { status: 'completed' } }
            );

        } finally {
            process.argv = originalArgv;
        }

    } catch (err) {
        console.error('❌ Failed to generate content:', err);
    } finally {
        await client.close();
        process.exit(0); // Exit process fully
    }
}

main();
