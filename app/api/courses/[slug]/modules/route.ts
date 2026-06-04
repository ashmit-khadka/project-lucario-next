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
            
            let modulesWithChapters = [];
            
            if (course.moduleIds && course.moduleIds.length > 0) {
                const modules = fixtures.getModulesByIds(course.moduleIds);
                modulesWithChapters = modules.map((mod: any) => {
                    const chapters = fixtures.getChaptersByIds(mod.chapterIds || []);
                    const chaptersWithLessons = chapters.map((chapter: any) => {
                        const lessons = fixtures.getLessonsByIds(chapter.lessonIds || []).map((l: any) => ({
                            _id: l._id, slug: l.slug, title: l.title
                        }));
                        return { ...chapter, lessons };
                    });
                    return { ...mod, chapters: chaptersWithLessons };
                });
            } else if (course.chapterIds && course.chapterIds.length > 0) {
                const chapters = fixtures.getChaptersByIds(course.chapterIds);
                const chaptersWithLessons = chapters.map((chapter: any) => {
                    const lessons = fixtures.getLessonsByIds(chapter.lessonIds || []).map((l: any) => ({
                        _id: l._id, slug: l.slug, title: l.title
                    }));
                    return { ...chapter, lessons };
                });
                modulesWithChapters = [
                    { _id: 'default-module', title: 'Course Content', chapters: chaptersWithLessons }
                ];
            }
            
            return NextResponse.json({ course, modules: modulesWithChapters });
        }

        const db = await getDb();

        const course = await db.collection('courses').findOne({ slug });
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        let modulesWithChapters = [];

        if (course.moduleIds && course.moduleIds.length > 0) {
            const modules = await db
                .collection('modules')
                .find({ _id: { $in: course.moduleIds } })
                .toArray();

            // preserve order of moduleIds
            const moduleMap = new Map(modules.map(m => [m._id.toString(), m]));
            const sortedModules = course.moduleIds
                .map((id: any) => moduleMap.get(id.toString()))
                .filter(Boolean);

            modulesWithChapters = await Promise.all(
                sortedModules.map(async (mod: any) => {
                    const chapters = await db
                        .collection('chapters')
                        .find({ _id: { $in: mod.chapterIds || [] } })
                        .toArray();
                    
                    const chapterMap = new Map(chapters.map(c => [c._id.toString(), c]));
                    const sortedChapters = (mod.chapterIds || [])
                        .map((id: any) => chapterMap.get(id.toString()))
                        .filter(Boolean);

                    const chaptersWithLessons = await Promise.all(
                        sortedChapters.map(async (chapter: any) => {
                            const lessons = await db
                                .collection('lessons')
                                .find({ _id: { $in: chapter.lessonIds || [] } })
                                .project({ _id: 1, slug: 1, title: 1 })
                                .toArray();
                            
                            const lessonMap = new Map(lessons.map(l => [l._id.toString(), l]));
                            const sortedLessons = (chapter.lessonIds || [])
                                .map((id: any) => lessonMap.get(id.toString()))
                                .filter(Boolean);

                            return { ...chapter, lessons: sortedLessons };
                        })
                    );
                    
                    return { ...mod, chapters: chaptersWithLessons };
                })
            );
        } else if (course.chapterIds && course.chapterIds.length > 0) {
            // Fallback for courses that only have chapters directly
            const chapters = await db
                .collection('chapters')
                .find({ _id: { $in: course.chapterIds } })
                .toArray();
            
            const chapterMap = new Map(chapters.map(c => [c._id.toString(), c]));
            const sortedChapters = course.chapterIds
                .map((id: any) => chapterMap.get(id.toString()))
                .filter(Boolean);

            const chaptersWithLessons = await Promise.all(
                sortedChapters.map(async (chapter: any) => {
                    const lessons = await db
                        .collection('lessons')
                        .find({ _id: { $in: chapter.lessonIds || [] } })
                        .project({ _id: 1, slug: 1, title: 1 })
                        .toArray();
                    
                    const lessonMap = new Map(lessons.map(l => [l._id.toString(), l]));
                    const sortedLessons = (chapter.lessonIds || [])
                        .map((id: any) => lessonMap.get(id.toString()))
                        .filter(Boolean);

                    return { ...chapter, lessons: sortedLessons };
                })
            );

            // Wrap in a mock module
            modulesWithChapters = [
                {
                    _id: 'default-module',
                    title: 'Course Content',
                    chapters: chaptersWithLessons
                }
            ];
        }

        return NextResponse.json({ course, modules: modulesWithChapters });
    } catch (error) {
        console.error('Error fetching modules:', error);
        return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
    }
}
