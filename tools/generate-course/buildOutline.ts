import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

const CONNECTION_STRING = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB ?? (process.env.NODE_ENV === 'development' ? 'lucario-dev' : 'lucario');

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function main() {
    const args = process.argv.slice(2);
    const idIndex = args.indexOf('--id');
    if (idIndex === -1 || !args[idIndex + 1]) {
        console.error('Usage: tsx buildOutline.ts --id <curriculum_id>');
        process.exit(1);
    }
    const curriculumId = args[idIndex + 1];

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

        const rawData = curriculum;
        if (!rawData || !rawData.course) {
            console.error('❌ Invalid course structure data.');
            process.exit(1);
        }

        console.log(`🔨 Building database outline for: ${rawData.course}`);

        // 1. Create Course
        const courseDoc = {
            slug: slugify(rawData.course),
            version: '1.0.0',
            title: rawData.course,
            description: rawData.description || `Generated course: ${rawData.course}`,
            meta: {
                difficulty: "intermediate",
                author: "AI Generated",
                tags: []
            },
            moduleIds: [] as ObjectId[],
            stats: {
                totalModules: rawData.modules.length,
                totalChapters: 0,
                totalLessons: 0,
                totalDuration: 0
            }
        };

        const courseResult = await db.collection('courses').insertOne(courseDoc);
        const courseId = courseResult.insertedId;
        console.log(`✅ Created Course: ${courseDoc.title} (${courseId})`);

        let totalChapters = 0;
        let totalLessons = 0;

        // 2. Process Modules
        let moduleOrder = 1;
        for (const mod of rawData.modules) {
            const moduleDoc = {
                slug: slugify(mod.module),
                title: mod.module,
                description: mod.description,
                order: moduleOrder++,
                courseId: courseId,
                chapterIds: [] as ObjectId[]
            };

            const modResult = await db.collection('modules').insertOne(moduleDoc);
            const moduleId = modResult.insertedId;
            courseDoc.moduleIds.push(moduleId);
            console.log(`  📦 Created Module: ${moduleDoc.title} (${moduleId})`);

            // 3. Process Chapters
            let chapterOrder = 1;
            for (const chap of mod.chapters || []) {
                totalChapters++;
                const chapterDoc = {
                    slug: slugify(chap.chapter),
                    title: chap.chapter,
                    description: chap.description,
                    order: chapterOrder++,
                    courseId: courseId,
                    moduleId: moduleId,
                    lessonIds: [] as ObjectId[]
                };

                const chapResult = await db.collection('chapters').insertOne(chapterDoc);
                const chapterId = chapResult.insertedId;
                moduleDoc.chapterIds.push(chapterId);
                console.log(`    📖 Created Chapter: ${chapterDoc.title} (${chapterId})`);

                // 4. Process Lessons
                for (const less of chap.lessons || []) {
                    totalLessons++;
                    const lessonDoc = {
                        id: slugify(less.lesson),
                        slug: slugify(less.lesson),
                        version: '1.0.0',
                        title: less.lesson,
                        description: less.objectives?.join(' ') || '',
                        status: 'pending', // IMPORTANT: pending content generation
                        meta: {
                            difficulty: 'intermediate',
                            duration: 15,
                            prerequisites: [],
                            tags: [],
                            author: 'AI Generated',
                            lastUpdated: new Date().toISOString().split('T')[0]
                        },
                        objectives: less.objectives || [],
                        courseId: courseId,
                        moduleId: moduleId,
                        chapterId: chapterId,
                        keyTerms: [],
                        content: [],
                        quiz: []
                    };

                    const lessResult = await db.collection('lessons').insertOne(lessonDoc);
                    const lessonId = lessResult.insertedId;
                    chapterDoc.lessonIds.push(lessonId);
                    console.log(`      📝 Created Lesson: ${lessonDoc.title} (${lessonId})`);
                }

                // Update Chapter with lessonIds
                await db.collection('chapters').updateOne(
                    { _id: chapterId },
                    { $set: { lessonIds: chapterDoc.lessonIds } }
                );
            }

            // Update Module with chapterIds
            await db.collection('modules').updateOne(
                { _id: moduleId },
                { $set: { chapterIds: moduleDoc.chapterIds } }
            );
        }

        // Update Course with moduleIds and stats
        courseDoc.stats.totalChapters = totalChapters;
        courseDoc.stats.totalLessons = totalLessons;
        await db.collection('courses').updateOne(
            { _id: courseId },
            { $set: { moduleIds: courseDoc.moduleIds, stats: courseDoc.stats } }
        );

        // Update Curriculum as built
        await db.collection('curricula').updateOne(
            { _id: new ObjectId(curriculumId) },
            { $set: { status: 'completed', builtCourseId: courseId } }
        );

        console.log(`\n🎉 Outline successfully built for Course ID: ${courseId}`);

    } catch (err) {
        console.error('❌ Failed to build outline:', err);
    } finally {
        await client.close();
    }
}

main();
