import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ skill: string }> }
) {
    try {
        const { skill } = await params;
        const { default: courses } = await import('@/data/learning/courses.js');
        
        // Find the course by skill ID
        const course = courses.find((c: any) => c.id === skill);

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        // Return course with lesson metadata (without full content)
        const courseData = {
            id: course.id,
            name: course.name,
            link: course.link,
            icon: course.icon,
            description: course.description,
            totalLessons: course.totalLessons,
            lessons: course.lessons.map((lesson: any, index: number) => ({
                title: lesson.title,
                description: lesson.description,
                chapters: lesson.sections?.length || 0,
                lessonNumber: index + 1,
            })),
        };

        return NextResponse.json(courseData);
    } catch (error) {
        console.error('Error fetching course:', error);
        return NextResponse.json(
            { error: 'Failed to fetch course' },
            { status: 500 }
        );
    }
}
