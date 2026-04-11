import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const db = await getDb();
        const lesson = await db.collection('lessons').findOne({ slug });

        if (!lesson) {
            return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
        }

        return NextResponse.json(lesson);
    } catch (error) {
        console.error('Error fetching lesson by slug:', error);
        return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 });
    }
}
