'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import formatText from '../utils/formatText';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { synthwave84 } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ── Shared fields every question block must have ──
interface QuestionBase {
    id: string;
    type: 'question';
    variant: string;
    explanation: string;
}

// ── Variant-specific fields ──
interface MultipleChoiceQuestion extends QuestionBase {
    variant: 'multiple-choice';
    question: string;
    options: string[];
    correctAnswer: string;
}

interface RevealAnswerQuestion extends QuestionBase {
    variant: 'reveal-answer';
    prompt: string;
    answer: string;
    code?: string;
    codeLanguage?: string;
    buttonLabel?: string;
}

interface FillBlankQuestion extends QuestionBase {
    variant: 'fill-blank';
    question: string;
    correctAnswer: string;
    acceptableAnswers?: string[];
    placeholder?: string;
}

export type QuestionBlockData = MultipleChoiceQuestion | RevealAnswerQuestion | FillBlankQuestion;

// ── Multiple Choice ──
const MultipleChoice = ({ data }: { data: MultipleChoiceQuestion }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const isCorrect = selected === data.correctAnswer;

    const handleSubmit = () => {
        if (selected !== null) setSubmitted(true);
    };

    const handleReset = () => {
        setSelected(null);
        setSubmitted(false);
    };

    return (
        <div className="question-block question-block--mc">
            <div className="question-block-header">
                <span className="question-block-badge">Question</span>
            </div>

            <p className="question-block-prompt">{formatText(data.question)}</p>

            <ul className="question-block-options">
                {data.options.map((option, i) => {
                    let stateClass = '';
                    if (submitted) {
                        if (option === data.correctAnswer) stateClass = 'correct';
                        else if (option === selected) stateClass = 'incorrect';
                    }
                    return (
                        <motion.li
                            key={i}
                            className={`question-block-option ${selected === option ? 'selected' : ''} ${stateClass}`}
                            onClick={() => { if (!submitted) setSelected(option); }}
                            whileHover={!submitted ? { scale: 1.01, x: 2 } : {}}
                            whileTap={!submitted ? { scale: 0.99 } : {}}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="question-block-option-marker">{String.fromCharCode(65 + i)}</span>
                            <span>{formatText(option)}</span>
                        </motion.li>
                    );
                })}
            </ul>

            {!submitted && (
                <motion.button
                    className="question-block-btn"
                    disabled={selected === null}
                    onClick={handleSubmit}
                    whileHover={selected !== null ? { scale: 1.03 } : {}}
                    whileTap={selected !== null ? { scale: 0.97 } : {}}
                >
                    Check Answer
                </motion.button>
            )}

            <AnimatePresence>
                {submitted && (
                    <motion.div 
                        className={`question-block-feedback ${isCorrect ? 'correct' : 'incorrect'}`}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <span>{isCorrect ? '✅ Correct!' : '❌ Not quite.'}</span>
                        <p className="question-block-explanation">{formatText(data.explanation)}</p>
                        <motion.button 
                            className="question-block-btn question-block-btn--ghost" 
                            onClick={handleReset}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Try Again
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Reveal Answer ──
const RevealAnswer = ({ data }: { data: RevealAnswerQuestion }) => {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="question-block question-block--reveal">
            <div className="question-block-header">
                <span className="question-block-badge">Think About It</span>
            </div>

            <p className="question-block-prompt">{formatText(data.prompt)}</p>

            {data.code && (
                <SyntaxHighlighter language={data.codeLanguage || 'javascript'} style={synthwave84}>
                    {data.code}
                </SyntaxHighlighter>
            )}

            {!revealed && (
                <motion.button 
                    className="question-block-btn" 
                    onClick={() => setRevealed(true)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {data.buttonLabel || 'Reveal Answer'}
                </motion.button>
            )}

            <AnimatePresence>
                {revealed && (
                    <motion.div 
                        className="question-block-feedback correct"
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p>{formatText(data.answer)}</p>
                        <p className="question-block-explanation">{formatText(data.explanation)}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Fill in the Blank ──
const FillBlank = ({ data }: { data: FillBlankQuestion }) => {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const allAcceptable = [data.correctAnswer, ...(data.acceptableAnswers || [])];
    const isCorrect = allAcceptable.some(a => a.toLowerCase().trim() === value.toLowerCase().trim());

    const handleSubmit = () => {
        if (value.trim()) setSubmitted(true);
    };

    const handleReset = () => {
        setValue('');
        setSubmitted(false);
    };

    return (
        <div className="question-block question-block--fill">
            <div className="question-block-header">
                <span className="question-block-badge">Fill in the Blank</span>
            </div>

            <p className="question-block-prompt">{formatText(data.question)}</p>

            <div className="question-block-input-row">
                <input
                    className="question-block-input"
                    type="text"
                    value={value}
                    placeholder={data.placeholder || 'Your answer…'}
                    disabled={submitted}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
                />
                {!submitted && (
                    <motion.button
                        className="question-block-btn"
                        disabled={!value.trim()}
                        onClick={handleSubmit}
                        whileHover={value.trim() ? { scale: 1.03 } : {}}
                        whileTap={value.trim() ? { scale: 0.97 } : {}}
                    >
                        Check
                    </motion.button>
                )}
            </div>

            <AnimatePresence>
                {submitted && (
                    <motion.div 
                        className={`question-block-feedback ${isCorrect ? 'correct' : 'incorrect'}`}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <span>{isCorrect ? '✅ Correct!' : `❌ Expected: ${data.correctAnswer}`}</span>
                        <p className="question-block-explanation">{formatText(data.explanation)}</p>
                        <motion.button 
                            className="question-block-btn question-block-btn--ghost" 
                            onClick={handleReset}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Try Again
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Dispatcher ──
const QuestionBlock = ({ data }: { data: QuestionBlockData }) => {
    switch (data.variant) {
        case 'multiple-choice':
            return <MultipleChoice data={data} />;
        case 'reveal-answer':
            return <RevealAnswer data={data} />;
        case 'fill-blank':
            return <FillBlank data={data} />;
        default:
            return null;
    }
};

export default QuestionBlock;
