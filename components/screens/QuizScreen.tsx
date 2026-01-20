'use client';

import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { synthwave84 } from "react-syntax-highlighter/dist/esm/styles/prism";

interface QuizQuestion {
    type: string;
    question: string;
    answer: any;
    explaination: string;
    code?: string;
    options?: string[];
}

interface QuizScreenProps {
    quizData?: QuizQuestion[];
}

const QuizScreen = (props: QuizScreenProps) => {
    const { quizData } = props;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [feedback, setFeedback] = useState(null);
    // const [quizData, setQuizData] = useState([]);

    // useEffect(() => {
    //     const fetchQuizData = async () => {
    //         try {
    //             const data = await getQuiz("javascript", "1");
    //             setQuizData(data);
    //         } catch (error) {
    //             console.error("Error fetching quiz data:", error);
    //         }
    //     };
    //     fetchQuizData();
    // }, []);

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResults(false);
        setFeedback(null);
    };

    if (!quizData || quizData.length === 0) {
        return <div></div>;
    }

    const currentQuestion = quizData[currentQuestionIndex];

    const handleAnswer = (userAnswer) => {
        const isCorrect =
            currentQuestion.type === "true-false"
                ? userAnswer === currentQuestion.answer
                : userAnswer.toString().toLowerCase() ===
                  currentQuestion.answer.toString().toLowerCase();

        if (isCorrect) {
            setScore((prev) => prev + 1);
            setFeedback({ correct: true, explaination: currentQuestion.explaination });
        } else {
            setFeedback({ correct: false, explaination: currentQuestion.explaination });
        }
    };

    const handleNextQuestion = () => {
        setFeedback(null); // Clear feedback for the next question
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < quizData.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setShowResults(true);
        }
    };

    const QuestionCodeBlck = () => {
        if (!currentQuestion.code) return null;
        
        return (
            <div className="quiz-code-block">
                <SyntaxHighlighter language="javascript" style={synthwave84}>
                    {currentQuestion.code}
                </SyntaxHighlighter>
            </div>
        );
    };

    const renderQuestion = () => {
        switch (currentQuestion.type) {
            case "multiple-choice":
                return (
                    <div className="quiz-question">
                        <h2>{currentQuestion.question}</h2>
                        <QuestionCodeBlck />
                        <ul className="quiz-options">
                            {currentQuestion.options.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    className="quiz-option"
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case "true-false":
                return (
                    <div className="quiz-question">
                        <h2>{currentQuestion.question}</h2>
                        <QuestionCodeBlck />
                        <div className="quiz-buttons">
                            <button
                                className="quiz-button"
                                onClick={() => handleAnswer(true)}
                            >
                                True
                            </button>
                            <button
                                className="quiz-button"
                                onClick={() => handleAnswer(false)}
                            >
                                False
                            </button>
                        </div>
                    </div>
                );
            case "fill-in-the-blank":
                return (
                    <div className="quiz-question">
                        <h2>{currentQuestion.question}</h2>
                        <QuestionCodeBlck />
                        <input
                            type="text"
                            className="quiz-input"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAnswer(e.target.value);
                                    e.target.value = "";
                                }
                            }}
                            placeholder="Type your answer here"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    if (showResults) {
        return (
            <div className="quiz-results">
                <h1>Quiz Completed!</h1>
                <p className="quiz-score">Your Score: {score}/{quizData.length}</p>
                <p className="quiz-percentage">
                    {Math.round((score / quizData.length) * 100)}% Correct
                </p>
                
                {score === quizData.length ? (
                    <div className="quiz-perfect">
                        <h2>Perfect Score! 🎉</h2>
                        <p>Excellent work! You've mastered this topic!</p>
                    </div>
                ) : (
                    <div className="quiz-feedback-final">
                        <p>
                            {score / quizData.length >= 0.7 
                                ? "Good job! Keep practicing to improve your skills."
                                : "Keep learning and try again to improve your score."}
                        </p>
                    </div>
                )}
                
                <button className="quiz-retry-button" onClick={resetQuiz}>
                    Try Again
                </button>
            </div>
        );
    }

    const progress = ((currentQuestionIndex) / quizData.length) * 100;

    const QuestionFeedback = () => {
        return (
            <div className="quiz-feedback">
                <p className={feedback.correct ? "feedback-correct" : "feedback-incorrect"}>
                    {feedback.correct ? "Correct! ✓" : "Incorrect! ✗"}
                </p>
                <p>{feedback.explaination}</p>
            </div>
        );
    }

    return (
        <section className="quiz-screen section" id="section-quiz">
            <h1>Quiz</h1>
            <div className="quiz-progress">
                <div
                    className="quiz-progress-bar"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="quiz-step-counter">
                Question {currentQuestionIndex + 1} of {quizData.length}
            </p>

            {renderQuestion()}
            {feedback && (
                <div className="quiz-feedback">
                    <QuestionFeedback />
                    <button className="quiz-next-button" onClick={handleNextQuestion}>
                        Next Question
                    </button>
                </div>
            )}
        </section>
    );
};

export default QuizScreen;