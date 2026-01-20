const DemoLesson = {
    id: "demo-lesson-all-types",
    slug: "demo-lesson",
    version: "1.0.0",
    
    title: "🧪 Demo Lesson - All Section Types",
    description: "This is a demonstration lesson showcasing all available content section types including text, lists, code, headings, callouts, images, and tables.",
    
    meta: {
        difficulty: "beginner",
        duration: 30,
        prerequisites: [],
        tags: ["demo", "tutorial", "examples"],
        author: "Demo Author",
        lastUpdated: "2026-01-13"
    },
    
    content: [
        // Section 1: Text and Headings
        {
            id: "section-1",
            type: "section",
            title: "1. 📝 Text and Headings"
        },
        {
            id: "text-1",
            type: "text",
            text: "This is a regular text paragraph. You can use `inline code` and **bold text** in your content."
        },
        {
            id: "heading-1",
            type: "heading",
            text: "Best Practices",
            variant: "do"
        },
        {
            id: "text-2",
            type: "text",
            text: "Always write clean, maintainable code."
        },
        {
            id: "heading-2",
            type: "heading",
            text: "Common Mistakes",
            variant: "dont"
        },
        {
            id: "text-3",
            type: "text",
            text: "Don't write code without proper error handling."
        },
        
        // Section 2: Lists and Code Examples
        {
            id: "section-2",
            type: "section",
            title: "2. 📋 Lists and Code Examples"
        },
        {
            id: "text-4",
            type: "text",
            text: "Here are some key concepts to remember:"
        },
        {
            id: "list-1",
            type: "list",
            items: [
                "Always use `const` for variables that won't be reassigned",
                "Use `let` for variables that will change",
                "Avoid using `var` in modern JavaScript",
                "Write descriptive variable names"
            ]
        },
        {
            id: "heading-3",
            type: "heading",
            text: "Example Code"
        },
        {
            id: "code-1",
            type: "code",
            language: "javascript",
            code: `// Good variable declarations
const PI = 3.14159;
let counter = 0;

function incrementCounter() {
    counter++;
    return counter;
}

console.log(incrementCounter()); // 1
console.log(incrementCounter()); // 2`
        },
        
        // Section 3: Callouts
        {
            id: "section-3",
            type: "section",
            title: "3. 💡 Callouts"
        },
        {
            id: "text-5",
            type: "text",
            text: "Callouts help highlight important information in different contexts:"
        },
        {
            id: "callout-1",
            type: "callout",
            text: "This is an **info** callout. Use it for general information and helpful context.",
            variant: "info"
        },
        {
            id: "callout-2",
            type: "callout",
            text: "This is a **tip** callout. Use it for best practices and pro tips!",
            variant: "tip"
        },
        {
            id: "callout-3",
            type: "callout",
            text: "This is a **warning** callout. Use it to warn about potential issues or gotchas.",
            variant: "warning"
        },
        {
            id: "callout-4",
            type: "callout",
            text: "This is a **danger** callout. Use it for critical warnings about breaking changes or security issues.",
            variant: "danger"
        },
        {
            id: "callout-5",
            type: "callout",
            text: "This is a **note** callout. Use it for additional notes and side information.",
            variant: "note"
        },
        
        // Section 4: Tables
        {
            id: "section-4",
            type: "section",
            title: "4. 📊 Tables"
        },
        {
            id: "text-6",
            type: "text",
            text: "Tables are perfect for comparing different options or showing data structures:"
        },
        {
            id: "heading-4",
            type: "heading",
            text: "Array Methods Comparison"
        },
        {
            id: "table-1",
            type: "table",
            caption: "Array Methods Comparison",
            headers: ["Method", "Time Complexity", "Mutates Array", "Returns"],
            rows: [
                ["`push()`", "O(1)", "Yes", "New length"],
                ["`pop()`", "O(1)", "Yes", "Removed element"],
                ["`shift()`", "O(n)", "Yes", "Removed element"],
                ["`unshift()`", "O(n)", "Yes", "New length"],
                ["`map()`", "O(n)", "No", "New array"],
                ["`filter()`", "O(n)", "No", "New array"]
            ]
        },
        {
            id: "callout-6",
            type: "callout",
            text: "Notice how methods that modify the beginning of an array have O(n) complexity because all elements need to be shifted.",
            variant: "tip"
        },
        
        // Section 5: Images
        {
            id: "section-5",
            type: "section",
            title: "5. 🖼️ Images"
        },
        {
            id: "text-7",
            type: "text",
            text: "Images help visualize complex concepts. Here's an example:"
        },
        {
            id: "image-1",
            type: "image",
            src: "/assets/image/kcl_logo.jpg",
            alt: "Example diagram",
            caption: "This is a placeholder image demonstrating the image component with a caption"
        },
        {
            id: "callout-7",
            type: "callout",
            text: "Replace the `src` path with your actual diagram or illustration paths.",
            variant: "note"
        },
        
        // Section 6: Putting It All Together
        {
            id: "section-6",
            type: "section",
            title: "6. 🎯 Putting It All Together"
        },
        {
            id: "text-8",
            type: "text",
            text: "Let's combine multiple section types to create rich, educational content:"
        },
        {
            id: "heading-5",
            type: "heading",
            text: "Real-World Example"
        },
        {
            id: "callout-8",
            type: "callout",
            text: "We're going to implement a simple data structure comparison.",
            variant: "info"
        },
        {
            id: "table-2",
            type: "table",
            caption: "Data Structure Complexity Comparison",
            headers: ["Data Structure", "Access", "Search", "Insert", "Delete"],
            rows: [
                ["Array", "O(1)", "O(n)", "O(n)", "O(n)"],
                ["Linked List", "O(n)", "O(n)", "O(1)", "O(1)"],
                ["Hash Table", "O(1)", "O(1)", "O(1)", "O(1)"],
                ["Binary Tree", "O(log n)", "O(log n)", "O(log n)", "O(log n)"]
            ]
        },
        {
            id: "code-2",
            type: "code",
            language: "javascript",
            code: `// Example: Choosing the right data structure
const users = new Map(); // O(1) lookups

users.set('user123', { name: 'Alice', age: 30 });
users.set('user456', { name: 'Bob', age: 25 });

// Fast lookup by ID
const alice = users.get('user123');
console.log(alice); // { name: 'Alice', age: 30 }`
        },
        {
            id: "callout-9",
            type: "callout",
            text: "Use `Map` when you need fast key-value lookups. Use arrays when you need ordered data with index access.",
            variant: "tip"
        }
    ],
    
    quiz: null
};

export default DemoLesson;
