'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import formatText from '../utils/formatText';

export interface QuizItem {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

interface LessonQuizProps {
    quiz: QuizItem[];
}

const LessonQuiz = ({ quiz }: LessonQuizProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    if (!quiz || quiz.length === 0) return null;

    const current = quiz[currentIndex];
    const isCorrect = selected === current.correctAnswer;
    const progress = ((currentIndex) / quiz.length) * 100;

    const handleSubmit = () => {
        if (selected === null) return;
        setSubmitted(true);
        if (selected === current.correctAnswer) {
            setScore((s) => s + 1);
        }
    };

    const handleNext = () => {
        setSelected(null);
        setSubmitted(false);
        if (currentIndex + 1 < quiz.length) {
            setCurrentIndex((i) => i + 1);
        } else {
            setFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setSelected(null);
        setSubmitted(false);
        setScore(0);
        setFinished(false);
    };

    if (finished) {
        const pct = Math.round((score / quiz.length) * 100);
        return (
            <div className="lesson-quiz">
                <motion.div 
                    className="lesson-quiz-results"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <h3>Quiz Complete!</h3>
                    <p className="lesson-quiz-score">{score}/{quiz.length} correct ({pct}%)</p>
                    <p className="lesson-quiz-message">
                        {pct === 100
                            ? 'Perfect score! You nailed it.'
                            : pct >= 70
                               ? 'Good work! Review the ones you missed and try again.'
                               : 'Keep studying the lesson and give it another go.'}
                    </p>
                    <motion.button 
                        className="lesson-quiz-btn" 
                        onClick={handleRestart}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Retake Quiz
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="lesson-quiz">
            <div className="lesson-quiz-header">
                <span className="lesson-quiz-badge">Quiz</span>
                <span className="lesson-quiz-counter">
                    {currentIndex + 1} / {quiz.length}
                </span>
            </div>

            <div className="lesson-quiz-progress">
                <motion.div 
                    className="lesson-quiz-progress-bar" 
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                    <p className="lesson-quiz-question">{formatText(current.question)}</p>

                    <ul className="lesson-quiz-options">
                        {current.options.map((option, i) => {
                            let stateClass = '';
                            if (submitted) {
                                if (option === current.correctAnswer) stateClass = 'correct';
                                else if (option === selected) stateClass = 'incorrect';
                            }
                            return (
                                <motion.li
                                    key={i}
                                    className={`lesson-quiz-option ${selected === option ? 'selected' : ''} ${stateClass}`}
                                    onClick={() => { if (!submitted) setSelected(option); }}
                                    whileHover={!submitted ? { scale: 1.01, x: 2 } : {}}
                                    whileTap={!submitted ? { scale: 0.99 } : {}}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="lesson-quiz-option-marker">{String.fromCharCode(65 + i)}</span>
                                    <span>{formatText(option)}</span>
                                </motion.li>
                            );
                        })}
                    </ul>

                    {!submitted && (
                        <motion.button
                            className="lesson-quiz-btn"
                            disabled={selected === null}
                            onClick={handleSubmit}
                            whileHover={selected !== null ? { scale: 1.03 } : {}}
                            whileTap={selected !== null ? { scale: 0.97 } : {}}
                        >
                            Check Answer
                        </motion.button>
                    )}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {submitted && (
                    <motion.div 
                        className={`lesson-quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: '1.5rem' }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <span>{isCorrect ? '✅ Correct!' : '❌ Not quite.'}</span>
                        <p className="lesson-quiz-explanation">{formatText(current.explanation)}</p>
                        <motion.button 
                            className="lesson-quiz-btn" 
                            onClick={handleNext}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {currentIndex + 1 < quiz.length ? 'Next Question' : 'See Results'}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LessonQuiz;
