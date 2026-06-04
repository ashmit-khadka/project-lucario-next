'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
    id: string;
    label: string;
}

interface NavigationHoverProps {
    sections: Section[];
    showAfterSection?: string | null;
}

const NavigationHover = ({ sections, showAfterSection = null }: NavigationHoverProps) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(!showAfterSection);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const navbarHeight = 130;

    // Calculate which section index is active (for the discrete progress indicator)
    const activeSectionIndex = sections.findIndex(s => s.id === activeSection);

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = document.querySelectorAll(".section");
            let newActiveSection: string | null = null;
            let smallestDistance = Number.MAX_VALUE;

            if (showAfterSection) {
                const triggerSection = document.getElementById(showAfterSection);
                if (triggerSection) {
                    const triggerRect = triggerSection.getBoundingClientRect();
                    setIsVisible(triggerRect.bottom <= navbarHeight);
                }
            }

            sectionElements.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const distanceFromTop = Math.abs(rect.top - navbarHeight);
                
                const isInView = rect.top <= navbarHeight + 50 && rect.bottom >= navbarHeight;
                
                if (isInView && distanceFromTop < smallestDistance) {
                    smallestDistance = distanceFromTop;
                    newActiveSection = section.id;
                }
            });

            if (!newActiveSection) {
                sectionElements.forEach((section) => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top > 0 && rect.top < window.innerHeight / 2) {
                        const currentElement = document.getElementById(newActiveSection || '');
                        if (!newActiveSection || (currentElement && rect.top < currentElement.getBoundingClientRect().top)) {
                            newActiveSection = section.id;
                        }
                    }
                });
            }

            setActiveSection(newActiveSection);

            // Calculate overall scroll progress (0–100)
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, [showAfterSection, navbarHeight]);

    // Collapse on scroll (mobile)
    useEffect(() => {
        if (!isExpanded) return;

        const collapseOnScroll = () => setIsExpanded(false);
        window.addEventListener("scroll", collapseOnScroll, { once: true, passive: true });
        return () => window.removeEventListener("scroll", collapseOnScroll);
    }, [isExpanded]);

    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsExpanded(false);
    }, [navbarHeight]);

    if (!isVisible) {
        return null;
    }

    return (
        <>
            {/* ── Desktop: fixed left-side nav (unchanged layout) ── */}
            <motion.nav 
                className="floating-nav floating-nav--desktop"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
                {/* Progress bar */}
                <div className="floating-nav-progress">
                    <motion.div
                        className="floating-nav-progress-fill"
                        style={{ height: `${scrollProgress}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 18 }}
                    />
                </div>

                <ul>
                    {sections.map(({ id, label }) => (
                        <motion.li
                            key={id}
                            className={`floating-nav-item ${activeSection === id ? "active" : ""}`}
                            onClick={() => scrollToSection(id)}
                            whileHover={{ x: 6, color: "var(--color-font-primary-dark)" }}
                            transition={{ duration: 0.2 }}
                        >
                            {label}
                        </motion.li>
                    ))}
                </ul>
            </motion.nav>

            {/* ── Mobile: sticky top bar with collapse/expand ── */}
            <motion.nav 
                className={`floating-nav floating-nav--mobile ${isExpanded ? "floating-nav--expanded" : ""}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Collapsed bar: progress + tap to expand */}
                <button
                    className="floating-nav-mobile-header"
                    onClick={() => setIsExpanded(prev => !prev)}
                    aria-expanded={isExpanded}
                    aria-label="Toggle section navigation"
                >
                    <span className="floating-nav-mobile-label">
                        {activeSectionIndex >= 0
                            ? sections[activeSectionIndex].label
                            : 'Sections'}
                    </span>

                    <motion.span 
                        className={`floating-nav-mobile-chevron ${isExpanded ? "open" : ""}`}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        ▾
                    </motion.span>
                </button>

                {/* Horizontal progress bar */}
                <div className="floating-nav-progress-h">
                    <motion.div
                        className="floating-nav-progress-h-fill"
                        style={{ width: `${scrollProgress}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 18 }}
                    />
                </div>

                {/* Expandable section list */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            <ul className="floating-nav-mobile-list">
                                {sections.map(({ id, label }) => (
                                    <li
                                        key={id}
                                        className={`floating-nav-item ${activeSection === id ? "active" : ""}`}
                                        onClick={() => scrollToSection(id)}
                                    >
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default NavigationHover;
