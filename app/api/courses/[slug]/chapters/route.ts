import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const db = await getDb();

        const course = await db.collection('courses').findOne({ slug });
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        const chapters = await db
            .collection('chapters')
            .find({ courseId: course._id })
            .sort({ order: 1 })
            .toArray();

        const chaptersWithLessons = await Promise.all(
            chapters.map(async chapter => {
                const lessons = await db
                    .collection('lessons')
                    .find({ _id: { $in: chapter.lessonIds } })
                    .project({ _id: 1, slug: 1, title: 1 })
                    .toArray();
                return { ...chapter, lessons };
            })
        );

        return NextResponse.json({ course, chapters: chaptersWithLessons });
    } catch (error) {
        console.error('Error fetching chapters:', error);
        return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
    }
}
