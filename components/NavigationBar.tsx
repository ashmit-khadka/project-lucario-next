'use client';

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

const NavigationBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const isHomePage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (isHomePage) {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    const bottom = aboutSection.getBoundingClientRect().bottom;
                    setHasScrolled(bottom <= 0);
                }
            } else {
                setHasScrolled(window.scrollY > 100);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    const onNavigate = (link: string) => {
        setIsOpen(false);
        router.push(link);
    }

    return (
        <>
            <nav className={`navigation ${hasScrolled || !isHomePage ? 'scrolled' : ''}`}>
                <div className="navigation-dummy"></div>
                <div className="navigation-bar">
                    <div
                        className="navigation-logo"
                        onClick={() => onNavigate("/")}
                    >
                        {"<akhadka.dev />"} <div className="navigation-logo-cursor"></div>
                    </div>
                    <ul className={`navigation-links ${isOpen ? 'open' : ''}`}>
                        {[
                            { id: 'portfolio', label: 'Portfolio', link: '/' },
                            { id: 'resume', label: 'Resume', link: '/resume' },
                            { id: 'learn', label: 'Learn', link: '/learn' },
                        ].map(link => (
                            <li
                                key={link.id}
                                className={`navigation-link ${pathname.includes(link.link) && link.link !== '/' ? 'active' : link.link === '/' && pathname === '/' ? 'active' : ''}`}
                                onClick={() => onNavigate(link.link)}
                            >
                                {link.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navigation-menu">
                    <button
                        className={`hamburger-menu ${isOpen ? 'active' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>


                </div>
            </nav>
            {isOpen && (
                <div
                    className="navigation-backdrop"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default NavigationBar;
