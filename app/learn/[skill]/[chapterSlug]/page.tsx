'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';

interface Lesson {
    _id: string;
    slug: string;
    title: string;
    description?: string;
    meta?: { difficulty?: string; duration?: number };
}

interface Chapter {
    _id: string;
    slug: string;
    title: string;
    description?: string;
}

interface Course {
    _id: string;
    slug: string;
    title: string;
}

export default function ChapterPage() {
    const router = useRouter();
    const params = useParams();
    const courseSlug = params?.skill as string;
    const chapterSlug = params?.chapterSlug as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/courses/${courseSlug}/chapters/${chapterSlug}`)
            .then(res => {
                if (!res.ok) throw new Error(`Chapter not found (${res.status})`);
                return res.json();
            })
            .then(data => {
                setCourse(data.course);
                setChapter(data.chapter);
                setLessons(data.lessons);
            })
            .catch((err: Error) => setError(err.message));
    }, [courseSlug, chapterSlug]);

    if (error) return <div className="screen-empty">{error}</div>;
    if (!chapter) return <div className="screen-empty" />;

    return (
        <div className="learn-skill-screen screen">
            <Breadcrumb
                items={[
                    { label: 'Home', link: '/' },
                    { label: 'Learn', link: '/learn' },
                    { label: course?.title ?? courseSlug, link: `/learn/${courseSlug}` },
                    { label: chapter.title, link: `/learn/${courseSlug}/${chapterSlug}` },
                ]}
            />
            <div className="screen-intro">
                <h1 className="screen-header">{chapter.title}</h1>
                {chapter.description && <p>{chapter.description}</p>}
            </div>
            <div className="lesson-tiles">
                {lessons.map(lesson => (
                    <div
                        key={lesson._id}
                        className="lesson-tile"
                        onClick={() => router.push(`/learn/${courseSlug}/${chapterSlug}/${lesson.slug}`)}
                    >
                        <div className="lesson-tile-header">
                            <h2 className="course-name">{lesson.title}</h2>
                        </div>
                        {lesson.description && (
                            <p className="course-description">{lesson.description}</p>
                        )}
                        {lesson.meta && (
                            <p className="course-description italic">
                                {lesson.meta.difficulty && `${lesson.meta.difficulty}`}
                                {lesson.meta.duration && ` · ${lesson.meta.duration} min`}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
