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
    let curriculumId = '';
    let chapterFilter = 'all';
    let lessonFilter = 'all';
    let providerName = 'gemini';

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--curriculum-id' && args[i + 1]) curriculumId = args[++i];
        if (args[i] === '--chapters' && args[i + 1]) chapterFilter = args[++i];
        if (args[i] === '--lessons' && args[i + 1]) lessonFilter = args[++i];
        if (args[i] === '--provider' && args[i + 1]) providerName = args[++i];
    }

    if (!curriculumId) {
        console.error('Usage: tsx generateCourseContent.ts --curriculum-id <id> [--chapters "all"] [--lessons "all"]');
        process.exit(1);
    }

    const client = new MongoClient(CONNECTION_STRING);
    try {
        await client.connect();
        const db = client.db(DB_NAME);

        console.log(`🔍 Fetching curriculum: ${curriculumId}`);
        const curriculum = await db.collection('curricula').findOne({ _id: new ObjectId(curriculumId) });
        if (!curriculum) {
            console.error('❌ Curriculum not found.');
            process.exit(1);
        }

        if (!curriculum.builtCourseId) {
            console.error('❌ Curriculum does not have a builtCourseId. Please run buildOutline.ts first.');
            process.exit(1);
        }

        const course = await db.collection('courses').findOne({ _id: curriculum.builtCourseId });
        if (!course) {
            console.error('❌ Course not found.');
            process.exit(1);
        }

        const modules = await db.collection('modules').find({ courseId: course._id }).toArray();
        const chapters = await db.collection('chapters').find({ courseId: course._id }).toArray();
        const lessons = await db.collection('lessons').find({ courseId: course._id }).toArray();

        // Process filters
        const allowedChapters = chapterFilter === 'all' || !chapterFilter ? null : chapterFilter.split(',').map(s => s.trim().toLowerCase());
        const allowedLessons = lessonFilter === 'all' || !lessonFilter ? null : lessonFilter.split(',').map(s => s.trim().toLowerCase());

        let lessonsToGenerate = lessons;

        if (allowedChapters) {
            const filteredChapters = chapters.filter(c => allowedChapters.includes(c.title.toLowerCase()) || allowedChapters.includes(c.slug.toLowerCase()));
            const filteredChapterIds = filteredChapters.map(c => c._id.toString());
            lessonsToGenerate = lessonsToGenerate.filter(l => filteredChapterIds.includes(l.chapterId.toString()));
        }

        if (allowedLessons) {
            lessonsToGenerate = lessonsToGenerate.filter(l => allowedLessons.includes(l.title.toLowerCase()) || allowedLessons.includes(l.slug.toLowerCase()));
        }

        console.log(`\nFound ${lessonsToGenerate.length} lesson(s) to generate.`);

        const provider = resolveProvider(providerName);

        // Temporarily patch process.argv to prevent generateLesson's CLI parsing from interfering
        const originalArgv = process.argv;
        process.argv = ['node', 'dummy.js'];

        try {
            for (const lesson of lessonsToGenerate) {
                const chapter = chapters.find(c => c._id.toString() === lesson.chapterId.toString());
                const mod = modules.find(m => m._id.toString() === lesson.moduleId.toString());

                if (!chapter || !mod) {
                    console.warn(`⚠️ Skipping lesson ${lesson.title} - missing chapter or module context.`);
                    continue;
                }

                const ctx = {
                    id: lesson._id.toString(),
                    course: course.title,
                    module: mod.title,
                    chapter: chapter.title,
                    lesson: lesson.title,
                    objectives: lesson.objectives || []
                };

                console.log(`\n🚀 Generating lesson: ${ctx.lesson}...`);
                await generateLesson(ctx, provider);
            }
        } finally {
            process.argv = originalArgv;
        }

        console.log('\n🎉 Course content generation completed!');

    } catch (err) {
        console.error('❌ Failed to generate course content:', err);
    } finally {
        await client.close();
        process.exit(0);
    }
}

main();
