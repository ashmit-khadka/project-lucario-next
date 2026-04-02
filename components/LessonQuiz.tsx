'use client';

import React, { useState } from 'react';
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
                <div className="lesson-quiz-results">
                    <h3>Quiz Complete!</h3>
                    <p className="lesson-quiz-score">{score}/{quiz.length} correct ({pct}%)</p>
                    <p className="lesson-quiz-message">
                        {pct === 100
                            ? 'Perfect score! You nailed it.'
                            : pct >= 70
                              ? 'Good work! Review the ones you missed and try again.'
                              : 'Keep studying the lesson and give it another go.'}
                    </p>
                    <button className="lesson-quiz-btn" onClick={handleRestart}>
                        Retake Quiz
                    </button>
                </div>
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
                <div className="lesson-quiz-progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <p className="lesson-quiz-question">{formatText(current.question)}</p>

            <ul className="lesson-quiz-options">
                {current.options.map((option, i) => {
                    let stateClass = '';
                    if (submitted) {
                        if (option === current.correctAnswer) stateClass = 'correct';
                        else if (option === selected) stateClass = 'incorrect';
                    }
                    return (
                        <li
                            key={i}
                            className={`lesson-quiz-option ${selected === option ? 'selected' : ''} ${stateClass}`}
                            onClick={() => { if (!submitted) setSelected(option); }}
                        >
                            <span className="lesson-quiz-option-marker">{String.fromCharCode(65 + i)}</span>
                            <span>{formatText(option)}</span>
                        </li>
                    );
                })}
            </ul>

            {!submitted ? (
                <button
                    className="lesson-quiz-btn"
                    disabled={selected === null}
                    onClick={handleSubmit}
                >
                    Check Answer
                </button>
            ) : (
                <div className={`lesson-quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <span>{isCorrect ? '✅ Correct!' : '❌ Not quite.'}</span>
                    <p className="lesson-quiz-explanation">{formatText(current.explanation)}</p>
                    <button className="lesson-quiz-btn" onClick={handleNext}>
                        {currentIndex + 1 < quiz.length ? 'Next Question' : 'See Results'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default LessonQuiz;
