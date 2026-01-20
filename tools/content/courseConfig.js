/**
 * Course configuration for course generation
 * 
 * Modify the courseConfig object below to generate your desired course.
 * Then run: node generateCourse.js
 */

export const courseConfig = {
    // Course name (will be used for file naming and URLs)
    name: 'Advanced JavaScript',
    
    // Course description
    description: 'Master advanced JavaScript concepts including closures, async programming, and design patterns',
    
    // Difficulty level: 'beginner', 'intermediate', 'advanced'
    difficulty: 'intermediate',
    
    // Array of chapter titles - each will become a lesson
    contents: [
        'Closures and Lexical Scope',
        'Prototypes and Inheritance',
        'Async Programming with Promises',
        'Async/Await and Error Handling',
        'JavaScript Design Patterns',
        'Memory Management and Performance',
        'ES6+ Modern Features',
        'Functional Programming Concepts'
    ]
};

// Example configurations (uncomment and modify courseConfig above to use):

// Python course example:
// {
//     name: 'Python Basics',
//     description: 'Learn Python programming from scratch',
//     difficulty: 'beginner',
//     contents: [
//         'Introduction to Python and Setup',
//         'Variables and Data Types',
//         'Control Flow and Loops',
//         'Functions and Modules',
//         'Lists and Dictionaries',
//         'File I/O and Exception Handling',
//         'Object-Oriented Programming',
//         'Working with Libraries'
//     ]
// }

// React course example:
// {
//     name: 'React Fundamentals',
//     description: 'Build modern web applications with React',
//     difficulty: 'intermediate',
//     contents: [
//         'React Basics and JSX',
//         'Components and Props',
//         'State and Lifecycle',
//         'Hooks: useState and useEffect',
//         'Context API and Global State',
//         'React Router and Navigation',
//         'Forms and Validation',
//         'Performance Optimization'
//     ]
// }
