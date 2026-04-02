'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import formatText from '../../utils/formatText';
import { getLesson } from '../../services/courseServices';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { synthwave84 } from 'react-syntax-highlighter/dist/esm/styles/prism';
import QuizScreen from './QuizScreen';
import NavigationHover from '../NavigationHover';
import Breadcrumb from '../Breadcrumb';
import QuestionBlock from '../QuestionBlock';

const Section = ({ title, id, children }: { title: string; id: string; children: React.ReactNode }) => (
    <section id={id} className="learning-section section">
        <h2 className="learning-section-header">{formatText(title)}</h2>
        {children}
    </section>
);

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

const LessonScreen = () => {
    const params = useParams();
    const skill = params?.skill as string;
    const lessonId = params?.lessonId as string; // Extract the lesson ID from the URL

    const [course, setCourse] = useState(null); // State to hold the course data if needed
    const [lesson, setLesson] = useState(null); // State to hold the dynamically loaded lesson
    const [quiz, setQuiz] = useState(null); // State to hold the quiz data if needed


    useEffect(() => {
        const loadLesson = async () => {
            try {
                const lessonData = await getLesson(skill, lessonId);
                setCourse(lessonData.course); // If you need to use course data later
                setLesson(lessonData.lesson);
                setQuiz(lessonData.quiz); // If you need to use quiz data later
            } catch (error) {
                console.error("Error fetching lesson:", error);
            }
        };
        loadLesson();
    }, [lessonId]); // Re-run when lessonId changes



    if (!lesson) {
        return null; // Show a loading state while fetching the lesson
    }

    const sections = lesson.sections.map((section, index) => ({
        id: `section-${index}`,
        label: section.title,
    }));

    sections.push({
        id: 'section-quiz',
        label: '📝 Quiz',
    });

    if (!lesson) {
        return <div className="screen-empty"></div>
    }

    return (
        <div className="screen">
            <NavigationHover
                sections={sections}
            />

            {/* Main Content */}
            <div>

                <Breadcrumb
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Learn", link: "/learn" },
                        { label: course.name, link: `/learn/${skill}` },
                        { label: lesson.title, link: `/learn/${skill}/lesson/${lessonId}` },
                    ]}
                />

                <div className="screen-intro">
                    <h1 className="screen-header">{formatText(lesson.title)}</h1>
                    <p>{lesson.description}</p>
                </div>

                {lesson.sections.map((section, sectionIndex) => (
                    <Section key={sectionIndex} id={`section-${sectionIndex}`} title={section.title}>
                        {section.content.map((item, itemIndex) => {
                            switch (item.type) {
                                case 'text':
                                    return <p key={itemIndex}>{formatText(item.content)}</p>;
                                case 'list':
                                    return <SectionList key={itemIndex} points={item.items} />;
                                case 'heading':
                                    return <SectionHeading key={itemIndex} title={item.content} variant={item.variant} />;
                                case 'code':
                                    return <SectionCode key={itemIndex} code={item.code} language={item.language} explanation={item.explanation} />;
                                case 'callout':
                                    return <SectionCallout key={itemIndex} content={item.content} type={item.variant} />;
                                case 'image':
                                    return <SectionImage key={itemIndex} src={item.src} alt={item.alt} caption={item.caption} />;
                                case 'table':
                                    return <SectionTable key={itemIndex} headers={item.headers} rows={item.rows} />;
                                case 'question':
                                    return <QuestionBlock key={itemIndex} data={item} />;
                                default:
                                    return null;
                            }
                        })}
                    </Section>
                ))}

                <div>
                    {/* <button
                        onClick={() => {
                            navigate(`/quiz/${skill}`); // Navigate to the quiz screen
                        }}
                        >
                            Take a quiz
                        </button>
                </div> */}
                    <QuizScreen quizData={quiz} />
                </div>
            </div>
        </div>
    );
};

export default LessonScreen;