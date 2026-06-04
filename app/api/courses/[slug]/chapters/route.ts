import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { fixtures } from '@/lib/fixtures';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        
        if (process.env.USE_LOCAL_FIXTURES === 'true') {
            const course = fixtures.getCourseBySlug(slug);
            if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });
            
            let chapters = fixtures.getChaptersByCourseId(course._id);
            // Sort by order 1
            chapters.sort((a, b) => (a.order || 0) - (b.order || 0));
            
            const chaptersWithLessons = chapters.map((chapter: any) => {
                const lessons = fixtures.getLessonsByIds(chapter.lessonIds || []).map((l: any) => ({
                    _id: l._id, slug: l.slug, title: l.title
                }));
                return { ...chapter, lessons };
            });
            
            return NextResponse.json({ course, chapters: chaptersWithLessons });
        }

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
