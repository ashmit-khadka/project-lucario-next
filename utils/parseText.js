const parseText = (text) => {
    if (!text) return null;
    
    // Match text between *asterisks* for bold and _underscores_ for italics
    const parts = text.split(/(\*[^*]+\*|_[^_]+_)/g);
    
    return parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
            // Bold text
            const content = part.slice(1, -1);
            return <span key={index} className="bold">{content}</span>;
        }
        if (part.startsWith('_') && part.endsWith('_')) {
            // Italic text
            const content = part.slice(1, -1);
            return <span key={index} className="italic">{content}</span>;
        }
        return part;
    });
};

export default parseText;