'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';

interface Course {
    _id: string;
    slug: string;
    title: string;
    description: string;
    meta: { difficulty: string; tags?: string[] };
    stats: { totalChapters: number; totalLessons: number; totalDuration: number };
}

export default function LearnPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/courses')
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load courses (${res.status})`);
                return res.json();
            })
            .then(setCourses)
            .catch((err: Error) => setError(err.message));
    }, []);

    if (error) return <div className="screen-empty">{error}</div>;
    if (!courses.length) return <div className="screen-empty" />;

    return (
        <div className="learn-skill-screen screen">
            <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Learn', link: '/learn' }]} />
            <div className="screen-intro">
                <h1 className="screen-header">Course Catalogue</h1>
                <p>Explore in-depth courses built for production-focused software engineers.</p>
            </div>
            <div className="lesson-tiles">
                {courses.map(course => (
                    <div
                        key={course._id}
                        className="lesson-tile"
                        onClick={() => router.push(`/learn/${course.slug}`)}
                    >
                        <div className="lesson-tile-header">
                            <h2 className="course-name">{course.title}</h2>
                        </div>
                        <p className="course-description">{course.description}</p>
                        <p className="course-description italic">
                            📖 {course.stats.totalChapters} chapter{course.stats.totalChapters !== 1 ? 's' : ''} · {course.stats.totalLessons} lesson{course.stats.totalLessons !== 1 ? 's' : ''} · {course.stats.totalDuration} min
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
