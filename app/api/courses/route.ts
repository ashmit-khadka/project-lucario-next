import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { fixtures } from '@/lib/fixtures';

export async function GET() {
    try {
        if (process.env.USE_LOCAL_FIXTURES === 'true') {
            return NextResponse.json(fixtures.getCourses());
        }
        
        const db = await getDb();
        const courses = await db.collection('courses').find({}).toArray();
        return NextResponse.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
    }
}
