import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ skill: string; lessonId: string }> }
) {
    try {
        const { skill, lessonId } = await params;
        const { default: courses } = await import('@/data/learning/courses.js');
        
        // Find the course by skill ID
        const course = courses.find((c: any) => c.id === skill);

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        // Parse lesson ID (1-indexed)
        const lessonIndex = parseInt(lessonId) - 1;

        if (lessonIndex < 0 || lessonIndex >= course.lessons.length) {
            return NextResponse.json(
                { error: 'Lesson not found' },
                { status: 404 }
            );
        }

        const lesson = course.lessons[lessonIndex];

        // Return full lesson data with course context
        const lessonData = {
            course: {
                id: course.id,
                name: course.name,
                link: course.link,
            },
            lesson: {
                title: lesson.title,
                description: lesson.description,
                sections: lesson.sections,
                module: lesson.module || null,
                chapter: lesson.chapter || null,
            },
            quiz: lesson.quiz || null,
        };

        return NextResponse.json(lessonData);
    } catch (error) {
        console.error('Error fetching lesson:', error);
        return NextResponse.json(
            { error: 'Failed to fetch lesson' },
            { status: 500 }
        );
    }
}
