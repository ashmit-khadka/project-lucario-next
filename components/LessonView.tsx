'use client';

import React from 'react';
import formatText from '@/utils/formatText';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { synthwave84 } from 'react-syntax-highlighter/dist/esm/styles/prism';
import NavigationHover from '@/components/NavigationHover';
import Breadcrumb from '@/components/Breadcrumb';
import QuestionBlock from '@/components/QuestionBlock';
import LessonQuiz from '@/components/LessonQuiz';
import SplitSection from '@/components/SplitSection';
import ChartSection from '@/components/ChartSection';
import LessonCard from '@/components/LessonCard';
import VisualizationBlock from '@/components/VisualizationBlock';
import { motion } from 'framer-motion';

type BreadcrumbItem = { label: string; link: string };

interface LessonViewProps {
    lesson: Record<string, unknown>;
    breadcrumbItems: BreadcrumbItem[];
}

const SectionCode = ({ code, language = 'javascript', explanation }: { code: string; language?: string; explanation?: string }) => (
    <div className="section-code">
        {explanation && <p className="section-code__explanation">{formatText(explanation)}</p>}
        <SyntaxHighlighter language={language} style={synthwave84}>
            {code}
        </SyntaxHighlighter>
    </div>
);

const SectionList = ({ points, ordered = false }: { points: string[]; ordered?: boolean }) => {
    const Tag = ordered ? 'ol' : 'ul';
    return (
        <Tag className="lesson-list">
            {points.map((point, index) => (
                <li key={index}>{formatText(point)}</li>
            ))}
        </Tag>
    );
};

const SectionHeading = ({ title, variant }: { title: string; variant?: string }) => {
    let emoji = '';
    switch (variant) {
        case 'do': emoji = '✅'; break;
        case 'dont': emoji = '❌'; break;
        default: emoji = '';
    }
    return <h4 className="learning-header">{emoji} {formatText(title)}</h4>;
};

const SectionQuote = ({ quote, source }: { quote: string; source?: string }) => (
    <blockquote className="learning-quote">
        <p className="learning-quote__text">&ldquo;{quote}&rdquo;</p>
        {source && <footer className="learning-quote__source">&mdash; {source}</footer>}
    </blockquote>
);

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

const PLACEHOLDER_IMAGE = '/images/demo.jpg';

const SectionImage = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
    <figure className="learning-image">
        <img
            src={src}
            alt={alt}
            onError={e => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
        />
        {caption && <figcaption>{formatText(caption)}</figcaption>}
    </figure>
);

const SectionTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
    <div className="learning-table-wrapper">
        <table className="learning-table">
            <thead>
                <tr>{headers.map((h, i) => <th key={i}>{formatText(h)}</th>)}</tr>
            </thead>
            <tbody>
                {rows.map((row, ri) => (
                    <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{formatText(cell)}</td>)}</tr>
                ))}
            </tbody>
        </table>
    </div>
);

const ContentRenderer = ({ item }: { item: Record<string, unknown> }) => {
    const i = item as Record<string, never>;
    switch (i.type) {
        case 'section':
            return (
                <section id={i.id} className="learning-section section">
                    <h2 className="learning-section-header">{formatText(i.title)}</h2>
                </section>
            );
        case 'text':    return <p>{formatText(i.text)}</p>;
        case 'list':    return <SectionList points={i.items} ordered={i.ordered} />;
        case 'heading': return <SectionHeading title={i.text} variant={i.variant} />;
        case 'code':    return <SectionCode code={i.code} language={i.language} explanation={i.explanation} />;
        case 'quote':   return <SectionQuote quote={i.text} source={i.source} />;
        case 'callout': return <SectionCallout content={i.text} type={i.variant} />;
        case 'image':   return <SectionImage src={i.src} alt={i.alt} caption={i.caption} />;
        case 'table':   return <SectionTable headers={i.headers} rows={i.rows} />;
        case 'split_section': return <SplitSection title={i.title as string} text={i.text as string | string[]} imageUrl={i.imageUrl as string} imagePosition={i.imagePosition as 'left' | 'right'} />;
        case 'graph':   return <ChartSection title={i.title as string} description={i.description as string} data={i.data as any[]} config={i.config as any} />;
        case 'card':    return <LessonCard variant={i.variant as any} title={i.title as string} content={i.text as string} icon={i.icon as string} imageUrl={i.imageUrl as string} metadata={i.metadata as string} />;
        case 'question':return <QuestionBlock data={i as unknown as Parameters<typeof QuestionBlock>[0]['data']} />;
        case 'visualisation': return <VisualizationBlock data={i as any} />;
        default:        return null;
    }
};

const LessonView = ({ lesson, breadcrumbItems }: LessonViewProps) => {
    const content = lesson.content as Record<string, unknown>[];
    const quiz = lesson.quiz as Record<string, unknown>[] | null;

    const sections = content
        .filter(item => item.type === 'section')
        .map(item => ({ id: item.id as string, label: item.title as string }));

    if (quiz && quiz.length > 0) {
        sections.push({ id: 'section-quiz', label: 'Quiz' });
    }

    const groupedContent: { id: string; title: string; items: Record<string, unknown>[] }[] = [];
    let currentSection: { id: string; title: string; items: Record<string, unknown>[] } | null = null;

    content.forEach(item => {
        if (item.type === 'section') {
            if (currentSection) groupedContent.push(currentSection);
            currentSection = { id: item.id as string, title: item.title as string, items: [] };
        } else if (currentSection) {
            currentSection.items.push(item);
        }
    });

    if (currentSection) groupedContent.push(currentSection);

    return (
        <div className="screen">
            <NavigationHover sections={sections} />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.15
                        }
                    }
                }}
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: -10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                >
                    <Breadcrumb items={breadcrumbItems} />
                </motion.div>

                <motion.div 
                    className="screen-intro screen-intro--lesson"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <motion.h1 
                        className="screen-header"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
                        }}
                    >
                        {formatText(lesson.title as string)}
                    </motion.h1>
                    
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                        }}
                    >
                        {lesson.description as string}
                    </motion.p>

                    <motion.div 
                        className="lesson-author"
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                        }}
                    >
                        <div className="lesson-author__avatar">AK</div>
                        <span className="lesson-author__name">
                            Ashmit Khadka<span className="lesson-author__role">, Senior Software Engineer</span>
                        </span>
                    </motion.div>
                </motion.div>

                {groupedContent.map(section => (
                    <motion.section 
                        key={section.id} 
                        id={section.id} 
                        className="learning-section section"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <h2 className="learning-section-header">{formatText(section.title)}</h2>
                        {section.items.map(item => (
                            <ContentRenderer key={item.id as string} item={item} />
                        ))}
                    </motion.section>
                ))}

                {quiz && quiz.length > 0 && (
                    <motion.section 
                        id="section-quiz" 
                        className="learning-section section"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <h2 className="learning-section-header">Quiz</h2>
                        <LessonQuiz quiz={quiz as unknown as Parameters<typeof LessonQuiz>[0]['quiz']} />
                    </motion.section>
                )}
            </motion.div>
        </div>
    );
};

export default LessonView;
