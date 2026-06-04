import { MongoClient } from 'mongodb';
import { writeFileSync } from 'fs';

async function run() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('lucario-dev');
        const lesson = await db.collection('lessons').findOne({ slug: 'trace-execution-through-all-6-phased-cycles' });
        if (lesson) {
            writeFileSync('temp-lesson.json', JSON.stringify(lesson, null, 2));
            console.log('Saved to temp-lesson.json');
        } else {
            console.log('Lesson not found');
        }
    } finally {
        await client.close();
    }
}

run();
