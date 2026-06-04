import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
import { join } from 'path';

async function updateTraceExecutionLesson() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('lucario-dev');
        
        // Read the mock lesson content to inject into the trace execution lesson
        const mockLessonPath = join(__dirname, 'tools/setup-db/data/courses/sample/lessons/mock-lesson.json');
        const mockLesson = JSON.parse(readFileSync(mockLessonPath, 'utf8'));
        
        const result = await db.collection('lessons').updateOne(
            { slug: 'trace-execution-through-all-6-phased-cycles' },
            { $set: { content: mockLesson.content, status: 'published' } }
        );
        
        console.log(`✅ Successfully updated trace execution lesson in database: lucario-dev. Modified count: ${result.modifiedCount}`);
    } catch (err) {
        console.error('❌ Failed to update lesson:', err);
    } finally {
        await client.close();
    }
}

updateTraceExecutionLesson();
