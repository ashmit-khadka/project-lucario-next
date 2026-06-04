'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SplitSectionProps {
    title: string;
    text: string | string[];
    imageUrl: string;
    imagePosition?: 'left' | 'right';
}

const SplitSection: React.FC<SplitSectionProps> = ({ 
    title, 
    text, 
    imageUrl, 
    imagePosition = 'left' 
}) => {
    const paragraphs = Array.isArray(text) ? text : [text];
    const isLeft = imagePosition === 'left';

    const containerRef = useRef<HTMLDivElement>(null);
    const [windowWidth, setWindowWidth] = useState(800);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 90%", "start 40%"]
    });

    // Compute contracted and expanded states based on window width
    const contractedWidth = Math.min(800, windowWidth - 48);
    const expandedWidth = windowWidth;
    const contractedRadius = windowWidth >= 800 ? 48 : 0;

    // Interpolate scroll progress to width and border-radius
    const width = useTransform(scrollYProgress, [0, 1], [contractedWidth, expandedWidth]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], [contractedRadius, 0]);

    return (
        <motion.section 
            ref={containerRef}
            className={`split-section ${imagePosition === 'right' ? 'split-section--reverse' : ''}`} 
            style={{ 
                overflow: 'hidden',
                width: width,
                marginLeft: "50%",
                x: "-50%",
                borderRadius: borderRadius
            }}
        >
            <motion.div 
                className="split-section__image-container"
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <img src={imageUrl} alt={title} className="split-section__image" />
            </motion.div>
            
            <motion.div 
                className="split-section__content"
                initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            >
                <h2 className="split-section__title">{title}</h2>
                {paragraphs.map((p, index) => (
                    <p key={index} className="split-section__text">{p}</p>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default SplitSection;
