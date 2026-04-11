'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import LessonView from '@/components/LessonView';

interface Context {
    courseTitle: string;
    chapterTitle: string;
}

const LessonPage = () => {
    const params = useParams();
    const courseSlug = params?.skill as string;
    const chapterSlug = params?.chapterSlug as string;
    const lessonSlug = params?.lessonSlug as string;

    const [lesson, setLesson] = useState<Record<string, unknown> | null>(null);
    const [context, setContext] = useState<Context | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([
            fetch(`/api/lessons/by-slug/${lessonSlug}`).then(res => {
                if (!res.ok) throw new Error(`Lesson not found (${res.status})`);
                return res.json();
            }),
            fetch(`/api/courses/${courseSlug}/chapters/${chapterSlug}`).then(res => {
                if (!res.ok) throw new Error(`Chapter not found (${res.status})`);
                return res.json();
            }),
        ])
            .then(([lessonData, chapterData]) => {
                setLesson(lessonData);
                setContext({
                    courseTitle: chapterData.course.title,
                    chapterTitle: chapterData.chapter.title,
                });
            })
            .catch((err: Error) => setError(err.message));
    }, [courseSlug, chapterSlug, lessonSlug]);

    if (error) return <div className="screen-empty">{error}</div>;
    if (!lesson || !context) return <div className="screen-empty" />;

    return (
        <LessonView
            lesson={lesson}
            breadcrumbItems={[
                { label: 'Home', link: '/' },
                { label: 'Learn', link: '/learn' },
                { label: context.courseTitle, link: `/learn/${courseSlug}` },
                { label: context.chapterTitle, link: `/learn/${courseSlug}/${chapterSlug}` },
                { label: lesson.title as string, link: `/learn/${courseSlug}/${chapterSlug}/${lessonSlug}` },
            ]}
        />
    );
};

export default LessonPage;
