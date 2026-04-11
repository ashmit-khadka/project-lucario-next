import { MongoClient, Db, ObjectId } from 'mongodb';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '../../.env') });

const CONNECTION_STRING = 'mongodb://localhost:27017';
const DB_NAME = process.env.NODE_ENV === 'development' ? 'lucario-dev' : 'lucario';

const DATA_DIR = join(__dirname, './data/courses/sample');

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

// ── Seed Functions ────────────────────────────────────────────

async function seedCourses(db: Db): Promise<void> {
    console.log('\n📚 Seeding courses...');
    await ensureCollection(db, 'courses');
    const course = readJson<Record<string, unknown>>(join(DATA_DIR, 'course.json'));
    await upsert(db, 'courses', course);
}

async function seedChapters(db: Db): Promise<void> {
    console.log('\n📖 Seeding chapters...');
    await ensureCollection(db, 'chapters');
    const chapters = readJson<Record<string, unknown>[]>(join(DATA_DIR, 'chapters.json'));
    for (const chapter of chapters) {
        await upsert(db, 'chapters', chapter);
    }
}

async function seedLessons(db: Db): Promise<void> {
    console.log('\n📝 Seeding lessons...');
    await ensureCollection(db, 'lessons');
    const lesson = readJson<Record<string, unknown>>(join(DATA_DIR, 'lessons/lesson-1.json'));
    await upsert(db, 'lessons', lesson);
}

// ── Main ──────────────────────────────────────────────────────

async function main() {
    const client = new MongoClient(CONNECTION_STRING);

    try {
        console.log('� Connecting to MongoDB...');
        await client.connect();
        console.log('✅ Connected to', DB_NAME);

        const db = client.db(DB_NAME);

        console.log(`\n🗑️  Dropping database: ${DB_NAME}...`);
        await db.dropDatabase();
        console.log('✅ Database cleared');

        await seedCourses(db);
        await seedChapters(db);
        await seedLessons(db);

        console.log('\n🎉 Database setup complete');
    } catch (err) {
        console.error('❌ Setup failed:', err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main();
