import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { default: courses } = await import('@/data/learning/courses.js');
        
        // Return only the course metadata (without full lesson content)
        const coursesMetadata = courses.map((course: any) => ({
            id: course.id,
            name: course.name,
            link: course.link,
            icon: course.icon,
            description: course.description,
            totalLessons: course.totalLessons,
        }));

        return NextResponse.json(coursesMetadata);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}
