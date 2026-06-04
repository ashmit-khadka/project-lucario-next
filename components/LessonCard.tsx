'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import formatText from '@/utils/formatText';

export interface LessonCardProps {
    variant?: 'default' | 'image' | 'metric' | 'flashcard' | 'quote';
    title?: string;
    content: string;
    icon?: string;
    imageUrl?: string;
    metadata?: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
    variant = 'default',
    title,
    content,
    icon,
    imageUrl,
    metadata
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
    };

    switch (variant) {
        case 'image':
            return (
                <motion.div 
                    className="lesson-card lesson-card--image"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                    {imageUrl && (
                        <div className="lesson-card__image-container">
                            <img src={imageUrl} alt={title || "Card image"} className="lesson-card__image" />
                        </div>
                    )}
                    <div className="lesson-card__body">
                        {title && <h3 className="lesson-card__title">{formatText(title)}</h3>}
                        <p className="lesson-card__content">{formatText(content)}</p>
                    </div>
                </motion.div>
            );

        case 'metric':
            return (
                <motion.div 
                    className="lesson-card lesson-card--metric"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                    <div className="lesson-card__metric-value">{metadata}</div>
                    <div className="lesson-card__body">
                        {title && <h3 className="lesson-card__title">{formatText(title)}</h3>}
                        <p className="lesson-card__content">{formatText(content)}</p>
                    </div>
                </motion.div>
            );

        case 'flashcard':
            return (
                <motion.div 
                    className="lesson-card lesson-card--flashcard"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <motion.div 
                        className="lesson-card__flashcard-inner"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="lesson-card__flashcard-front">
                            {icon && <span className="lesson-card__icon">{icon}</span>}
                            <h3 className="lesson-card__title">{formatText(title || "Question")}</h3>
                            {metadata && <p className="lesson-card__hint">{formatText(metadata)}</p>}
                            <div className="lesson-card__flip-hint">Click to reveal</div>
                        </div>
                        <div className="lesson-card__flashcard-back">
                            <p className="lesson-card__content">{formatText(content)}</p>
                        </div>
                    </motion.div>
                </motion.div>
            );

        case 'quote':
            return (
                <motion.div 
                    className="lesson-card lesson-card--quote"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <div className="lesson-card__quote-mark">"</div>
                    <p className="lesson-card__content">{formatText(content)}</p>
                    {(title || metadata) && (
                        <div className="lesson-card__author">
                            {title && <span className="lesson-card__author-name">{formatText(title)}</span>}
                            {metadata && <span className="lesson-card__author-title">{formatText(metadata)}</span>}
                        </div>
                    )}
                </motion.div>
            );

        case 'default':
        default:
            return (
                <motion.div 
                    className="lesson-card lesson-card--default"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)", transition: { duration: 0.2 } }}
                >
                    {icon && <div className="lesson-card__icon-wrapper"><span className="lesson-card__icon">{icon}</span></div>}
                    <div className="lesson-card__body">
                        {title && <h3 className="lesson-card__title">{formatText(title)}</h3>}
                        <p className="lesson-card__content">{formatText(content)}</p>
                    </div>
                </motion.div>
            );
    }
};

export default LessonCard;
