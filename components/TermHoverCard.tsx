'use client';

import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';

interface TermHoverCardProps {
    term: string;
    definition?: string;
}

const TermHoverCard = ({ term, definition }: TermHoverCardProps) => {
    return (
        <HoverCard.Root openDelay={200} closeDelay={100}>
            <HoverCard.Trigger asChild>
                <span className="inline-term" aria-label={definition ? `${term}: ${definition}` : term}>
                    {term}
                </span>
            </HoverCard.Trigger>

            <HoverCard.Portal>
                <HoverCard.Content className="term-hover-card" sideOffset={6} align="start">
                    <div className="term-hover-card__header">
                        <span className="term-hover-card__icon">📖</span>
                        <span className="term-hover-card__title">{term}</span>
                    </div>
                    <p className="term-hover-card__body">
                        {definition || 'A technical term used in this lesson. Definitions will be pulled from the course glossary.'}
                    </p>
                    <div className="term-hover-card__footer">
                        <span className="term-hover-card__tag">Term</span>
                    </div>
                    <HoverCard.Arrow className="term-hover-card__arrow" />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};

export default TermHoverCard;
