import React from 'react';

/**
 * Formats text with code, bold, and italic styling using the following syntax:
 * `code` for inline code
 * **bold** for bold text
 * _italic_ for italic text
 * 
 * @param {string} text - The text to format
 * @returns {Array} Array of React elements and strings
 */
const formatText = (text) => {
    if (!text) return null;

    // Regex for matching different patterns
    const patterns = [
        { regex: /`([^`]+)`/g, type: 'code' },
        { regex: /\*\*([^*]+)\*\*/g, type: 'bold' },
        { regex: /\_([^_]+)\_/g, type: 'italic' }
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
                        {match.content}
                    </strong>
                );
                break;
            case 'italic':
                result.push(
                    <em key={`italic-${index}`}>
                        {match.content}
                    </em>
                );
                break;
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