'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';

interface Lesson {
    _id: string;
    slug: string;
    title: string;
}

interface Chapter {
    _id: string;
    slug: string;
    title: string;
    description?: string;
    order: number;
    lessons: Lesson[];
}

interface Course {
    _id: string;
    slug: string;
    title: string;
    description: string;
}

export default function CoursePage() {
    const router = useRouter();
    const params = useParams();
    const courseSlug = params?.skill as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/courses/${courseSlug}/chapters`)
            .then(res => {
                if (!res.ok) throw new Error(`Course not found (${res.status})`);
                return res.json();
            })
            .then(data => {
                setCourse(data.course);
                setChapters(data.chapters);
            })
            .catch((err: Error) => setError(err.message));
    }, [courseSlug]);

    if (error) return <div className="screen-empty">{error}</div>;
    if (!course) return <div className="screen-empty" />;

    return (
        <div className="learn-skill-screen screen">
            <Breadcrumb
                items={[
                    { label: 'Home', link: '/' },
                    { label: 'Learn', link: '/learn' },
                    { label: course.title, link: `/learn/${courseSlug}` },
                ]}
            />
            <div className="screen-intro">
                <h1 className="screen-header">{course.title}</h1>
                <p>{course.description}</p>
            </div>
            <div className="lesson-tiles">
                {chapters.map(chapter => (
                    <div
                        key={chapter._id}
                        className="lesson-tile"
                        onClick={() => router.push(`/learn/${courseSlug}/${chapter.slug}`)}
                    >
                        <div className="lesson-tile-header">
                            <h2 className="course-name">{chapter.title}</h2>
                        </div>
                        {chapter.description && (
                            <p className="course-description">{chapter.description}</p>
                        )}
                        <p className="course-description italic">
                            📄 {chapter.lessons.length} lesson{chapter.lessons.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
