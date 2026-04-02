'use client';

import React from 'react';
import DemoLesson from '@/data/learning/demo_lesson.json';
import formatText from '@/utils/formatText';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { synthwave84 } from 'react-syntax-highlighter/dist/esm/styles/prism';
import NavigationHover from '@/components/NavigationHover';
import Breadcrumb from '@/components/Breadcrumb';
import QuestionBlock from '@/components/QuestionBlock';
import LessonQuiz from '@/components/LessonQuiz';

const SectionCode = ({ code, language = 'javascript', explanation }: { code: string; language?: string; explanation?: string }) => (
    <div className="section-code">
        {explanation && <p className="section-code__explanation">{formatText(explanation)}</p>}
        <SyntaxHighlighter language={language} style={synthwave84}>
            {code}
        </SyntaxHighlighter>
    </div>
);

const SectionList = ({ points }: { points: string[] }) => (
    <div className="lesson-card-grid">
        {points.map((point, index) => (
            <div key={index} className="lesson-card-grid__card">
                {formatText(point)}
            </div>
        ))}
    </div>
);

const SectionHeading = ({ title, variant }: { title: string; variant?: string }) => {
    let emoji = '';
    switch (variant) {
        case 'do':
            emoji = '✅';
            break;
        case 'dont':
            emoji = '❌';
            break;
        default:
            emoji = '';
    }
    return (
        <h4 className="learning-header">
            {emoji} {formatText(title)}
        </h4>
    );
};

const SectionCallout = ({ content, type = 'info' }: { content: string; type?: string }) => {
    const calloutConfig = {
        info: { emoji: 'ℹ️', className: 'callout-info' },
        warning: { emoji: '⚠️', className: 'callout-warning' },
        tip: { emoji: '💡', className: 'callout-tip' },
        danger: { emoji: '🚨', className: 'callout-danger' },
        note: { emoji: '📝', className: 'callout-note' },
    };
    const config = calloutConfig[type as keyof typeof calloutConfig] || calloutConfig.info;
    
    return (
        <div className={`learning-callout ${config.className}`}>
            <span className="callout-emoji">{config.emoji}</span>
            <div className="callout-content">{formatText(content)}</div>
        </div>
    );
};

const SectionImage = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
    <figure className="learning-image">
        <img src={src} alt={alt} />
        {caption && <figcaption>{formatText(caption)}</figcaption>}
    </figure>
);

const SectionTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
    <div className="learning-table-wrapper">
        <table className="learning-table">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{formatText(header)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{formatText(cell)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const ContentRenderer = ({ item }: { item: any }) => {
    switch (item.type) {
        case 'section':
            return (
                <section id={item.id} className="learning-section section">
                    <h2 className="learning-section-header">{formatText(item.title)}</h2>
                </section>
            );
        case 'text':
            return <p>{formatText(item.text)}</p>;
        case 'list':
            return <SectionList points={item.items} />;
        case 'heading':
            return <SectionHeading title={item.text} variant={item.variant} />;
        case 'code':
            return <SectionCode code={item.code} language={item.language} explanation={item.explanation} />;
        case 'callout':
            return <SectionCallout content={item.text} type={item.variant} />;
        case 'image':
            return <SectionImage src={item.src} alt={item.alt} caption={item.caption} />;
        case 'table':
            return <SectionTable headers={item.headers} rows={item.rows} />;
        case 'question':
            return <QuestionBlock data={item} />;
        default:
            return null;
    }
};

const DemoPage = () => {
    const lesson = DemoLesson as any;

    // Extract sections for navigation
    const sections = lesson.content
        .filter((item: any) => item.type === 'section')
        .map((item: any) => ({
            id: item.id,
            label: item.title,
        }));

    // Add quiz to navigation if present
    if (lesson.quiz && lesson.quiz.length > 0) {
        sections.push({ id: 'section-quiz', label: 'Quiz' });
    }

    // Group content by sections for rendering
    const groupedContent: any[] = [];
    let currentSection: any = null;

    lesson.content.forEach((item: any) => {
        if (item.type === 'section') {
            if (currentSection) {
                groupedContent.push(currentSection);
            }
            currentSection = {
                id: item.id,
                title: item.title,
                items: []
            };
        } else if (currentSection) {
            currentSection.items.push(item);
        }
    });

    if (currentSection) {
        groupedContent.push(currentSection);
    }

    return (
        <div className="screen">
            <NavigationHover sections={sections} />

            <div>
                <Breadcrumb
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Demo", link: "/demo" },
                    ]}
                />

                <div className="screen-intro">
                    <h1 className="screen-header">{formatText(lesson.title)}</h1>
                    <p>{lesson.description}</p>
                    
                    {/* Display metadata */}
                    <div style={{ marginTop: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>
                        <span>📊 Difficulty: {lesson.meta.difficulty}</span>
                        {' • '}
                        <span>⏱️ Duration: {lesson.meta.duration} min</span>
                        {' • '}
                        <span>🏷️ Tags: {lesson.meta.tags.join(', ')}</span>
                    </div>
                </div>

                {/* Render grouped content */}
                {groupedContent.map((section) => (
                    <section key={section.id} id={section.id} className="learning-section section">
                        <h2 className="learning-section-header">{formatText(section.title)}</h2>
                        {section.items.map((item: any) => (
                            <ContentRenderer key={item.id} item={item} />
                        ))}
                    </section>
                ))}

                {/* End-of-lesson quiz */}
                {lesson.quiz && lesson.quiz.length > 0 && (
                    <section id="section-quiz" className="learning-section section">
                        <h2 className="learning-section-header">Quiz</h2>
                        <LessonQuiz quiz={lesson.quiz} />
                    </section>
                )}
            </div>
        </div>
    );
};

export default DemoPage;
