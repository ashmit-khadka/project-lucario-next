'use client';

import React, { useState, useEffect, useCallback } from "react";

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
            <nav className="floating-nav floating-nav--desktop">
                {/* Progress bar */}
                <div className="floating-nav-progress">
                    <div
                        className="floating-nav-progress-fill"
                        style={{ height: `${scrollProgress}%` }}
                    />
                </div>

                <ul>
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
            </nav>

            {/* ── Mobile: sticky top bar with collapse/expand ── */}
            <nav className={`floating-nav floating-nav--mobile ${isExpanded ? "floating-nav--expanded" : ""}`}>
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

                    <span className={`floating-nav-mobile-chevron ${isExpanded ? "open" : ""}`}>
                        ▾
                    </span>
                </button>

                {/* Horizontal progress bar */}
                <div className="floating-nav-progress-h">
                    <div
                        className="floating-nav-progress-h-fill"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>

                {/* Expandable section list */}
                {isExpanded && (
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
                )}
            </nav>
        </>
    );
};

export default NavigationHover;
