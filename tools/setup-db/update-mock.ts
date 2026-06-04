import { MongoClient, ObjectId } from 'mongodb';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '../../.env') });

const CONNECTION_STRING = 'mongodb://localhost:27017';
const DB_NAME = process.env.NODE_ENV === 'development' ? 'lucario-dev' : 'lucario';

async function updateMockLesson() {
    const client = new MongoClient(CONNECTION_STRING);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        
        const mockLessonPath = join(__dirname, '../../fixtures/sample-course/lessons/lesson-mock-lesson.json');
        const lesson = JSON.parse(readFileSync(mockLessonPath, 'utf8'));
        
        const { _id, ...rest } = lesson;
        
        await db.collection('lessons').updateOne(
            { slug: 'mock-lesson' },
            { $set: rest },
            { upsert: true }
        );
        console.log(`✅ Successfully updated mock lesson in database: ${DB_NAME}`);
    } catch (err) {
        console.error('❌ Failed to update mock lesson:', err);
    } finally {
        await client.close();
    }
}

updateMockLesson();
