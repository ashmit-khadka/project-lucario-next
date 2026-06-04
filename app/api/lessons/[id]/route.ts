import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { fixtures } from '@/lib/fixtures';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (process.env.USE_LOCAL_FIXTURES === 'true') {
            const lesson = fixtures.getLessonById(id);
            if (!lesson) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
            return NextResponse.json(lesson);
        }

        const db = await getDb();
        const lesson = await db.collection('lessons').findOne({ _id: new ObjectId(id) });

        if (!lesson) {
            return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
        }

        return NextResponse.json(lesson);
    } catch (error) {
        console.error('Error fetching lesson:', error);
        return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 });
    }
}
