import { MongoClient, Db, ObjectId } from 'mongodb';
import { join } from 'path';
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '../../.env') });

const CONNECTION_STRING = 'mongodb://localhost:27017';
const DB_NAME = process.env.NODE_ENV === 'development' ? 'lucario-dev' : 'lucario';

const DATA_DIR = join(__dirname, '../../fixtures/sample-course');

// ── Helpers ───────────────────────────────────────────────────

function readJson<T>(filePath: string): T {
    return JSON.parse(readFileSync(filePath, 'utf-8')) as T;
}

async function ensureCollection(db: Db, name: string): Promise<void> {
    const existing = await db.listCollections({ name }).toArray();
    if (existing.length === 0) {
        await db.createCollection(name);
        console.log(`  📦 Created collection: ${name}`);
    }
}

function toObjectId(val: unknown): ObjectId {
    return new ObjectId(val as string);
}

function toObjectIdArray(arr: unknown): ObjectId[] {
    return (arr as string[]).map(toObjectId);
}

async function upsert(db: Db, collection: string, doc: Record<string, unknown>): Promise<void> {
    const { _id, ...rest } = doc;
    const objectId = toObjectId(_id);

    if (rest.courseId) rest.courseId = toObjectId(rest.courseId);
    if (rest.moduleId) rest.moduleId = toObjectId(rest.moduleId);
    if (rest.moduleIds) rest.moduleIds = toObjectIdArray(rest.moduleIds);
    if (rest.chapterIds) rest.chapterIds = toObjectIdArray(rest.chapterIds);
    if (rest.lessonIds) rest.lessonIds = toObjectIdArray(rest.lessonIds);

    const result = await db.collection(collection).updateOne(
        { _id: objectId },
        { $set: rest },
        { upsert: true }
    );
    const label = result.upsertedCount > 0 ? '✅ Inserted' : '🔄 Updated';
    console.log(`  ${label}: "${doc.title ?? _id}"`);
}

// ── Export Functions ──────────────────────────────────────────

async function exportCurricula(db: Db): Promise<void> {
    console.log('\n🗺️ Exporting curricula...');
    const curricula = await db.collection('curricula').find().toArray();
    writeFileSync(join(DATA_DIR, 'curricula.json'), JSON.stringify(curricula, null, 2));
    console.log(`  ✅ Exported ${curricula.length} curricula to curricula.json`);
}

async function exportCourses(db: Db): Promise<void> {
    console.log('\n📚 Exporting courses...');
    const courses = await db.collection('courses').find().toArray();
    writeFileSync(join(DATA_DIR, 'courses.json'), JSON.stringify(courses, null, 2));
    console.log(`  ✅ Exported ${courses.length} courses to courses.json`);
}

async function exportModules(db: Db): Promise<void> {
    console.log('\n📦 Exporting modules...');
    const modules = await db.collection('modules').find().toArray();
    writeFileSync(join(DATA_DIR, 'modules.json'), JSON.stringify(modules, null, 2));
    console.log(`  ✅ Exported ${modules.length} modules to modules.json`);
}

async function exportChapters(db: Db): Promise<void> {
    console.log('\n📖 Exporting chapters...');
    const chapters = await db.collection('chapters').find().toArray();
    writeFileSync(join(DATA_DIR, 'chapters.json'), JSON.stringify(chapters, null, 2));
    console.log(`  ✅ Exported ${chapters.length} chapters to chapters.json`);
}

async function exportLessons(db: Db): Promise<void> {
    console.log('\n📝 Exporting lessons...');
    const lessonsDir = join(DATA_DIR, 'lessons');
    
    // Clear existing lessons
    if (existsSync(lessonsDir)) {
        rmSync(lessonsDir, { recursive: true, force: true });
    }
    mkdirSync(lessonsDir, { recursive: true });

    const lessons = await db.collection('lessons').find().toArray();
    for (const lesson of lessons) {
        const filename = lesson.slug ? `lesson-${lesson.slug}.json` : `lesson-${lesson._id}.json`;
        writeFileSync(join(lessonsDir, filename), JSON.stringify(lesson, null, 2));
        console.log(`  ✅ Exported lesson: "${lesson.title ?? lesson._id}"`);
    }
    console.log(`  ✅ Exported ${lessons.length} lessons in total`);
}

// ── Seed Functions ────────────────────────────────────────────

async function seedCurricula(db: Db): Promise<void> {
    console.log('\n🗺️ Seeding curricula...');
    await ensureCollection(db, 'curricula');
    
    const curriculaPath = join(DATA_DIR, 'curricula.json');
    if (existsSync(curriculaPath)) {
        const curricula = readJson<Record<string, unknown>[]>(curriculaPath);
        for (const c of curricula) {
            await upsert(db, 'curricula', c);
        }
    } else {
        console.log('  ⚠️ No curricula data found to seed.');
    }
}

async function seedCourses(db: Db): Promise<void> {
    console.log('\n📚 Seeding courses...');
    await ensureCollection(db, 'courses');
    
    let courses: Record<string, unknown>[] = [];
    const coursesPath = join(DATA_DIR, 'courses.json');
    const coursePath = join(DATA_DIR, 'course.json');
    
    if (existsSync(coursesPath)) {
        courses = readJson<Record<string, unknown>[]>(coursesPath);
    } else if (existsSync(coursePath)) {
        courses = [readJson<Record<string, unknown>>(coursePath)];
    } else {
        console.log('  ⚠️ No courses data found to seed.');
        return;
    }
    
    for (const course of courses) {
        await upsert(db, 'courses', course);
    }
}

async function seedModules(db: Db): Promise<void> {
    console.log('\n📦 Seeding modules...');
    await ensureCollection(db, 'modules');
    
    const modulesPath = join(DATA_DIR, 'modules.json');
    if (existsSync(modulesPath)) {
        const modules = readJson<Record<string, unknown>[]>(modulesPath);
        for (const m of modules) {
            await upsert(db, 'modules', m);
        }
    } else {
        console.log('  ⚠️ No modules data found to seed.');
    }
}

async function seedChapters(db: Db): Promise<void> {
    console.log('\n📖 Seeding chapters...');
    await ensureCollection(db, 'chapters');
    
    const chaptersPath = join(DATA_DIR, 'chapters.json');
    if (existsSync(chaptersPath)) {
        const chapters = readJson<Record<string, unknown>[]>(chaptersPath);
        for (const chapter of chapters) {
            await upsert(db, 'chapters', chapter);
        }
    } else {
        console.log('  ⚠️ No chapters data found to seed.');
    }
}

async function seedLessons(db: Db): Promise<void> {
    console.log('\n📝 Seeding lessons...');
    await ensureCollection(db, 'lessons');
    
    const lessonsDir = join(DATA_DIR, 'lessons');
    if (existsSync(lessonsDir)) {
        const files = readdirSync(lessonsDir).filter(f => f.endsWith('.json'));
        for (const file of files) {
            const lesson = readJson<Record<string, unknown>>(join(lessonsDir, file));
            await upsert(db, 'lessons', lesson);
        }
    } else {
        console.log('  ⚠️ No lessons directory found to seed.');
    }
}

// ── Main ──────────────────────────────────────────────────────

async function main() {
    const isExport = process.argv.includes('--export');
    const client = new MongoClient(CONNECTION_STRING);

    try {
        console.log('🔌 Connecting to MongoDB...');
        await client.connect();
        console.log('✅ Connected to', DB_NAME);

        const db = client.db(DB_NAME);

        if (isExport) {
            console.log(`\n📤 Exporting data from database: ${DB_NAME}...`);
            mkdirSync(DATA_DIR, { recursive: true });
            
            await exportCurricula(db);
            await exportCourses(db);
            await exportModules(db);
            await exportChapters(db);
            await exportLessons(db);
            
            console.log('\n🎉 Database export complete');
        } else {
            console.log(`\n🗑️  Dropping database: ${DB_NAME}...`);
            await db.dropDatabase();
            console.log('✅ Database cleared');

            await seedCurricula(db);
            await seedCourses(db);
            await seedModules(db);
            await seedChapters(db);
            await seedLessons(db);

            console.log('\n🎉 Database setup complete');
        }
    } catch (err) {
        console.error(`❌ ${isExport ? 'Export' : 'Setup'} failed:`, err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main();
