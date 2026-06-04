'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { motion, AnimatePresence } from 'framer-motion';

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

interface Module {
    _id: string;
    title: string;
    description?: string;
    chapters: Chapter[];
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
    const [modules, setModules] = useState<Module[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetch(`/api/courses/${courseSlug}/modules`)
            .then(res => {
                if (!res.ok) throw new Error(`Course not found (${res.status})`);
                return res.json();
            })
            .then(data => {
                setCourse(data.course);
                setModules(data.modules);
            })
            .catch((err: Error) => setError(err.message));
    }, [courseSlug]);

    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev => {
            const next = new Set(prev);
            if (next.has(moduleId)) next.delete(moduleId);
            else next.add(moduleId);
            return next;
        });
    };

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev => {
            const next = new Set(prev);
            if (next.has(chapterId)) next.delete(chapterId);
            else next.add(chapterId);
            return next;
        });
    };

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
            
            <div className="lesson-tiles" style={{ display: 'flex', flexDirection: 'column' }}>
                {modules.map((mod, modIndex) => {
                    const isModuleExpanded = expandedModules.has(mod._id);
                    const modNumber = modIndex + 1;
                    
                    return (
                        <div key={mod._id} className="lesson-tile" onClick={() => toggleModule(mod._id)}>
                            <div className="lesson-tile-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <h2 className="course-name">{modNumber} {mod.title}</h2>
                                <motion.div 
                                    animate={{ rotate: isModuleExpanded ? 180 : 0 }} 
                                    transition={{ duration: 0.3 }}
                                >
                                    <p style={{ margin: 0 }}>▼</p>
                                </motion.div>
                            </div>
                            {mod.description && <p className="course-description">{mod.description}</p>}
                            
                            <AnimatePresence>
                                {isModuleExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {mod.chapters.map((chapter, chapIndex) => {
                                                const isChapterExpanded = expandedChapters.has(chapter._id);
                                                const chapNumber = `${modNumber}.${chapIndex + 1}`;
                                                
                                                return (
                                                    <div 
                                                        key={chapter._id} 
                                                        style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '8px' }}
                                                    >
                                                        <div 
                                                            onClick={() => toggleChapter(chapter._id)}
                                                            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                                        >
                                                            <div>
                                                                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{chapNumber} {chapter.title}</p>
                                                                <p className="course-description italic" style={{ margin: '0.25rem 0 0 0', opacity: 0.8 }}>
                                                                    📄 {chapter.lessons.length} lesson{chapter.lessons.length !== 1 ? 's' : ''}
                                                                </p>
                                                            </div>
                                                            <motion.div 
                                                                animate={{ rotate: isChapterExpanded ? 180 : 0 }} 
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <p style={{ margin: 0 }}>▼</p>
                                                            </motion.div>
                                                        </div>
                                                        
                                                        <AnimatePresence>
                                                            {isChapterExpanded && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                                    style={{ overflow: 'hidden' }}
                                                                >
                                                                    <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 }}>
                                                                        {chapter.lessons.map((lesson, lessIndex) => {
                                                                            const lessNumber = `${chapNumber}.${lessIndex + 1}`;
                                                                            
                                                                            return (
                                                                                <li 
                                                                                    key={lesson._id}
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        router.push(`/learn/${courseSlug}/${chapter.slug}/${lesson.slug}`);
                                                                                    }}
                                                                                    style={{ 
                                                                                        padding: '0.75rem 1rem', 
                                                                                        cursor: 'pointer', 
                                                                                        display: 'flex', 
                                                                                        alignItems: 'center', 
                                                                                        background: 'rgba(255, 255, 255, 0.08)',
                                                                                        borderRadius: '6px',
                                                                                        margin: 0
                                                                                    }}
                                                                                >
                                                                                    <p style={{ margin: 0 }}>
                                                                                        <span style={{ opacity: 0.7, marginRight: '0.5rem' }}>{lessNumber}</span> 
                                                                                        {lesson.title}
                                                                                    </p>
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
