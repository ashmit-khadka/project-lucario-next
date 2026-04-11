'use client';

import React, { useState, useEffect } from 'react';
import LessonView from '@/components/LessonView';

const DEMO_LESSON_ID = '507f1f77bcf86cd799439003';

const DemoPage = () => {
    const [lesson, setLesson] = useState<Record<string, unknown> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/lessons/${DEMO_LESSON_ID}`)
            .then(res => {
                if (!res.ok) throw new Error(`Lesson not found (${res.status})`);
                return res.json();
            })
            .then(setLesson)
            .catch((err: Error) => setError(err.message));
    }, []);

    if (error) return <div className="screen-empty">{error}</div>;
    if (!lesson) return <div className="screen-empty" />;

    return (
        <LessonView
            lesson={lesson}
            breadcrumbItems={[
                { label: 'Home', link: '/' },
                { label: 'Demo', link: '/demo' },
            ]}
        />
    );
};

export default DemoPage;
