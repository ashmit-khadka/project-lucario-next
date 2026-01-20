'use client';

import React, { useState, useEffect } from "react";

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
    const navbarHeight = 130;

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
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, [showAfterSection, navbarHeight]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <nav className="floating-nav">
            <ul>
                {sections.map(({ id, label }) => (
                    <li
                        key={id}
                        className={`floating-nav-item ${
                            activeSection === id ? "active" : ""
                        }`}
                        onClick={() => scrollToSection(id)}
                    >
                        {label}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavigationHover;
