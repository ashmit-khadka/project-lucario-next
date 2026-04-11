import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await getDb();
        const courses = await db.collection('courses').find({}).toArray();
        return NextResponse.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
    }
}
