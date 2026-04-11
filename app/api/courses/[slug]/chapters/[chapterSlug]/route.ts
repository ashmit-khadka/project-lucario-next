import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string; chapterSlug: string }> }
) {
    try {
        const { slug, chapterSlug } = await params;
        const db = await getDb();

        const course = await db.collection('courses').findOne({ slug });
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        const chapter = await db
            .collection('chapters')
            .findOne({ slug: chapterSlug, courseId: course._id });

        if (!chapter) {
            return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
        }

        const lessons = await db
            .collection('lessons')
            .find({ _id: { $in: chapter.lessonIds } })
            .project({ _id: 1, slug: 1, title: 1, description: 1, meta: 1 })
            .toArray();

        return NextResponse.json({ course, chapter, lessons });
    } catch (error) {
        console.error('Error fetching chapter lessons:', error);
        return NextResponse.json({ error: 'Failed to fetch chapter' }, { status: 500 });
    }
}
