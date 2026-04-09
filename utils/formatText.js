import React from 'react';
import TermHoverCard from '../components/TermHoverCard';

/**
 * Formats text with code, bold, italic, highlight, and term styling using the following syntax:
 * `code` for inline code
 * **bold** for bold text
 * _italic_ for italic text
 * ==highlight== for highlighted text
 * {{term}} for clickable technical terms
 *
 * @param {string} text - The text to format
 * @param {Record<string, string>} [glossary] - Optional map of term → definition for tooltips
 * @returns {Array} Array of React elements and strings
 */
const formatText = (text, glossary = {}) => {
    if (!text) return null;

    // Regex for matching different patterns
    const patterns = [
        { regex: /`([^`]+)`/g, type: 'code' },
        { regex: /\*\*([^*]+)\*\*/g, type: 'bold' },
        { regex: /\_([^_]+)\_/g, type: 'italic' },
        { regex: /==([^=]+)==/g, type: 'highlight' },
        { regex: /\{\{([^}]+)\}\}/g, type: 'term' }
    ];

    // Find all matches and their positions
    let matches = [];
    patterns.forEach(({ regex, type }) => {
        let match;
        while ((match = regex.exec(text)) !== null) {
            matches.push({
                start: match.index,
                end: match.index + match[0].length,
                content: match[1],
                type,
                fullMatch: match[0]
            });
        }
    });

    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start);

    // Build the result array
    const result = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
        // Skip matches that are entirely inside an already-consumed span
        // (e.g. {{term}} nested inside **bold** or ==highlight==)
        if (match.start < lastIndex) return;

        // Add text before the match
        if (match.start > lastIndex) {
            result.push(text.substring(lastIndex, match.start));
        }

        // Add the formatted content
        switch (match.type) {
            case 'code':
                result.push(
                    <code key={`code-${index}`} className="inline-code">
                        {match.content}
                    </code>
                );
                break;
            case 'bold':
                result.push(
                    <strong key={`bold-${index}`}>
                        {formatText(match.content, glossary)}
                    </strong>
                );
                break;
            case 'italic':
                result.push(
                    <em key={`italic-${index}`}>
                        {formatText(match.content, glossary)}
                    </em>
                );
                break;
            case 'highlight':
                result.push(
                    <mark key={`highlight-${index}`} className="inline-highlight">
                        {formatText(match.content, glossary)}
                    </mark>
                );
                break;
            case 'term': {
                const definition = glossary[match.content];
                result.push(
                    <TermHoverCard
                        key={`term-${index}`}
                        term={match.content}
                        definition={definition}
                    />
                );
                break;
            }
            default:
                result.push(match.content);
        }

        lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
        result.push(text.substring(lastIndex));
    }

    return result;
};

export default formatText;